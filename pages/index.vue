<template>
  <!--
    se añade el atributo aria-hidden al q-page para indicar que el contenido no es visible para los lectores de pantalla
  -->
  <q-page class="login-layout" aria-hidden="true">
    <div class="login-content">
      <img 
        class="login-logo" 
        src="https://www.verifarma.com/wp-content/uploads/2020/09/icon-verifarma-1.svg" 
        alt="Logo de Verifarma Play" 
      />
      
      <h1 class="login-title">{{ usersStore.isRegisterMode ? 'Crear Cuenta en Verifarma Play' : 'Bienvenido a Verifarma Play' }}</h1>
      
      <q-input 
        v-if="usersStore.isRegisterMode" 
        v-model="usersStore.name" 
        label="Nombre Completo" 
        aria-label="Nombre Completo" 
        outlined 
        dense 
        class="login-input" 
      />

      <!-- 
      se añade, por cuestiones de accesibilidad, el atributo aria-label al input de correo electrónico
      -->
      <q-input 
        v-model="usersStore.email" 
        label="Correo Electrónico" 
        aria-label="Correo Electrónico" 
        outlined 
        dense 
        class="login-input" 
      />
      <!--
        se añade, por cuestiones de accesibilidad, el atributo aria-label al input de contraseña
      -->
      <q-input 
        v-model="usersStore.password" 
        label="Contraseña" 
        aria-label="Contraseña" 
        type="password"
        outlined 
        dense 
        class="login-input" 
      />
      <!--
        se añade, por cuestiones de accesibilidad, el atributo aria-label al botón de iniciar sesión
      -->
        <q-btn 
        :label="usersStore.isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión'" 
        :aria-label="usersStore.isRegisterMode ? 'Botón para crear cuenta' : 'Botón para iniciar sesión'" 
        color="dark" 
        unelevated 
        class="login-button" 
        @click="usersStore.isRegisterMode ? register() : login()" 
      />

      <q-btn 
        flat 
        :label=" usersStore.isRegisterMode ?  'Ya tienes cuenta? Inicia sesión'  : 'No tienes cuenta? Regístrate' " 
        aria-label="Botón para alternar entre iniciar sesión y crear cuenta" 

        class="toggle-mode-button" 
        @click="usersStore.isRegisterMode = !usersStore.isRegisterMode" 
      />
    </div>

  </q-page>
</template>
  
<script setup>
import { useUsersStore } from '../stores/usersStore';
import { useRouter } from 'vue-router';
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();

const usersStore = useUsersStore();

const login = async () => {
  if (!usersStore.email || !usersStore.password) {
    $q.notify({
        message: 'Por favor, completa todos los campos.',
        color: 'info',
        position: 'bottom',
        timeout: 2000,
    });
    return;
  }
  try {
    await usersStore.login(usersStore.email, usersStore.password);
    
    $q.notify({
        message: `¡Bienvenido, ${usersStore.currentUser.name}!`,
        color: 'positive',
        position: 'bottom',
        timeout: 2000,
    });
    router.push('/movies');
  } catch (error) {
  
    $q.notify({
        message: 'Error al iniciar sesión: ' + usersStore.errorMessage,
        color: 'info',
        position: 'bottom',
        timeout: 2000,
    });
  }
};

const register = async () => {
  if (!usersStore.name || !usersStore.email || !usersStore.password) {

    $q.notify({
        message: 'Por favor, completa todos los campos.',
        color: 'info',
        position: 'bottom',
        timeout: 2000,
    });
    return;
  }
  try {
    await usersStore.registerUser(usersStore.name, usersStore.email, usersStore.password);
  
    $q.notify({
        message: `Cuenta creada con éxito, bienvenido ${usersStore.name}!`,
        color: 'positive',
        position: 'bottom',
        timeout: 2000,
    });
    usersStore.isRegisterMode = false;
  } catch (error) {

    $q.notify({
        message: 'Error al crear cuenta: ' + usersStore.errorMessage,
        color: 'info',
        position: 'bottom',
        timeout: 2000,
    });
  }
};
</script>
  
<style scoped>
.login-layout {
  background: url('https://images.unsplash.com/photo-1677344297888-81f04aa12a60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
  
.login-content {
  max-width: 400px;
  width: 90%;
  background: rgba(50, 48, 50, 0.95);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}
  
.login-logo {
  max-width: 220px;
  margin: 0 auto 0.5rem auto;
  background-color: white;
  border-radius: 8px;
  padding: 8px;
}
  
.login-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}
  
.login-input {
  margin-bottom: 1rem;
  color: black;
  background-color: white;
  border-radius: 8px;
}
  
.login-button {
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
}

.toggle-mode-button {
  width: 100%;
  font-size: 0.9rem;
  color: white;
  margin-top: 0.5rem;
}

</style>
  