<template>
  <Card>
    <h3>Settings</h3>
    <div class="settings-row">
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
    </div>
  </Card>
</template>

<script>
export default {
  props: ["initialTheme"],
  emits: ["changedTheme"],
};
</script>

<style scoped>
label {
  flex-grow: 0;
  margin-top: auto;
  margin-bottom: auto;
}

.responsive:nth-child(1) {
  flex-grow: 1;
}

.responsive {
  gap: 10%;
}

.settings-row {
  display: flex;
  flex-direction: column;
}

.settings-row > * {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
