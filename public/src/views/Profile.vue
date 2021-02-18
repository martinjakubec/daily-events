<template>
  <div class="container">
    <h2>Profile - {{randomProp}} </h2>
    <p>Role: </p>
  </div>
</template>

<script>
export default {
  props: {
    randomProp: String
  }
}
</script>
