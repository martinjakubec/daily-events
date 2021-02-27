<template>
  <div class="container">
    <h2>Login</h2>
    <base-form @submit="$emit('userLogin', $event)" autocomplete="off">
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
    isUserLoggedIn: Boolean
  },
  created() {
    // if user is not logged in, they get redirected to login page
    if (this.isUserLoggedIn) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped lang="scss">
button::before {
  content: 'Login' !important;
}
</style>
