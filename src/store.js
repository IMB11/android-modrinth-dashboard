import { reactive } from "vue";

export const settings = reactive({
  theme: "System",
  currentPage: "Payouts",
  token: undefined,
  abreviate_downloads: true,
  last_refreshed: new Date(),
});

export const store = reactive({
  user: {},
  payoutInfo: {},
  projects: {
    length: 0,
  },
  notifications: [],
  latest_app_version: {
    tag_name: "0.0.0",
    html_url: "",
  },
});

export const populateStoreData = async (axios, store) => {
  store.latest_app_version = (
    await axios.get(
      "https://api.github.com/repos/mineblock11/android-modrinth-dashboard/releases/latest"
    )
  ).data;

  store.user = (await axios.get("https://api.modrinth.com/v2/user")).data;

  store.payoutInfo = (
    await axios.get(`https://api.modrinth.com/v2/user/${store.user.id}/payouts`)
  ).data;

  store.balance_all_time = Math.floor(store.payoutInfo.all_time * 100) / 100;
  store.balance_last_month =
    Math.floor(store.payoutInfo.last_month * 100) / 100;
  store.balance = Math.floor(store.user.payout_data.balance * 100) / 100;

  store.notifications = (
    await axios.get(
      `https://api.modrinth.com/v2/user/${store.user.id}/notifications`
    )
  ).data;

  store.projects = (
    await axios.get(
      `https://api.modrinth.com/v2/user/${store.user.id}/projects`
    )
  ).data;

  store.total_downloads = store.projects
    .map((project) => project.downloads)
    .reduce((prev, next) => prev + next);
  store.total_followers = store.projects
    .map((project) => project.followers)
    .reduce((prev, next) => prev + next);
};
