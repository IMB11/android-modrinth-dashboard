<template>
  <Card>
    <h3>Settings</h3>
    <div class="responsive">
      <label for="theme-dropdown">
        <h4>Theme</h4>
      </label>
      <DropdownSelect
        name="dropdown-theme"
        id="theme-dropdown"
        :options="['Dark', 'Light']"
        :default-value="initialTheme"
        @change="(val) => $emit('changedTheme', val.option)"
      />
    </div>
  </Card>
</template>

<script>
export default {
  props: ["initialTheme"],
  emits: ["changedTheme"]
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
