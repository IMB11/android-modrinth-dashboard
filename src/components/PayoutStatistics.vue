<template>
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
    </div>
  </Card>
</template>

<script>
export default {
  props: ["user"],
  data: () => {
    return {
      payoutInfo: {},
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
    },
  },
  async mounted() {},
};
</script>

<style scoped>
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
