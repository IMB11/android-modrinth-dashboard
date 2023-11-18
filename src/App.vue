<template>
  <NavPanel :show="showDrawer" @hide="showDrawer = false" />
  <div v-if="router.currentRoute.value.name !== 'Login'" class="navbar">
    <Button iconOnly @click="showDrawer = true"><HamburgerIcon /></Button>
    <div class="navbar-item">
      <h1>{{ router.currentRoute.value.name }}</h1>
    </div>
  </div>
  <div class="padded">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from "@/store";
import { onBeforeMount, ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { Button, HamburgerIcon } from "omorphia";

import UserComponent from "./components/UserComponent.vue";
import NavPanel from "./components/NavPanel.vue";

const store = useDataStore();
const router = useRouter();

const showDrawer = ref(false);

onBeforeMount(() => {
  document.documentElement.className = `${store.theme}-mode`;

  if (!store.token) {
    router.push("/login");
    return;
  }

  store.refreshUser();
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
}
</style>
