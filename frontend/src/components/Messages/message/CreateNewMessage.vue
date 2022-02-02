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
    <button
      v-if="!isVisible"
      :title="t('page.home')"
      @click="showHidden"
      class="hover scale-220 hover:scale-270 bg-transparent text-red-900 hover:text-dark-600 dark:text-teal-500 hover:dark:text-gray-50"
    >
      <ant-design-message-filled />
    </button>

    <div v-else class="hover msg relative min-w-xs">
      <div class="message">
        <input
          type="text"
          :placeholder="t('input.title')"
          v-model="message.Title"
          class="transition duration-500 float-left text-dark-900 bg-transparent focus:outline-none"
        />
        <div class="description">
          <textarea
            spellcheck="false"
            w:resize="none"
            type="text"
            :placeholder="t('input.message')"
            v-model="message.Body"
            class="transition duration-500 float-left bg-transparent focus:outline-none overflow-hidden"
          />
        </div>
      </div>
      <button
        @click="addMessage"
        class="float-right relative mt-15 hover"
        :title="t('button.submit')"
      >
        <carbon-add-alt />
      </button>
    </div>
    <Alert v-if="alertStore.getShowAlert" class="pb-100 sm:pb-50" />
  </div>
</template>

<style scoped>
input {
  padding-left: 13px;
}

textarea {
  padding-left: 13px;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
