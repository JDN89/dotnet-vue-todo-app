<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
// import { MessageInterface } from "~/types/interfaces";

const messageStore = useMessageStore();
const showModal = () => {
  messageStore.showModal();
};
</script>

<template>
  <div
    class="msg relative"
    v-for="message in messageStore.getMessages"
    :key="message.id"
  >
    <div class="header">
      <button @click="showModal()" class="float-right">
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
