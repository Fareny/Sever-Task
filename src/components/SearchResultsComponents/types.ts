export interface SearchResultSheetProps {  //Пропсы компонента SearchResultSheet
    repositories: RepositoryEdges[]
    selectRepositoryUrl: string | null
    setSelectRepositoryUrl: (node: string) => void
}

export interface SearchResultsElementProps {  //Пропсы компонента SearchResultsElement
    selectRepositoryUrl: string | null
}

export interface SearchResultsHeaderProps {
    searchValue: string
    setSearchValue: (value: string) => void
    handleSearch: () => void
    isLoading: boolean
}

export interface SearchResultsInfoProps {  //Пропсы компонента SearchResultsInfo
    page: number
    setPage: (value: number) => void
    rowsPerPage: number
    setRowsPerPage: (value: number) => void
    totalRepositories: number
    isLoading: boolean
    isInitialRender: boolean
}

export interface RepositoryEdges {  //Интерфейс для репозитория
    node: RepositoryNode
}

export interface RepositoryNode {  //Интерфейс для репозитория
    description: string
    forkCount: number
    languages: Languages
    licenseInfo: BaseField
    name: string
    owner: Owner
    primaryLanguage: BaseField
    stargazerCount: number
    updatedAt: string
    url: string
}

export interface Owner {  //Интерфейс для владельца репозитория
    login: string
}

export interface BaseField {  //Интерфейс для первого языка репозитория
    name: string
}

export interface Languages {  //Интерфейс для остальных языков репозитория
    edges: LanguagesEdge[]
}

export interface LanguagesEdge {  //Интерфейс для языка
    node: BaseField
}

export type Order = 'asc' | 'desc';  // Тип для направления сортировки