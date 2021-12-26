<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
import { MessageInterface } from "~/types/interfaces";

const messageStore = useMessageStore();

const updateMessage = () => {
  let copyOfMessage = Object.assign({}, messageToChange);
  if (messageToChange.title?.length === 0) {
    return alert("Please give your message a title");
  } else if (messageToChange.body?.length == 0) {
    return alert("Please write a message that goes with the title");
  } else {
    try {
      messageStore.updateMessage(copyOfMessage);
    } catch (error) {
      console.error(error);
    } finally {
      messageToChange.title = "";
      messageToChange.body = "";
    }
  }
};

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
          <button @click="updateMessage" class="float-right">
            <carbon-upload class="float-right" />
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
            placeholder="Your message"
            v-model="messageToChange.body"
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
          @click="messageStore.deleteMessage(messageToChange.id)"
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
