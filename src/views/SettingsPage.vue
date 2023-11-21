<template>
  <div>
    <h1>Settings</h1>
    <Card>
      <h3 class="section-title"><PaintBrushIcon />Appearance</h3>
      <p>Customize the appearance of the app.</p>
      <div class="settings-list">
        <div class="responsive">
          <h4>Theme</h4>
          <Button @click="toggleTheme"
            ><SunIcon v-if="isDark" /><MoonIcon v-else /> Switch Theme</Button
          >
        </div>
        <div class="responsive">
          <label for="abreviate-checkbox">
            <h4>Abreviate Counts</h4>
          </label>
          <input
            id="abreviate-checkbox"
            type="checkbox"
            class="switch stylized-toggle"
            :checked="store.formatNumbers"
            @change="store.setFormatNumbers(!store.formatNumbers)"
          />
        </div>
        <div class="responsive" v-if="currencies">
          <h4>Currency</h4>
          <DropdownSelect
            name="currency"
            :options="currencies"
            v-model="selectedCurrency"
            :displayName="(currencyName: string) => Object.keys(currencySymbols).includes(currencyName) ? `${currencyName} (${currencySymbols[currencyName]})` : currencyName"
            class="select stylized-select"
          />
        </div>
      </div>
    </Card>
    <UserComponent />
  </div>
</template>

<script setup lang="ts">
import {
  Button,
  PaintBrushIcon,
  Card,
  SunIcon,
  MoonIcon,
  Toggle,
  DropdownSelect,
} from "omorphia";
import { useDataStore } from "@/store";
import { computed, ref } from "vue";
import UserComponent from "@/components/UserComponent.vue";
import { asyncComputed } from "@vueuse/core";
import { getCurrencies, symbols as currencySymbols } from "@/currency";

const store = useDataStore();

const isDark = computed(() => {
  return store.theme === "dark";
});

const currencies = asyncComputed(async () => {
  return await getCurrencies();
});

const selectedCurrency = computed({
  get: () => currencies.value[store.currency],
  set: async (s) => {
    await store.setCurrency(currencies.value.indexOf(s));
    // Reload
    window.location.reload();
  },
});

function toggleTheme() {
  store.setTheme(store.theme === "light" ? "dark" : "light");
}
</script>

<style lang="scss" scoped>
.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

label {
  flex-grow: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.responsive {
  gap: 10%;
  justify-content: space-between;
  display: flex;
  flex-direction: row;

  * {
    margin-top: auto;
    margin-bottom: auto;
  }
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}
</style>
