'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { navLinks } from '@/components/site-nav-links';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

export function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon-xl"
                    className="-mr-2.5 md:hidden"
                    aria-label="Menü öffnen"
                >
                    <Menu
                        className="text-muted-foreground size-[22px]"
                        aria-hidden="true"
                    />
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle className="text-heading-md">Menü</SheetTitle>
                    <SheetDescription className="sr-only">
                        Navigation zu den Abschnitten der Seite
                    </SheetDescription>
                </SheetHeader>
                <nav
                    aria-label="Hauptnavigation"
                    className="flex flex-col px-4"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-body text-foreground hover:text-brand-text flex min-h-11 items-center"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
