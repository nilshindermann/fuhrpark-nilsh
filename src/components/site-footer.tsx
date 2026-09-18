import Link from 'next/link';
import { Container } from '@/components/container';
import { site } from '@/lib/site';

export function SiteFooter() {
    const location = site.place ? `${site.place}, Schweiz` : 'Schweiz';

    return (
        <footer className="bg-card border-t">
            <Container className="text-caption text-muted-foreground flex flex-col gap-3 py-6 lg:flex-row lg:items-center lg:justify-between lg:py-8">
                <span>
                    {site.name} · Privater Fahrzeugbestand · {location}
                </span>
                <nav aria-label="Fusszeile" className="flex gap-6">
                    <Link href="/#kontakt" className="hover:text-brand-text">
                        Kontakt
                    </Link>
                    <Link href="/impressum" className="hover:text-brand-text">
                        Impressum
                    </Link>
                </nav>
            </Container>
        </footer>
    );
}
