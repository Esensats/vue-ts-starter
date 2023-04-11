<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink :to="{ name: 'home' }" type="button" class="btn btn-link green"
        >Gaming platform</RouterLink
      >
      <ul class="reset-list">
        <li>
          <RouterLink :to="{ name: 'sign-in' }" class="btn btn-link green">Sign in</RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'sign-up' }" class="btn btn-link green">Sign up</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  ul {
    display: flex;
  }
}
</style>
