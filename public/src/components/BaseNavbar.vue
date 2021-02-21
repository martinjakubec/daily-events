<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-top: -30px;
  margin-bottom: 20px;

  ::v-deep(li) {
    display: block;
    margin-right: 20px;
    cursor: pointer;
    color: $purple;
    font-weight: bold;
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 0;
      opacity: 0;
      height: 2px;
      background-color: $purple;
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      transition-property: width, opacity;
      transition-duration: 0.2s;
    }

    &:hover,
    &:focus {
      &::after {
        width: 100%;
        opacity: 1;
        transition-property: width, opacity;
        transition-duration: 0.2s;
      }
    }
  }
}
</style>
