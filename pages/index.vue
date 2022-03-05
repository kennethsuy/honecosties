<template>
  <div id="mainpage">
   <p> Honing Cost Calculator </p>
   <button style="display:inline-block" @click.prevent="test()">Test Button</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    test(){
      this.$axios.get("/ping").then((res) => {
        console.log(res)
      })
    }
  }
}

</script>
