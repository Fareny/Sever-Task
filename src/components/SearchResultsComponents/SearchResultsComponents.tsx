import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import AppHeader from '@/components/AppHeader/AppHeader';
import { addRepository } from '@/stores/repositoriesReducer';
import { getRepositories } from '@/http/getRepositories';
import { SearchResultsHeader } from './SearchResultsHeader/SearchResultsHeader';
import { SearchResultsInfo } from './SearchResultsInfo/SearchResultsInfo';

// Экспортируем функциональный компонент SearchResultsComponents
export const SearchResultsComponents = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [cursor, setCursor] = useState<string | undefined>(undefined);
    const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
    const [totalRepositories, setTotalRepositories] = useState<number>(0);

    const dispatch = useDispatch();

    // Выполнение поиска при изменении страницы или количества строк на странице, но не при первоначальном рендере
    useEffect(() => {
        if (!isInitialRender) {
            handleSearch();
        }
    }, [page, rowsPerPage]);

    // Функция для выполнения поиска репозиториев
    const handleSearch = async () => {
        try {
            setIsLoading(true); // Устанавливаем состояние загрузки в true
            setIsInitialRender(false); // Сбрасываем состояние первоначального рендера
            const { data: { search: { edges, pageInfo, repositoryCount } } } = await getRepositories(searchValue, rowsPerPage, cursor); // Выполняем запрос к API
            // Обновляем общее количество репозиториев
            setTotalRepositories(repositoryCount);
            // Добавляем репозитории в хранилище
            dispatch(addRepository({
                repositories: edges
            }));
            // Обновляем курсор, если есть следующая страница
            if (pageInfo.hasNextPage) {
                setCursor(pageInfo.endCursor);
            }
        } catch (error) {
            throw new Error('Не удалось выполнить поиск репозиториев.');
        } finally {
            setIsLoading(false); // Устанавливаем состояние загрузки в false
        }
    };

    return (
        <>
            {/* Заголовок с поисковой строкой и кнопкой поиска */}
            <AppHeader>
                <SearchResultsHeader
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    isLoading={isLoading}
                    handleSearch={() => {
                        setPage(0);
                        setCursor(undefined);
                        handleSearch();
                    }}
                />
            </AppHeader>
            {/* Информация о результатах поиска и пагинация */}
            <main>
                <SearchResultsInfo
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    totalRepositories={totalRepositories}
                    isLoading={isLoading}
                    isInitialRender={isInitialRender}
                />
            </main>
            {/* Футер приложения */}
            <AppFooter />
        </>
    );
};
