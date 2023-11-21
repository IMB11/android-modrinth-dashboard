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
        <Button @click="handleLogout()"> <LogOutIcon />Logout </Button>
        <Button :disabled="disableRefresh" @click="handleRefresh()">
          <UpdatedIcon />Refresh
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Button, Avatar, Card, UpdatedIcon, LogOutIcon } from "omorphia";
import { useDataStore } from "@/store";
import { ref } from "vue";
import router from "@/router";

const store = useDataStore();

const disableRefresh = ref(false);

function handleRefresh() {}

function handleLogout() {
  store.setToken(undefined);
  store.cachedData = { statistics: undefined };
  window.location.reload();
}
</script>

<style scoped lang="scss">
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
