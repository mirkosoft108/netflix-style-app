export const useMoviesApi = () => {
  const apikey = '60cd64c1';
  const baseURL = 'https://www.omdbapi.com/';

  const listMovies = async (
    searchQuery: string,
    type: 'movie' | 'series' | 'episode',
    page: number = 1
  ): Promise<any> => {
    try {
      const response = await $fetch('/', {
        baseURL: baseURL,
        params: {
          apikey,
          s: searchQuery,
          type,
          page,
        },
      });

      if (!response || response.Response === 'False') {
        throw new Error(response.Error || 'No se encontraron resultados');
      }

      return response;
    } catch (error: any) {
      console.error('Error al listar películas:', error.message);
      throw error;
    }
  };

  const getMovieDetails = async (imdbID: string): Promise<any> => {
    try {
      const response = await $fetch('/', {
        baseURL: baseURL,
        params: {
          apikey,
          i: imdbID,
        },
      });

      if (!response || response.Response === 'False') {
        throw new Error(response.Error || 'No se encontraron resultados');
      }

      return response;
    } catch (error: any) {
      console.error('Error al obtener detalles de la película:', error.message);
      throw error;
    }
  };

  return {
    listMovies,
    getMovieDetails,
  };
};
