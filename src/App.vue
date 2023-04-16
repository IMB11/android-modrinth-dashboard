<template>
  <div>
    <NavigationBar @change="(newPage) => (settings.currentPage = newPage)" :settings="settings" />
    <Card class="view" v-if="settings.token === undefined">
      <SaveTokenModal @confirmed="(tkn) => handleToken(tkn)" />
    </Card>
    <div class="view" v-else>
      <PayoutStatistics v-if="settings.currentPage === 'Payouts'" />
      <ProjectStatistics :settings="settings" v-if="settings.currentPage === 'Projects'" />
      <SettingsPage
        v-if="settings.currentPage === 'Settings'"
        :settings="settings"
        @changed-theme="(theme) => (settings.theme = theme)"
        @changed-abreviate-downloads="(val) => (settings.abreviate_downloads = val)"
      />
      <NotificationsPage v-if="settings.currentPage === 'Notifications'" />
    </div>
  </div>
</template>

<script>
import SaveTokenModal from "@/components/SaveTokenModal.vue";
import PayoutStatistics from "@/components/PayoutStatistics.vue";
import ProjectStatistics from "./components/ProjectStatistics.vue";
import SettingsPage from "./components/SettingsPage.vue";
import NotificationsPage from "./components/NotificationsPage.vue";
import { store, settings, populateStoreData } from "@/store";
import NavigationBar from "./components/NavigationBar.vue";

export default {
  name: "App",
  data: () => {
    return {
      store,
      settings,
    };
  },
  components: {
    SaveTokenModal,
    PayoutStatistics,
    ProjectStatistics,
    SettingsPage,
    NotificationsPage,
    NavigationBar
},
  methods: {
    async handleToken(tkn) {
      this.settings.token = tkn;
      this.axios.defaults.headers.common.Authorization = this.settings.token;

      localStorage.settings = JSON.stringify(this.settings);
      populateStoreData(this.axios, this.store);
    },
  },
  watch: {
    settings: {
      deep: true,
      // eslint-disable-next-line no-unused-vars
      handler: function (newVal, oldVal) {
        localStorage.settings = JSON.stringify(this.settings);
        window.applyNewTheme(this.settings.theme);
      },
    },
  },
  async beforeMount() {
    this.axios.defaults.httpsAgent =
      "Android App (mineblock11/modrinthpubdash)";

    if (localStorage.settings !== undefined) {
      this.settings = JSON.parse(localStorage.settings);
      this.axios.defaults.headers.common.Authorization = this.settings.token;
      populateStoreData(this.axios, this.store);
    }

    window.applyNewTheme(this.settings.theme);
  },
};
</script>

<style></style>
