<script setup lang="ts">
const { t } = useI18n();

const props = defineProps({
  todos: String,
});
// simplest way to convert string to number
console.log(Number(props.todos));
</script>

<template>
  <div>
    <NewList />
    <div class="prose mx-auto py-6">
      <h2>{{ t("page.todos") }}</h2>
    </div>
    <TodoList />
  </div>
</template>

<route lang="yaml">
meta: { layout: dashboard, requiresAuth: true }
</route>
