<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
import { MessageInterface } from "~/types/interfaces";

const messageStore = useMessageStore();
const changeMessage = (message: MessageInterface) => {};
</script>

<template>
  <div
    class="msg relative"
    v-for="message in messageStore.getMessages"
    :key="message.id"
  >
    <div class="header">
      <button @click="changeMessage(message)" class="float-right">
        <carbon-edit class="float-right" />
      </button>

      <div class="prose">
        <h3>{{ message.title }}</h3>
      </div>
    </div>

    <p>
      {{ message.description }}
    </p>
  </div>

  <div class="updateModal"></div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style scoped>
h3 {
  margin: 0em;
}
</style>
