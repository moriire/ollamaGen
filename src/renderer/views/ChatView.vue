<script>
import { useChatStore } from "../stores/chat.js"
export default {
    setup() {
        const chat = useChatStore()
        return {
            chat
        }
    }
}
</script>

<template>
    <div class="row justify-content-center">
        <div style="height: 75vh; overflow-y: auto;"
            class="col-lg-10 col-md-10 col-sm-10 col-xs-12 .mx-3 my-2 position-sticky sticky-bottom .start-50 .bottom-0 .translate-middle-x">

            <div v-for="(conv, index) in  chat.conversations.slice(1,)" :key="index" class="responsive">
                <div class="row justify-content-start my-3 mx-2 .input-group" v-if="conv.role === 'system'">
                    <div id="system" class="col-lg-6 col-md-7 col-sm-8 col-xs-9 bg-warning .rounded-pill px-4 py-3">
                        <!--i class="bi bi-clipboard me-2"></i-->

                        {{ conv.content }}
                    </div>
                </div>
                <div class="row justify-content-end my-3 mx-2 .input-group" v-else>
                    <div id="user" class="col-lg-6 col-md-7 col-sm-8 col-xs-9 bg-light  .rounded-pill px-4 py-3">
                        <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show="chat.disable">
                        </span>
                        {{ conv.content }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="row justify-content-center .align-items-center sticky-bottom .start-50 .bottom-0 .translate-middle-x">
            <div
                class="col-lg-10 col-md-10 col-sm-10 col-xs-12 .mx-3 my-2 .fixed-bottom .start-50 .bottom-0 .translate-middle-x">
                <div class="input-group my-4">
                    <input class="form-control" aria-describedby="basic"
                        placeholder="I am your AI Doctor. How are you feeling?" v-model="prompt"
                        @keyup.enter="chat.getChat()">
                    <button class="input-group-text bg-warning text-dark" id="basic" @click="getChat()">
                        <i class="bi bi-play-fill"></i>
                    </button>
                </div>
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
    min-width: min-content;

}
</style>
