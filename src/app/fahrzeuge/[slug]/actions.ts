'use server';

import { Resend } from 'resend';
import {
    type ContactField,
    type ContactState,
    contactSchema,
} from '@/lib/contact-schema';
import { formatSpecLine } from '@/lib/format';
import { vehicleBySlug, vehicleTitle } from '@/lib/vehicles';

const fields: ContactField[] = ['name', 'email', 'phone', 'message'];

export async function sendInquiry(
    _prev: ContactState,
    formData: FormData,
): Promise<ContactState> {
    const parsed = contactSchema.safeParse({
        slug: formData.get('slug') ?? '',
        name: formData.get('name') ?? '',
        email: formData.get('email') ?? '',
        phone: formData.get('phone') ?? '',
        message: formData.get('message') ?? '',
        website: formData.get('website') ?? '',
    });

    if (!parsed.success) {
        const fieldErrors: Partial<Record<ContactField, string>> = {};
        for (const issue of parsed.error.issues) {
            const key = issue.path[0];
            if (typeof key === 'string' && (fields as string[]).includes(key)) {
                fieldErrors[key as ContactField] ??= issue.message;
            }
        }
        // Honeypot filled: silently report success, send nothing.
        if (parsed.error.issues.some((i) => i.path[0] === 'website')) {
            return { status: 'success' };
        }
        return { status: 'error', fieldErrors };
    }

    const vehicle = vehicleBySlug(parsed.data.slug);
    if (!vehicle || !vehicle.forSale) {
        return {
            status: 'error',
            message: 'Dieses Fahrzeug steht nicht zum Verkauf.',
        };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM;
    if (!apiKey || !to || !from) {
        console.error(
            'Kontaktformular: RESEND_API_KEY, CONTACT_TO oder CONTACT_FROM fehlt.',
        );
        return {
            status: 'error',
            message:
                'Die Anfrage konnte gerade nicht gesendet werden. Bitte versuch es später nochmals.',
        };
    }

    const title = vehicleTitle(vehicle);
    const { name, email, phone, message } = parsed.data;
    const text = [
        `Anfrage zu ${title} (${formatSpecLine(vehicle)})`,
        '',
        `Name: ${name}`,
        `E-Mail: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        '',
        message,
    ]
        .filter((line) => line !== null)
        .join('\n');

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `Anfrage: ${title}`,
        text,
    });

    if (error) {
        console.error('Kontaktformular: Versand fehlgeschlagen', error);
        return {
            status: 'error',
            message:
                'Die Anfrage konnte nicht gesendet werden. Bitte versuch es später nochmals.',
        };
    }

    return { status: 'success' };
}
