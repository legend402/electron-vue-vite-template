<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill-opacity="1" d="M0,32L40,80C80,128,160,224,240,229.3C320,235,400,149,480,144C560,139,640,213,720,256C800,299,880,309,960,282.7C1040,256,1120,192,1200,160C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
      <animateTransform attributeName="transform" attributeType="XML" type="translate"  from="0 0" to="300 0" dur="5s" repeatCount="indefinite" />
    </path>
  </svg>
</template>

<style scoped>
svg > path {
  fill: var(--theme-color);
  transition: .5s all;
}
</style>
