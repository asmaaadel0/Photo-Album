<template>
  <div>
    <div v-if="loading">
      <the-spinner
        style="position: absolute; left: 50%; top: 50%"
      ></the-spinner>
    </div>
    <div v-else-if="categories.length == 0">
      <div class="no-images">No Photos Yet</div>
      <button class="btn" @click="$router.push('/form')">Add photos</button>
    </div>
    <div v-else>
      <div class="container text-center">
        <div class="row">
          <div class="col-3">
            <div class="categories">Categories</div>
            <div class="list-group">
              <button
                type="button"
                class="list-group-item list-group-item-action"
                aria-current="true"
                :class="{
                  active: choosenCategory == 'All',
                  buttons: choosenCategory != 'All',
                }"
                @click="changeCategory('All')"
              >
                All
              </button>
              <button
                type="button"
                class="list-group-item list-group-item-action"
                aria-current="true"
                :class="{
                  active: choosenCategory == category.category,
                  buttons: choosenCategory != category.category,
                }"
                v-for="category in categories"
                :key="category"
                @click="changeCategory(category.category)"
              >
                {{ category.category }}
              </button>
              <button class="btn" @click="$router.push('/form')">
                Add Photo
              </button>
            </div>
          </div>
          <div class="col-9 homes">
            <div v-if="loading">
              <the-spinner
                style="position: absolute; left: 50%; top: 50%"
              ></the-spinner>
            </div>

            <div class="home" v-for="photo in listOfPhotos" :key="photo">
              <!-- <img :src="photo.file" alt="photo" class="home__img" />
              <h5 class="home__name">Category: {{ photo.category }}</h5> -->

              <!-- <button class="btn home__btn">View</button> -->
              <div class="card" style="width: 18rem">
                <img :src="photo.file" class="card-img-top" alt="photo" />
                <div class="card-body">
                  <h5 class="card-title">Category:</h5>
                  <p class="card-text">
                    {{ photo.category }}
                  </p>
                  <button
                    class="btn home__btn"
                    @click="
                      $router.push('/photo/' + photo.category + '/' + photo.id)
                    "
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-messages" v-if="errorResponse">
      {{ errorResponse }}
    </div>
  </div>
</template>

<script>
import TheSpinner from "../components/TheSpinner.vue";
export default {
  components: {
    TheSpinner,
  },
  data() {
    return {
      errorResponse: null,
      listOfPhotos: [],
      choosenCategory: "All",
      categories: [],
      arrayResults: [],
      allPhotos: [],
      loading: false,
    };
  },
  async beforeMount() {
    this.loading = true;
    await this.loadCategories();
    await this.loadListOfPhotos();
    this.loading = false;
  },
  methods: {
    changeCategory(category) {
      this.loading = true;
      this.choosenCategory = category;
      if (this.choosenCategory == "All") {
        this.listOfPhotos = this.allPhotos;
      } else {
        for (let i = 0; i < this.categories.length; i++) {
          if (this.arrayResults[i][0].category == category) {
            this.listOfPhotos = this.arrayResults[i];
          }
        }
      }
      this.loading = false;
    },
    async loadListOfPhotos() {
      let results = [];
      for (let i = 0; i < this.categories.length; i++) {
        await fetch(
          "https://photo-album-2fcd4-default-rtdb.firebaseio.com/" +
            this.categories[i].category +
            ".json"
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            results = [];
            for (const id in data) {
              results.push({
                id: id,
                description: data[id].description,
                category: data[id].category,
                file: data[id].file,
              });
              this.allPhotos.push({
                id: id,
                description: data[id].description,
                category: data[id].category,
                file: data[id].file,
              });
            }
            this.arrayResults.push(results);
          })
          .catch((error) => {
            this.errorResponse =
              "Failed to fetch data - please try again later" || error;
          });
        this.listOfPhotos = this.allPhotos;
      }
    },
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
.no-images {
  font-size: 7rem;
  margin-top: 10rem;
}
.categories {
  font-size: 1.4rem;
  color: rgb(18, 17, 16);
  margin-bottom: 1rem;
}
.buttons:hover {
  background-color: rgb(238, 233, 233);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.active {
  background-color: black !important;
  color: white;
  border-radius: 0rem;
  border: none;
  outline: none;
}
.active:hover {
  background-color: black;
}
.homes {
  grid-column: center-start / center-end;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;
}

.home {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 1rem;
}
.home__img {
  width: 100%;

  grid-row: 1 / 2;
  grid-column: 1 / -1;

  z-index: 1;
}

.home__name {
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  justify-self: center;
  align-self: end;
  z-index: 3;

  width: 80%;
  font-family: "Josefin Sans", sans-serif;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
  background-color: #101d2c;
  color: #fff;
  font-weight: 400;
  transform: translateY(50%);
}
</style>