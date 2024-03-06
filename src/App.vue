<script setup>
import { 
  //RouterLink, 
  RouterView } from 'vue-router'
</script>

<template>
<div class="container">
  <div class="row justify-content-center .align-items-center">
    <RouterView />
  </div>
</div>
 
</template>

<style .scoped>
body, div.container{
  background-color: black;
  height: 100vh;
}
.board{
  height: 70vh;
}

</style>
