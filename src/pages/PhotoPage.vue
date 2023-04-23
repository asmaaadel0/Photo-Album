<template>
  <div class="">
    <!-- <img src="../imgs/OIP.jpg" alt="photo" class="rounded float-end" /> -->
    <!-- <h5 class="home__name">
      Description:
      photo.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphotophoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categorycategoryphoto.categoryphoto.category
    </h5> -->

    <!-- <figure>
      <img src="../imgs/R.jpg" class="figure-img img-fluid rounded" alt="..." />
      <figcaption class="figure-caption">
        Description:
        photo.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphotophoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categorycategoryphoto.categoryphoto.category
      </figcaption>
    </figure> -->

    <div class="common slidedown">
      <img src="../imgs/R.jpg" alt="Image Caption Slidedown" />
      <div class="pic-caption">
        Description:
        o.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categoryphoto.categorycategoryphoto.categoryphoto.category
      </div>
    </div>
    <button class="btn home__btn" @click="$router.push('/main')">
      Go Back
    </button>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
/* General Style */
.common {
  margin: 0;
  padding: 0;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.common::before,
.common::after {
  content: "";
  width: 100%;
  height: 100%;
  background: black;
  position: absolute;
  opacity: 0.3;
  top: 0;
  left: 0;
  -moz-transform: translate3d(0, -100%, 0);
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.pic-caption {
  position: absolute;
  text-align: center;
  background: lightyellow;
  z-index: 999;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  top: 50%;
  -webkit-transform: translate3d(-100%, -50%, 0);
  transform: translate3d(-100%, -50%, 0);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  line-height: 30px;
  font-size: 16px;
}

img {
  display: block;
}

/* Slidedown Caption */
.slidedown:hover::before {
  -moz-transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.slidedown:hover .pic-caption {
  opacity: 1;
  -moz-transform: translate3d(0, -50%, 0);
  -webkit-transform: translate3d(0, -50%, 0);
  transform: translate3d(0, -50%, 0);
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -moz-transition-delay: 0.5s;
  -webkit-transition-delay: 0.5s;
  transition-delay: 0.5s;
}

img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  transition: all 0.2s;
  height: auto;
  display: block;
  margin: auto;
  width: 50%;
}
img:hover {
  background-color: rgb(238, 233, 233);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 1rem;
}
</style>