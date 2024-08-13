import axios from 'axios';

// Заголовки для запроса, включающие авторизацию и тип контента
const headers = {
  'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Токен авторизации для доступа к API GitHub
  'Content-Type': 'application/json', // Тип содержимого запроса
};

// Функция для получения репозиториев с использованием GraphQL
export const getRepositories = async (search: string, rowsPerPage: number, cursor?: string) => {
  // GraphQL запрос для поиска репозиториев
  const query = `
      query($search: String!, $rowsPerPage: Int!, $after: String) {
        search(query: $search, type: REPOSITORY, first: $rowsPerPage, after: $after) {
          repositoryCount
          edges {
            cursor
            node {
              ... on Repository {
                name
                owner {
                  login
                }
                stargazerCount
                forkCount
                updatedAt
                primaryLanguage {
                  name
                }
                languages(first: 20) {
                  edges {
                    node {
                      name
                    }
                  }
                }
                licenseInfo {
                  name
                }
                description
                url
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `;

  // Выполнение POST запроса к API GitHub
  return axios.post(
    'https://api.github.com/graphql',
    {
      query,
      variables: {
        search,
        rowsPerPage,
        after: cursor,
      },
    },
    { headers }
  ).then((response) => response.data);
};
