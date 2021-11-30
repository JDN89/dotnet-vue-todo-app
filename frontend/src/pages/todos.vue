<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <NewList />
  <div class="prose mx-auto py-6">
    <h2>{{ t("page.todos") }}</h2>
  </div>
  <TodoList />
</template>

<route lang="yaml">
meta: { layout: dashboard, requiresAuth: true }
</route>
