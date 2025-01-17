<template>

  <q-page class="movies-layout">
    
    <Header />
    
    <div class="search-section" role="search">
      <div class="title">Verifarma Play</div>
      
      <div class="separator">|</div>

      <!-- Accesibilidad: se añade el atributo aria-label para indicar que es un campo de búsqueda -->
      <q-input
        outlined
        dense
        tabindex="0"
        placeholder="¿Qué querés ver hoy?"
        aria-label="Buscar películas o series"
        role="searchbox"
        class="search-input"
        v-model="searchQuery"
        icon="search"
      />

      <div class="view-options">
        <q-btn
          flat
          push
          :label="'Películas'"
          :color="moviesStore.type === 'movie' ? 'white' : 'secondary'"
          @click="updateType('movie')"
        />
        <q-btn
          flat
          push
          :label="'Series'"
          :color="moviesStore.type === 'series' ? 'white' : 'secondary'"
          @click="updateType('series')"
        />
      </div>
    </div>

    <!-- Accesibilidad: se añade el atributo aria-label para indicar que es un contenedor de películas
         y aria label para carrusel -->
    <div
      v-for="(category, index) in categories"
      :key="index"
      :aria-label="'Películas de ' + category.name"
      class = "category-container"
    >
      <div class="category-header">
        <div class="category-name">{{ category.name }}</div>
        <div class="navigation-buttons">
          <q-btn
            flat
            round
            dense
            icon="arrow_back"
            :disable="category.page === 1"
            aria-label="'Ir a la página anterior de ' + category.name"
            @click="prevPageCategory(index)"
            class="nav-btn"
          />
          <q-btn
            flat
            round
            dense
            icon="arrow_forward"
            aria-label="'Ir a la página siguiente de ' + category.name"
            @click="nextPageCategory(index)"
            :disable="!hasNextPage(category)"
            class="nav-btn"
          />
        </div>
      </div>
    <MovieCarousel 
      :movies="category.movies[category.page]" 
      :aria-label="'Carrusel de películas de ' + category.name" 
      v-if="!moviesStore.isLoading"
    />
    <div v-else>
      <q-skeleton
        class="movie-skeleton"
        :count="5"
        :height="'300'"
      />

    </div>
  </div>
  </q-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useMoviesStore } from '../../stores/OMDbStore.js';

const moviesStore = useMoviesStore();

const categories = computed(() => moviesStore.categories);

const searchQuery = computed({
  get: () => moviesStore.userSearch.query,
  set: (value) => (moviesStore.userSearch.query = value),
});

const prevPageCategory = (index) => {
  const category = categories.value[index];
  if (category.page > 1) {
    moviesStore.prevPageCategory(category.name);
  }
};

const nextPageCategory = (index) => {
  moviesStore.nextPageCategory(categories.value[index].name);
};

const hasNextPage = (category) => {
  const moviesOnCurrentPage = category.movies[category.page] || [];
  return moviesOnCurrentPage.length === 10;
};

const updateType = (type) => {
  moviesStore.type = type;
  moviesStore.cleanCategories()
  loadMovies();
};

const loadMovies = async () => {  
  await categories.value.forEach((category) => {
    moviesStore.fetchCategoryMovies(category.name, moviesStore.type);
  });

};

onMounted(() => {
  loadMovies();
});
</script>

<style scoped>
.movies-layout {
  padding: 12px;
  background: url('https://images.unsplash.com/photo-1715582080592-7758cbf2fa83?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center;
  background-size: cover;
}

.category-container {
  margin-bottom: 2rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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
  color: #f0f0f0;
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

.navigation-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-btn {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); 
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.nav-btn:hover {
  transform: scale(1.1); 
  background-color: rgba(255, 255, 255, 1); 
}

.nav-btn:disabled {
  opacity: 0.5; 
  pointer-events: none; 
}

@media (max-width: 768px) {
  .search-section {
    flex-direction: column;
    text-align: center;
  }

  .separator {
    display: none; 
  }

  .navigation-buttons {
    justify-content: center;
    margin-top: 8px; 
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }
}

</style>
