<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
const messageStore = useMessageStore();
</script>

<template>



  <div class="msg" v-for="message in messageStore.messages" :key="message.id">
    <p>
      {{ message.description }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
