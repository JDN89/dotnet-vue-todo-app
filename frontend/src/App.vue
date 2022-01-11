<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";

// on loading the app
//check session to see if there is a token present
// if token present => login user and go to his todos page
onBeforeMount(async () => {
  const uStore = useUserStore();
  const router = useRouter();

  const token: string | null = window.sessionStorage.getItem("token");

  if (token) {
    await uStore.retrieveSession (token);

    router.replace({
      name: "myTodos",
    });
  }
});

useHead({
  title: "Dotnet - Vue TodoApp",
  meta: [
    {
      name: "description",
      content: "A simple todo app create with vue and ASP.NET Core",
    },
  ],
});
</script>

<template>
  <router-view />
</template>
