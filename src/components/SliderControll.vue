<script>
import { ref, defineProps } from "vue";
export default defineProps({
  msg: {
    type: String,
    required: true
  },
  pos: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: false,
    default: 0
  },
  max: {
    type: Number,
    required: true,
    default: 100
  },
  step: {
    type: Number,
    required: true
  },
},
setup(props, ctx) {

const inc = (value) => {
  ctx.emit('update:pos', value)
}
//return { inc }
})
</script>

<template>
    {{ pos }}
<input @change="inc" type="range" class="form-range" :value="pos" :min="min" :max="max" :step="step" id="customRange3">
</template>

<style scoped></style>