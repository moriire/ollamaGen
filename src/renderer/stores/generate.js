import { ref } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios';
import moment from 'moment';
import TTS from 'text-to-speech-offline';
import { useVoiceSettingsStore } from '../stores/counter.js';
export const useGenerateStore = defineStore('generate', () => {
  let controller;
  const glob = useVoiceSettingsStore();
  const disable = ref(false);
  const total_duration = ref(0);
  const prompt = ref("");
  const msg = ref("");
  const response = ref("");
  const formatTime = (x) => {
    return moment(x).seconds()
  }

  const batchMode = async ()=>{
    response.value = "";
    disable.value = true;
    msg.value = prompt.value;
    prompt.value = "";
    controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await axios.post(`http://localhost:11434/api/generate`, {
          model: glob.selectedModel,
          prompt: msg.value,
          stream: false,
          options: glob.modelParams
        },
        { signal }
      )
      console.log(res.data)
      total_duration.value = res.data.context.length / formatTime(res.data.eval_duration);
      //response.value = res.data.message.content
      response.value = res.data.response
    } catch (errors) {
      console.log(errors)
      
    } finally {
      disable.value = false
    }
  }
  const streamMode = async ()=>{
    response.value = "";
    disable.value = true;
    msg.value = prompt.value;
    prompt.value = "";
    controller = new AbortController();
    const signal = controller.signal;
    try {

      const res = await fetch(`http://localhost:11434/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'model': glob.selectedModel,
          "prompt": msg.value,
          "stream": true,
          "options": glob.modelParams
        }),
        signal
      })
      console.log(res.body)
      if (!res.body) {
        throw new Error('ReadableStream not yet supported in this browser.');
      }
      const reader = res.body.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }
        const text = new TextDecoder().decode(value);
        response.value += JSON.parse(text).response
      }
      //total_duration.value = res.data.context.length / formatTime(res.data.eval_duration);
      response.value = `${msg.value}:\n${res.data.response}`
      console.log(res.data)
    } catch (errors) {
      console.log(errors)
    }
    finally {
      disable.value = false
    }
  }
  const stopGen = () => {
    if (controller) {
      controller.abort();
      alert("Chat Aborted!!!")
    }
  };
  const tts = () => {
    TTS(response.value || 'nothing to talk about', { language: "english", volume: glob.voiceParams.vol, rate: glob.voiceParams.rate, pitch: glob.voiceParams.pitch })
  };

  const resMode = ref("stream");
  const getChat = () => {
    if (resMode.value === 'stream') {
      console.log(resMode)
      return streamMode()
    } else {
      return batchMode()
    }
  }
  
  return {
    formatTime, 
    resMode,
    getChat, 
    msg, prompt, response, disable, 
    stopGen,
    tts, 
    total_duration,
    streamMode,
    batchMode
  }
})
