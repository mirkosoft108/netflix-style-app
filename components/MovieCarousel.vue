<template>
  <!-- Accesibilidad: se añade el atributo role="region" con un aria-label para indicar que es un carrusel de películas
   -->
  <!-- <button 
    class="carousel-button left" 
    @click="onLeftClick" 
    aria-label="Desplazarse hacia la izquierda">
    &larr;
  </button> -->

  <!-- Accesibilidad: descripción del carrusel de películas
  -->
  <div class="custom-carousel" role="region" aria-label="Carrusel de películas">
    <div class="carousel-content">
      <MovieCard
        v-for="(movie, index) in visibleMovies"
        :key="index"
        :poster="movie.poster"
        :aria-label="`Película: ${movie.title}`"
      />
    </div>
  </div>

  <!-- <button 
    class="carousel-button right" 
    @click="onRightClick" 
    aria-label="Desplazarse hacia la derecha">
    &rarr;
  </button> -->
</template>

<script setup>
import { ref, computed } from 'vue';
import MovieCard from './MovieCard.vue';

const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const currentIndex = ref(0);
const itemsPerPage = 10;

const visibleMovies = computed(() => {
  return props.movies.slice(currentIndex.value, currentIndex.value + itemsPerPage);
});

const onLeftClick = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= itemsPerPage;
  }
};

const onRightClick = () => {
  if (currentIndex.value + itemsPerPage < props.movies.length) {
    currentIndex.value += itemsPerPage;
  }
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
