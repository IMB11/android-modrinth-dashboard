<template>
  <h1>Monetization</h1>
  <Card
    ><div class="grid-display">
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
      <div class="grid-display__item">
        <div class="label">Last Month Revenue</div>
        <div class="value">
          {{
            statistics // round to 2 decimal places
              ? toLocalCurrency(
                  Math.round(
                    statistics.financial_data.converted.last_month * 100
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
              Math.round(statistics.financial_data.raw.last_month * 100) / 100
            )
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
    </div></Card
  >
  <Card
    collapsible
    :defaultCollapsed="true"
    :class="`loadable ${transactionHistory ? 'loaded' : ''}`"
  >
    <template #header
      ><h3 class="history-header">Transaction History</h3></template
    >
    <div class="grid-display">
      <div
        class="grid-display__item"
        v-for="transaction in transactionHistory"
        v-bind:key="transaction.date.toString()"
      >
        <Badge
          :color="transaction.status === 'success' ? 'green' : 'red'"
          :type="transaction.status"
        />
        <div class="label">
          Withdrawal - {{ new Date(transaction.date).toLocaleDateString() }}
        </div>
        <div class="value">
          {{ toLocalCurrency(Math.round(transaction.converted * 100) / 100) }}
        </div>
        <span
          class="smaller-value"
          v-if="
            statistics && statistics?.financial_data.targetCurrency !== 'USD'
          "
        >
          Converted from USD{{
            formatCurrencyUS(Math.round(transaction.raw * 100) / 100)
          }}
          (estimated)
        </span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import axios from "@/axios";
import { convertUSD, getCurrencies } from "@/currency";
import { useDataStore } from "@/store";
import { asyncComputed } from "@vueuse/core";
import { Card, Badge } from "omorphia";

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

const transactionHistory =
  store.cachedData.statistics?.financial_data.transactions;
</script>

<style scoped lang="scss">
.history-header {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
