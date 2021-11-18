<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Dotnet - Vue TodoApp',
  meta: [
    { name: 'description', content: 'A simple todo app create with vue and ASP.NET Core' },
  ],
})
</script>

<template>
  <router-view />
</template>
