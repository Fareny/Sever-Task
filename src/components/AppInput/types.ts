export interface AppInputProps { //Пропсы компонента AppInput
    className?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
}