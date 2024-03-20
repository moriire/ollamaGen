<script setup>
import SliderControl from "@/components/SliderControll.vue"
import { useVoiceSettingsStore } from '@/stores/counter';
const params = useVoiceSettingsStore();
</script>

<template>
  <div class="row my-2">
    <h2 class="text-light text-center">Model Settings </h2>
    <div class="col-lg-12 p-2">
      <SliderControl v-model="params.modelParams.temperature" label="Temperature" :min="0" :max="1" :step=".1"
        :caliber="params.modelParams.temperature" @change="params.changeModelParams" />
    </div>
  </div>
  <div class="row my-3">
    <div class="col-lg-6">
      <SliderControl v-model="params.modelParams.top_p" label="Top_p" :caliber="params.modelParams.top_p" :min="0"
        :max="1.0" :step="0.05" @change="params.changeModelParams" />
    </div>

    <div class="col-lg-6">
      <SliderControl v-model="params.modelParams.top_k" label="Top_k" :caliber="params.modelParams.top_k" :min="0"
        :max="100" :step="5" @change="params.changeModelParams" />
    </div>
  </div>
  <div class="row my-3">
    <div class="col-lg-6">
      <SliderControl v-model="params.modelParams.num_ctx" label="num_ctx" :caliber="params.modelParams.top_p" :min="128"
        :max="4096" :step="128" @change="params.changeModelParams" />
    </div>

    <div class="col-lg-6">
      <SliderControl v-model="params.modelParams.repeat_penalty" label="repeat_penalty" :caliber="params.modelParams.repeat_penalty" :min="0"
        :max="2.0" :step="0.1" @change="params.changeModelParams" />
    </div>
  </div>
  <div class="row my-3">
    <div class="col-lg-12">
      <SliderControl v-model="params.modelParams.seed" label="Seed" :caliber="params.modelParams.seed"
        @change="params.changeModelParams" :min="0" :max="101" :step="1" />
    </div>
   
  </div>

</template>

<style scoped></style>
