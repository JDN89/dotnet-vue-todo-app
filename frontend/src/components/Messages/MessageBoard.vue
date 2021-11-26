<script setup lang="ts">
import Message from "./message/Message.vue";
import UpdateMessage from "./message/UpdateMessage.vue";

import { useMessageStore } from "~/stores/messages";

const messageStore = useMessageStore();
console.log(messageStore.getShowModal);
</script>

<template>
  <div>
    <CreateNewMessage />
  </div>
  <div
    class="
      sm:flex
      mx-auto
      sm:flex-wrap sm:flex-grow-0 sm:flex-auto sm:justify-center
    "
  >
    <Message @change-message="changeMessage" />
  </div>
  <div>
    <UpdateMessage v-if="messageStore.getShowModal" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
