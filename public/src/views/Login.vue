<template>
  <div class="container">
    <h2>Login {{ randomProp }}</h2>
    <base-form @submit="$emit('userLogin', $event)">
      <label for="username">Username:</label>
      <input type="text" name="username" />
      <label for="password">Password:</label>
      <input type="password" name="password" />
      <button>Login</button>
    </base-form>
  </div>
</template>

<script>
import BaseForm from '../components/BaseForm.vue';
export default {
  components: {BaseForm},
  props: {
    randomProp: String
  },
};
</script>

<style scoped lang="scss">
button::before {
  content: 'Login' !important;
}
</style>
