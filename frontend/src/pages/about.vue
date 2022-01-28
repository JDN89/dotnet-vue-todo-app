<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div class="text-black dark:text-light-50">
    <div
      class="msg prose py-7 mt-15 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl"
    >
      <p>
        {{ t("text.intro") }}
      </p>
    </div>
    <br />
    <div
      class="msg prose max-h-prose py-7 max-w-sm mx-auto bg-yellow-400 dark:bg-teal-700 rounded-2xl"
    >
      <h3>  {{ t("about.titleHowTo") }}</h3>
      <p>{{ t("about.homepage") }}</p>
      <p>
       {{ t("about.register") }}
      </p>

      <p>
       {{ t("about.security") }}
      </p>
    </div>
    <br />

    <!-- If I use prose on top of the dive container, I overwrite the list styling with default styling -->
    <!-- wrap the elements that you need to have the rose style tag in seperate div containters -->

    <div
      class="pt-4 msg min-h-99 max-w-sm mx-auto bg-yellow-400 border-none dark:bg-teal-700 rounded-2xl"
    >
      <div class="prose">
        <h3 class="my-0 pb-2 my-0"> {{ t("about.tech") }}</h3>
      </div>
      <ul class="prose list-disc list-inside">
        <h4>Frontend</h4>

        <li><span class="ml-3"> Vue 3 Composition API </span></li>
        <li><span class="ml-3"> Pinia: Vue Store </span></li>
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
