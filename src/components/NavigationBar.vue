<template>
  <Card class="navigation">
    <Button @click="$emit('change', 'Payouts')" iconOnly
      ><CurrencyIcon :style="getStyle('Payouts')"
    /></Button>
    <Button @click="$emit('change', 'Projects')" iconOnly
      ><ListIcon :style="getStyle('Projects')" />
    </Button>
    <Button
      @click="$emit('change', 'Notifications')"
      :class="store.notifications.length > 0 ? 'bubble' : ''"
      iconOnly
      ><BellIcon :style="getStyle('Notifications')" />
    </Button>
    <Button @click="$emit('change', 'Settings')" iconOnly
      ><SettingsIcon :style="getStyle('Settings')"
    /></Button>
  </Card>
</template>

<script>
export default {
  emits: ["change"],
  props: ["settings", "store"],
  methods: {
    getStyle(page) {
      return this.settings.currentPage === page
        ? "color: var(--color-brand);"
        : "";
    },
  },
};
</script>

<style scoped>
.navigation {
  z-index: 999;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  padding: 5%;
  align-items: stretch;
  padding-left: 15%;
  padding-right: 15%;
  justify-content: space-between;
}

.navigation > * {
  background-color: transparent;
  box-shadow: none;
}

.bubble::after {
  background-color: var(--color-brand);
  border-radius: var(--radius-xl);
  content: "";
  height: 0.6rem;
  position: relative;
  right: 0.25rem;
  top: -0.75rem;
  width: 0.6rem;
}
</style>
