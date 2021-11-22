<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";
const todoStore = useTodoStore();
console.log(todoStore.getLists);
</script>

<template>
  <p>TodoList</p>

  <div class="container">
    <div v-for="list in todoStore.getLists" :key="list.listId" class="list">
      <div class="title">
        <h3>
          {{ list.title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>
