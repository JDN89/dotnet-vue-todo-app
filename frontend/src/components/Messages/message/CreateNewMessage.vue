<script setup lang="ts">
import { NewMessageInterface } from "~/types/interfaces";
import { useMessageStore } from "~/stores/messages";

const { t } = useI18n();
const messageStore = useMessageStore();

let isVisible = ref(false);

const showHidden = () => {
  isVisible.value = true;
};
//change id of message and create a message interface
let message: NewMessageInterface = reactive({
  Title: "",
  Body: "",
});

const addMessage = () => {
  // message.id = Math.floor(Math.random() * 100);
  let copyOfMessage = Object.assign({}, message);
  if (message.Title?.length === 0) {
    return alert("Please give your message a title");
  } else if (message.Body?.length == 0) {
    return alert("Your To-Do list has 0 tasks");
  } else {
    try {
      messageStore.addMessage(copyOfMessage);
    } catch (error) {
      console.error(error);
    } finally {
      message.Title = "";
      message.Body = "";

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
        hover
        relative
        min-w-xs
        bg-gray-600
        text-gray-200
        dark:bg-gray-200 dark:text-gray-900
      "
    >
      <h3>{{ t("page.home") }}</h3>
    </div>

    <div v-else class="hover list relative min-w-xs">
      <div class="title">
        <input
          type="text"
          placeholder="Title"
          v-model="message.Title"
          class="
            transition
            duration-500
            bg-gray-100
            dark:bg-dark-200
            focus:outline-none
          "
        />
        <div class="description">
          <textarea
            type="text"
            placeholder="Log"
            v-model="message.Body"
            class="
              transition
              duration-500
              bg-gray-100
              dark:bg-dark-200
              focus:outline-none
              overflow-hidden
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
