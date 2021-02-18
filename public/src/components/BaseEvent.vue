<template>
  <div class="event container">
    <h2>{{eventToShow.title}}</h2>
    <p class="text">{{ eventToShow.text }}</p>
    <p class="event-id">Event ID: {{ eventToShow.customId }}</p>
    <p class="author">- {{ eventToShow.author }}</p>
  </div>
</template>

<script>
export default {
  props: {
    eventToShow: {
      _id: Number,
      customId: Number,
      title: String,
      text: String,
      date: Date,
      author: String,
      hasBeenApproved: Boolean,
    },
  },
};
</script>

<style lang="scss">
.event {
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.5;

  p {
    width: 100%;
  }
}

.event-id {
  font-size: 0.7rem;
}

.author {
  color: rgb(95, 0, 79);
  font-style: italic;
  text-align: right;
  font-weight: bold;
}
</style>
