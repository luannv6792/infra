<template>
  <form
    @submit.prevent="handleLogin"
    class="relative z-10 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 text-center border border-gray-500"
  >
    <h2 class="text-4xl font-bold mb-6 text-blue-400 drop-shadow-lg">
      Infras
    </h2>

    <input
      v-model="username"
      type="text"
      placeholder="Username"
      class="w-full mb-4 p-3 rounded-lg bg-transparent border border-gray-400 text-white placeholder-gray-400"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full mb-6 p-3 rounded-lg bg-transparent border border-gray-400 text-white placeholder-gray-400"
    />

    <button
      type="submit"
      class="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-all shadow-lg"
    >
      Đăng nhập
    </button>

    <p v-if="error" class="text-red-400 mt-3">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  try {
    const res = await fetch('http://localhost:32001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    })

    if (res.ok) {
      window.location.href = '/dashboard.html'
    } else {
      error.value = 'Sai username hoặc mật khẩu'
    }
  } catch (err) {
    error.value = 'Lỗi kết nối đến server'
  }
}
</script>
