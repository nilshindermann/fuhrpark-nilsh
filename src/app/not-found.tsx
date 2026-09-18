import Link from 'next/link';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <Container className="flex flex-col gap-6 py-12 lg:py-24">
            <div className="flex max-w-[640px] flex-col gap-2">
                <h1 className="text-heading-xl">Seite nicht gefunden</h1>
                <p className="text-body text-muted-foreground">
                    Dieses Fahrzeug oder diese Seite gibt es nicht.
                </p>
            </div>
            <Button asChild size="xl" className="self-start">
                <Link href="/">Zurück zur Übersicht</Link>
            </Button>
        </Container>
    );
}
