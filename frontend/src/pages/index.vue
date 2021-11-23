<script setup lang="ts">
const { t } = useI18n();

</script>

<template>
  <div class="prose mx-auto py-6">
    <h2>{{ t("page.home") }}</h2>
  </div>
  <MessageBoard/>
  

  
</template>


<route lang="yaml">
meta:
  layout: default
</route>
