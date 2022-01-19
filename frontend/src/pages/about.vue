<script setup lang="ts"></script>

<template>
  <div class="text-black dark:text-light-50">
    <div
      class=" msg py-7 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl"
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
      class="msg prose py-7 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl"
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

    <div
      class="pt-4 min-h-md max-h-prose msg prose max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl"
    >
      <h3 class="my-0 pb-0 my-0">Technologies used:</h3>
      <ul>
        <h4 class="my-o py-0">Frontend</h4>

        <li>Vue 3 Composition API, using the new script setup syntax</li>
        <li>Pinia:Vue Store to share a state across components/pages</li>
        <li>Windi CSS</li>
        <li>Typescript</li>
        <h4>Backend</h4>
        <li>ASP.NET Core minimal web API</li>
        <li>PostgreSQL</li>
        <li>Dapper: object–relational mapping</li>
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
</style>
