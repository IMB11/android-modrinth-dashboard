<template>
  <div>
    <Card>
      <h2>Settings</h2>
    </Card>
    <UserInfoCard />
    <Card>
      <div class="settings-row">
        <div class="responsive">
          <label for="theme-dropdown">
            <h4>Theme</h4>
          </label>
          <DropdownSelect
            name="dropdown-theme"
            id="theme-dropdown"
            :options="['Dark', 'Light', 'OLED']"
            :default-value="settings.theme"
            @change="(val) => $emit('changedTheme', val.option)"
          />
        </div>
        <div class="responsive">
          <label for="abreviate-checkbox">
            <h4>Abreviate Counts</h4>
          </label>
          <!-- Cant mutate props :( -->
          <Toggle
            name="dropdown-theme"
            id="abreviate-checkbox"
            :checked="settings.abreviate_downloads"
            v-model="abreviate_downloads_passthrough"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { store } from "@/store";
import UserInfoCard from "./UserInfoCard.vue";

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
  mounted() {
    this.abreviate_downloads_passthrough = this.settings.abreviate_downloads;
  },
  components: { UserInfoCard },
};
</script>

<style scoped>
label {
  flex-grow: 0;
  margin-top: auto;
  margin-bottom: auto;
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
