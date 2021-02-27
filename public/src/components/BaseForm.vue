<template>
  <form @submit.prevent="onFormSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  props: {
    onFormSubmit: Function,
  },
};
</script>

<style scoped lang="scss">
form {
  ::v-deep(input),
  ::v-deep(textarea) {
    margin-bottom: 20px;
    display: block;
  }
  ::v-deep(input[type='text']),
  ::v-deep(input[type='number']),
  ::v-deep(input[type='password']),
  ::v-deep(input[type='search']),
  ::v-deep(input[type='tel']),
  ::v-deep(input[type='url']),
  ::v-deep(input[type='email']) {
    display: block;
    min-width: 300px;
    height: 30px;
    background-color: lighten($purple, 77%);
    border: none;
    box-sizing: border-box;
    position: relative;
  }

  ::v-deep(textarea) {
    display: block;
    width: 100%;
    background-color: lighten($purple, 77%);
    border: none;
    box-sizing: border-box;
    position: relative;
    line-height: 1.5;
    resize: vertical;
    white-space: pre-wrap;
  }

  ::v-deep(input[type="date"]) {
    border: none;
    background-color: lighten($purple, 77%);
  }

  ::v-deep(button),
  ::v-deep(input[type='button']),
  ::v-deep(input[type='reset']),
  ::v-deep(input[type='file']),
  ::v-deep(input[type='submit']) {
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
      content: '';
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

  ::v-deep(.note) {
    font-size: 0.8rem;
    color: #555;
    font-style: italic;
    margin: 5px 0 10px 0;
  }
}
</style>
