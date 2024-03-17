import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useVoiceSettingsStore = defineStore('voice', () => {
  const volume = computed(() => getParam('voice', 'vol') || 20)
  const rate = computed(() => getParam('voice', 'rate') || 1)
  const pitch = computed(() => getParam('voice', 'pitch') || 1)
  const modelParams = reactive({temperature: volume.value || 1, seed: 101, top_k: 0.1, top_p: 10}) // JSON.parse(localStorage.getItem('modelparams'))
  const voiceParams = reactive({ vol: volume.value, rate: rate.value, pitch: pitch.value})
 
  const changeVoiceParams = () => {
    localStorage.removeItem('voice')
    localStorage.setItem('voice', JSON.stringify(voiceParams))
    console.log('params changed')
  }
  const changeModelParams = (params) => {
    localStorage.removeItem('modelparams')
    localStorage.setItem('modelparams', JSON.stringify(params))
    console.log('params changed')
  }
  
  function getParam(p, q) {
    if (localStorage.getItem(p)){
      return JSON.parse(localStorage.getItem(p))[q]
    }
    return 
  }
  
  return { getParam, volume, rate, changeVoiceParams, changeModelParams, modelParams, voiceParams}
})
