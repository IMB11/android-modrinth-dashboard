<template>
  <h1>Summary</h1>
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
      <div class="grid-display__item">
        <div class="label">Last Month Revenue</div>
        <div class="value">
          {{
            statistics
              ? toLocalCurrency(
                  Math.round(
                    statistics.last_month_earnings *
                      statistics.currencyRate *
                      100
                  ) / 100
                )
              : "Loading..."
          }}
        </div>
        <span
          class="smaller-value"
          v-if="statistics && statistics?.targetCurrency !== 'USD'"
        >
          Converted from USD${{
            Math.round(statistics.last_month_earnings * 100) / 100
          }}
          (estimated)
        </span>
      </div>
      <div class="grid-display__item">
        <div class="label">All Time Revenue</div>
        <div class="value">
          {{
            statistics // round to 2 decimal places
              ? toLocalCurrency(
                  Math.round(
                    statistics.all_time_earnings * statistics.currencyRate * 100
                  ) / 100
                )
              : "Loading..."
          }}
        </div>
        <span
          class="smaller-value"
          v-if="statistics && statistics?.targetCurrency !== 'USD'"
        >
          Converted from USD${{
            Math.round(statistics.all_time_earnings * 100) / 100
          }}
          (estimated)
        </span>
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
import { convertUSD, getCurrencies } from "@/currency";

const store = useDataStore();

const statistics = computedAsync(async () => {
  if (store.cachedData.statistics) {
    const now = Date.now();

    if (store.cachedData.statistics.lastUpdated - now < 1000 * 60 * 5) {
      return store.cachedData.statistics;
    }
  }

  const { data } = await axios.get(`/user/${store.user.id}/projects`);

  const total_followers = (data as unknown as any[]).reduce((acc, project) => {
    return acc + project.followers;
  }, 0);

  const total_downloads = (data as unknown as any[]).reduce((acc, project) => {
    return acc + project.downloads;
  }, 0);

  const number_of_projects = (data as unknown as any[]).length;

  const { data: financial_data } = await axios.get(
    `/user/${store.user.id}/payouts`
  );

  // Convert financial data to currencies.

  const currencies = await getCurrencies();
  const target = currencies[store.currency];
  const rate = await convertUSD(target);

  const statistics = {
    lastUpdated: new Date(),
    currencyRate: rate,
    targetCurrency: target,
    last_month_earnings: financial_data.last_month,
    all_time_earnings: financial_data.all_time,
    total_followers,
    total_downloads,
    number_of_projects,
  };

  store.cachedData.statistics = statistics;

  return statistics;
});

const currencies = computedAsync(async () => {
  return await getCurrencies();
});

function toLocalCurrency(amount: number) {
  if (!currencies || store.currency == 0) {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencies.value[store.currency],
  }).format(amount);
}

function formatCount(amount: number) {
  if (!store.formatNumbers) return Intl.NumberFormat("en-US").format(amount);

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
