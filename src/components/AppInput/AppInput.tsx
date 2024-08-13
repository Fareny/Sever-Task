import styles from './AppInput.module.scss';
import { FC } from 'react';
import { AppInputProps } from './types';
import { Input } from '@mui/material';

// Экспортируем функциональный компонент AppInput
export const AppInput: FC<AppInputProps> = ({
    className = '',
    placeholder,        // Текст-подсказка для поля ввода
    value,              // Значение поля ввода
    onChange,           // Обработчик изменения значения поля ввода
    onKeyDown,          // Обработчик события нажатия клавиши
    type = 'text',      // Тип поля ввода (по умолчанию 'text')
    disabled = false,   // Признак отключенного состояния поля ввода
}) => {
    return (
        <Input
            className={`${styles['app-input']} ${className}`}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disableUnderline={true}  // Отключение подчеркивания под полем ввода
            type={type}
            disabled={disabled}
        />
    );
};
