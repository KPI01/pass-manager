import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface InputProps extends Pick<ComponentProps<'input'>, 'required' | 'tabIndex' | 'type' | 'name' | 'value' | 'placeholder' | 'onChange'> {
    label: string;
    error?: string;
}

export function InputWithLabel({ name, label, placeholder, value, onChange, type = 'text', tabIndex, required = false }: InputProps) {
    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <Input required={required} tabIndex={tabIndex} type={type} id={name} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    );
}

export function InputToggleVisibility({ name, label, placeholder, value, onChange, type = 'text', tabIndex, required = false }: InputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <div className="flex items-center gap-2">
                <Input
                    required={required}
                    tabIndex={tabIndex}
                    type={visible ? type : 'password'}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <Button variant="outline" size="sm" type="button" onClick={() => setVisible(!visible)}>
                    {visible ? <EyeIcon /> : <EyeClosedIcon />}
                </Button>
            </div>
        </div>
    );
}
