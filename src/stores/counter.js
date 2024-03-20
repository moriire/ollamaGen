import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVoiceSettingsStore = defineStore('voice', () => {
   
 //model parameter settings

 const temperature = computed(() => getParam('modelParams', 'temperature') || 0.7)
 const top_p = computed(() => getParam('modelparams', 'top_p') || 1)
 const top_k = computed(() => getParam('modelparams', 'top_k') || 1)
 const num_ctx = computed(() => getParam('modelparams', 'num_ctx'))
 const seed = computed(() => getParam('modelparams', 'seed') || 101)
 const repeat_penalty = computed(() => getParam('modelparams', 'repeat_penalty') || 1.1)
 // end parameter

  //voice
  const volume = computed(() => getParam('voice', 'vol') || 20)
  const rate = computed(() => getParam('voice', 'rate') || 1)
  const pitch = computed(() => getParam('voice', 'pitch') || 1)
  const model = computed(() => getParam('model', 'model'))
  const modelParams = reactive({temperature: temperature.value, seed: seed.value, top_k: top_k.value, top_p: top_p.value}) // JSON.parse(localStorage.getItem('modelparams'))
  const voiceParams = reactive({ vol: volume.value, rate: rate.value, pitch: pitch.value})

 //Model settings
 const selectedModel = ref(localStorage.getItem('model'));


 const selectModel = ()=>{
  window.alert(selectedModel.value)
  localStorage.setItem('model', selectedModel.value)
}
 //end model settings
  const changeVoiceParams = () => {
    localStorage.removeItem('voice')
    localStorage.setItem('voice', JSON.stringify(voiceParams))
    console.log('params changed')
  }
  const changeModelParams = () => {
    localStorage.removeItem('modelparams')
    localStorage.setItem('modelparams', JSON.stringify(modelParams))
    console.log('params changed')
  }
  
  function getParam(p, q) {
    if (localStorage.getItem(p)){
      return JSON.parse(localStorage.getItem(p))[q]
    }
    return null
  }
  
  return { getParam, volume, rate, changeVoiceParams, changeModelParams, modelParams, voiceParams,
  //models settings
  selectedModel,
  selectModel,
  model,
  temperature,
  top_p,
  top_k,
  num_ctx,
  repeat_penalty,
  seed
  }
})
