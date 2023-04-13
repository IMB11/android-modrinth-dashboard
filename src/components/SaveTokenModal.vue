<template>
  <div>
    <Card class="error-card" v-if="error !== ''">
      {{ error }}
    </Card>
    <p>
      You have not entered your modrinth token yet - Modrinth Publisher
      Dashboard is unable to authenticate with the Modrinth API.
    </p>
    <input type="text" v-model="token" placeholder="Token" />
    <p><i>You can always change the token later.</i></p>
    <div class="auth_modal_btns">
      <Button color="primary" @click="verifyToken()">Save token</Button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      token: '',
      error: ''
    }
  },
  methods: {
    async verifyToken() {
      try {
        this.axios.defaults.headers.common.Authorization = this.token;
        const { data } = await this.axios.get('https://api.modrinth.com/v2/user');
        this.userInfo = data;
        console.log("Verified user: " + data.id)
        this.error = ""
        this.$emit('confirmed', this.token)
      } catch {
        this.error = "Invalid token."
      }
    }
  }
}
</script>

<style>
.error-card {
  background-color: var(--color-red);
  color: var(--color-contrast);
}
</style>
