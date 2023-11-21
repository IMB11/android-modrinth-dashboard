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

.grid-display {
  display: grid;
  grid-gap: var(--gap-md);
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));

  .grid-display__item {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-start;
    background-color: var(--color-bg);
    border-radius: var(--radius-md);
    padding: var(--gap-lg);
    gap: var(--gap-md);

    .label {
      color: var(--color-base);
      font-weight: bold;
      font-size: 1rem;
    }

    .value {
      color: var(--color-contrast);
      font-weight: bold;
      font-size: 2rem;
    }

    .goto-link {
      margin-top: auto;
    }

    .smaller-value {
      font-size: 0.85rem;
      font-style: italic;
      color: var(--color-base);
    }
  }
}

.grid-display.flow {
  display: flex;
  flex-direction: column;

  .grid-display__item .value {
    font-size: 1.5rem;
  }
}

.grid-display.width-12 {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}

.grid-display.width-16 {
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.loadable {
  opacity: 0;
  filter: blur(1.5rem);
  transition: opacity 0.4s ease-in-out;
}

.loaded {
  filter: none !important;
  opacity: 1 !important;
}
</style>
