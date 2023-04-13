<template>
  <Card>
    <h3>Settings</h3>
    <div class="responsive">
      <label for="theme-dropdown">
        <h4>Theme</h4>
      </label>
      <DropdownSelect
        id="theme-dropdown"
        v-model="theme"
        :options="['Dark', 'Light']"
        :default-value="initialTheme"
        @change="() => $emit('changedTheme', theme)"
      />
    </div>
  </Card>
</template>

<script>
export default {
  props: ["initialTheme"],
  emits: ["changedTheme"],
  data: () => {
    return {
      theme: '',
    };
  },
  mounted() {
    this.theme = this.$props.initialTheme;
  }
};
</script>

<style scoped>
label {
  margin: auto;
}

.responsive {
  gap: 10%;
}
</style>
