<template>
  <Card>
    <h3>Project Statistics</h3>
    <p>
      This page is quite limited until extended statistics are released via the
      Modrinth API.
    </p>
    <div class="grid-display">
      <div class="grid-display__item">
        <div class="label">Total Downloads</div>
        <div class="value">
          {{ formatCount(store.user.total_downloads) }}
        </div>
      </div>
      <div class="grid-display__item">
        <div class="label">Total Follows</div>
        <div class="value">{{ formatCount(store.user.total_followers) }}</div>
      </div>
    </div>
  </Card>
</template>

<script>
import { settings, store } from "@/store";

export default {
  data: () => {
    return {
      store,
      settings,
    };
  },
  methods: {
    formatCount(amount) {
      return Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(amount);
    },
  },
};
</script>
