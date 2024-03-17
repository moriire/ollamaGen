<script setup>
import SliderControl from "@/components/SliderControll.vue"
import { useVoiceSettingsStore } from '@/stores/counter';
const params = useVoiceSettingsStore();
</script>

<template>
  <div class="row my-2">
    <h2 class="text-light text-center">Model Settings </h2>
    <div class="col-lg-12 p-2">
      <SliderControl v-model="params.modelParams.temperature" label="Temperature" :min="0" :max="10" :step="1000"
        :caliber="params.modelParams.temperature" @change="params.changeParams(params.modelParams.temperature)" />
    </div>
  </div>
  <div class="row my-3">
    <div class="col-lg-6">
      <SliderControl v-model="params.modelParams.rate" label="Top_p" :caliber="params.modelParams.top_p" :min="0"
        :max="1.0" :step="0.1" @change="params.changeParams(params.modelParams.top_p)" />
    </div>

    <div class="col-lg-6">
      <SliderControl v-model="params.modelParams.pitch" label="Top_k" :caliber="params.modelParams.top_k" :min="0"
        :max="1" :step="0.1" @change="params.changeParams(params.modelParams.top_k)" />
    </div>
  </div>
  <div class="row my-3">
    <div class="col-lg-6">
      <SliderControl v-model="params.modelParams.seed" label="Seed" :caliber="params.modelParams.seed"
        @change="params.changeParams" />
    </div>
    <div class="col-lg-6">
      <SliderControl v-model="pitch" label="ghhj" @change="params.changeParams" />
    </div>
  </div>

</template>

<style scoped></style>
