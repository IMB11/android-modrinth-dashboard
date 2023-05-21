<template>
  <div>
    <Card>
      <h2>Projects</h2>
    </Card>
    <Card>
      <h3>Project Statistics</h3>
      <p>
        Statistics are limited until extended statistic endpoints are published
        to the Modrinth API.
      </p>
      <div class="grid-display">
        <div class="grid-display__item">
          <div class="label">Total Downloads</div>
          <div class="value">
            {{ formatCount(store.total_downloads) }}
          </div>
          <span class="smaller-value"
            >from {{ store.projects.length }} project{{
              store.projects.length === 1 ? "" : "s"
            }}
          </span>
        </div>
        <div class="grid-display__item">
          <div class="label">Total Follows</div>
          <div class="value">{{ formatCount(store.total_followers) }}</div>
          <span class="smaller-value"
            >from {{ store.projects.length }} project{{
              store.projects.length === 1 ? "" : "s"
            }}</span
          >
        </div>
      </div>
    </Card>
    <Card class="page-extender">
      <h3>Projects</h3>
      <Card
        class="project-card"
        v-for="project in store.projects"
        :key="project.id"
      >
        <div class="project-info">
          <img :src="project.icon_url" class="project-icon" />
          <h4>{{ project.title }}</h4>
          <Button
            iconOnly
            class="project-button"
            @click="
              openInBrowser(
                `https://modrinth.com/${project.project_type}/${project.id}`
              )
            "
            ><ExternalIcon
          /></Button>
        </div>
        <div class="project-statistics">
          <p><DownloadIcon />{{ formatCount(project.downloads) }}</p>
          <p><HeartIcon />{{ formatCount(project.followers) }}</p>
        </div>
      </Card>
    </Card>
  </div>
</template>

<script>
import { store } from "@/store";

export default {
  data: () => {
    return {
      store,
    };
  },
  props: ["settings"],
  methods: {
    openInBrowser(url) {
      window.open(url, "_blank", "noreferrer");
    },
    formatCount(amount) {
      return this.settings.abreviate_downloads
        ? Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(amount)
        : amount;
    },
  },
};
</script>

<style scoped>
.project-card {
  padding: var(--gap-xs);
  padding-left: inherit;
  padding-right: inherit;
  background-color: var(--color-bg);
}

.project-statistics > p {
  margin-top: 0;
}

.project-info,
.project-statistics {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  flex-direction: row;
}

.project-button {
  margin-left: auto;
  flex-shrink: 0;
}

.project-card > .group {
  margin-left: 12px;
}
.project-icon {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
</style>
