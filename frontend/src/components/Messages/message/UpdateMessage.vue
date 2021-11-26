<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
// import { MessageInterface } from "~/types/interfaces";

const messageStore = useMessageStore();
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
          <button @click="messageStore.showModal" class="float-right">
            <carbon-edit class="float-right" />
          </button>

          <input
            type="text"
            placeholder="Title"
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
        <button @click="messageStore.showModal" class="float-right">
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
