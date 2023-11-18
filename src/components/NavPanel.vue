<template>
  <div
    v-if="router.currentRoute.value.name !== 'Login'"
    class="navbar"
    :class="`navbar-drawer ${show ? 'open' : ''}`"
  >
    <div>
      <div class="navbar-drawer-top">
        <Button iconOnly @click="$emit('hide')"><XIcon /></Button>
        <h1>Modrinth Dashboard</h1>
      </div>
      <div
        class="navbar-link"
        v-for="route in router
          .getRoutes()
          .filter((route) => route.name !== 'Login')"
      >
        <Button large @click="gotoRoute(route)"
          ><component :is="getIconForRoute(route)"></component>
          {{ route.name }}</Button
        >
      </div>
      <UserComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button, XIcon, HomeIcon, SettingsIcon } from "omorphia";
import UserComponent from "./UserComponent.vue";

function getIconForRoute(route: any) {
  if (route.name === "Home") return HomeIcon;
  if (route.name === "Settings") return SettingsIcon;
}

const router = useRouter();

const emit = defineEmits(["hide"]);
const { show } = defineProps(["show"]);

function gotoRoute(route: any) {
  router.push(route.path);
  emit("hide");
}
</script>

<style scoped lang="scss">
.navbar-link {
  margin-top: var(--gap-md);

  .btn {
    width: 100%;
  }

  margin-bottom: var(--gap-md);
}

.navbar-drawer {
  // Navbar that slides out.
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: var(--color-bg);
  transform: translateX(-200%);
  transition: transform 0.3s ease-in-out;
  z-index: 100;

  div {
    margin-right: auto;
    width: 100%;
  }
}

.navbar-drawer.open {
  transform: translateX(0) !important;
}

.navbar-drawer-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
  gap: var(--gap-md);

  h1 {
    // Resize font so that is doesn't wrap, use vw
    font-size: max(1.5rem, 5vw);
    width: 100%;

    vertical-align: middle;
  }
}
</style>
