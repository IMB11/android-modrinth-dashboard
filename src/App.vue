<template>
  <div>
    <Card v-if="settings.token === undefined">
      <SaveTokenModal @confirmed="(tkn) => handleToken(tkn)" />
    </Card>
    <div v-else>
      <UserInfoCard />
      <Card class="responsive">
        <DropdownSelect
          name="dropdown-currentpage"
          :default-value="settings.currentPage"
          @change="(newPage) => (settings.currentPage = newPage.option)"
          :options="['Payouts', 'Projects', 'Notifications', 'Settings']"
        />
      </Card>
      <PayoutStatistics v-if="settings.currentPage === 'Payouts'" />
      <ProjectStatistics v-if="settings.currentPage === 'Projects'" />
      <SettingsPage v-if="settings.currentPage === 'Settings'" />
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
import UserInfoCard from "./components/UserInfoCard.vue";

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
    UserInfoCard,
  },
  methods: {
    async handleToken(tkn) {
      this.settings.token = tkn;
      populateStoreData(this.settings.token, this.axios, this.store);
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
      populateStoreData(this.settings.token, this.axios, this.store);
    }

    window.applyNewTheme(this.settings.theme);
  },
};
</script>

<style></style>
