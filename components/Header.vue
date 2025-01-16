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
    />
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const username = ref('Juan Pérez');
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
  