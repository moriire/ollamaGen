<script>
import axios from 'axios';
import moment from 'moment';
import TTS from 'text-to-speech-offline';
import { useVoiceSettingsStore } from '@/stores/counter';
import { ref } from 'vue';
export default {
  setup(){
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
    const getChat = async () =>{
      disable.value = true;
      msg.value = prompt.value;
      prompt.value ="";
      controller = new AbortController();
      const signal = controller.signal;
      //const message = { role: 'user', content: msg.value };
      
      try{
        const res = await axios.post('http://127.0.0.1:11434/api/generate', 
          {
          'model': glob.selectedModel,
          //"messages": [message],
          'prompt': msg.value,
          "stream": false,
          //"raw": true,
          "options": {
              "seed": 101,
              "temperature": 0
            }
        },
        {signal}
        );
      
      total_duration.value = res.data.context.length/formatTime(res.data.eval_duration);
      response.value = `${msg.value}:\n${res.data.response}`
     } catch(errors){
        console.log(errors)
      }
      finally{
        disable.value = false
      }
    }

  const stopGen = () =>{
    if (controller){
      controller.abort();
      alert("Chat Aborted!!!")
    }
  };
const tts = () => {
  TTS(response.value || 'nothing to talk about', {language: "english", volume: glob.voiceParams.vol, rate: glob.voiceParams.rate, pitch: glob.voiceParams.pitch})
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

    return{
       formatTime, glob, getChat, msg, prompt, response, disable, clearOutput, copyOutput, stopGen, copyQ, tts, total_duration
      }
  }    
}
</script>

<template>
 
  <div 
  v-show="disable"
  class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2">
  <div class="row justify-content-end">
    <div class="col-8">
      <div class="input-group">
        <button data-bs-toggle="tooltip" data-bs-placement="top"  title="Copy text to clipboard" class="input-group-text bg-warning text-dark" id="basic" @click="copyQ" >
          <i class="bi bi-clipboard"></i>
      </button>
       <input disabled readonly class="form-control bg-dark text-warning" id="prompt-msg"
        v-model="msg" />
        <button class="input-group-text bg-warning text-dark" id="basic" @click="copyQ" >
          <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="disable">
        </span>
      </button>
      
      </div>
     </div>
  </div>
  </div>
<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 mb-2">
    {{  glob.modelParams.temperature }}
        <textarea disabled readonly class="form-control bg-dark text-light overflow-auto board" v-model="response" id="cop" >
          
        </textarea>
</div> 
<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 d-flex justify-content-between" >
  <div>
    <button class="btn btn-outline-warning" v-show="disable" @click="stopGen">
      <i class="bi bi-stop-fill"></i>
    </button>
    <button class="btn btn-outline-warning"   @click="tts()" v-show="response">
      <i class="bi bi-mic-fill"></i>
    </button>
    
    <button data-bs-toggle-tooltip="Copy AI response" class="btn btn-outline-warning" v-show="response" @click="copyOutput">
      <i class="bi bi-clipboard"></i></button>
    <button title="Copy response to clipboard"  data-bs-toggle="tooltip" data-bs-placement="top" class="btn btn-outline-warning" @click="copyOutput" v-show="response" >Copy</button>
    <button class="btn btn-outline-warning" @click="clearOutput" v-show="response">Clear</button>
  </div>
  <div>
    <h2 class="text-light" v-show="response">
      {{ total_duration.toFixed(2) }} T/s
    </h2>
  </div>
</div>
<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 position-sticky .start-50 bottom-0 .translate-middle-x">
      <div class="input-group my-4">
        <!--button class="input-group-text bg-warning text-dark" id="basic" @click="tts()">
          <i class="bi bi-mic-fill"></i>
      </button-->
        <input class="form-control" aria-describedby="basic" 
        placeholder="I am your AI Doctor. How are you feeling?" v-model="prompt"  @keyup.enter="getChat()">
        <button class="input-group-text bg-warning text-dark" id="basic" @click="getChat()">
          <i class="bi bi-play-fill"></i>
      </button>
  </div>
</div>
</template>
<style scoped>
textarea{
  outline-color: yellow;
}
</style>
