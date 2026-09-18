import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { site } from '@/lib/site';
import './globals.css';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: {
        default: site.name,
        template: `%s · ${site.name}`,
    },
    description: site.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="de" className={`${inter.variable} h-full`}>
            <body className="flex min-h-full flex-col">
                <SiteHeader />
                <main className="flex flex-1 flex-col">{children}</main>
                <SiteFooter />
            </body>
        </html>
    );
}
