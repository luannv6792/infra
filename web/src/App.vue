<template>
  <div class="login-container">
    <h1>Infras Login</h1>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error" style="color: red; margin-top: 10px;">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const response = await axios.post('/api/login', { username: username.value, password: password.value })
    if (response.data && response.data.success) {
      window.location.href = '/dashboard.html'
    } else {
      error.value = 'Sai username hoặc mật khẩu'
    }
  } catch (e) {
    error.value = 'Không thể kết nối đến server'
  }
}
</script>
