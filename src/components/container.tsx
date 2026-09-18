import { cn } from '@/lib/utils';

/** Content width from the drafts: 1440px with 160px margins = 1120px. */
export function Container({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn('mx-auto w-full max-w-[1120px] px-5', className)}
            {...props}
        />
    );
}
