import styles from './AppButton.module.scss';
import { FC } from 'react';
import { AppButtonProps } from './types';
import { Button } from '@mui/material';

// Экспортируем функциональный компонент AppButton
export const AppButton: FC<AppButtonProps> = ({
    onClick, // Функция-обработчик события клика
    children, // Дочерние элементы, которые будут отображаться внутри кнопки
    disabled = false, // Признак, отключена ли кнопка (по умолчанию false)
    color = 'primary', // Цвет кнопки (по умолчанию 'primary')
    variant = 'contained', // Вариант кнопки (по умолчанию 'contained')
    type = 'button' // Тип кнопки (по умолчанию 'button')
}) => {
    return (
        <Button
            className={styles['app-button']}
            variant={variant}
            color={color}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </Button>
    );
};
