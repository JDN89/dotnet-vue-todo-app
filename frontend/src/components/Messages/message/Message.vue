<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
const messageStore = useMessageStore();
console.log(messageStore.getMessages);
</script>

<template>
  <div
    class="msg prose"
    v-for="message in messageStore.getMessages"
    :key="message.id"
    
  >
    <h3>{{ message.title }}</h3>

    <p>
      {{ message.description }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
