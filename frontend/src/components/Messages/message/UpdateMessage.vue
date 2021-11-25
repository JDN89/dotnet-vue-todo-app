<script setup lang="ts">

import { useMessageStore } from "~/stores/messages";
const messageStore = useMessageStore();

</script>

<template>
  <div v-if="messageStore.getShowModal">
    <p>SHOW MEEEEE</p>
  </div>

</template>

<route lang="yaml">
meta:
  layout: default
</route>
