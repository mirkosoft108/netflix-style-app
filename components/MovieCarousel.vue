<template>
    <div class="custom-carousel">
      <div class="carousel-header">
        <q-btn flat round icon="chevron_left" @click="onLeftClick" />
        <q-btn flat round icon="chevron_right" @click="onRightClick" />
      </div>
  
      <div class="carousel-content">
        <MovieCard
          v-for="(movie, index) in visibleMovies"
          :key="index"
          :poster="movie.poster"
          :title="movie.title"
        />
      </div>
    </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
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
    console.log('Se apretó flecha izquierda');
    if (currentIndex.value > 0) {
      currentIndex.value -= itemsPerPage;
    }
  };
  
  const onRightClick = () => {
    console.log('Se apretó flecha derecha');
    if (currentIndex.value + itemsPerPage < props.movies.length) {
      currentIndex.value += itemsPerPage;
    }
  };
  
  watch(
    () => props.movies,
    (newMovies) => {
      console.log('Películas actualizadas:', newMovies);
      currentIndex.value = 0; 
    },
  );
</script>

<style scoped>
  .custom-carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .carousel-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 800px;
  }
  
  .carousel-content {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
</style>
  