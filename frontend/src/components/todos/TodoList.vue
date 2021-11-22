<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";
const todoStore = useTodoStore();
console.log(todoStore.getLists);
</script>

<template>
  <p>TodoList</p>

  <div
    class="
      container
      sm:flex
      mx-auto
      sm:flex-wrap sm:flex-grow-0 sm:flex-none sm:justify-center
    "
  >
    <div v-for="list in todoStore.getLists" :key="list.listId" class="list">
      <div class="title">
        <h2>
          {{ list.title }}
        </h2>
      </div>
      <hr />
      <div class="todos">
        <ul>
          <li v-for="todo in list.todos" :key="todo"><i></i>{{ todo }}</li>
        </ul>
      </div>

      <hr />

      <div class="archived">
        <ul>
          <li v-for="archived in list.archived" :key="archived">
            <i></i> {{ archived }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>
