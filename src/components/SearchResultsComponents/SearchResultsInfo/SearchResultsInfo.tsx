import styles from './SearchResultsInfo.module.scss';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';
import { SearchResultSheet } from '../SearchResultSheet/SearchResultSheet';
import { FC, useEffect, useState } from 'react';
import { SearchResultsElement } from '../SearchResultsElement/SearchResultsElement';
import { SearchResultsInfoProps } from '../types';
import { TablePagination } from '@mui/material';
import { InitialRenderMessage, LoadingSpinner, NoResultsMessage } from './SearchStatuses/SearchStatuses';

// Экспортируем функциональный компонент SearchResultsInfo
export const SearchResultsInfo: FC<SearchResultsInfoProps> = ({
    page,               // Текущая страница для пагинации
    setPage,            // Функция для обновления текущей страницы
    rowsPerPage,        // Количество строк на странице
    setRowsPerPage,     // Функция для обновления количества строк на странице
    totalRepositories,  // Общее количество репозиториев
    isLoading,          // Признак загрузки данных
    isInitialRender     // Признак первоначального рендера
}) => {
    // Получаем список репозиториев из состояния хранилища Redux
    const { repositories } = useSelector((state: RootState) => state.repositories);

    // Локальное состояние для хранения выбранного репозитория
    const [selectRepositoryUrl, setSelectRepositoryUrl] = useState<string | null>(null);

    // Обнуляем выбранный репозиторий при начале загрузки
    useEffect(() => {
        if (isLoading) {
            setSelectRepositoryUrl && setSelectRepositoryUrl(null);
        }
    }, [isLoading]);

    // Обработка изменения страницы
    const handleChangePage = (_: React.SyntheticEvent | null, newPage: number) => {
        setPage(newPage);
    };

    // Обработка изменения количества строк на странице
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Отображение приветственного сообщения при первом рендере
    if (isInitialRender) {
        return <InitialRenderMessage />;
    }

    // Отображение спиннера при загрузке данных
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Отображение сообщения об отсутствии результатов, если репозиториев нет
    if ((!repositories || repositories.length === 0) && !isLoading) {
        return <NoResultsMessage />;
    }

    return (
        <div className={styles['search-tesults-info']}>
            <section className={styles['search-results-info__container']}>
                <p className={styles['search-results-info__title']}>Результаты поиска</p>

                {/* Таблица с результатами поиска */}
                <SearchResultSheet
                    repositories={repositories}
                    selectRepositoryUrl={selectRepositoryUrl}
                    setSelectRepositoryUrl={setSelectRepositoryUrl}
                />

                {/* Пагинация для управления страницами результатов */}
                <TablePagination
                    className={styles['search-results-info__pagination']}
                    component="div"
                    count={totalRepositories}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                />
            </section>

            {/* Детальная информация о выбранном репозитории */}
            <SearchResultsElement selectRepositoryUrl={selectRepositoryUrl} />
        </div>
    );
};
