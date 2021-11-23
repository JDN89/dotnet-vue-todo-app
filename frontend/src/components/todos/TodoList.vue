<script setup lang="ts">
import { useTodoStore } from "~/stores/todos";

const { t, availableLocales, locale } = useI18n();


const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

const todoStore = useTodoStore();
console.log(todoStore.getLists);
</script>

<template>
  <h1>My To do lists</h1>

  <div
    class="
      container
      sm:flex
      mx-auto
      sm:flex-wrap sm:flex-grow-0 sm:flex-none sm:justify-center
    "
  >
    <div v-for="list in todoStore.getLists" :key="list.listId" class="list">
      <div class="title prose">
        <h3>
          {{ list.title }}
        </h3>
      </div>
      <hr class="m-2" />
      <div class="todos">
        <ul>
          <li v-for="todo in list.todos" :key="todo">
            <carbon-checkbox class="mr-3" />{{ todo }}
          </li>
        </ul>
      </div>

      <hr class="m-2" v-if="list.archived.length > 0" />

      <div class="archived">
        <ul>
          <li v-for="archived in list.archived" :key="archived">
            <carbon-checkbox-checked /> {{ archived }}
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
