import axios from "@/axios";
import { useAxios } from "@vueuse/integrations";
import { defineStore } from "pinia";

// Store theme, authentication token if it exists.
export const useDataStore = defineStore('data', {
  persist: true,
  state: () => ({
    theme: 'light',
    token: undefined,
    user: undefined,
    formatNumbers: true,
    currency: 0,
    cachedData: {}
  } as unknown as { theme: "light" | "dark", token: string | undefined, user: any | undefined, formatNumbers: boolean, cachedData: any, currency: number }),
  actions: {
    setTheme(theme: "light" | "dark") {
      this.theme = theme;
      document.documentElement.className = `${theme}-mode`
      this.$persist();
    },
    setToken(token: string | undefined) {
      this.token = token;
      this.$persist();
    },
    setFormatNumbers(value: boolean) {
      this.formatNumbers = value;
      this.$persist();
    },
    setCurrency(value: number) {
      this.currency = value;
      this.$persist();
    },
    async refreshUser() {
      if (!this.token) return;

      axios.defaults.headers.common['Authorization'] = `${this.token}`;

      try {
        const { data } = (await axios.get("/user"));
        this.user = data;
        console.log(data);
      } catch (e) {
        throw e;
      }
    }
  },
})