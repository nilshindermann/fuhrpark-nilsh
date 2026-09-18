import { Car } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/container';
import { MobileMenu } from '@/components/mobile-menu';
import { navLinks } from '@/components/site-nav-links';
import { site } from '@/lib/site';

export function SiteHeader() {
    return (
        <header className="bg-card border-b">
            <Container className="flex h-16 items-center justify-between lg:h-20">
                <Link
                    href="/"
                    className="text-heading-md text-foreground flex items-center gap-2"
                >
                    <Car
                        className="text-brand-text size-5 lg:size-[22px]"
                        aria-hidden="true"
                    />
                    {site.name}
                </Link>
                <nav
                    aria-label="Hauptnavigation"
                    className="hidden items-center gap-6 md:flex"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-body-sm text-muted-foreground hover:text-brand-text"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <MobileMenu />
            </Container>
        </header>
    );
}
