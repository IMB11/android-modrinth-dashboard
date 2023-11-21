import { getStatisticalData, type StatisticData } from "@/api";
import axios from "@/axios";
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
  } as unknown as {
    theme: "light" | "dark", token: string | undefined, user: any | undefined, formatNumbers: boolean, cachedData: {
      statistics: StatisticData,
      currencies: {
        [key: string]: number
      }
    }, currency: number
  }),
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
    async setCurrency(value: number) {
      this.currency = value;

      this.cachedData.statistics = await getStatisticalData(this);

      this.$persist();
    },
    async refreshUser() {
      if (!this.token) return;

      axios.defaults.headers.common['Authorization'] = `${this.token}`;

      try {
        const { data } = (await axios.get("/user"));
        this.user = data;
      } catch (e) {
        throw e;
      }
    }
  },
})

export { StatisticData };
