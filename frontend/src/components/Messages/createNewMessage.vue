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
          placeholder="title"
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
            placeholder="say something"
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
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
