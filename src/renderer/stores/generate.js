import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia';
import axios from 'axios';
import moment from 'moment';
import TTS from 'text-to-speech-offline';
import { useVoiceSettingsStore } from '../stores/counter';
export const useGenerateStore = defineStore('generate', () => {
  let controller;
  const glob = useVoiceSettingsStore();
  const disable = ref(false);
  const total_duration = ref(0);
  const prompt = ref("");
  const msg = ref('');
  const response = ref("");

  const formatTime = (x) => {
    return moment(x).seconds()
  }
  const getChat = async () => {
    disable.value = true;
    msg.value = prompt.value;
    prompt.value = "";
    controller = new AbortController();
    const signal = controller.signal;
    try {

      const res = await fetch(`http://127.0.0.1:11434/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // like  or text/xml
        },
        body: {
          'model': glob.selectedModel,
          "prompt": msg.value,
          "stream": true,
          "options": {
            "seed": 101,
            "temperature": 0,
          },

        },
        signal: signal
      })
      console,log(res)
      const reader = res.body.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Convert the streamed data to text
        const text = new TextDecoder().decode(value);
        
        response.value += text
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

  const clearOutput = async () => {
    response.value = "";
    alert("cleared!!!")
  }

  const copyOutput = () => {
    let res = document.getElementById("cop")
    res.select();
    navigator.clipboard.writeText(res.value);

    // Alert the copied text
    alert("Copied to clipboard");
  }
  const copyQ = () => {
    let res = document.getElementById("prompt-msg")
    res.select();
    navigator.clipboard.writeText(res.value);

    // Alert the copied text
    alert("Copied to clipboard");
  }

  return {
    formatTime, glob, getChat, msg, prompt, response, disable, clearOutput, copyOutput, stopGen, copyQ, tts, total_duration
  }
})
