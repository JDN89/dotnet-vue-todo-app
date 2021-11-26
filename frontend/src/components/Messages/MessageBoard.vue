<script setup lang="ts">
import Message from "./message/Message.vue";
import { MessageInterface } from "~/types/interfaces";

import { useMessageStore } from "~/stores/messages";

const onUpdateMessage = (message: MessageInterface) => {
  console.log(message);
};

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
    <Message @update-message="onUpdateMessage" />
  </div>
  <div>
    <UpdateMessage v-if="messageStore.getShowModal" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
