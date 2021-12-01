<script setup lang="ts">
import { isDark, toggleDark } from "~/composables";
import { useUserStore } from "~/stores/user";

const { t, availableLocales, locale } = useI18n();

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

const userStore = useUserStore();
const logout = userStore.logout;
</script>

<template>
  <!-- style inherited from mainclass in the layouts folder -->
  <nav class="text-xl mt-6 mb-4">
    <router-link
      @click="logout"
      class="icon-btn mx-2"
      to="/"
      :title="t('button.logout')"
    >
      <carbon-logout />
    </router-link>

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      href="https://github.com/JDN89/dotnet-todo-app"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>

    <div class="icon-btn mx-2"></div>
    <div class="icon-btn mx-2"></div>
    <button
      class="icon-btn mx-2 !outline-none"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a
      class="icon-btn mx-2"
      :title="t('button.toggle_langs')"
      @click="toggleLocales"
    >
      <carbon-language />
    </a>
  </nav>
</template>
