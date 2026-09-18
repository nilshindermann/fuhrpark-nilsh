import { z } from 'zod';

export const contactSchema = z.object({
    slug: z.string().min(1),
    name: z.string().trim().min(2, 'Bitte gib deinen Namen an.'),
    email: z.email('Bitte gib eine gültige E-Mail-Adresse an.'),
    phone: z.string().trim().max(40, 'Die Telefonnummer ist zu lang.'),
    message: z
        .string()
        .trim()
        .min(10, 'Bitte schreib mindestens ein paar Worte.')
        .max(4000, 'Die Nachricht ist zu lang.'),
    /** Honeypot: stays empty for humans. */
    website: z.string().max(0),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = Exclude<keyof ContactInput, 'slug' | 'website'>;

export type ContactState =
    | { status: 'idle' }
    | { status: 'success' }
    | {
          status: 'error';
          message?: string;
          fieldErrors?: Partial<Record<ContactField, string>>;
      };
