<template>
  <div>
    <Card>
      <h2>Monetization</h2>
    </Card>
    <Card>
      <h3>Monetization Statistics</h3>
      <div class="grid-display">
        <div class="grid-display__item">
          <div class="label">Total Revenue</div>
          <div class="value">${{ store.balance_all_time }}</div>
        </div>
        <div class="grid-display__item">
          <div class="label">Last Month Revenue</div>
          <div class="value">${{ store.balance_last_month }}</div>
        </div>
        <div class="grid-display__item">
          <div class="label">Balance</div>
          <div class="value">${{ store.balance }}</div>
        </div>
      </div>
    </Card>
    <Card v-if="store.payoutInfo.payouts.length > 0" :collapsible="true">
      <template #header><h3>Transaction History</h3></template>
      <div class="grid-display flow">
        <div
          class="grid-display__item"
          v-for="payout in store.payoutInfo.payouts"
          v-bind:key="payout.created"
        >
          <Badge
            :color="payout.status === 'success' ? 'green' : 'red'"
            :type="capitalize(payout.status)"
          />
          <div class="label">
            Withdrawal - {{ getFormattedDate(payout.created) }}
          </div>
          <div class="value">${{ Math.round(payout.amount * 100) / 100 }}</div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { store } from "@/store";
import moment from "moment";
import { capitalize } from "vue";

export default {
  data: () => {
    return {
      store,
      capitalize,
    };
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).format("MM/DD/YYYY");
    },
  },
};
</script>
