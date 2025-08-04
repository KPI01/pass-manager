import { faker } from '@faker-js/faker';
import { RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
    onValueChange: (x: string) => void;
}

function PasswordGenerator({ onValueChange }: Props) {
    const generate = () => {
        return faker.internet.password({
            length: 8,
            pattern: /[A-Za-z0-9@$!%*?&]/,
        });
    };

    const handleGeneration = () => {
        const pass = generate();

        onValueChange(pass);
    };

    return (
        <Button type="button" size="icon" onClick={() => handleGeneration()}>
            <RefreshCcw />
        </Button>
    );
}

export default PasswordGenerator;
