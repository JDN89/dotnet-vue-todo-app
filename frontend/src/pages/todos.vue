<script setup lang="ts"></script>

<template>
  <p>Todos Page</p>
  <TodoList
    class="
      sm:flex
      mx-auto
      sm:flex-wrap sm:flex-grow-0 sm:flex-none sm:justify-center
    "
  ></TodoList>
</template>

<route lang="yaml">
meta:
  layout: dashboard
</route>
