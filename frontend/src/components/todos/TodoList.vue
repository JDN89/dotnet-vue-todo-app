<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";
import{ref} from 'vue'

const todoStore = useTodoStore();

const deleteList = (listId: number) => {
  todoStore.deleteList(listId);
};
const archiveTask = (listId: number, todo: string) => {
  todoStore.archiveTask(listId, todo);
};
const unArchiveTask = (listId: number, todo: string) => {
  todoStore.unArchiveTask(listId, todo);
};

let newTodo = ref<string|null>(null);

const addNewTodo = (
  listId: number,
  todo: string | null,
  todos: string[]
) => {
  if (todo?.length == null) return alert("todo is null");
  if (todos.includes(todo)) return alert("todo item already exists!");
  todoStore.addTodo(listId, todo);
  newTodo.value = null
};
</script>

<template>
  <div
    class="container sm:flex mx-auto sm:flex-wrap sm:flex-grow-0 sm:flex-none sm: justify-center"
  >
    <!-- <div class="mx-auto"> -->
    <masonry
      :cols="{ default: 5, 1280: 4, 1192: 3, 840: 2, 520: 1 }"
      :gutter="{ default: '20px', 700: '15px', 500: '0px' }"
      class="mx-auto container justify-center"
    >
      <div
        v-for="list in todoStore.getLists"
        :key="list.listId"
        class="msg hover max-h-screen-lg overflow-auto"
      >
        <button @click="deleteList(list.listId)" class="float-right">
          <carbon-trash-can class="float-right hover" />
        </button>
        <div class="title prose">
          <h3>
            {{ list.title }}
          </h3>
        </div>
        <hr class="hr max-w-27 pb-3" />
        <div class="todos">
          <ul>
            <div class="relative">
              <li v-for="todo in list.todos" :key="todo">
                <carbon-checkbox
                  @click="archiveTask(list.listId, todo)"
                  class="mr-2 my-auto hover"
                />{{ todo }}
              </li>
            </div>
          </ul>

          <div class="relative">
            <bi-plus-lg
              @click="todoStore.showAddTask = true"
              :key="list.listId"
              class="justify-start"
            />

            <input
              type="text"
              v-model="newTodo"
              placeholder="Add a new todo"
              class="max-w-43 bg-transparent mx-auto ml-3 overflow-hidden"
              @blur="addNewTodo(list.listId, newTodo, list.todos)"
            />
          </div>
        </div>

        <hr class="m-2" />

        <div class="archived">
          <ul>
            <li
              v-for="archived in list.archived"
              :key="archived"
              class="flex justify-left items-start"
            >
              <carbon-checkbox-checked
                @click="unArchiveTask(list.listId, archived)"
                class="mr-2 my-auto hover"
              />

              {{ archived }}
            </li>
          </ul>
        </div>
      </div>
    </masonry>
  </div>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>

<style scoped>
.todos,
.archived {
  text-align: left;
}

.list {
  overflow-wrap: break-word;
  overflow: hidden;
}
</style>
