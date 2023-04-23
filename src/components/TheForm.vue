<template>
  <form @submit.prevent="handleSubmit()">
    <label for="description">description:</label>
    <input
      type="text"
      name="description"
      id="description"
      required
      v-model="description"
    />
    <div v-if="!description & error" class="error">Add description!</div>

    <label for="category">Select a category:</label>
    <select
      name="category"
      id="category"
      v-model="choosenCategory"
      :disabled="newCategory != ''"
    >
      <option :value="category" v-for="category in categories" :key="category">
        {{ category.category }}
      </option>
    </select>

    <label for="newCategory">Create new category:</label>
    <input
      type="text"
      name="newCategory"
      id="newCategory"
      v-model="newCategory"
      @input="onChangeInput"
    />
    <div v-if="sameCategory" class="error">
      There exist category with same name .
    </div>
    <div v-if="!choosenCategory & !newCategory & error" class="error">
      Choose Category or add new one...
    </div>
    <label for="image">Image file:</label>
    <input
      type="file"
      accept="image/jpg, image/jpeg, image/png"
      name="image"
      id="image"
      @change="onChangeFile"
      required
    />
    <div v-if="!file & error" class="error">Choose file</div>
    <div class="submit">
      <button class="button btn">Submit</button>
    </div>
    <div v-if="errorResponse" class="error">{{ errorResponse }}</div>
  </form>
</template>
<script>
export default {
  name: "TheForm",
  data() {
    return {
      description: "",
      error: false,
      file: "",
      choosenCategory: "",
      newCategory: "",
      errorResponse: null,
      sameCategory: false,
    };
  },
  methods: {
    onChangeFile(event) {
      this.file = URL.createObjectURL(event.target.files[0]);
      // this.$emit("update:modelValue", event.target.files[0]);
    },
    onChangeInput() {
      this.choosenCategory = "";
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].category == this.newCategory) {
          this.sameCategory = true;
        }
        else {
          this.sameCategory = false;
        }
      }
    },
    async handleSubmit() {
      if (
        !this.description ||
        !this.choosenCategory & !this.newCategory ||
        !this.file ||
        this.sameCategory
      ) {
        this.error = true;
        return;
      }
      this.error = true;
      let category = "";
      if (this.newCategory) {
        category = this.newCategory;
        fetch(
          "https://photo-album-2fcd4-default-rtdb.firebaseio.com/categories.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: category,
            }),
          }
        )
          .then((response) => {
            if (response.ok) {
              //
            } else {
              throw new Error("could not save data!");
            }
          })
          .catch((error) => {
            this.errorResponse = error.message;
          });
      } else {
        category = this.choosenCategory.category;
      }
      fetch(
        "https://photo-album-2fcd4-default-rtdb.firebaseio.com/" +
          category +
          ".json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: this.description,
            category: category,
            file: this.file,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            this.$router.push("/");
          } else {
            throw new Error("could not save data!");
          }
        })
        .catch((error) => {
          this.errorResponse = error.message;
        });
    },
  },
  props: ["categories"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label,
.add {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  box-sizing: border-box;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

.btn {
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
.btn:hover {
  background-color: #b28451;
  color: #fff;
}

.submit {
  text-align: center;
}

.error {
  color: red;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}

select:disabled {
  cursor: not-allowed;
  opacity: 1;
}
</style>