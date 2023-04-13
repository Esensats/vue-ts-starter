<script setup lang="ts">
import { useSignin } from '@/composables/useSignin'

const {
  email,
  password,
  wasValidated,
  isValid,
  isValidDefault,
  handleSignIn,
  handlePreSubmit,
  errorMessage
} = useSignin()
</script>

<template>
  <main class="signin my-3">
    <div class="container">
      <form
        @submit.prevent="handleSignIn"
        class="signin-form"
        :class="{ 'was-validated': wasValidated }"
      >
        <h1 class="m-0">Sign in</h1>
        <p class="text-danger lh-1 m-0">{{ errorMessage }}&nbsp;</p>
        <input
          type="email"
          v-model="email"
          @input="isValid.value = isValidDefault"
          placeholder="Email"
          class="form-control"
          :class="{
            'is-valid': isValid.email === true,
            'is-invalid': isValid.email === false
          }"
          required
        />
        <input
          type="password"
          v-model="password"
          @input="isValid.value = isValidDefault"
          placeholder="Password"
          class="form-control"
          :class="{
            'is-valid': isValid.password === true,
            'is-invalid': isValid.password === false
          }"
          required
        />
        <button class="btn btn-success" @click="handlePreSubmit">Sign in</button>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
.signin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
  margin-inline: auto;
}
</style>
