<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";

onBeforeMount(async () => {
  const uStore = useUserStore();
  const router = useRouter();
  const token: string | null = window.sessionStorage.getItem("token");

  if (token) {
    //retrieve Sessions (action pass tokene en userId)

    const response = await uStore.retrieveSession(token);
    console.log(response);
    
    if (response !== true) {
      console.log(response);

      router.replace({
        name: "myTodos",
      });
    } else {
      console.log( "response is false");
      
     }
  } else {
    console.log("no token is present");
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
