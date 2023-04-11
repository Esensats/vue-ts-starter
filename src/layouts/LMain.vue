<script setup lang="ts">
import OFooter from '@/components/OHeader/OFooter.vue'
import OHeader from '@/components/OHeader/OHeader.vue'
</script>

<template>
  <OHeader />
  <RouterView class="LMain-content" />
  <OFooter />
</template>

<style scoped>
.LMain-content {
  flex-grow: 1;
}
</style>
