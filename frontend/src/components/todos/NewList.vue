<script setup lang="ts">
import { newListInterface } from "~/types/interfaces";

import { useTodoStore } from "~/stores/todos";

const todoStore = useTodoStore();

const todo = ref<string>("");

const addNewTodo = () => {
  if (todo.value.length > 0) {
    newList.todos.push(todo.value);
    todo.value = "";
  } else {
    alert("please fill in a todo item");
  }
};

const newList: newListInterface = reactive({
  userId: null,
  title: "",
  todos: [],
  archived: [],
});

const addList = () => {
  newList.userId = Math.floor(Math.random() * 100);
  let copyOfList = Object.assign({}, newList);
  if (newList.title?.length === 0) {
    return alert("Give your To-Do List a title");
  } else if (newList.todos?.length == 0) {
    return alert("Your To-Do list has 0 tasks");
  } else {
    try {
      todoStore.add(copyOfList);
    } catch (error) {
      console.error(error);
    } finally {
      newList.userId = null;
      newList.title = "";
      newList.todos = [];
      newList.archived = [];
    }
  }
};
</script>

<template>
  <div
    class="
      container
      sm:flex
      mx-auto
      sm:flex-wrap sm:flex-grow-0 sm:flex-none sm:
      justify-center
    "
  >
    <div class="list relative">
      <div class="title">
        <input
          type="text"
          placeholder="Give your list a title"
          v-model="newList.title"
          class="
            transition
            duration-500
            bg-gray-100
            dark:bg-dark-200
            focus:outline-none
          "
        />
      </div>
      <!-- <hr class="w-3/4 mx-auto dark:gray-100"   /> -->
      <div class="todo">
        <input
          type="text"
          placeholder="Add your todo"
          v-model="todo"
          @keyup.enter="addNewTodo"
          @blur="addNewTodo"
          class="
            bg-gray-100
            dark:bg-dark-200
            transition
            duration-500
            focus:outline-none
          "
        />
      </div>
      <hr class="hr" />
      <div class="newTodos">
        <ul class="pt-3 items-end">
          <li
            v-for="todo in newList.todos"
            :key="todo"
            class="flex justify-left items-start"
          >
            <carbon-checkbox class="mx-3 my-auto" /> {{ todo }}
          </li>
        </ul>
        <button @click="addList" class="float-right">
          <carbon-add-alt />
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>

<style scoped>
.newTodos {
  text-align: left;
}
</style>
