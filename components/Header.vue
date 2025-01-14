<template>
    <div class="header">
      <img class="logo" src="https://www.verifarma.com/wp-content/uploads/2020/09/icon-verifarma-1.svg" alt="Verifarma Logo" />
      <div class="header-actions">
        <span v-if="isLoggedIn" class="username">¡Hola, {{ username }}!</span>
        <q-btn v-if="!isLoggedIn" label="Ingresa o Crea tu Cuenta" flat class="header-btn" />
      </div>
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
    background: rgba(147, 139, 147, 0.8);
    border-radius: 4px;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .username {
    font-size: 1rem;
    font-weight: bold;
  }
  
  .header-btn {
    color: white;
  }
 
  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      text-align: center;
      gap: 12px;
    }
  
    .header-actions {
      flex-direction: column;
      gap: 8px;
    }
  
    .logo {
      height: 32px;
    }
  }
</style>
  