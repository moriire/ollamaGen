<script>
import "@xterm/xterm/css/xterm.css"
import { useGenerateStore } from "../stores/generate.js";
import { useVoiceSettingsStore } from '../stores/counter.js';
import { Terminal } from '@xterm/xterm';
import { ref } from 'vue';
export default {
  setup() {
    const gen = useGenerateStore();
    const params = useVoiceSettingsStore();
    const term = new Terminal();
   //const ws = new WebSocket("ws://localhost:3000", "echo-protocol");
    var curr_line = "";
    var entries = [];
    term.open(document.getElementById("terminal"));
    term.write("hello $")
    return {
      gen,
      params
    }
  }
}
</script>

<template>

  <div class="row justify-content-center .align-items-center" id="main">
    <div class="" id="terminal" ></div>

  </div>
</template>
<style scoped>
textarea {
  outline-color: yellow;
}

div#main {
  height: 77vh;
}

div#gensys {
  overflow-y: scroll;
  white-space: pre-line;
  color: var(--bs-light) !important;
  max-height: 80vh;
}
</style>
