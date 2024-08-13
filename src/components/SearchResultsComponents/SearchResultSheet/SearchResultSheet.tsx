import styles from './SearchResultSheet.module.scss';
import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FC } from 'react';
import { Order, RepositoryNode, SearchResultSheetProps } from '../types';

// Экспортируем функциональный компонент SearchResultSheet
export const SearchResultSheet: FC<SearchResultSheetProps> = ({
    repositories,              // Список репозиториев для отображения
    selectRepositoryUrl,       // Выбранный репозиторий
    setSelectRepositoryUrl     // Функция для установки выбранного репозитория
}) => {
    const [order, setOrder] = useState<Order>('asc');  // Состояние для направления сортировки
    const [orderBy, setOrderBy] = useState<keyof RepositoryNode>('stargazerCount');  // Состояние для сортируемого столбца

    // Обработка запроса на сортировку
    const handleRequestSort = (property: keyof RepositoryNode) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Сортировка репозиториев в зависимости от выбранного столбца и направления
    const sortedRepositories = [...repositories].sort((a, b) => {
        const aValue = a.node[orderBy];
        const bValue = b.node[orderBy];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
    });

    // Обработка выбора репозитория
    const handleSelect = (url: RepositoryNode['url']) => {
        setSelectRepositoryUrl(url);
    };

    const isOrderByColumn = (column: string) => {
        return orderBy === column;
    };

    return (
        <TableContainer
            className={styles['search-result-sheet']}
            component={Paper}>
            <Table
                className={styles['search-result-sheet__table']}
                aria-label="repositories table">
                <TableHead className={styles['search-result-sheet__head']}>
                    <TableRow>
                        <TableCell className={styles['search-result-sheet__cell']}>
                            Название
                        </TableCell>
                        <TableCell className={styles['search-result-sheet__cell']}>
                            Язык
                        </TableCell>
                        <TableCell className={styles['search-result-sheet__cell']}>
                            <TableSortLabel
                                className={styles['search-result-sheet__sort-label']}
                                active={isOrderByColumn('forkCount')}
                                direction={isOrderByColumn('forkCount') ? order : 'asc'}
                                onClick={() => handleRequestSort('forkCount')}
                            >
                                Число форков
                            </TableSortLabel>
                        </TableCell>
                        <TableCell className={styles['search-result-sheet__cell']}>
                            <TableSortLabel
                                className={styles['search-result-sheet__sort-label']}
                                active={isOrderByColumn('stargazerCount')}
                                direction={isOrderByColumn('stargazerCount') ? order : 'asc'}
                                onClick={() => handleRequestSort('stargazerCount')}
                            >
                                Число звезд
                            </TableSortLabel>
                        </TableCell>
                        <TableCell className={styles['search-result-sheet__cell']}>
                            <TableSortLabel
                                className={styles['search-result-sheet__sort-label']}
                                active={isOrderByColumn('updatedAt')}
                                direction={isOrderByColumn('updatedAt') ? order : 'asc'}
                                onClick={() => handleRequestSort('updatedAt')}
                            >
                                Дата обновления
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRepositories.map(({ node: { name, primaryLanguage, forkCount, stargazerCount, updatedAt, url } }: { node: RepositoryNode }) => (
                        <TableRow
                            key={url}
                            className={`${styles['search-result-sheet__row']} ${url === selectRepositoryUrl ? styles['search-result-sheet__row--active'] : ''}`}
                            onClick={() => handleSelect(url)}>
                            <TableCell
                                className={styles['search-result-sheet__cell']}
                                component="th"
                                scope="row">
                                <a
                                    className={styles['search-result-sheet__link']}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {name}
                                </a>
                            </TableCell>
                            <TableCell className={styles['search-result-sheet__cell']}>{primaryLanguage?.name || 'N/A'}</TableCell>
                            <TableCell className={styles['search-result-sheet__cell']}>{forkCount}</TableCell>
                            <TableCell className={styles['search-result-sheet__cell']}>{stargazerCount}</TableCell>
                            <TableCell className={styles['search-result-sheet__cell']}>{new Date(updatedAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
