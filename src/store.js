import { reactive } from 'vue'

export const settings = reactive({
    theme: 'Light',
    currentPage: 'Payouts',
    token: undefined,
    abreviate_downloads: true
})

export const store = reactive({
    user: {},
    payoutInfo: {},
    notifications: [
    ]
});

export const populateStoreData = async (token, axios, store) => {
    axios.defaults.headers.common.Authorization = token;

    store.user = (
      await axios.get("https://api.modrinth.com/v2/user")
    ).data;

    store.payoutInfo = (
      await axios.get(
        `https://api.modrinth.com/v2/user/${store.user.id}/payouts`
      )
    ).data;

    store.payoutInfo.all_time =
      Math.floor(store.payoutInfo.all_time * 100) / 100;
    store.payoutInfo.last_month =
      Math.floor(store.payoutInfo.last_month * 100) / 100;
    store.payoutInfo.balance =
      Math.floor(store.user.payout_data.balance * 100) / 100;

    store.notifications = (
      await axios.get(
        `https://api.modrinth.com/v2/user/${store.user.id}/notifications`
      )
    ).data;

    store.user.projects = (
      await axios.get(
        `https://api.modrinth.com/v2/user/${store.user.id}/projects`
      )
    ).data;

    store.user.total_downloads = store.user.projects.map(project => project.downloads).reduce((prev, next) => prev + next);
    store.user.total_followers = store.user.projects.map(project => project.followers).reduce((prev, next) => prev + next);
}