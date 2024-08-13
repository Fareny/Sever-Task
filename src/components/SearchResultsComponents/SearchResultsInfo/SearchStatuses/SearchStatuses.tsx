import styles from './SearchStatuses.module.scss';
import { FC } from 'react';
import { AppLoader } from '@/components/AppLoader/AppLoader';

// Экспортируем компонент для отображения приветственного сообщения при первоначальном рендере
export const InitialRenderMessage: FC = () => (
    <main className={styles['initial-render-message']}>
        <p className={styles['initial-render-message__title']}>Добро пожаловать</p>
    </main>
);

// Экспортируем компонент для отображения индикатора загрузки
export const LoadingSpinner: FC = () => (
    <main className={styles['loading-spinner']}>
        <AppLoader size={'64px'} />
    </main>
);

// Экспортируем компонент для отображения сообщения об отсутствии результатов
export const NoResultsMessage: FC = () => (
    <main className={styles['no-results-message']}>
        <p className={styles['no-results-message__title']}>Не найдено</p>
    </main>
);
