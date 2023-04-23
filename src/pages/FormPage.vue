<template>
  <div>
    <TheForm :categories="categories" />
  </div>
</template>

<script>
import TheForm from "../components/TheForm.vue";
export default {
  components: {
    TheForm,
  },
  beforeMount() {
    this.loadCategories();
  },
  data() {
    return {
      categories: [],
      errorResponse: "",
    };
  },
  methods: {
    loadCategories() {
      fetch(
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