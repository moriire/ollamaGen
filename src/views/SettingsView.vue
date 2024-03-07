<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h2 class="title text-center text-light my-2">Text to Speech Settings</h2>
  <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2">
    <div class="input-group mb-3">
      <label for="customRange3" class="form-label">
        <h2>Temperature</h2>
      </label>
      <input type="range" class="form-range" value="0.5" min="0" max="1" step="0.1" id="customRange3">
    </div>
    <div class="input-group mb-3">
      <label for="customRange3" class="form-label">
        <h2>top_p</h2>
      </label>
      <input type="range" class="form-range" value="0.5" min="0" max="1" step="0.1" id="customRange3">
    </div>
    <div class="input-group mb-3">
      <label for="customRange3" class="form-label">
        <h2>top_k</h2>
      </label>
      <input type="range" class="form-range" value="0.8" min="0.5" max="2" step="0.1" id="customRange3">
    </div>
    <div class="input-group mb-3">
      <label for="customRange3" class="form-label">
        <h2>Pitch</h2>
      </label>
      <input type="range" class="form-range" value="1" min="0" max="2" step="0.1" id="customRange3">
    </div>
    
  </div>
</template>

<style scoped>
</style>
