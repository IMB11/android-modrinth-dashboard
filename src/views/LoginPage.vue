<template>
  <h1>Log In</h1>
  <p>You are currently not logged into Modrinth.</p>
  <Card>
    <h3>Enter a Personal Access Token</h3>
    <input
      v-model="accessToken"
      type="text"
      placeholder="Personal Access Token"
    />
    <div class="flex">
      <p :class="invalidAccessToken ? 'enabled' : ''">Invalid Access Token</p>
      <Button
        class="right-align-btn"
        @click="peformValidation"
        :disabled="isValidating"
        :color="isValidating ? 'orange' : 'green'"
        >{{ isValidating ? "Validating..." : "Validate" }}</Button
      >
    </div>
  </Card>
  <Card>
    <h3>What permissions does Android Modrinth Dashboard need?</h3>
    <p>This app needs the following permissions to function properly:</p>
    <div class="permissions">
      <Badge
        v-for="permission in permissions"
        color="green"
        :type="permission"
      />
    </div>
  </Card>
  <Card>
    <h3 class="section-title"><PaintBrushIcon />Appearance</h3>
    <p>Blinded? You can change the appearance of the app before you login.</p>
    <Button @click="toggleTheme"
      ><SunIcon v-if="isDark" /><MoonIcon v-else /> Switch Theme</Button
    >
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  Badge,
  Button,
  PaintBrushIcon,
  SunIcon,
  MoonIcon,
} from "omorphia";
import { useAxios } from "@vueuse/integrations/useAxios";
import axiosInstance from "@/axios";
import { computed, ref } from "vue";
import { useDataStore } from "@/store";
import { useRouter } from "vue-router";
import axios from "@/axios";

const store = useDataStore();
const router = useRouter();

const accessToken = ref("");

const invalidAccessToken = ref(false);
const currentInvalidTimeout = ref(undefined as any);
const isValidating = ref(false);

const isDark = computed(() => {
  return store.theme === "dark";
});

function toggleTheme() {
  store.setTheme(store.theme === "light" ? "dark" : "light");
}

async function peformValidation() {
  isValidating.value = true;

  try {
    const { data } = await useAxios(
      "/user",
      {
        headers: { Authorization: `${accessToken.value}` },
      },
      axiosInstance
    );

    console.log("Successfully verified access token.");
    store.setToken(accessToken.value);
    axios.defaults.headers.common["Authorization"] = accessToken.value;

    router.push("/");
  } catch (e) {
    console.log("Failed to verify access token.");
    isValidating.value = false;
    invalidAccessToken.value = true;

    if (currentInvalidTimeout.value) {
      clearTimeout(currentInvalidTimeout.value);
    }

    currentInvalidTimeout.value = setTimeout(() => {
      invalidAccessToken.value = false;
    }, 3500);
  }
}

const permissions = ref([
  "Read User Data",
  "Read Notifications",
  "Write Notifications",
  "Read Payouts",
  "Write Payouts",
  "Read Analytics",
  "Read Projects",
  "Read Versions",
]);
</script>

<style lang="scss" scoped>
input {
  width: 100%;
}

.flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
    color: var(--color-red);
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }

  p.enabled {
    opacity: 1;
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.right-align-btn {
  margin-left: auto;
}
</style>
