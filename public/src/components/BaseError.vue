<template>
  <div class="error">
    <p>{{errorMessage}}</p>
    <button @click="$emit('closeError')">Close</button>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: String
  }
}
</script>


<style scoped lang="scss">
  .error {
    border: 10px solid $purple;
    padding: 40px;
    min-width: 400px;
    max-width: 1000px;
    min-height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    // box-shadow: 5px 5px 10px 10px transparentize($color: black, $amount: 0.5);
  }

  p {
    margin-bottom: 20px;
  }

  button {
    display: block;
    height: 50px;
    width: 150px;
    overflow: hidden;
    position: relative;
    border: none;
    background-color: $light-purple;
    color: white;

    &::after {
      content: '';
      display: block;
      width: 0px;
      height: 0px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: $purple;
      border-radius: 100%;
      transition-property: height width;
      transition-duration: 0.2s;
      transition-timing-function: ease-in;
    }

    &::before {
      content: 'Close';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: white;
      // display: none;
      z-index: 2;
    }

    &:hover,
    &:focus {
      &::after {
        width: 200px;
        height: 200px;
        transition-property: height width;
        transition-duration: 0.2s;
      }
    }
  }
</style>