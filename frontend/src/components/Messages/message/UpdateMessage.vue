<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
import { MessageInterface } from "~/types/interfaces";

const messageStore = useMessageStore();

let messageToChange: MessageInterface;
if (messageStore.getChangedMessage) {
  messageToChange = messageStore.getChangedMessage;
}
</script>

<template>
  <div
    class="
      flex
      bg-gray-800 bg-opacity-50
      fixed
      left-0
      right-0
      bottom-0
      top-0
      items-center
    "
  >
    <div
      class="
        update-msg
        w-full
        m-1
        p-2
        max-h-52
        min-h-22
        sm:max-w-70
        overflow-hidden
        sm:mx-auto
      "
    >
      <div v-if="messageStore.getShowModal">
        <div class="header">
          <button
            @click="messageStore.updateMessage(messageToChange)"
            class="float-right"
          >
            <carbon-edit class="float-right" />
          </button>

          <input
            type="text"
            placeholder="Title"
            v-model="messageToChange.title"
            class="
              transition
              duration-500
              bg-gray-100
              dark:bg-dark-200
              focus:outline-none
            "
          />

          <textarea
            type="text"
            placeholder="SHOOOWWWW MEEE"
            v-model="messageToChange.description"
            class="
              transition
              duration-500
              bg-gray-100
              dark:bg-dark-200
              focus:outline-none
              overflow-hidden
            "
          ></textarea>
        </div>
        <button
          @click="messageStore.deleteMessage(messageToChange)"
          class="float-right"
        >
          <carbon-trash-can />
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
