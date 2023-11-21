<template>
  <div>
    <h1>Settings</h1>
    <UserComponent />
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
        <div :class="`responsive loadable ${currencies ? 'loaded' : ''}`">
          <h4>Currency</h4>
          <DropdownSelect
            name="currency"
            v-if="currencies"
            :options="currencies"
            v-model="selectedCurrency"
            :displayName="(currencyName: string) => Object.keys(currencySymbols).includes(currencyName) ? `${currencyName} (${currencySymbols[currencyName]})` : currencyName"
            class="select stylized-select"
          />
          <DropdownSelect
            v-else
            class="select stylized-select"
          ></DropdownSelect>
        </div>
      </div>
    </Card>
    <Card class="page-extender">
      <h3>Update Checker</h3>
      <p v-if="!needsUpdate(latestAppVersion?.tag_name ?? '0.0.0', appVersion)">
        <CheckIcon style="color: var(--color-brand)" /> No updates found.
      </p>
      <p v-else class="update-available-flex">
        <span
          ><span style="color: red"><XIcon /> An update is available.</span>
          <br /><br />You are on version <code>{{ appVersion }}</code> yet the
          latest is <code>{{ latestAppVersion?.tag_name }}</code></span
        ><br /><br />
        <Button @click="openRelease"><GitHubIcon />View On GitHub</Button>
      </p>
    </Card>
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
  XIcon,
} from "omorphia";
import { useDataStore } from "@/store";
import { computed, ref } from "vue";
import UserComponent from "@/components/UserComponent.vue";
import { asyncComputed } from "@vueuse/core";
import { getCurrencies, symbols as currencySymbols } from "@/currency";
import axios from "@/axios";
import semver from "semver";

const appVersion = "1.0.0";

const store = useDataStore();

const isDark = computed(() => {
  return store.theme === "dark";
});

const currencies = asyncComputed(async () => {
  return await getCurrencies();
});

function needsUpdate(versionA: string, versionB: string) {
  return semver.gt(versionA, versionB);
}

function openRelease() {
  window.open(latestAppVersion.value.html_url, "_blank", "noreferrer");
}

const latestAppVersion: any = asyncComputed(async () => {
  return (
    await axios.get(
      "https://api.github.com/repos/mineblock11/android-modrinth-dashboard/releases/latest"
    )
  ).data;
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
