<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/api'
const users = ref([])

api.get('/users').then((res) => {
  users.value = res.data
})
</script>

<template>
  <main>
    <div class="container">
      <template v-if="users && users.length">
        <div class="item" v-for="user in users" :key="user._id">
          {{ user.name + ' - ' + user.email }}
        </div>
      </template>
    </div>
  </main>
</template>
