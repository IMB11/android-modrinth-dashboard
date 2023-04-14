<template>
  <div>
    <Card>
      <h3>Notifications</h3>
      <p>
        Only status change notifications will be shown here.
      </p>
      <i v-if="store.notifications.length < 1">You don't have any notifications.</i>
      <div class="grid-display">
        <div class="grid-display__item" v-for="notification in notifications" v-bind:key="notification.id + notification.user_id">
            <div style="width: 100%" class="markdown-body" v-html="getNotificationContent(notification)"></div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { store } from "@/store";
import { renderHighlightedString } from 'omorphia';

export default {
  data: () => {
    return {
      store
    };
  },
  computed: {
    notifications() {
        return store.notifications.filter(notif => notif.type === 'status_update')
        // return store.notifications;
    }
  },
  methods: {
    getNotificationContent(notification) {
        return renderHighlightedString("### " + notification.title + "\n\n" + notification.text)
    }
  }
};
</script>

<style scoped>
.notification-value {
    font-size: 1.5rem;
}
</style>