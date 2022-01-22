<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";

const props = defineProps({
  todos: String,
});
// simplest way to convert string to number
console.log(Number(props.todos));

const todoStore = useTodoStore();
onMounted(() => {
  console.log("firing");
  
  todoStore.fetchTodoLists();
});
</script>

<template>
  <div class="mx-auto">
    <NewList />
   
    <TodoList />
  </div>
</template>

<route lang="yaml">
meta: { name: myTodos, layout: dashboard, requiresAuth: true }
</route>
