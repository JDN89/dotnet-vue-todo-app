<script setup lang="ts">
import { useAlertStore } from "~/stores/alertStore";
import { useMessageStore } from "~/stores/messages";
import { MessageInterface } from "~/types/interfaces";

const { t } = useI18n();
const messageStore = useMessageStore();
const alertStore = useAlertStore();

const updateMessage = () => {
  let copyOfMessage = Object.assign({}, messageToChange);
  if (messageToChange.title?.length === 0) {
    alertStore.showAlert = true;
    return (alertStore.alertMessage = t("alert.title"));
  } else if (messageToChange.body?.length == 0) {
    alertStore.showAlert = true;
    return (alertStore.alertMessage = t("alert.content"));
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
    class="flex bg-gray-800 bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 items-center"
  >
    <div
      class="msg min-h-44 max-h-lg w-full m-1 p-2 sm:max-w-70 content-center sm:mx-auto mx-auto"
    >
      <div v-if="messageStore.getShowModal">
        <div class="header">
          <button
            :title="t('button.submit')"
            @click="updateMessage"
            class="float-right"
          >
            <carbon-upload class="float-right" />
          </button>

          <input
            type="text"
            placeholder="Title"
            v-model="messageToChange.title"
            class="py-3 float-left bg-transparent transition duration-500 overflow-hidden focus:outline-none"
          />

          <textarea
            type="text"
            spellcheck="false"
            w:resize="none"
            placeholder="Your message"
            v-model="messageToChange.body"
            class="bg-transparent float-left min-h-44 max-h-66 min-w-full transition duration-500 focus:outline-none overflow-auto"
          ></textarea>
        </div>
        <button
          :title="t('button.delete')"
          @click="messageStore.deleteMessage(messageToChange.id)"
          class="float-right"
        >
          <carbon-trash-can />
        </button>
      </div>
      <Alert v-if="alertStore.getShowAlert" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
