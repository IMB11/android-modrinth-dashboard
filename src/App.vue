<template>
  <div>
    <Card v-if="!hasSavedToken">
      <SaveTokenModal @confirmed="(tkn) => handleToken(tkn)" />
    </Card>
    <div v-else>
      <Card>
        <div class="profile_info">
          <div class="profile_avatar">
            <Avatar size="sm" circle :src="store.user.avatar_url" />
            <p>{{ store.user.username }}</p>
          </div>
          <Button class="logout" @click="handleLogout()">Logout</Button>
        </div>
      </Card>
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
import { store, settings } from "@/store";

export default {
  name: "App",
  data: () => {
    return {
      hasSavedToken: false,
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
  },
  methods: {
    async handleToken(tkn) {
      this.settings.token = tkn;
      this.hasSavedToken = true;
      localStorage.token = this.settings.token;

      this.axios.defaults.headers.common.Authorization = this.settings.token;

      this.store.user = (
        await this.axios.get("https://api.modrinth.com/v2/user")
      ).data;

      this.store.payoutInfo = (
        await this.axios.get(
          `https://api.modrinth.com/v2/user/${this.store.user.id}/payouts`
        )
      ).data;

      this.store.payoutInfo.all_time =
        Math.floor(this.store.payoutInfo.all_time * 100) / 100;
      this.store.payoutInfo.last_month =
        Math.floor(this.store.payoutInfo.last_month * 100) / 100;
      this.store.payoutInfo.balance =
        Math.floor(this.store.user.payout_data.balance * 100) / 100;

      this.store.notifications = (
        await this.axios.get(
          `https://api.modrinth.com/v2/user/${this.store.user.id}/notifications`
        )
      ).data;
    },
    handleLogout() {
      this.settings.token = undefined;
      this.hasSavedToken = false;
      localStorage.token = this.settings.token;
      this.store.user = {};
      this.axios.defaults.headers.common.Authorization = this.settings.token;
    },
  },
  async beforeMount() {
    this.axios.defaults.httpsAgent =
      "Android App (mineblock11/modrinthpubdash)";

    if (localStorage.token !== undefined) {
      await this.handleToken(localStorage.token);
    }

    if (localStorage.theme === undefined) {
      localStorage.theme = this.settings.theme;
    }

    this.settings.theme = localStorage.theme;
    window.applyNewTheme(this.settings.theme);
  },
};
</script>

<style>
.profile_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile_avatar {
  display: flex;
  align-items: center;
}

.profile_avatar > p {
  margin-left: 12px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-text);
}

.profile_info > .logout_btn {
  margin: auto;
}
</style>
