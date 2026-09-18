import { Fragment } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export type SpecItem = {
    label: string;
    value?: React.ReactNode;
};

/** Specs as a label/value list. Rows without a value are omitted. */
export function SpecList({ items }: { items: SpecItem[] }) {
    const rows = items.filter(
        (item) =>
            item.value !== undefined &&
            item.value !== null &&
            item.value !== '',
    );

    if (rows.length === 0) {
        return null;
    }

    return (
        <Card className="gap-0 p-4">
            <dl className="flex flex-col">
                {rows.map((row, i) => (
                    <Fragment key={row.label}>
                        {i > 0 && <Separator />}
                        <div className="flex justify-between gap-4 py-2.5">
                            <dt className="text-body-sm text-muted-foreground">
                                {row.label}
                            </dt>
                            <dd className="text-body text-right">
                                {row.value}
                            </dd>
                        </div>
                    </Fragment>
                ))}
            </dl>
        </Card>
    );
}
