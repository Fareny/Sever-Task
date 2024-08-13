import styles from './AppLoader.module.scss'
import { FC } from 'react'
import { FiLoader } from "react-icons/fi"
import { AppLoaderProps } from './types'

// Экспортируем функциональный компонент AppLoader
export const AppLoader: FC<AppLoaderProps> = ({
    size = '24px' // Размер иконки
}) => {
    return (
        <FiLoader
            className={styles['app-loader']}
            style={{
                width: size,
                height: size
            }} />
    )
}