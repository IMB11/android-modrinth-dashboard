<template>
  <h2>Analytics</h2>
  <Card>
    <div class="grid-display">
      <div class="grid-display__item">
        <div class="label">Total Downloads</div>
        <div class="value">
          {{
            statistics ? formatCount(statistics.total_downloads) : "Loading..."
          }}
        </div>
        <span class="smaller-value" v-if="statistics"
          >from {{ statistics.number_of_projects }} project{{
            statistics.number_of_projects === 1 ? "" : "s"
          }}</span
        >
      </div>
      <div class="grid-display__item">
        <div class="label">Total Follows</div>
        <div class="value">
          {{
            statistics ? formatCount(statistics.total_followers) : "Loading..."
          }}
        </div>
        <span class="smaller-value" v-if="statistics"
          >from {{ statistics.number_of_projects }} project{{
            statistics.number_of_projects === 1 ? "" : "s"
          }}</span
        >
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import axios from "@/axios";
import { useDataStore } from "@/store";
import { computedAsync } from "@vueuse/core";
import { computed } from "vue";
import { Card } from "omorphia";

const store = useDataStore();

const statistics = computedAsync(async () => {
  const { data } = await axios.get(`/user/${store.user.id}/projects`);

  const total_followers = (data as unknown as any[]).reduce((acc, project) => {
    return acc + project.followers;
  }, 0);

  const total_downloads = (data as unknown as any[]).reduce((acc, project) => {
    return acc + project.downloads;
  }, 0);

  const number_of_projects = (data as unknown as any[]).length;

  return {
    total_followers,
    total_downloads,
    number_of_projects,
  };
});

console.log(statistics);

function formatCount(amount: number) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}
</script>

<style scoped lang="scss">
// Convert the above into scss

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
</style>
