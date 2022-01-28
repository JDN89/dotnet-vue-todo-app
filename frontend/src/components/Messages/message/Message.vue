<script setup lang="ts">
import { useMessageStore } from "~/stores/messages";
// import { MessageInterface } from "~/types/interfaces";
const { t } = useI18n();

const messageStore = useMessageStore();
</script>

<template>
 <masonry :cols="{ default:5, 1280:4 , 1192: 3, 768: 2, 450: 1 }"
        :gutter="{ default: '20px', 700: '15px', 500:'0px' }" class="HERE mx-auto container justify-center">

  <div
    class="msg max-h-lg hover relative"
    v-for="message in messageStore.getMessages"
    :key="message.id"
  >
    <div class="header">
      <button :title="t('button.change')" @click="messageStore.changeMessage(message)" class="float-right">
        <carbon-edit class="float-right hover" />
      </button>

      <div class="prose pb-3 pl-4">
        <h4 >{{ message.title }}</h4>
      </div>
    </div>

    <p>
      {{ message.body }}
    </p>
  </div>
  </masonry>

  <div class="updateModal"></div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style scoped>
h4 {
  margin: 0em;
}
</style>
