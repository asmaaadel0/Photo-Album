<template>
  <div class="not-found-user-page-container">
    <div class="not-found-user-page-box">
      <div class="not-found-logo">
        <img src="../imgs/not-found.jpg" alt="" />
      </div>
      <div>
        <button
          class="button"
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
<style scoped>
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
</style>
