<template>
  <!-- Accesibilidad: role banner para identificar la cabecera de la página
   -->
  <div class="header" role="banner">

    <a href="/" aria-label="Ir a la página principal">
      <img 
        class="logo" 
        src="https://www.verifarma.com/wp-content/uploads/2020/09/icon-verifarma-1.svg" 
        alt="Logo de Verifarma Play" 
      />
    </a>

    <!-- Accesibilidad: el saludo más accesible
    -->
    <span 
      v-if="isLoggedIn" 
      class="username" 
      role="status" 
      aria-live="polite">
      ¡Hola, {{ username }}!
    </span>

    <!-- Accesibilidad: el botón más accesible
    -->
    <q-btn 
      v-if="!isLoggedIn" 
      label="Ingresa o Crea tu Cuenta" 
      flat 
      class="header-btn" 
      aria-label="Abrir formulario para ingresar o crear una cuenta" 
      @click="goToLogin"
    />
    <q-btn 
      v-else 
      label="Cerrar Sesión" 
      flat 
      class="header-btn logout-btn" 
      aria-label="Cerrar sesión y volver a la página de inicio" 
      @click="logout"
    />
    
  </div>
</template>

<script setup>
import { useUsersStore } from '../stores/usersStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const userStore = useUsersStore();
const router = useRouter();

const isLoggedIn = computed(() => userStore.isAuthenticated);
const username = computed(() => userStore.currentUser?.name || '');

const goToLogin = () => {
  router.push('/');
};

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>
  
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.logo {
  height: 42px;
  background-color: white;
  border-radius: 4px;
  padding: 4px;
}

.username {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.header-btn {
  color: white;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
  