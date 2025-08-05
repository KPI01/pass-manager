import { EyeClosedIcon, EyeIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { Button } from '../ui/button';
import { Input as BaseInput } from '../ui/input';
import { Label } from '../ui/label';

interface InputProps
    extends Pick<
        ComponentProps<'input'>,
        'id' | 'className' | 'required' | 'tabIndex' | 'type' | 'name' | 'value' | 'placeholder' | 'onChange' | 'disabled'
    > {
    label: string;
    error?: string;
}

export function Input({ ...props }: Omit<InputProps, 'label'>) {
    if (props.error) {
        return (
            <div className="grid h-fit gap-y-2">
                <BaseInput {...props} />
                <div className="ps-2 text-xs text-destructive">{props.error}</div>
            </div>
        );
    }

    return <BaseInput {...props} />;
}
export function InputWithLabel({ label, name, error, ...props }: InputProps) {
    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name} className={error && 'text-destructive'}>
                {label}
            </Label>
            <Input id={name} name={name} error={error} {...props} />
        </div>
    );
}

export function InputToggleVisibility({ label, name, type = 'text', error, ...props }: InputProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name}>{label}</Label>
            <div className="flex items-center gap-2">
                <Input id={name} name={name} {...props} type={visible ? type : 'password'} />
                <Button variant="outline" size="sm" type="button" onClick={() => setVisible(!visible)}>
                    {visible ? <EyeIcon /> : <EyeClosedIcon />}
                </Button>
            </div>
        </div>
    );
}
