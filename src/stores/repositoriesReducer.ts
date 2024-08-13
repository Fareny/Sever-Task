import { createSlice } from '@reduxjs/toolkit';
import { RepositoriesState } from './types';

// Начальное состояние для хранилища репозиториев
const initialState: RepositoriesState = {
    repositories: []  // Список репозиториев изначально пуст
};

// Создание слайса для репозиториев
const repositoriesReducer = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        // Редуктор для добавления репозиториев в состояние
        addRepository(state, action) {
            state.repositories = action.payload.repositories;
        }
    }
});

export const { addRepository } = repositoriesReducer.actions;
export default repositoriesReducer.reducer;
