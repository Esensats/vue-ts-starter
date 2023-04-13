<script setup lang="ts">
import { ref } from 'vue'
const roles = ref([])

fetch('/api/v1/roles')
  .then((res) => res.json())
  .then((json) => {
    roles.value = json
  })
</script>

<template>
  <main>
    <div class="container">
      <template v-if="roles && roles.length">
        <div class="item" v-for="role in roles" :key="role._id">{{ role.name }}</div>
      </template>
    </div>
  </main>
</template>
