<template>
  <h1>Summary</h1>
  <Card>
    <div class="grid-display">
      <div class="grid-display__item">
        <div class="label">Total Downloads</div>
        <div class="value">
          {{
            statistics
              ? formatCount(statistics.project_data.total_downloads)
              : "Loading..."
          }}
        </div>
        <span class="smaller-value" v-if="statistics"
          >from {{ statistics.project_data.number_of_projects }} project{{
            statistics.project_data.number_of_projects === 1 ? "" : "s"
          }}</span
        >
      </div>
      <div class="grid-display__item">
        <div class="label">Total Follows</div>
        <div class="value">
          {{
            statistics
              ? formatCount(statistics.project_data.total_followers)
              : "Loading..."
          }}
        </div>
        <span class="smaller-value" v-if="statistics"
          >from {{ statistics.project_data.number_of_projects }} project{{
            statistics.project_data.number_of_projects === 1 ? "" : "s"
          }}</span
        >
      </div>
      <div class="grid-display__item">
        <div class="label">All Time Revenue</div>
        <div class="value">
          {{
            statistics // round to 2 decimal places
              ? toLocalCurrency(
                  Math.round(
                    statistics.financial_data.converted.all_time * 100
                  ) / 100
                )
              : "Loading..."
          }}
        </div>
        <span
          class="smaller-value"
          v-if="
            statistics && statistics?.financial_data.targetCurrency !== 'USD'
          "
        >
          Converted from USD{{
            formatCurrencyUS(
              Math.round(statistics.financial_data.raw.all_time * 100) / 100
            )
          }}
          (estimated)
        </span>
      </div>
      <div class="grid-display__item">
        <div class="label">Current Balance</div>
        <div class="value">
          {{
            statistics // round to 2 decimal places
              ? toLocalCurrency(
                  Math.round(
                    statistics.financial_data.converted.balance * 100
                  ) / 100
                )
              : "Loading..."
          }}
        </div>
        <span
          class="smaller-value"
          v-if="
            statistics && statistics?.financial_data.targetCurrency !== 'USD'
          "
        >
          Converted from USD{{
            formatCurrencyUS(
              Math.round(statistics.financial_data.raw.balance * 100) / 100
            )
          }}
          (estimated)
        </span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { useDataStore } from "@/store";
import { Card } from "omorphia";

const store = useDataStore();

const statistics: any | undefined = store.cachedData.statistics;

const currencies: any = store.cachedData.currencies;

function formatCurrencyUS(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function toLocalCurrency(amount: number) {
  if (store.currency == 0) {
    return formatCurrencyUS(amount);
  }

  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: Object.keys(currencies)[store.currency],
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
