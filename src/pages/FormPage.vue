<template>
  <div>
    <TheForm :categories="['asmaa', 'lamiaa']" />
  </div>
</template>

<script>
import TheForm from "../components/TheForm.vue";
export default {
  components: {
    TheForm,
  },
};
</script>

<style>
</style>