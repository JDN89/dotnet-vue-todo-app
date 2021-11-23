<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";

const todoStore = useTodoStore();
const deleteList = (listId: number) => {
  todoStore.deleteList(listId);
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
      class="list relative"
    >
      <button @click="deleteList(list.listId)" class="float-right">
        <carbon-trash-can class="float-right" />
      </button>
      <div class="title prose">
        <h3>
          {{ list.title }}
        </h3>
      </div>
      <hr class="hr" />
      <div class="todos">
        <ul>
          <div class="listAlign relative">
            <li v-for="todo in list.todos" :key="todo">
              <carbon-checkbox class="mr-2 my-auto" />{{ todo }}
            </li>
          </div>
        </ul>
      </div>

      <hr class="m-2" v-if="list.archived.length > 0" />

      <div class="archived">
        <ul>
          <li
            v-for="archived in list.archived"
            :key="archived"
            class="flex justify-left items-start"
          >
            <carbon-checkbox-checked class="mr-2 my-auto" />

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
