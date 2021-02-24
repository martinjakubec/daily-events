<template>
  <div class="container">
    <base-navbar>
      <li @click="activeComponent = 'profile-overview'">Overview</li>
      <li @click="activeComponent = 'profile-settings'">Settings</li>
      <li @click="activeComponent = 'profile-events'">Your events</li>
      <li @click="activeComponent = 'profile-events'">Seen events</li>
    </base-navbar>
    <keep-alive>
      <component :is="activeComponent" :userData="userData"></component>
    </keep-alive>
  </div>
</template>

<script>
import BaseNavbar from '../components/BaseNavbar.vue';
import ProfileEvents from '../components/profile/ProfileEvents'
import ProfileOverview from '../components/profile/ProfileOverview'
import ProfileSettings from '../components/profile/ProfileSettings'
export default {
  components: {BaseNavbar, ProfileEvents, ProfileOverview, ProfileSettings},
  data() {
    return {
      activeComponent: 'profile-overview'
    };
  },
  props: {
    isUserLoggedIn: Boolean,
    userData: Object,
  },
  created() {
    // if user is not logged in, they get redirected to login page
    if (!this.isUserLoggedIn) {
      this.$router.push('/login');
    }
  },
};
</script>
