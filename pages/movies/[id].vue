<template>
  <!--Accesibilidad: aria-labelledby para identificar el título de la película
  -->
  <q-page class="movie-details-page" role="main" aria-labelledby="movie-title">

    <Header />

    <div v-if="movie" class="movie-details">
      
      <!--Accesibilidad: aria-label para identificar el póster de la película
      -->
      <div 
        class="movie-poster" 
        :style="{ backgroundImage: movie.Poster ? `url(${movie.Poster})` : 'url(default-placeholder.jpg)' }" 
        :aria-label="`Póster de la película ${movie.Title}`" 
        role="img">
      </div>

      <div class="movie-info">
        <h1 class="movie-title" id="movie-title">{{ movie.Title }}</h1>
        <div class="movie-meta">
          <span class="movie-year">{{ movie.Year }}</span>
          <span class="movie-runtime">{{ movie.Runtime }}</span>
          <span class="movie-genre">{{ movie.Genre }}</span>
        </div>

        <p class="movie-plot">{{ movie.Plot }}</p>

        <!--Accesibilidad: role="list" para identificar la lista de calificaciones
        -->
        <div class="movie-ratings">
          <div
            v-for="(rating, index) in movie.Ratings"
            :key="index"
            class="movie-rating"
            :aria-label="`Calificación de ${rating.Source}: ${rating.Value}`"
            role="listitem"
          >
            <strong>{{ rating.Source }}:</strong> <span>{{ rating.Value }}</span>
          </div>
        </div>

        <!-- Accesibilidad: role="region" para identificar la sección de información adicional de la película
        -->
        <div class="movie-extra" role="region" aria-labelledby="extra-info-title">
          <h2 id="extra-info-title" class="visually-hidden">Información adicional de la película</h2>
          <p><strong>Director:</strong> {{ movie.Director }}</p>
          <p><strong>Actores:</strong> {{ movie.Actors }}</p>
          <p><strong>Idioma:</strong> {{ movie.Language }}</p>
          <p><strong>Estreno:</strong> {{ movie.Released }}</p>
          <p><strong>Premios:</strong> {{ movie.Awards }}</p>
        </div>

        <!--Accesibilidad: aria-label para identificar el botón de volver
        -->
        <q-btn
          flat
          dense
          icon="arrow_back"
          label="Volver"
          aria-label="Volver a la página anterior"
          class="back-btn"
          @click="goBack"
        />

      </div>
    </div>

    <div v-else-if="isLoading" class="loading">
      <q-spinner color="primary" size="50px" />
      <p>Cargando datos de la película...</p>
    </div>

    <div v-else class="loading">
    
      <p>No se encontró la película solicitada</p>
      <p>
        <q-btn
          flat
          dense
          icon="arrow_back"
          label="Volver"
          aria-label="Volver a la página anterior"
          class="back-btn"
          @click="goToMovies"
        />
      </p>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, computed } from 'vue';
import { useMoviesStore } from '../../stores/OMDbStore.js';

const router = useRouter();
const moviesStore = useMoviesStore();

const movie = computed(() => moviesStore.currentMovie);

// si está cargando, isLoading
const isLoading = computed(() => moviesStore.isLoading);

onMounted(() => {
  moviesStore.currentMovie = null;
  const movieId = router.currentRoute.value.params.id;
  moviesStore.fetchMovieDetails(movieId);
});

const goBack = () => {
  router.back();
};

const goToMovies = () => {
  router.push('/movies');
};
</script>

<style scoped>
.movie-details-page {
  color: white;
  padding: 12px;
  background: url('https://images.unsplash.com/photo-1715582080592-7758cbf2fa83?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}

.movie-details {
  display: flex;
  gap: 16px;
  margin-top: 64px;
}

.movie-poster {
  min-width: 345px;
  background-size: contain;
  background-color: #231F20;
  background-repeat: no-repeat; 
  background-position: center; 
  border-radius: 8px;
}

.movie-info {
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.movie-title {
  font-size: 2rem;
  line-height: 1;
  font-weight: bold;
  color: #945efc;
}

.movie-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.9rem;
  color: #aaa;
}

.movie-plot {
  font-size: 1rem;
  line-height: 1.5;
}

.movie-ratings {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.movie-rating {
  font-size: 0.9rem;
}

.movie-extra {
  font-size: 0.9rem;
  color: #ccc;
}

.back-btn {
  align-self: flex-start;
  background-color: #945efc;
  color: white;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  gap: 16px;
}

@media (max-width: 768px) {
  .movie-details {
    flex-direction: column;
  }

  .movie-poster {
    min-width: 300px;
    min-height: 468px;
  }

  .movie-info {
    width: 100%;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
  