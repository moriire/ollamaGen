<script setup>
import SliderControl from "@/components/SliderControll.vue"
import { useVoiceSettingsStore } from '@/stores/counter';
const params = useVoiceSettingsStore();
</script>

<template>
<div class="row">
<h2 class="text-light text-center"> Settings </h2>
  <div class="col-lg-12 mb-4">
    <SliderControl v-model="params.voiceParams.vol" label="Volume" :caliber="params.voiceParams.vol" @change="params.changeVoiceParams(params.voiceParams)"/>
  </div>
  <div class="col-lg-6 my-xs-2">
    <SliderControl v-model="params.voiceParams.rate" label="Rate" :caliber="params.voiceParams.rate" :min="0" :max="1" :step="0.1" @change="params.changeVoiceParams(params.voiceParams)" />
  </div>
  <div class="col-lg-6 my-xs-2">
    <SliderControl v-model="params.voiceParams.pitch" label="Pitch" :caliber="params.voiceParams.pitch" :min="0" :max="1" :step="0.1" @change="params.changeVoiceParams(params.voiceParams)" />
  </div>
<div class="col-3 mt-4">
<button class="btn btn-sm btn-warning d-">Save</button>
</div>
</div>
</template>

<style scoped></style>
