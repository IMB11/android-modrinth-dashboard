<template>
  <div>
    <Card>
      <h2>Notifications</h2>
      <p>Only status change notifications will be shown here.</p>
    </Card>
    <Card v-if="store.notifications.length < 1">
      <i>You don't have any notifications.</i>
    </Card>
    <Card
      class="notification"
      v-for="notification in store.notifications"
      :key="notification.title"
    >
      <h4 v-html="render(notification.title)" />
      <p v-html="render(notification.text)" />
      <p class="recieved-date">
        <CalendarIcon /> Recieved
        {{
          new Intl.DateTimeFormat("en", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }).format(new Date(notification.created))
        }}
      </p>
      <div class="dismiss-btn">
        <Button @click="dismissNotification(notification.id)"
          ><XIcon />Dismiss</Button
        >
      </div>
    </Card>
  </div>
</template>

<script>
import { store } from "@/store";
import { renderHighlightedString } from "omorphia";

export default {
  data: () => {
    return {
      store,
    };
  },
  methods: {
    async dismissNotification(id) {
      await this.axios.delete(`https://api.modrinth.com/v2/notification/${id}`);
      this.store.notifications = (
        await this.axios.get(
          `https://api.modrinth.com/v2/user/${store.user.id}/notifications`
        )
      ).data;
    },
    render(str) {
      return renderHighlightedString(str);
    },
    getNotificationContent(notification) {
      return renderHighlightedString(
        "### " + notification.title + "\n\n" + notification.text
      );
    },
  },
};
</script>

<style scoped>
.notification-value {
  font-size: 1.5rem;
}

.dismiss-btn {
  display: flex;
  justify-content: flex-end;
}

.recieved-date {
  font-weight: 500;
  font-size: var(--font-size-sm);
}
</style>
