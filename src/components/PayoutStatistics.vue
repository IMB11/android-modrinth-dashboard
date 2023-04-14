<template>
  <div>
    <Card>
      <h3>Payout Statistics</h3>
      <div class="grid-display">
        <div class="grid-display__item">
          <div class="label">Total Revenue</div>
          <div class="value">${{ payoutInfo.all_time }}</div>
        </div>
        <div class="grid-display__item">
          <div class="label">Last Month Revenue</div>
          <div class="value">${{ payoutInfo.last_month }}</div>
        </div>
        <div class="grid-display__item">
          <div class="label">Balance</div>
          <div class="value">${{ balance }}</div>
        </div>
      </div>
    </Card>
    <Card :collapsible="true">
      <template #header><h3>Transaction History</h3></template>
      <div class="grid-display flow">
        <div
          class="grid-display__item"
          v-for="payout in payoutInfo.payouts"
          v-bind:key="payout.created"
        >
          <Badge :color="payout.status === 'success' ? 'green' : 'red'" :type="capitalize(payout.status)" />
          <div class="label">Withdrawal - {{ getFormattedDate(payout.created) }}</div>
          <div class="value">${{ Math.round(payout.amount * 100) / 100 }}</div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { store } from "@/store";
import moment from "moment"
import { capitalize } from "vue";

export default {
  props: ["user"],
  data: () => {
    return {
      payoutInfo: {},
      balance: 0,
      store,
      capitalize
    };
  },
  watch: {
    user: async function (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.payoutInfo = (
        await this.axios.get(
          `https://api.modrinth.com/v2/user/${this.user.id}/payouts`
        )
      ).data;

      this.payoutInfo.all_time =
        Math.floor(this.payoutInfo.all_time * 100) / 100;
      this.payoutInfo.last_month =
        Math.floor(this.payoutInfo.last_month * 100) / 100;
      this.balance =
        Math.floor(this.store.user.payout_data.balance * 100) / 100;
    },
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).format('MM/DD/YYYY');
    }
  },  
  async mounted() {
    this.payoutInfo = (
      await this.axios.get(
        `https://api.modrinth.com/v2/user/${this.user.id}/payouts`
      )
    ).data;

    this.payoutInfo.all_time = Math.floor(this.payoutInfo.all_time * 100) / 100;
    this.payoutInfo.last_month =
      Math.floor(this.payoutInfo.last_month * 100) / 100;
    this.balance = Math.floor(this.store.user.payout_data.balance * 100) / 100;
  },
};
</script>

<style scoped>

.grid-display.flow {
  display: flex;
  flex-direction: column;
}

.grid-display.flow .grid-display__item .value {
  font-size: 1.5rem;
}

.grid-display {
  display: grid;
  grid-gap: var(--gap-md);
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
.grid-display .grid-display__item {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--color-bg);
  border-radius: var(--radius-md);
  padding: var(--gap-lg);
  gap: var(--gap-md);
}
.grid-display .grid-display__item .label {
  color: var(--color-heading);
  font-weight: bold;
  font-size: 1rem;
}
.grid-display .grid-display__item .value {
  color: var(--color-text-dark);
  font-weight: bold;
  font-size: 2rem;
}
.grid-display .grid-display__item .goto-link {
  margin-top: auto;
}
.grid-display.width-12 {
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
.grid-display.width-16 {
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
</style>
