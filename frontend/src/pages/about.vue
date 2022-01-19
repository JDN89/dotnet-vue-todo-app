<script setup lang="ts"></script>

<template>
  <div class="text-black dark:text-light-50">
    <div
      class="msg py-7 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl"
    >
      <p>
        I created this project to try out the new minimal web API with ASP.NET
        Core.
      </p>

      <p>
        The project uses Authentication and Authorization, via JWT tokens and
        claims, to access the user his todo lists
      </p>
    </div>
    <br />
    <div
      class="msg prose max-h-prose py-7 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl"
    >
      <h3>How to use project</h3>
      <p>
        On the Homepage you can leave a message and say hello to the other side
      </p>
      <p>
        Register (with a fake email, just make sure that it contains "@" +
        ".com") and login in order to create, modify and delete your todo lists.
      </p>
    </div>
    <br />
    
    <!-- If I use prose on top of the dive container, I overwrite the list styling with default styling -->
    <!-- wrap the elements that you need to have the rose style tag in seperate div containters -->

    <div
      class="pt-4 msg min-h-99 max-w-sm mx-auto bg-yellow-400 border-none dark:bg-teal-700 rounded-2xl"
    >
      <div class="prose">
        <h3 class="my-0 pb-2 my-0">Technologies used:</h3>
      </div>
      <ul class="prose list-disc list-inside">
        <h4>Frontend</h4>

        <li><span class="ml-3"> Vue 3 Composition API </span></li>
        <li><span class="ml-3"> Pinia:Vue Store </span></li>
        <li><span class="ml-3"> Windi CSS </span></li>
        <li><span class="ml-3"> Typescript </span></li>

        <h4>Backend</h4>
        <li><span class="ml-3"> ASP.NET Core minimal web API </span></li>
        <li><span class="ml-3"> PostgreSQL </span></li>
        <li><span class="ml-3"> Dapper: object–relational mapping </span></li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<style scoped>
li {
  text-align: left;
}
li::before {
  background-color: dark;
}
</style>
