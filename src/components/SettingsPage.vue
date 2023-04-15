<template>
  <Card>
    <h3>Settings</h3>
    <div class="settings-row">
      <div class="responsive">
        <label for="theme-dropdown">
          <h4>Theme</h4>
        </label>
        <DropdownSelect
          name="dropdown-theme"
          id="theme-dropdown"
          :options="['Dark', 'Light']"
          :default-value="settings.theme"
          @change="(val) => $emit('changedTheme', val.option)"
        />
      </div>
      <div class="responsive">
        <label for="abreviate-checkbox">
          <h4>Abreviate Counts</h4>
        </label>
        <Toggle
          name="dropdown-theme"
          id="abreviate-checkbox"
          :checked="settings.abreviate_downloads"
          v-model="abreviate_downloads_passthrough"
        />
      </div>
    </div>
  </Card>
</template>

<script>
import { store } from "@/store";

export default {
  data: () => {
    return {
      store,
      abreviate_downloads_passthrough: false,
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    abreviate_downloads_passthrough(newVal, oldVal) {
      this.$emit(
        "changedAbreviateDownloads",
        this.abreviate_downloads_passthrough
      );
    },
  },
  props: ["settings"],
  emits: ["changedTheme", "changedAbreviateDownloads"],
};
</script>

<style scoped>
label {
  flex-grow: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.responsive:nth-child(1) {
}

.responsive {
  gap: 10%;
  justify-content: space-between;
}

.settings-row {
  display: flex;
  flex-direction: column;
}

.settings-row > * {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
</style>
