import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './repositoriesReducer';

// Конфигурация хранилища Redux
export const store = configureStore({
    reducer: {
        repositories: repositoriesReducer  // Редуктор для обработки состояния репозиториев
    },
});

export type AppStore = typeof store; // Тип для хранилища приложения

export type RootState = ReturnType<AppStore['getState']>; // Тип для корневого состояния хранилища
export type AppDispatch = AppStore['dispatch']; // Тип для диспетчера хранилища
