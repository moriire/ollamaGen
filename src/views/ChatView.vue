<script>
import axios from 'axios';
import moment from 'moment';
import TTS from 'text-to-speech-offline';
import { useVoiceSettingsStore } from '@/stores/counter';
import { ref } from 'vue';
export default {
    setup() {
        let controller;
        const glob = useVoiceSettingsStore();
        const disable = ref(false);
        const total_duration = ref(0);
        const prompt = ref("");
        const msg = ref('');
        const response = ref("");
        const conversations = ref([]);
        const formatTime = (x) => {
            return moment(x).seconds()
        }
        const getChat = async () => {
            disable.value = true;
            msg.value = prompt.value;
            conversations.value.push({ ques: msg.value, resp: '' });
            prompt.value = "";
            controller = new AbortController();
            const signal = controller.signal;
            const message = { role: 'user', content: msg.value };

            try {
                const res = await axios.post('http://127.0.0.1:11434/api/chat',
                    {
                        'model': glob.selectedModel,
                        "messages": [message],
                        //'prompt': msg.value,
                        "stream": false,
                        //"raw": true,
                        "options": {
                            "seed": 101,
                            "temperature": 0
                        }
                    },
                    { signal }
                );
                console.log(res.data);
                //total_duration.value = res.data.context.length / formatTime(res.data.eval_duration);
                response.value = res.data.message.content
                conversations.value.findLast(x => x).resp = response.value
                console.log(conversations.value.findLast(x => x))// = response.value
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
            conversations, formatTime, glob, getChat, msg, prompt, response, disable, clearOutput, copyOutput, stopGen, copyQ, tts, total_duration
        }
    }
}
</script>

<template>
    
            <div v-for="(conv, index) in  conversations" :key="index">
                <div class="row justify-content-start my-3 mx-2 .input-group">
                    <div id="system" class="col-lg-6 col-md-7 col-sm-8 col-xs-9 bg-warning .rounded-pill px-4 py-3">
                        <!--i class="bi bi-clipboard me-2"></i-->

                        {{ conv.ques }}
                    </div>
                </div>
                <div class="row justify-content-end my-3 mx-2 .input-group">
                    <div id="user"
                        class="col-lg-6 col-md-7 col-sm-8 col-xs-9 bg-light  .rounded-pill px-4 py-3">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="disable">
                        </span>
                        {{ conv.resp }}
                    </div>
                </div>
            </div>
           
            <div class="row justify-content-center .align-items-center">
        
        <div
                class="col-lg-10 col-md-10 col-sm-10 col-xs-12 .mx-3 my-2 position-absolute start-50 bottom-0 translate-middle-x">
                <div class="input-group my-4">
                    <input class="form-control" aria-describedby="basic"
                        placeholder="I am your AI Doctor. How are you feeling?" v-model="prompt"
                        @keyup.enter="getChat()">
                    <button class="input-group-text bg-warning text-dark" id="basic" @click="getChat()">
                        <i class="bi bi-play-fill"></i>
                    </button>
                </div>
            </div>
    </div>
</template>
<style scoped>
textarea {
    outline-color: yellow;
}

#system,
#user {
    max-height: max-content;
    min-height: min-content;
    max-width: max-content;
    min-width: min-content
}
</style>