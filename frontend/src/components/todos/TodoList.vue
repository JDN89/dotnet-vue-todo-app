<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";

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
          <div class="listAlign relative">
            <li v-for="todo in list.todos" :key="todo">
              <carbon-checkbox
                @click="archiveTask(list.listId, todo)"
                class="mr-2 my-auto hover"
              />{{ todo }}
            </li>
          </div>
        </ul>
      </div>

      <hr v-if="list.archived !== null || undefined" class="m-2" />

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
