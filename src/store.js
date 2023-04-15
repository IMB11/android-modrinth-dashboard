import { reactive } from 'vue'

export const settings = reactive({
    theme: 'Light',
    currentPage: 'Payouts',
    token: undefined
})

export const store = reactive({
    user: {},
    payoutInfo: {},
    notifications: [
    ],
})