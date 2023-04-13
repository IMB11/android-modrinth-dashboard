<template>
  <div>
    <Card v-if="!hasSavedToken">
      <SaveTokenModal @confirmed="(tkn) => handleToken(tkn)" />
    </Card>
    <div v-else>
      <Card>
        <div class="profile_info">
          <div class="profile_avatar">
            <Avatar size="sm" circle :src="userInfo.avatar_url" />
            <p>{{ userInfo.username }}</p>
          </div>
          <Button class="logout" @click="handleLogout()">Logout</Button>
        </div>
      </Card>
      <Card class="responsive_dropdown_fix">
        <DropdownSelect
          id="report-type"
          v-model="currentPage"
          :options="['Payouts', 'Projects', 'Settings']"
        />
      </Card>
      <PayoutStatistics :user="userInfo" />
    </div>
  </div>
</template>

<script>
import SaveTokenModal from "@/components/SaveTokenModal.vue";
import PayoutStatistics from "@/components/PayoutStatistics.vue";

export default {
  name: "App",
  data: () => {
    return {
      hasSavedToken: false,
      token: "NaN",
      userInfo: {},
      currentPage: "Payouts",
      theme: "light"
    };
  },
  components: {
    SaveTokenModal,
    PayoutStatistics
  },
  methods: {
    async handleToken(tkn) {
      this.token = tkn;
      this.hasSavedToken = true;
      localStorage.token = this.token;

      this.userInfo = (
        await this.axios.get("https://api.modrinth.com/v2/user")
      ).data;
    },
    handleTheme(newTheme) {
      this.theme = newTheme;
      localStorage.theme = this.theme;
      window.applyNewTheme(this.theme)
    },
    handleLogout() {
      this.token = undefined;
      this.hasSavedToken = false;
      localStorage.token = this.token;
      this.axios.defaults.headers.common.Authorization = this.token;
    },
  },
  async mounted() {
    this.axios.defaults.httpsAgent =
      "Android App (mineblock11/modrinthpubdash)";

    if (localStorage.token !== undefined) {
      this.hasSavedToken = true;
      this.token = localStorage.token;

      this.axios.defaults.headers.common.Authorization = this.token;

      this.userInfo = (
        await this.axios.get("https://api.modrinth.com/v2/user")
      ).data;
    }

    if(localStorage.theme === undefined) {
      localStorage.theme = this.theme;
    }

    this.theme = localStorage.theme;
    window.applyNewTheme(this.theme)
  },
};
</script>

<style>
.animated-dropdown {
  flex-grow: 1;
}

.responsive_dropdown_fix {
  display: flex;
}

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
