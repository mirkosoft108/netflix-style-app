<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
 
      <q-page class="bg-primary text-white flex items-center justify-center min-h-screen">
        <div class="text-center">
          
          <h1 class="text-4xl font-bold mb-4">¡HI, Quasar!</h1>
          
          <q-btn label="Haz clic aquí" color="secondary" @click="showAlert" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
const showAlert = () => {
  alert('Quasar is awesome!')
}
</script>
