import { ComponentProps } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface InputWithLabelProps extends Pick<ComponentProps<'input'>, 'type' | 'name' | 'value' | 'placeholder' | 'onChange'> {
    label: string;
}

export function InputWithLabel({ name, label, placeholder, value, onChange }: InputWithLabelProps) {
    return (
        <div className="grid h-fit max items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <Input type={name} id={name} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}
