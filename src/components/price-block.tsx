import { formatChf } from '@/lib/format';

export function PriceBlock({ priceChf }: { priceChf: number }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-label text-muted-foreground">Preis</span>
            <span className="text-heading-xl">{formatChf(priceChf)}</span>
            <span className="text-body-sm text-muted-foreground">
                Verkauf von privat, Preis verhandelbar.
            </span>
        </div>
    );
}
