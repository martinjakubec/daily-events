<template>
  <div>
    <base-event v-if="eventToShow" :eventToShow="eventToShow"></base-event>
    <base-error v-if="errorMessage" :errorMessage="errorMessage" @closeError="errorMessage=null"></base-error>
    
  </div>
</template>

<script>
import BaseError from '../components/BaseError.vue';
import BaseEvent from '../components/BaseEvent.vue';
export default {
  components: {
    BaseEvent,
    BaseError
  },
  props: {
    isUserLoggedIn: Boolean
  },
  data() {
    return {
      eventToShow: null,
      errorMessage: null,
    }
  },
  methods: {
    async fetchEvent() {
      // let eventNumber;
      // if(this.isUserLoggedIn) {
      //   eventNumber = 14;
      // } else {
      //   eventNumber = 2
      // }
      const fetchedEvent = await fetch(process.env.VUE_APP_API_BASE_URL + `events/daily`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const fetchedEventResponse = await fetchedEvent.json();
      if(fetchedEventResponse.status === 'ok') {
        this.eventToShow = fetchedEventResponse.data;
      } else {
        this.errorMessage = fetchedEventResponse.error;
      }
    }
  },
  created() {
    this.fetchEvent();
  }
};
</script>

<style lang="scss">

</style>
