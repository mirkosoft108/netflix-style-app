<template>
    <q-card class="movie-card">
      <q-img :src="poster" class="movie-poster" :ratio="3/4" />
      <q-card-section class="movie-info">
        <div class="movie-title">{{ title }}</div>
      </q-card-section>
    </q-card>
</template>

<script setup>
  defineProps({
    poster: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .movie-card {
    width: 10%;
    background-color: black;
    color: #231F20;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .movie-poster {
    object-fit: cover;
    border-bottom: 2px solid #945EFC;
  }
  
  .movie-info {
    padding: 8px;
    text-align: center;
  }
  
  .movie-title {
    font-size: 0.9rem;
    font-weight: bold;
    color: #945EFC;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  @media (max-width: 768px) {
    .movie-card {
      width: 30%; 
    }
  }
</style>
  