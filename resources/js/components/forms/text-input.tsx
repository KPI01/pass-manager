import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { Button } from '../ui/button';
import { Input as BaseInput } from '../ui/input';
import { Label } from '../ui/label';

interface InputProps
    extends Pick<
        ComponentProps<'input'>,
        'className' | 'required' | 'tabIndex' | 'type' | 'name' | 'value' | 'placeholder' | 'onChange' | 'disabled'
    > {
    label: string;
    error?: string;
}

export function Input({ ...props }: Omit<InputProps, 'label'>) {
    return <BaseInput {...props} />;
}
export function InputWithLabel({ label, name, ...props }: InputProps) {
    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <BaseInput id={name} name={name} {...props} />
        </div>
    );
}

export function InputToggleVisibility({ label, name, type = 'text', ...props }: InputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <div className="flex items-center gap-2">
                <BaseInput id={name} name={name} {...props} type={visible ? type : 'password'} />
                <Button variant="outline" size="sm" type="button" onClick={() => setVisible(!visible)}>
                    {visible ? <EyeIcon /> : <EyeClosedIcon />}
                </Button>
            </div>
        </div>
    );
}
