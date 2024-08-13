import styles from './AppHeader.module.scss';
import { FC } from 'react';
import { AppHeaderProps } from './types';

// Экспортируем функциональный компонент AppHeader
export const AppHeader: FC<AppHeaderProps> = ({
    children, // Дочерние элементы, которые будут отображаться внутри компонента AppHeader
    className = '' // Имя CSS-класса, которое будет применено к компоненту AppHeader
}) => {
    return (
        <header className={`${styles['app-header']} ${className}`}>
            {children}
        </header>
    );
};

export default AppHeader;
