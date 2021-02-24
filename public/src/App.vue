<template>
  <the-header />
  <the-navbar
    @userLogout="handleUserLogout"
    :isUserLoggedIn="isUserLoggedIn"
    :username="username"
  />
  <router-view
    @userLogin="handleUserLogin"
    @userRegister="handleUserRegistration"
    :isUserLoggedIn="isUserLoggedIn"
    :userData="userData"
  />
  <base-error
    v-if="errorMessage"
    :errorMessage="errorMessage"
    @closeError="errorMessage = null"
  />
</template>

<script>
import BaseError from './components/BaseError.vue';
import TheHeader from './components/TheHeader.vue';
import TheNavbar from './components/TheNavbar.vue';
export default {
  components: {TheHeader, TheNavbar, BaseError},
  data() {
    return {
      isUserLoggedIn: false,
      userData: null,
      errorMessage: null,
    };
  },
  computed: {
    username() {
      if (this.userData) {
        return this.userData.username;
      } else {
        return '';
      }
    },
  },
  methods: {
    async fetchUserData(token, username) {
      const getUserData = await fetch(
        process.env.VUE_APP_API_BASE_URL + username,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
          },
        }
      );
      const getUserDataResponse = await getUserData.json();
      this.userData = getUserDataResponse;
    },
    async handleUserLogin(e) {
      const username = e.target.username.value.trim();
      const password = e.target.password.value.trim();
      if (username && password) {
        const loginBody = JSON.stringify({username, password});
        const userLogin = await fetch(
          process.env.VUE_APP_API_BASE_URL + 'login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: loginBody,
          }
        );
        const userLoginResponse = await userLogin.json();
        if (userLoginResponse.status === 'ok') {
          this.isUserLoggedIn = true;
          this.errorMessage = null;
          const token = userLoginResponse.data;
          localStorage.setItem('token', token);
          this.fetchUserData(token, username);
          this.$router.push('/');
        } else {
          this.errorMessage = userLoginResponse.error;
        }
      } else {
        this.errorMessage = 'Please fill in both fields.';
      }
    },
    handleUserLogout() {
      this.isUserLoggedIn = false;
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    async handleUserRegistration(e) {
      const username = e.target.username.value;
      const password = e.target.password.value;
      const mail = e.target.mailAddress.value;
      const body = JSON.stringify({username, password, mail})
      const userRegister = await fetch(process.env.VUE_APP_API_BASE_URL + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: body
      });
      const userRegisterResponse = await userRegister.json();
      if (userRegisterResponse.status === 'ok') {
        this.$router.push('/login');
      } else {
        this.errorMessage = userRegisterResponse.error;
      }
    },
  },
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      const [,payload] = token.split('.');
      const username = JSON.parse(atob(payload)).username
      const verifyToken = await fetch(
        process.env.VUE_APP_API_BASE_URL + 'validateToken',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({token}),
        }
      );
      const verifyTokenResponse = await verifyToken.json();
      if (verifyTokenResponse.status === 'ok') {
        this.isUserLoggedIn = true;
        this.fetchUserData(token, username)
      } else {
        this.errorMessage = verifyTokenResponse.error;
        this.handleUserLogout();
      }
    }
  },
};
</script>

<style lang="scss">
:root {
  font-family: 'Roboto';
}
</style>
