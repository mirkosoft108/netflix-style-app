<template>
    <q-page class="login-layout">
      <div class="login-content">
        <img class="login-logo" src="https://www.verifarma.com/wp-content/uploads/2020/09/icon-verifarma-1.svg" alt="Verifarma Logo" />
        <h1 class="login-title">Bienvenido a Verifarma Play</h1>
        <q-input v-model="email" label="Correo Electrónico" outlined dense class="login-input" />
        <q-input v-model="password" label="Contraseña" type="password" outlined dense class="login-input" />
        <q-btn label="Iniciar Sesión" color="dark" unelevated class="login-button" @click="login" />
      </div>
    </q-page>
</template>
  
<script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const login = () => {
    if (!email.value || !password.value) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    alert(`¡Bienvenido, ${email.value}!`);
  };
</script>
  
<style scoped>
  .login-layout {
    background: url('https://images.unsplash.com/photo-1677344297888-81f04aa12a60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: white;
    text-align: center;
  }
  
  .login-content {
    max-width: 400px;
    width: 90%;
    background: rgba(147, 139, 147, 0.8);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }
  
  .login-logo {
    max-width: 220px;
    margin: 0 auto 0.5rem auto;
  }
  
  .login-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: black;
  }
  
  .login-input {
    margin-bottom: 1rem;
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
  }
  
  .login-button {
    width: 100%;
    font-size: 1rem;
    font-weight: bold;
  }
</style>
  