import { ReactNode } from "react";

export interface AppButtonProps {  //Пропсы компонента AppButton
    children: ReactNode
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    type?: 'button' | 'submit' | 'reset';
}
