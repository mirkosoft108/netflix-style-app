<template>
  <q-page class="movies-layout">
    
    <Header />
    
    <div class="search-section">
      <div class="title">Verifarma Play</div>
      
      <div class="separator">|</div>
      
      <q-input
        outlined
        dense
        placeholder="¿Qué querés ver hoy?"
        class="search-input"
        v-model="searchQuery"
        icon="search"
      />
    </div>

    <div v-for="(category, index) in categories" :key="index" >
      <div class="category-name">{{ category.name }}</div>
      <MovieCarousel :movies="category.movies" />
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import Header from '~/components/Header.vue';
import MovieCarousel from '~/components/MovieCarousel.vue';

const searchQuery = ref('');
const imageBaseUrl =
'https://m.media-amazon.com/images/M/MV5BNDU3ZjA1YzktNDUxNy00MDVmLTlhMGQtYjljNjcwMTcwNzZiXkEyXkFqcGc@._V1_SX300.jpg?text=';

const categories = ref([
  { name: 'Comedia', movies: generateMovies('Comedia') },
  { name: 'Romance', movies: generateMovies('Romance') },
  { name: 'Drama', movies: generateMovies('Drama') },
  { name: 'Suspenso', movies: generateMovies('Suspenso') },
  { name: 'Terror', movies: generateMovies('Terror') },
]);

function generateMovies(category) 
{
  return Array.from({ length: 10 }, (_, i) => ({
      poster: `${imageBaseUrl}${category}+${i + 1}`
  }));
}
</script>

<style scoped>
.movies-layout {
  padding: 12px;
  background: url('https://images.unsplash.com/photo-1715582080592-7758cbf2fa83?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center;
  background-size: cover;
}

.search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 2rem;
  color: white;
}

.category-name {
  margin-left: 0.2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.separator {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.search-input {
  max-width: 500px;
  width: 100%;
  color: black;
  background-color: white;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .search-section {
    flex-direction: column;
    text-align: center;
  }

  .separator {
    display: none; 
  }
}
</style>
  