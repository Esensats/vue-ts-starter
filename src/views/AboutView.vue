<script setup lang="ts">
import { useFetcher } from '@/composables/useFetcher'
import type { User } from '@/models/user'

const { data: users, error, loading, getData } = useFetcher<User[]>()

getData('/users').then(() => {
  console.log(users.value)
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else-if="users && users.length">
      <li v-for="user in users" :key="user._id">{{ user.name }}</li>
    </ul>
    <p v-else>Пользователей нет</p>
  </div>
</template>

<style>
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
