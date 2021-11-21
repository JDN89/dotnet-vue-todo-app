<script setup lang="ts">
import Message from "./Message.vue";
</script>

<template>
  <div
    class="sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm:justify-center "
  >
    <Message />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
