<template>
  <header>
    <h1>Daily Events</h1>
  </header>
</template>

<style scoped lang="scss">
  @import '../assets/scss/bootstrap/scss/_functions.scss';
  @import '../assets/scss/bootstrap/scss/_variables.scss';
  @import '../assets/scss/bootstrap/scss/_mixins.scss';
  header {
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $purple;

    @include media-breakpoint-down(lg) {
      height: 50px;
    }
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    @include media-breakpoint-down(lg) {
      font-size: 1.5rem;
    }
    color: white;
    font-family: 'Roboto';
  }
</style>