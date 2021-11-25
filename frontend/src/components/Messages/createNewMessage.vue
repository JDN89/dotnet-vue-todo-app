<script setup lang="ts">
const { t } = useI18n();
import { useMessageStore } from "~/stores/messages";
const messageStore = useMessageStore();
console.log(messageStore);

let isVisible = ref(false);
console.log(isVisible);

const showHidden = () => {
  isVisible.value = true;
};
//change id of message and create a message interface
let message = reactive({
  id: 0,
  title: "",
  description: "",
});

const addMessage = () => {
  message.id = Math.floor(Math.random() * 100);
  let copyOfMessage = Object.assign({}, message);
  if (message.title?.length === 0) {
    return alert("Please give your message a title");
  } else if (message.description?.length == 0) {
    return alert("Your To-Do list has 0 tasks");
  } else {
    try {
      messageStore.addMessage(copyOfMessage);
    } catch (error) {
      console.error(error);
    } finally {
      message.description = "";
      message.title = "";

      isVisible.value = false;
    }
  }
};
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
    <div
      @click="showHidden"
      v-if="!isVisible"
      class="
        prose
        list
        relative
        min-w-xs
        bg-gray-600
        text-gray-200
        dark:bg-gray-200 dark:text-gray-900
      "
    >
      <h3>{{ t("page.home") }}</h3>
    </div>

    <div v-else class="list relative min-w-xs">
      <div class="title">
        <input
          type="text"
          placeholder="Title"
          v-model="message.title"
          class="
            transition
            duration-500
            bg-gray-100
            dark:bg-dark-200
            focus:outline-none
          "
        />
        <div class="description">
          <input
            type="text"
            placeholder="Log"
            v-model="message.description"
            class="
              transition
              duration-500
              bg-gray-100
              dark:bg-dark-200
              focus:outline-none
            "
          />
        </div>
        <button @click="addMessage" class="float-right">
          <carbon-add-alt />
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
