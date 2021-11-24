<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
const messageStore = useMessageStore();
console.log(messageStore);

let isVisible = ref(false);
console.log(isVisible);

const showHidden = () => {
  isVisible.value = true;
};

let message = reactive({
  id: null,
  title: "",
  description: "",
});
</script>

<template>
  <div
    class="
      container
      sm:flex
      mx-auto
      sm:flex-wrap sm:flex-grow-0 sm:flex-none sm:
      justify-center
    "
  >
    <div @click="showHidden" v-if="!isVisible" class="list relative min-w-xs">
      <h4>Write A Message</h4>
    </div>

    <div v-else class="list relative min-w-xs">
      <div class="title">
        <input
          type="text"
          placeholder="Give your list a title"
          v-model="message.title"
          class="
            transition
            duration-500
            bg-gray-100
            dark:bg-dark-200
            focus:outline-none
          "
        />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
