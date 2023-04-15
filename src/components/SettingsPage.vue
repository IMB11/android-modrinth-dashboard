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
          v-model="settings.theme"
        />
      </div>
      <div class="responsive">
        <label for="abr-downloads">
          <h4>Abbreviate Downloads</h4>
        </label>
        <Toggle id="abr-downloads" v-model="settings.abreviate_downloads" />
      </div>
    </div>
  </Card>
</template>

<script>
import { settings, store } from "@/store";

export default {
  data: () => {
    return {
      settings,
      store,
    };
  }
};
</script>

<style scoped>
label {
  flex-grow: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.responsive:nth-child(1) {
  flex-shrink: 1;
}

.responsive {
  gap: 10%;
}

.settings-row {
  display: flex;
  flex-direction: column;
}

.settings-row > * {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
