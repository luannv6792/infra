<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    :style="{ backgroundImage: 'url(/src/assets/bg-tech.jpg)' }"
  >
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from './components/LoginForm.vue'
</script>
