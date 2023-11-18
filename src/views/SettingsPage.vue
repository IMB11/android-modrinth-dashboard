<template>
  <div>
    <h1>Settings</h1>
    <Card>
      <h3 class="section-title"><PaintBrushIcon />Appearance</h3>
      <p>Customize the appearance of the app.</p>
      <Button @click="toggleTheme"
        ><SunIcon v-if="isDark" /><MoonIcon v-else /> Switch Theme</Button
      >
      <div class="responsive">
        <label for="abreviate-checkbox">
          <h4>Abreviate Counts</h4>
        </label>
        <Toggle
          name="dropdown-theme"
          id="abreviate-checkbox"
          v-model="shouldFormatNumbers"
        />
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Button, PaintBrushIcon, Card, SunIcon, MoonIcon } from "omorphia";
import { useDataStore } from "@/store";
import { computed } from "vue";

const store = useDataStore();

const isDark = computed(() => {
  return store.theme === "dark";
});

const shouldFormatNumbers = computed({
  get(): boolean {
    return store.formatNumbers;
  },
  set(val: boolean) {
    store.setFormatNumbers(val);
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
}
</style>
