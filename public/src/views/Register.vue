<template>
  <div class="container">
    <h2>Register</h2>
    <base-form @submit="$emit('userRegister',  $event)">
      <label for="username">Username:</label>
      <input type="text" name="username" />
      <label for="password">Password:</label>
      <input type="password" name="password" />
      <label for="mailAddress">Mail:</label>
      <input type="email" name="mailAddress" />
      <button>Register</button>
    </base-form>
  </div>
</template>

<script>
import BaseForm from '../components/BaseForm.vue';
export default {
  components: {BaseForm},
  props: {
    isUserLoggedIn: Boolean
  },
  created() {
    if (this.isUserLoggedIn) {
      this.$router.push('/')
    }
  },
};
</script>

<style scoped lang="scss">
  button::before {
    content: 'Register' !important;
  }
</style>
