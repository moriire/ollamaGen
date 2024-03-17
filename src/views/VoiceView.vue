<script setup>
import SliderControl from "@/components/SliderControll.vue"
import { ref } from "vue";
const vol = ref(0);
const rate = ref(1);
const pitch = ref(1);
</script>

<template>
<div class="row">
<h2 class="text-light text-center"> Settings </h2>
  <div class="col-lg-12 mb-4">
    <SliderControl v-model="vol" label="Volume" :caliber="vol"/>
  </div>
  <div class="col-lg-6">
    <SliderControl v-model="rate" label="Rate" :caliber="rate" :min="0" :max="1" :step="0.1" />
  </div>
  <div class="col-lg-6">
    <SliderControl v-model="pitch" label="Pitch" :caliber="pitch" :min="0" :max="1" :step="0.1" />
  </div>
<div class="col-3 mt-4">
<button class="btn btn-sm btn-warning d-">Save</button>
</div>
</div>
</template>

<style scoped></style>
