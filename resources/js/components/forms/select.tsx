import { ComponentProps } from 'react';
import { Label } from '../ui/label';
import { Select as BaseSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SelectProps extends ComponentProps<typeof BaseSelect> {
    options: Record<string, string>;
    tabIndex?: number;
}

function Select({ options, tabIndex, ...props }: SelectProps) {
    const values = Object.keys(options);

    return (
        <BaseSelect {...props}>
            <SelectTrigger tabIndex={tabIndex}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {values.map((val, ix) => {
                    console.debug(ix, val, options[val]);
                    return (
                        <SelectItem key={ix} value={val}>
                            {options[val]}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </BaseSelect>
    );
}
export function SelectWithLabel({ name, label, ...props }: SelectProps & { label: string }) {
    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <Select name={name} {...props} />
        </div>
    );
}
