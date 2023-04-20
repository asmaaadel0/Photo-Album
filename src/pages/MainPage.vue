<template>
  <div>
    <div v-if="listOfPhotos.length == 0">
      <div class="no-images">No Photos Yet</div>
      <button class="button btnn" @click="$router.push('/form')">
        Add photos
      </button>
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
                  active: choosenCategory == category,
                  buttons: choosenCategory != category,
                }"
                v-for="category in categories"
                :key="category"
                @click="changeCategory(category)"
              >
                {{ category }}
              </button>
              <button class="add-photo" @click="$router.push('/form')">
                Add Photo
              </button>
            </div>
          </div>
          <div class="col-9 homes">
            <div class="home" v-for="photo in listOfPhotos" :key="photo">
              <img :src="photo.file" alt="photo" class="home__img" />
              <h5 class="home__name">Category: {{ photo.description }}</h5>

              <button class="btn home__btn">View</button>
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
export default {
  data() {
    return {
      errorResponse: null,
      listOfPhotos: [],
      choosenCategory: "",
    };
  },
  beforeMount() {
    this.choosenCategory = this.categories[0];
    this.loadListOfPhotos();
    this.loadCategories();
  },
  computed: {
    categories() {
      return ["asmaa", "lamiaa", "Adel"];
    },
  },
  methods: {
    changeCategory(category) {
      this.choosenCategory = category;
    },
    loadListOfPhotos() {
      fetch("https://photo-album-2fcd4-default-rtdb.firebaseio.com/Travel.json")
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
              description: data[id].description,
              category: data[id].category,
              file: data[id].file,
            });
          }
          this.listOfPhotos = results;
        })
        .catch((error) => {
          this.errorResponse =
            "Failed to fetch data - please try again later" || error;
        });
    },
    loadCategories() {
      fetch("https://photo-album-2fcd4-default-rtdb.firebaseio.com")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
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
.add-photo {
  border-radius: 0%;
  margin-top: 2rem;
  background-color: #c69963;
  color: white;
  padding: 0.5rem;
  border: none;
  outline: none;
}
.homes {
  grid-column: center-start / center-end;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 2rem;
}

.home {
  background-color: #f9f7f6;

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

.home__like {
  grid-row: 1 / 2;
  grid-column: 2 / 3;

  fill: #c69963;
  height: 1rem;
  width: 1rem;

  z-index: 2;

  justify-self: end;
  margin: 1rem;
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

.home__location,
.home__rooms {
  margin-top: 2.5rem;
}
.home__btn {
  grid-column: 1 / -1;
}
.btn {
  background-color: #c69963;
  color: #fff;
  border: none;
  border-radius: 0;
  font-family: "Josefin Sans", sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 1rem 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover,
.add-photo:hover,
.btnn:hover {
  background-color: #b28451;
  color: #fff;
}
.btnn {
  background-color: #c69963;
  color: #fff;
  border: none;
  border-radius: 0;
  font-family: "Josefin Sans", sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;

  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
</style>