<template>
  <form @submit.prevent="handleSubmit">
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
    <select name="category" id="category" v-model="choosenCategory">
      <option :value="category" v-for="category in categories" :key="category">
        {{ category }}
      </option>
    </select>

    <label for="newCategory">Create new category:</label>
    <input
      type="text"
      name="newCategory"
      id="newCategory"
      v-model="newCategory"
    />
    <div v-if="!choosenCategory & !newCategory & error" class="error">
      Choose Category or add new one...
    </div>
    <label for="image">Image file:</label>
    <input
      type="file"
      name="image"
      id="image"
      @change="onChangeFile"
      required
    />
    <div v-if="!file & error" class="error">Choose file</div>
    <div class="submit">
      <button class="button btn" @click="handleSubmit()">Submit</button>
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
    };
  },
  methods: {
    onChangeFile(event) {
      this.file = event.target.files[0];
      // this.$emit("update:modelValue", event.target.files[0]);
    },
    async handleSubmit() {
      if (
        !this.description ||
        !this.choosenCategory & !this.newCategory ||
        !this.file
      ) {
        this.error = true;
        return;
      }
      this.error = true;
      let category = "";
      if (this.newCategory) {
        category = this.newCategory;
      } else {
        category = this.choosenCategory;
      }
      try {
        await this.$store.dispatch("addImage", {
          description: this.description,
          category: category,
          file: this.file,
          baseurl: this.$baseurl,
        });
        if (this.$store.getters["addedSuccessfully"]) {
          this.hideAddRule();
          this.$emit("doneSuccessfully");
        }
      } catch (err) {
        console.log(err);
        this.errorResponse = err;
      }
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
.btn:hover,
.add-photo:hover {
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
</style>