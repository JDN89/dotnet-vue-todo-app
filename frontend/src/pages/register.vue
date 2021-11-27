<script setup lang="ts">
import { useUserStore } from "~/stores/user";
const { t } = useI18n();

const onsubmit = () => {
  console.log("submit");
};

const userStore = useUserStore();
console.log(userStore.getUsers);
</script>

<template>
  <div class="prose mx-auto py-6">
    <h2>{{ t("page.register") }}</h2>
    <form @submit="onsubmit"></form>
  </div>
</template>
