<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";

const todoStore = useTodoStore();
onMounted(() => {
  todoStore.fetchTodoLists();
});
</script>

<template>
  <div class="mx-auto">
    <NewList />

    <TodoList />
  </div>
  <div v-if="todoStore.getShowAddTodoComponent">
    <AddTodo />
  </div>
</template>

<route lang="yaml">
meta: { name: myTodos, layout: dashboard, requiresAuth: true }
</route>
