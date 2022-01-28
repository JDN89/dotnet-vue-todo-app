<script setup lang="ts">
import { useAlertStore } from "~/stores/alertStore";

const alertStore = useAlertStore();
</script>

<template>
  <div
    class="flex bg-gray-800 bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 items-center absolute"
  >
    <div
      class="alert prose content-center min-h-44 max-h-lg w-full m-1 p-2 sm:max-w-70 sm:mx-auto mx-auto"
    >
    <button
      class="float-right hover mt-1 mr-1"
      @click="alertStore.showAlert = false"
    >
      <bi-x-lg />
    </button>
    <h3 class="relative ">Alert: {{ alertStore.getAlertMessage }}</h3>
    
    </div>


  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>
