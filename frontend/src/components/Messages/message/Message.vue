<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
// import { MessageInterface } from "~/types/interfaces";

const messageStore = useMessageStore();
</script>

<template>
  <div
    class="msg hover relative"
    v-for="message in messageStore.getMessages"
    :key="message.id"
  >
    <div class="header">
      <button @click="messageStore.changeMessage(message)" class="float-right">
        <carbon-edit class="float-right" />
      </button>

      <div class="prose pb-3">
        <h4 >{{ message.title }}</h4>
      </div>
    </div>

    <p>
      {{ message.body }}
    </p>
  </div>

  <div class="updateModal"></div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style scoped>
h4 {
  margin: 0em;
}
</style>
