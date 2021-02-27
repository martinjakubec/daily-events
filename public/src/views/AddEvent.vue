<template>
  <div class="container">
    <h2>Add Event</h2>
    <base-form :onFormSubmit="addEvent" autocomplete="off">
      <label for="title">Event Title</label>
      <input type="text" name="title" required />
      <label for="text">Event text</label>
      <textarea
        name="text"
        rows="10"
        placeholder="You can write up to 1000 words here. &#10;Use them wisely!"
        maxlength="1000"
        required
      ></textarea>
      <label for="dateToBeShown">When to show the event</label>
      <p class="note">(Don't choose if you want it to show randomly)</p>
      <input type="date" name="dateToBeShown" />
      <input type="submit" value="Add it!">
    </base-form>
    <base-error v-if="errorMessage" :errorMessage="errorMessage" @closeError="errorMessage = ''"></base-error>
  </div>
</template>

<script>
import BaseError from '../components/BaseError.vue';
import BaseForm from '../components/BaseForm.vue';
export default {
  components: {BaseForm, BaseError},
  data() {
    return {
      errorMessage: undefined,
    }
  },
  props: {
    isUserLoggedIn: Boolean,
    isUserAdmin: Boolean,
  },
  methods: {
    async addEvent(e) {
      e.preventDefault();
      const token = localStorage.getItem('token');
      const title = e.target.title.value;
      const text = e.target.text.value;
      let body = {token, title, text};
      let dateToBeShown = e.target.dateToBeShown.value;
      if (dateToBeShown) {
        dateToBeShown = new Date(dateToBeShown).toDateString();
        body.dateToBeShown = dateToBeShown;
      }
      body = JSON.stringify(body);
      const addEvent = await fetch(
        process.env.VUE_APP_API_BASE_URL + 'events/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: body,
        }
      );
      const addEventResponse = await addEvent.json();
      if (addEventResponse.status === 'ok') {
        console.log('Event sucessfully added');
      } else {
        this.errorMessage = addEventResponse.error;
      }
      e.target.title.value = '';
      e.target.text.value = '';
      e.target.dateToBeShown.value = '';
    },
  },
  created() {
    // if user is not logged in, they get redirected to login page
    if (!this.isUserLoggedIn) {
      this.$router.push('/login');
    } else if (!this.isUserAdmin) {
      this.$router.push('/');
    }
  },
};
</script>

<style lang="scss">
input[type="submit"]::before {
  content: 'Add it!' !important;
}
button::before {
  content: 'Close' !important;
}
</style>
