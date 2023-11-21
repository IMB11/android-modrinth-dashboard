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
import NavHelper from "@/components/NavHelper.vue";
import axios from "@/axios";
import { convertUSD, getCurrencies, getCurrencyRates } from "@/currency";
import { getStatisticalData } from "./api";

const store = useDataStore();
const router = useRouter();
const route = useRoute();

onBeforeMount(async () => {
  document.documentElement.className = `${store.theme}-mode`;

  store.cachedData.currencies = await getCurrencyRates();

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

  // Fetch statistics.
  if (store.cachedData.statistics) {
    const now = Date.now();
    if (
      Date.parse(store.cachedData.statistics.lastUpdated as string) - now <
      1000 * 60 * 5
    ) {
      return;
    }
  }

  const statistics = await getStatisticalData(store);
  store.cachedData.statistics = statistics;
});

const isLoginPage = computed(() => {
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
