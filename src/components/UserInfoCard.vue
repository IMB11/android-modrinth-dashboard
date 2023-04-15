<template>
  <Card>
    <div class="profile_info">
      <div class="profile_avatar">
        <Avatar size="sm" circle :src="store.user.avatar_url" />
        <p>{{ store.user.username }}</p>
      </div>
    </div>
    <div>
      <div class="profile_button_group">
        <Button @click="handleLogout()"> <LogoutIcon />Logout </Button>
        <Button :disabled="disableRefresh" @click="handleRefresh()">
          <UpdatedIcon />Refresh
        </Button>
      </div>
    </div>
  </Card>
</template>

<script>
import LogoutIcon from "@/assets/icons/LogOutIcon.vue";
import UpdatedIcon from "@/assets/icons/UpdatedIcon.vue";

import { store, settings, populateStoreData } from "@/store";

export default {
  components: {
    LogoutIcon,
    UpdatedIcon,
  },
  data: () => {
    return {
      store,
      settings,
      disableRefresh: false,
    };
  },
  methods: {
    handleLogout() {
      this.settings.token = undefined;
      this.hasSavedToken = false;
      this.store.user = {};
      this.axios.defaults.headers.common.Authorization = this.settings.token;

      localStorage.settings = JSON.stringify(this.settings);
    },
    async handleRefresh() {
      if (this.disableRefresh) return;

      this.disableRefresh = true;

      populateStoreData(this.axios, this.store)

      setTimeout(() => {
        this.disableRefresh = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
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

.profile_button_group {
  margin-top: var(--gap-md);
  display: flex;
  flex-direction: row;
  align-items: start;
}

.profile_button_group > * {
  margin-right: var(--gap-sm);
}
</style>
