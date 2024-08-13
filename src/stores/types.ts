export interface RepositoriesState {  //Интерфейс для хранилища репозиториев
    repositories: RepositoryEdge[]
}

export interface RepositoryEdge {  //Интерфейс для репозитория
    node: RepositoryNode
}

export interface RepositoryNode {  //Интерфейс для репозитория
    description: string
    forkCount: number
    languages: Languages
    licenseInfo: LicenseInfo
    name: string
    owner: Owner
    primaryLanguage: PrimaryLanguage
    stargazerCount: number
    updatedAt: string
    url: string
}

export interface Owner {  //Интерфейс для владельца репозитория
    login: string
}

export interface PrimaryLanguage {  //Интерфейс для первого языка репозитория
    name: string
}

export interface Languages {  //Интерфейс для остальных языков репозитория
    edges: LanguagesEdge[]
}

export interface LanguagesEdge {  //Интерфейс для остальных языков репозитория
    node: LanguagesNode
}

export interface LanguagesNode {  //Интерфейс для языка
    name: string
}

export interface LicenseInfo {  //Интерфейс для лицензии
    name: string
}