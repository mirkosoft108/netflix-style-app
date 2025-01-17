import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useMoviesApi } from '../apis/moviesApi.ts';

export const useMoviesStore = defineStore('movies', () => {
  const { listMovies
    , getMovieDetails
   } = useMoviesApi();

  const categories = ref([
    { name: 'Romance', movies: {}, page: 1 },
    { name: 'Drama', movies: {}, page: 1 },
    { name: 'Thriller', movies: {}, page: 1 },
    { name: 'Comedia', movies: {}, page: 1 },
    { name: 'Fantasía', movies: {}, page: 1 },
  ]);  

  const userSearch = ref({
    query: '',
    movies: [],
    page: 1,
  });

  const type = ref('movie');
  const isLoading = ref(false);

  const currentMovie = ref(null);

  const fetchCategoryMovies = async (categoryName) => {

    const category = categories.value.find((cat) => cat.name === categoryName);
    if (!category) return;

    if (!category.movies) category.movies = {};

    if (category.movies[category.page]) return;
  
    isLoading.value = true;
    try {
      const response = await listMovies(category.name, type.value, category.page);

      category.movies[category.page] = response.Search || [];
    } catch (err) {
      console.error(`Error fetching movies for category ${categoryName}:`, err);
    } finally {
      isLoading.value = false;
    }
  };  

  // clean categories
  const cleanCategories = () => {
    categories.value.forEach((category) => {
      category.movies = {};
      category.page = 1;
    });
  };

  const fetchUserSearchMovies = async () => {
    if (!userSearch.value.query.trim()) return;

    isLoading.value = true;
    try {
      const response = await listMovies(userSearch.value.query, type.value, userSearch.value.page);
      userSearch.value.movies = response.Search || [];
    } catch (err) {
      console.error('Error fetching user search results:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const nextPageCategory = (categoryName) => {
    const category = categories.value.find((cat) => cat.name === categoryName);
    if (category) {
      category.page += 1;
      fetchCategoryMovies(categoryName);
    }
  };

  const prevPageCategory = (categoryName) => {
    const category = categories.value.find((cat) => cat.name === categoryName);
    if (category && category.page > 1) {
      category.page -= 1;
      fetchCategoryMovies(categoryName);
    }
  };

  const nextPageUserSearch = () => {
    userSearch.value.page += 1;
    fetchUserSearchMovies();
  };

  const prevPageUserSearch = () => {
    if (userSearch.value.page > 1) {
      userSearch.value.page -= 1;
      fetchUserSearchMovies();
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    isLoading.value = true;
    try {
      const response = await getMovieDetails(imdbID);
      currentMovie.value = response;
    } catch (err) {
      console.error('Error fetching movie details:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    categories,
    userSearch,
    type,
    isLoading,
    currentMovie,
    cleanCategories,
    fetchCategoryMovies,
    fetchUserSearchMovies,
    nextPageCategory,
    prevPageCategory,
    nextPageUserSearch,
    prevPageUserSearch,
    fetchMovieDetails,
  };
});
