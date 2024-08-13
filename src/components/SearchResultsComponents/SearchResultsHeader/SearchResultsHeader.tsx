import styles from './SearchResultsHeader.module.scss';
import { FC, useEffect, useState } from 'react';
import { AppInput } from '@/components/AppInput/AppInput';
import { AppButton } from '@/components/AppButton/AppButton';
import { SearchResultsHeaderProps } from '../types';

// Экспортируем функциональный компонент SearchResultsHeader
export const SearchResultsHeader: FC<SearchResultsHeaderProps> = ({
    searchValue,   // Текущее значение поискового запроса
    setSearchValue, // Функция для обновления значения поискового запроса
    isLoading,  // Признак, отображающий состояние загрузки
    handleSearch // Функция, вызываемая для выполнения поиска
}) => {

    const [buttonText, setButtonText] = useState('Искать');

    // Обработчик изменения значения в поле ввода
    useEffect(() => {
        setButtonText(isLoading ? 'Поиск...' : 'Искать');
    }, [isLoading]);

    // Обрабатываем изменение значения в поле ввода
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkValue();
    }

    // Проверяем, введено ли значение, и вызываем поиск
    const checkValue = () => {
        if (searchValue.trim() === '') {
            return alert('Пожалуйста, введите поисковый запрос!'); // В дизайне про пустой инпут ничего нет, поэтому выводим алерт
        };

        handleSearch();
    }

    return (
        <div className={styles['search-results-header']}>
            <form
                onSubmit={handleSubmit}
                className={styles['search-results-header__form']}
            >

                <div className={styles['search-results-header__input-wrapper']}>
                    <AppInput
                        value={searchValue}
                        onChange={handleInputChange}
                        type='search'
                        placeholder="Введите поисковый запрос"
                    />
                </div>

                <AppButton
                    type="submit"
                    disabled={isLoading}
                >
                    {buttonText}
                </AppButton>

            </form>
        </div>
    );
};
