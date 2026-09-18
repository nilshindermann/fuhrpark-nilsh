type Props = {
    id?: string;
    title: string;
    description?: string;
};

export function SectionHeading({ id, title, description }: Props) {
    return (
        <div className="flex max-w-[640px] flex-col gap-2">
            <h2 id={id} className="text-heading-xl">
                {title}
            </h2>
            {description && (
                <p className="text-body text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
