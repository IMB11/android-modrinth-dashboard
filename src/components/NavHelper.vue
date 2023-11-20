<template>
  <Card class="navigation">
    <Button
      v-for="route in router
        .getRoutes()
        .filter((route) => route.name !== 'Login')"
      @click="gotoRoute(route)"
      iconOnly
      ><component
        :is="getIconForRoute(route)"
        :style="getStyleForRoute(route)"
      />
      <p class="show-tablet">{{ route.name }}</p></Button
    >
  </Card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  Button,
  HomeIcon,
  SettingsIcon,
  BellIcon,
  ListIcon,
  CurrencyIcon,
  Card,
} from "omorphia";
import { computed } from "vue";

const router = useRouter();

function getStyleForRoute(route: any) {
  return router.currentRoute.value.path === route.path
    ? "color: var(--color-brand);"
    : "";
}

function getIconForRoute(route: any) {
  if (route.name === "Home") return HomeIcon;
  if (route.name === "Settings") return SettingsIcon;
}

function gotoRoute(route: any) {
  router.push(route.path);
}
</script>

<style scoped lang="scss">
// (min-width: 768px)
@media screen and (min-width: 768px) {
  .show-tablet {
    display: initial;
  }
}

.show-tablet {
  display: none;
}

.navigation {
  z-index: 999;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  padding: 5%;
  align-items: stretch;
  padding-left: 15%;
  padding-right: 15%;
  justify-content: space-between;
}

.navigation > * {
  background-color: transparent;
  box-shadow: none;
}

.navigation > * {
  display: flex;
  flex-direction: row;
  gap: var(--gap-sm);
}

.bubble::after {
  background-color: var(--color-brand);
  border-radius: var(--radius-xl);
  content: "";
  height: 0.6rem;
  position: relative;
  right: 0.25rem;
  top: -0.75rem;
  width: 0.6rem;
}
</style>
