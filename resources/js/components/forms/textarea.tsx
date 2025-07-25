import { ComponentProps } from 'react';
import { Label } from '../ui/label';
import { Textarea as BaseTextarea } from '../ui/textarea';

interface TextareaProps
    extends Pick<ComponentProps<'textarea'>, 'required' | 'tabIndex' | 'name' | 'value' | 'placeholder' | 'onChange' | 'disabled'> {
    label: string;
}

export function Textarea({ ...props }: Omit<TextareaProps, 'label'>) {
    return <BaseTextarea {...props} />;
}

export function TextareaWithLabel({ label, name, ...props }: TextareaProps) {
    return (
        <div className="max grid h-fit items-center gap-3">
            <Label htmlFor={name} className="text-sm font-medium">
                {label}
            </Label>
            <BaseTextarea id={name} name={name} {...props} />
        </div>
    );
}
