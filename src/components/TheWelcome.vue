<script>
import axios from 'axios';
import ollama from 'ollama';
import TTS from 'text-to-speech-offline';

import { ref } from 'vue';
export default {
  setup(){
    let controller;
    const disable = ref(false);
    const prompt = ref("");
    const msg = ref('');
    const response = ref("");
    const getChat = async () =>{
      disable.value = true;
      msg.value = prompt.value;
      prompt.value ="";
      controller = new AbortController();
      const signal = controller.signal;
      const message = { role: 'user', content: msg.value };
      
      try{
        const res = await axios.post('http://127.0.0.1:11434/api/chat', 
          {
          'model': 'tinyllama:latest',
          "messages": [message],
          //'prompt': msg.value,
          "stream": !false,
        },
        {signal}
        );
        
        //console.log(res.data)
        
        const reader = res.data.message.getReader();
        const decoder = new TextDecoder();
        const stream = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Stream ended
              disable.value = false;
              break;
            }
            // Handle each chunk of data
            //console.log(value)
            const chunk = decoder.decode(value);
            //const  val = JSON.parse(chunk)
            const resp = chunk.message//.content;
            console.log(JSON.stringify(chunk.message))
            response.value += resp;//JSON.stringify(val)//.content.toString();//.toString();// || JSON.parse(val).message.system.toString()//.system
            console.log(response.value)
            disable.value = true;
          }
        };
         stream();
         
        /*
        const res = await axios.post('http://127.0.0.1:11434/api/chat',
        {
          'model': 'ai-doctor',
          "messages": [message],
          //'prompt': msg.value,
          "format": "json",
          "stream": !false,
        },
        {responseType: "stream", signal: signal},
      );
      */
      //response.value = res.data.message.content
        //console.log(res.data)
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
   
const tryChat = async () =>{
  disable.value = true;
  msg.value = prompt.value;
  prompt.value ="";
  controller = new AbortController();
      const signal = controller.signal;
  const message = { role: 'user', content: msg.value };
  const res = await ollama.chat({model:'ai-doctor', messages : [message], stream: !false }, {signal})
  //const res = await ollama.generate({model:'tinyllama', prompt: msg.value, stream: false, raw: true })
  //response.value = res.message.content || "something went wrong"
  console.log(res)
  //console.log(res.message.content)
  for await (var part of res) {
    response.value += part.message.content.toString();
    console.log(part.message.content)
  }
  disable.value = false;
}
const tts = () => {
  TTS(response.value || 'nothing to talk about', {language: "english", volume:1, rate:1, pitch: 1})
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
        getChat, msg, prompt, response, disable, tryChat, clearOutput, copyOutput, stopGen, copyQ, tts
      }
  }    
}
</script>

<template>
  <!--div class="col-12 my-2">
    <h2 class="text-warning text-center">Baun Education</h2>
    <h3 class="text-light text-center">AI Tutor and Teacher Assistant</h3>
  </div-->
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
    
        <textarea disabled readonly class="form-control bg-dark text-light overflow-auto board" v-model="response" id="cop" >
          
        </textarea>
</div> 
<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 d-flex justify-content-between" >
  <div>
    <button class="btn btn-outline-warning" v-show="disable" @click="stopGen">Stop generating...</button>
    <button title="Copy response to clipboard"  data-bs-toggle="tooltip" data-bs-placement="top" class="btn btn-outline-warning" @click="copyOutput" v-show="response" >Copy</button>
    <button class="btn btn-outline-warning" @click="clearOutput" v-show="response">Clear</button>
  
  </div>
  <!--div class="dropdown">
  <button class="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    theme
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Dark</a></li>
    <li><a class="dropdown-item" href="#">Light</a></li>
  </ul>
</div-->
</div>
<div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 mx-3 my-2 position-sticky .start-50 bottom-0 .translate-middle-x">
      <div class="input-group my-4">
        <button class="input-group-text bg-warning text-dark" id="basic" @click="tts()">
          <i class="bi bi-mic-fill"></i>
        <!--span class="spinner-border] spinner-border-sm" aria-hidden="true" v-show="disable">
        </span-->
      </button>
        <input class="form-control" aria-describedby="basic" 
        placeholder="Student or Teacher? BaunBot can help" v-model="prompt"  @keyup.enter="getChat()">
        <button class="input-group-text bg-warning text-dark" id="basic" @click="getChat()">Go
        <!--span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="disable">
        </span-->
      </button>
  </div>
</div>
</template>
<style scoped>
textarea{
  outline-color: yellow;
}
</style>