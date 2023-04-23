<template>
  <div class="not-found-user-page-container">
    <div class="not-found-user-page-box">
      <div class="not-found-logo">
        <img src="../imgs/not-found.jpg" alt="" />
      </div>
      <div>
        <button
          class="btn"
          id="go-home"
          @click="$router.push('/')"
        >
          Go Home
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.not-found-user-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
}
.not-found-user-page-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn {
  background-color: #810000;
  color: #fff;
  border: none;
  border-radius: 2px;
  font-family: "Josefin Sans", sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn:hover,
.add-photo:hover,
.btnn:hover {
  background-color: #b00101;
  color: #fff;
}
</style>
