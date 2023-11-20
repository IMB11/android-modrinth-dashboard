<template>
  <div class="padded">
    <RouterView />
  </div>
  <NavHelper v-if="!isLoginPage" />
</template>

<script setup lang="ts">
import { useDataStore } from "@/store";
import { computed, onBeforeMount, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavHelper from "./components/NavHelper.vue";

const store = useDataStore();
const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  document.documentElement.className = `${store.theme}-mode`;

  if (!store.token) {
    router.push("/login");
    return;
  }

  try {
    store.refreshUser();
  } catch (e) {
    router.push("/login");
    return;
  }
});

const isLoginPage = computed(() => {
  console.log(route.name === "Login");
  return route.name === "Login";
});
</script>

<style lang="scss">
* {
  -webkit-tap-highlight-color: transparent;
}

.navbar {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: 1rem;

  h1 {
    // Resize font so that is doesn't wrap, use vw
    font-size: max(1.5rem, 5vw);
    width: 100%;

    vertical-align: middle;
  }
}

.navbar-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.padded {
  padding: 5%;
  margin-bottom: 15%;
}
</style>
