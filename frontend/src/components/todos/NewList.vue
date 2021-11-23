<script setup lang="ts">
import { newListInterface } from "~/types/interfaces";

const todo = ref<string>("");

const addNewTodo = () => {
  newList.todos.push(todo.value);
  todo.value = "";
};

const newList: newListInterface = reactive({
  userId: null,
  title: "",
  todos: [],
  archived: [],
});
</script>

<template>
  <div class="container">
    <div class="title">
      <input
        type="text"
        placeholder="Give your list a title"
        v-model="newList.title"
      />
    </div>
    <hr />
    <div class="todo">
      <input
        type="text"
        placeholder="Add your todo"
        v-model="todo"
        @keyup.enter="addNewTodo"
        @blur="addNewTodo"
      />
    </div>
    <hr />
    <div class="newTodos">
      <ul>
        <li v-for="todo in newList.todos" :key="todo">
          <carbon-checkbox class="mr-3" /> {{ todo }}
        </li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>
