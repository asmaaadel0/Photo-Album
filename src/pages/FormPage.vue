<template>
  <div>
    <div v-if="loading">
      <the-spinner
        style="position: absolute; left: 50%; top: 50%"
      ></the-spinner>
    </div>
    <TheForm :categories="categories" />
  </div>
</template>

<script>
import TheForm from "../components/TheForm.vue";
import TheSpinner from "../components/TheSpinner.vue";
export default {
  components: {
    TheSpinner,
    TheForm,
  },
  async beforeMount() {
    this.loading = true;
    await this.loadCategories();
    this.loading = false;
  },
  data() {
    return {
      categories: [],
      errorResponse: "",
      loading: false,
    };
  },
  methods: {
    async loadCategories() {
      await fetch(
        "https://photo-album-2fcd4-default-rtdb.firebaseio.com/categories.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const results = [];
          for (const id in data) {
            results.push({
              id: id,
              category: data[id].category,
            });
          }
          this.categories = results;
        })
        .catch((error) => {
          this.errorResponse =
            "Failed to fetch data - please try again later" || error;
        });
    },
  },
};
</script>

<style>
</style>