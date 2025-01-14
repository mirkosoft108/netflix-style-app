<template>
    <q-page class="movies-layout">
      <Header />
      <div class="search-section">
        <h1 class="title">Verifarma Play</h1>
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
  
      <div class="categories">
        <div v-for="(category, index) in categories" :key="index" class="category-section">
          <h2 class="category-title">{{ category.name }}</h2>
          <MovieCarousel :movies="category.movies" />
       
        </div>
      </div>
    </q-page>
</template>

<script setup>
    import { ref } from 'vue';
    import Header from '~/components/Header.vue';
    import MovieCarousel from '~/components/MovieCarousel.vue';

    const searchQuery = ref('');
    const imageBaseUrl =
    'https://images.unsplash.com/photo-1583719444869-7e9c79d697e2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?text=';

    const categories = ref([
    { name: 'Comedia', movies: generateMovies('Comedia') },
    { name: 'Romance', movies: generateMovies('Romance') },
    { name: 'Drama', movies: generateMovies('Drama') },
    { name: 'Suspenso', movies: generateMovies('Suspenso') },
    { name: 'Terror', movies: generateMovies('Terror') },
    ]);

    function generateMovies(category) {
    return Array.from({ length: 10 }, (_, i) => ({
        poster: `${imageBaseUrl}${category}+${i + 1}`,
        title: `${category} ${i + 1}`,
    }));
    }
</script>

<style scoped>
  .movies-layout {
    padding: 16px;
    background-color: #231F20;
    color: white;
  }
  
  .search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
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
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
  }
  
  .categories {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .category-section {
    padding: 0 16px;
  }
  
  .category-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #6A74F8;
    margin-bottom: 16px;
  }
  
  @media (max-width: 768px) {
    .search-section {
      flex-direction: column;
      text-align: center;
    }
  
    .title {
      font-size: 1.5rem;
    }
  
    .search-input {
      max-width: 90%;
    }
  
    .categories {
      gap: 16px;
    }

    .separator {
      display: none; 
    }
  }
</style>
  