<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";

const todoStore = useTodoStore();
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
    <div v-for="list in todoStore.getLists" :key="list.listId" class="list">
      <div class="title prose">
        <h3>
          {{ list.title }}
        </h3>
      </div>
      <hr class="hr" />
      <div class="todos">
        <ul relative>
          <li v-for="todo in list.todos" :key="todo">
            <carbon-checkbox class="mr-2" />{{ todo }}
          </li>
        </ul>
      </div>

      <hr class="m-2" v-if="list.archived.length > 0" />

      <div class="archived">
        <ul>
          <div class="listAlign">
            <li v-for="archived in list.archived" :key="archived">
              <carbon-checkbox-checked class="icon mr-2" /> {{ archived }}
            </li>
          </div>
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
.archived,
.todos {
  text-align: left;
  justify-content: start;
}
</style>
