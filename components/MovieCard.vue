<template>
  <q-card class="movie-card">
    <q-img 
      :src="poster === 'N/A' ? fallbackPoster : poster" 
      class="movie-poster"
    />
  </q-card>
</template>

<script setup>
import fallbackPoster from '../assets/notfound.jpg';

defineProps({
  poster: {
    type: String,
    required: true,
  }
});
</script>

<style scoped>
.movie-card {
  background-color: black;
  color: #231F20;
  border-radius: 8px;
}
</style>
