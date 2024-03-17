<script setup>
import { ref, watchEffect } from "vue";

// define component props for the slider component
const { min, max, step, modelValue } = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
    default: 10,
  },
  label: {
    type: [String, Boolean],
    required: true
  },
  caliber: {
    type: Number,
    default:0
  },
});

// define emits for the slider component
const emit = defineEmits(["update:modelValue"]);

// define refs for the slider component
const sliderValue = ref(modelValue);
const slider = ref(null);

// function to get the progress of the slider
const getProgress = (value, min, max) => {
  return ((value - min) / (max - min)) * 100;
};

// function to set the css variable for the progress
const setCSSProgress = (progress) => {
  slider.value.style.setProperty("--ProgressPercent", `${progress}%`);
};

// watchEffect to update the css variable when the slider value changes
watchEffect(() => {
  if (slider.value) {
    // emit the updated value to the parent component
    emit("update:modelValue", sliderValue.value);

    // update the slider progress
    const progress = getProgress(
      sliderValue.value,
      slider.value.min,
      slider.value.max
    );

    // define extrawidth to ensure that the end of progress is always under the slider thumb.
    let extraWidth = (100 - progress) / 10;

    // set the css variable
    setCSSProgress(progress + extraWidth);
  }
});
</script>
<template>
  <div class="form-group">
    <label :for="label" class="text-light mb-2 h2">{{ label }} : {{ caliber }}</label>
    <input
     :id="label"
      ref="slider"
      :value="sliderValue"
      @input="({ target }) => (sliderValue = parseFloat(target.value))"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      class="form-control"
    />
    <!--input
      :value="sliderValue"
      @input="({ target }) => (sliderValue = parseFloat(target.value))"
      :min="min"
      :max="max"
      :step="step"
      type="number"
      class="input"
    /-->
  </div>
</template>
<style>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}
                        /***** Track Styles *****/
/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-runnable-track {
  background: var(--bs-light);
  height: 0.5rem;
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
  background: var(--bs-light);
  height: 0.5rem;
}
/***** Thumb Styles *****/
/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-thumb {
   -webkit-appearance: none; /* Override default look */
   appearance: none;
   margin-top: -12px; /* Centers thumb on the track */
   background-color: var(--bs-yellow);
   height: 2rem;
   width: 1rem;    
}
/***** Thumb Styles *****/
/***** Firefox *****/
input[type="range"]::-moz-range-thumb {
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0; /*Removes default border-radius that FF applies*/
    background-color: var(--bs-yellow);
    height: 2rem;
    width: 1rem;
}
/***** Focus Styles *****/
/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}

/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]:focus::-webkit-slider-thumb {
  border: 1px solid var(--bs-yellow);
  outline: 3px solid var(--bs-yellow);
  outline-offset: 0.125rem;
}

/******** Firefox ********/
input[type="range"]:focus::-moz-range-thumb {
  border: 1px solid var(--bs-yellow);
  outline: 3px solid var(--bs-yellow);
  outline-offset: 0.125rem;     
}
</style>