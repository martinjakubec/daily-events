<template>
  <div id="nav">
    <div class="container inner-nav">
      <router-link class="nav-link" to="/">Home</router-link>
      <router-link v-if="!isUserLoggedIn" class="nav-link" to="/login">Login</router-link>
      <router-link v-if="!isUserLoggedIn" class="nav-link" to="/register">Register</router-link>
      <router-link v-if="isUserLoggedIn" class="nav-link" to="/profile">{{username}}</router-link>
      <span v-if="isUserLoggedIn" class="username" @click="$emit('userLogout')"><router-link class="nav-link" to="/logout">Logout</router-link></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isUserLoggedIn: Boolean,
    username: String
  }
};
</script>

<style scoped lang="scss">
#nav {
  width: 100%;
  background-color: $light-purple;
  margin-bottom: 50px;

  .inner-nav {
    display: flex;
    height: 40px;
    align-items: center;

    .router-link-active {
      &::after {
        content: '';
        display: block;
        height: 2px;
        width: 100%;
        background-color: white;
        position: absolute;
        bottom: -4px;
        left: 0;
      }
    }

    .nav-link {
      margin-right: 20px;
      text-decoration: none;
      color: white;
      position: relative;

      &::before {
        content: '';
        display: block;
        height: 2px;
        width: 0;
        background-color: white;
        position: absolute;
        bottom: -4px;
        left: 50%;
        opacity: 0;
        transform: translateX(-50%);
        transition-property: width, opacity;
        transition-duration: 0.2s;
        z-index: 2;
      }

      &:hover,
      &:focus {
        &::before {
          width: 100%;
          opacity: 1;
          transition-property: width, opacity;
          transition-duration: 0.2s;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .username {
      margin-left: auto;
      margin-right: 0;
      color: white;
      background-color: darken($light-purple, 5%);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;

      &::before {
        bottom: 9px;
      }

      &:hover,
      &:focus {
        &::before {
          width: calc(100% - 40px);
        } 
      }
    }
  }
}
</style>
