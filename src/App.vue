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
          :default-value="currentPage"
          @change="(newPage) => (currentPage = newPage.option)"
          :options="['Payouts', 'Projects', 'Notifications', 'Settings']"
        />
      </Card>
      <PayoutStatistics v-if="currentPage === 'Payouts'" />
      <ProjectStatistics v-if="currentPage === 'Projects'" />
      <SettingsPage
        v-if="currentPage === 'Settings'"
        :initial-theme="theme"
        @changed-theme="handleTheme"
      />
      <NotificationsPage v-if="currentPage === 'Notifications'" />
    </div>
  </div>
</template>

<script>
import SaveTokenModal from "@/components/SaveTokenModal.vue";
import PayoutStatistics from "@/components/PayoutStatistics.vue";
import ProjectStatistics from "./components/ProjectStatistics.vue";
import SettingsPage from "./components/SettingsPage.vue";
import NotificationsPage from "./components/NotificationsPage.vue";
import { store } from "@/store";

export default {
  name: "App",
  data: () => {
    return {
      hasSavedToken: false,
      token: "NaN",
      store,
      currentPage: "Payouts",
      theme: "Light",
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
      this.token = tkn;
      this.hasSavedToken = true;
      localStorage.token = this.token;

      this.axios.defaults.headers.common.Authorization = this.token;

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
          `https://api.modrinth.com/v2/user/${this.user.id}/notifications`
        )
      ).data;
    },
    handleTheme(newTheme) {
      this.theme = newTheme;
      localStorage.theme = this.theme;
      window.applyNewTheme(this.theme);
    },
    handleLogout() {
      this.token = undefined;
      this.hasSavedToken = false;
      localStorage.token = this.token;
      this.store.user = {};
      this.axios.defaults.headers.common.Authorization = this.token;
    },
  },
  async beforeMount() {
    this.axios.defaults.httpsAgent =
      "Android App (mineblock11/modrinthpubdash)";

    if (localStorage.token !== undefined) {
      await this.handleToken(localStorage.token);
    }

    if (localStorage.theme === undefined) {
      localStorage.theme = this.theme;
    }

    this.theme = localStorage.theme;
    window.applyNewTheme(this.theme);
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
