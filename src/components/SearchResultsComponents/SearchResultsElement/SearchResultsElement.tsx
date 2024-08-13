import styles from './SearchResultsElement.module.scss';
import { FC } from 'react';
import { LanguagesEdge, RepositoryNode, SearchResultsElementProps } from '../types';
import { MdOutlineStar } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

// Экспортируем функциональный компонент SearchResultsElement
export const SearchResultsElement: FC<SearchResultsElementProps> = ({
    selectRepositoryUrl // Объект репозитория, который был выбран
}) => {

    const { repositories } = useSelector((state: RootState) => state.repositories);

    const {
        name = '',
        primaryLanguage = null,
        stargazerCount = 0,
        languages = { edges: [] },
        licenseInfo = null
    } = repositories.find(({ node }: { node: RepositoryNode }) => node.url === selectRepositoryUrl)?.node || {};

    if (!selectRepositoryUrl) {
        return (
            <aside className={styles['search-results-element']}>
                <p className={styles['search-results-element__no-data']}>Выберите репозиторий</p>
            </aside>
        );
    }

    return (
        <aside className={styles['search-results-element']}>
            <article className={styles['search-results-element__content']}>
                <header className={styles['search-results-element__header']}>
                    <h2 className={styles['search-results-element__title']}>{name}</h2>
                </header>

                <section className={`${styles['search-results-element__container']} ${styles['primary-language']}`}>
                    <div className={styles['primary-language-container']}>
                        <p className={styles['primary-language']}>{primaryLanguage?.name || 'N/A'}</p>

                        <div className={styles['primary-element__stargazer']}>
                            <div className={styles['primary-element__icon-wrapper']}>
                                <MdOutlineStar className={styles['primary-element__icon']} />
                            </div>
                            <p>{stargazerCount.toLocaleString()}</p>
                        </div>
                    </div>

                    {languages.edges.length > 0 ? (
                        <ul className={styles['search-results-element__languages']}>
                            {languages.edges.map((language: LanguagesEdge) => (
                                <li className={styles['search-results-element__language']} key={language?.node?.name}>{language?.node?.name}</li>
                            ))}
                        </ul>
                    ) : (<span className={styles['search-results-element__language']}>N/A</span>)}

                </section>

                <footer>
                    <p className={styles['search-results-element__license-info']}>{licenseInfo?.name || 'No license specified'}</p>
                </footer>
            </article>
        </aside>
    );
};
