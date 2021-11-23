<script setup lang="ts">
import { newListInterface } from "~/types/interfaces";

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
            focus:text focus:textColor-teal-700
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
          class="bg-gray-100 dark:bg-dark-200 transition duration-500"
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
