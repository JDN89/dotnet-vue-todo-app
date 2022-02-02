<script setup lang="ts">
import { NewMessageInterface } from "~/types/interfaces";
import { useMessageStore } from "~/stores/messages";
import { useAlertStore } from "~/stores/alertStore";

const alertStore = useAlertStore();

const { t } = useI18n();
const messageStore = useMessageStore();

let isVisible = ref(false);

const showHidden = () => {
  isVisible.value = true;
};
let message: NewMessageInterface = reactive({
  Title: "",
  Body: "",
});

const addMessage = () => {
  let copyOfMessage = Object.assign({}, message);
  if (message.Title?.length === 0) {
    alertStore.showAlert = true;
    return (alertStore.alertMessage = t("alert.title"));
  } else if (message.Body?.length == 0) {
    return (alertStore.alertMessage = t("alert.content"));
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
    class="container sm:flex mx-auto sm:flex-wrap pt-10 pb-5 sm:flex-grow-0 sm:flex-none sm: justify-center"
  >
    <!-- <div
      v-if="!isVisible"
      w:border="yellow-300 1 rounded-lg"
      w:dark="border-gray-50 bg-teal-700 text-white"
      class="font-medium content-center align-middle w-25 bg-red-700 text-yellow-400"
    >
      <span>
        {{ t("page.home") }}
      </span> -->
    <button
      v-if="!isVisible"
      :title="t('page.home')"
      @click="showHidden"
      class="hover scale-220 hover:scale-270 bg-transparent text-red-900 hover:text-dark-600 dark:text-teal-500 hover:dark:text-gray-50"
    >
      <ant-design-message-filled />
    </button>
    <!-- </div> -->

    <div v-else class="hover msg relative min-w-xs">
      <div class="message mx-auto">
        <carbon-pen-fountain class="mt-1 absolute"/>
        <input
          type="text"
          :placeholder="t('input.title')"
          v-model="message.Title"
          class="transition duration-500 text-dark-900 bg-transparent focus:outline-none "
        />
        <div class="description">
          <carbon-pen-fountain class="icon mt-1 absolute"/>
          <textarea
            spellcheck="false"
            w:resize="none"
            type="text"
            :placeholder="t('input.message')"
            v-model="message.Body"
            class="transition duration-500 bg-transparent focus:outline-none overflow-hidden"
          />
        </div>
        <button
          @click="addMessage"
          class="float-right hover"
          :title="t('button.submit')"
        >
          <carbon-add-alt />
        </button>
      </div>
    </div>
  <Alert v-if="alertStore.getShowAlert" class="pb-100 sm:pb-50" />
  </div>
</template>

<style scoped>

input, textarea {
  padding-left: 33px;
}
  </style>

<route lang="yaml">
meta:
  layout: default
</route>


