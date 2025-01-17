<template>
  <!-- Accesibilidad: se añade el atributo role="region" con un aria-label para indicar que es un carrusel de películas
   y descripción del carrusel de películas-->
  <div class="custom-carousel" role="region" aria-label="Carrusel de películas">
    <div class="carousel-content">
      <MovieCard
        v-for="(movie, index) in props.movies"
        :key="index"
        :poster="movie.Poster"
        :aria-label="`Película: ${movie.Title}`"
        @click="navigateToMovieDetail(movie.imdbID)"
      />
    </div>
  </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue';

const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const router = useRouter();

const navigateToMovieDetail = (imdbID) => {
  router.push(`/movies/${imdbID}`);
};
</script>

<style scoped>
.carousel-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.movie-card {
  padding: 4px;
  flex: 1 1 10%; 
  max-width: 10%; 
}

@media (max-width: 1200px) {
  .movie-card {
    flex: 1 1 20%; 
    max-width: 20%;
  }
}

@media (max-width: 992px) {
  .movie-card {
    flex: 1 1 33.33%;
    max-width: 33.33%;
  }
}

@media (max-width: 768px) {
  .movie-card {
    flex: 1 1 50%; 
    max-width: 50%;
  }
}

@media (max-width: 576px) {
  .movie-card {
    flex: 1 1 100%; 
    max-width: 100%;
  }
}
</style>
