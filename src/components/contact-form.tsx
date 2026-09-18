'use client';

import { useActionState } from 'react';
import { sendInquiry } from '@/app/fahrzeuge/[slug]/actions';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ContactState } from '@/lib/contact-schema';

type Props = {
    slug: string;
    /** Unique prefix for the field IDs, in case the form appears twice on a page. */
    idPrefix?: string;
};

const initialState: ContactState = { status: 'idle' };

export function ContactForm({ slug, idPrefix = 'anfrage' }: Props) {
    const [state, formAction, pending] = useActionState(
        sendInquiry,
        initialState,
    );

    if (state.status === 'success') {
        return (
            <p role="status" className="text-body">
                Danke, deine Anfrage ist unterwegs. Ich melde mich per E-Mail.
            </p>
        );
    }

    const errors = state.status === 'error' ? state.fieldErrors : undefined;
    const id = (name: string) => `${idPrefix}-${name}`;

    return (
        <form action={formAction} noValidate className="flex flex-col gap-4">
            <input type="hidden" name="slug" value={slug} />
            <div className="hidden" aria-hidden="true">
                <label htmlFor={id('website')}>Website</label>
                <input
                    id={id('website')}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <Field data-invalid={!!errors?.name} className="gap-1">
                <FieldLabel htmlFor={id('name')}>Name</FieldLabel>
                <Input
                    id={id('name')}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Vor- und Nachname"
                    required
                    aria-invalid={!!errors?.name}
                    aria-describedby={
                        errors?.name ? id('name-fehler') : undefined
                    }
                />
                <FieldError
                    id={id('name-fehler')}
                    className="text-caption text-foreground"
                >
                    {errors?.name}
                </FieldError>
            </Field>

            <Field data-invalid={!!errors?.email} className="gap-1">
                <FieldLabel htmlFor={id('email')}>E-Mail</FieldLabel>
                <Input
                    id={id('email')}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@beispiel.ch"
                    required
                    aria-invalid={!!errors?.email}
                    aria-describedby={
                        errors?.email ? id('email-fehler') : undefined
                    }
                />
                <FieldError
                    id={id('email-fehler')}
                    className="text-caption text-foreground"
                >
                    {errors?.email}
                </FieldError>
            </Field>

            <Field data-invalid={!!errors?.phone} className="gap-1">
                <FieldLabel htmlFor={id('phone')}>
                    Telefon (optional)
                </FieldLabel>
                <Input
                    id={id('phone')}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="079 000 00 00"
                    aria-invalid={!!errors?.phone}
                    aria-describedby={
                        errors?.phone ? id('phone-fehler') : undefined
                    }
                />
                <FieldError
                    id={id('phone-fehler')}
                    className="text-caption text-foreground"
                >
                    {errors?.phone}
                </FieldError>
            </Field>

            <Field data-invalid={!!errors?.message} className="gap-1">
                <FieldLabel htmlFor={id('message')}>Nachricht</FieldLabel>
                <Textarea
                    id={id('message')}
                    name="message"
                    rows={4}
                    placeholder="Deine Frage zum Fahrzeug"
                    required
                    aria-invalid={!!errors?.message}
                    aria-describedby={
                        errors?.message ? id('message-fehler') : undefined
                    }
                />
                <FieldError
                    id={id('message-fehler')}
                    className="text-caption text-foreground"
                >
                    {errors?.message}
                </FieldError>
            </Field>

            {state.status === 'error' && state.message && (
                <p role="alert" className="text-body-sm text-foreground">
                    {state.message}
                </p>
            )}

            <Button type="submit" size="xl" disabled={pending}>
                {pending ? 'Wird gesendet …' : 'Anfrage senden'}
            </Button>

            <p className="text-caption text-muted-foreground">
                Deine Angaben gehen direkt per E-Mail an mich und werden nicht
                weitergegeben.
            </p>
        </form>
    );
}
