<template>
  <div id="mainpage">
    <p>Honing Cost Calculator</p>
    <p hidden>
      <button style="display: inline-block" @click.prevent="test()">
        Test Button
      </button>
    </p>
    <br />
    <div class="costs">
      <cv-number-input
        v-model="stoneCost"
        label="Stone Cost (bundle of 10)"
        placeholder="Make it a number"
      >
        <template v-if="!isNumeric(this.stoneCost)" slot="invalid-message"
          >Invalid message text</template
        >
      </cv-number-input>
      <cv-number-input
        v-model="leapCost"
        label="Leapstone Cost"
        placeholder="Make it a number"
      >
        <template v-if="!isNumeric(this.leapCost)" slot="invalid-message"
          >Invalid message text</template
        >
      </cv-number-input>
      <cv-number-input
        v-model="shardCost"
        label="Shard Cost (M)"
        placeholder="Make it a number"
      >
        <template v-if="!isNumeric(this.shardCost)" slot="invalid-message"
          >Invalid message text</template
        >
      </cv-number-input>
    </div>
    <cv-number-input
      v-model="stoneReq"
      label="Stone Req"
      placeholder="Make it a number"
    >
      <template v-if="!isNumeric(this.stoneReq)" slot="invalid-message"
        >Invalid message text</template
      >
    </cv-number-input>
    <cv-number-input
      v-model="leapReq"
      label="Leapstone Req"
      placeholder="Make it a number"
    >
      <template v-if="!isNumeric(this.leapReq)" slot="invalid-message"
        >Invalid message text</template
      >
    </cv-number-input>
    <cv-number-input
      v-model="shardReq"
      label="Shard Req"
      placeholder="Make it a number"
    >
      <template v-if="!isNumeric(this.shardReq)" slot="invalid-message"
        >Invalid message text</template
      >
    </cv-number-input>
    <cv-number-input
      v-model="honeChance"
      label="Hone Chance (between 0 and 100)"
      placeholder="Make it a number"
      min=0
      max=100
    >
      <template
        v-if="
          !(
            isNumeric(this.honeChance) &&
            parseFloat(this.honeChance) <= 100 &&
            parseFloat(this.honeChance) > 0
          )
        "
        slot="invalid-message"
        >Must be between 100 and 0</template
      >
    </cv-number-input>
    <div>{{ this.calculateHoneCost }}</div>
    <cv-number-input
      v-model="boostCost"
      label="Boost Cost"
      placeholder="Make it a number"
    >
      <template v-if="!isNumeric(this.boostCost)" slot="invalid-message"
        >Invalid message text</template
      >
    </cv-number-input>
    <cv-number-input
      v-model="boostBonus"
      label="Boost Bonus (between 0 and 100)"
      placeholder="Make it a number"
      min=0
      max=100
    >
      <template
        v-if="
          !(
            isNumeric(this.boostBonus) &&
            parseFloat(this.boostBonus) <= 100 &&
            parseFloat(this.boostBonus) > 0
          )
        "
        slot="invalid-message"
        >Must be between 100 and 0</template
      >
    </cv-number-input>
    <div>{{ this.calculateBoostCost }}</div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    test() {
      this.$axios.get("/ping").then((res) => {
        console.log(res);
      });
    },
    isNumeric(str) {
      if (typeof str != "string") return false; // we only process strings!
      return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
      ); // ...and ensure strings of whitespace fail
    },
  },
  data() {
    return {
      stoneCost: "53",
      leapCost: "171",
      shardCost: "240",
      stoneReq: "258",
      leapReq: "8",
      shardReq: "60",
      honeChance: "40",
      boostCost:"70",
      boostBonus:"0.84"


    };
  },
  computed: {
    calculateHoneCost() {
      let finalCalc =
        (((parseFloat(this.stoneReq) * parseFloat(this.stoneCost)) / 10 +
          parseFloat(this.leapReq) * parseFloat(this.leapCost) +
          (parseFloat(this.shardReq) * parseFloat(this.shardCost)) / 1000) *
          100) /
        parseFloat(this.honeChance);
      if (finalCalc) {
        return "Cost per hone success is: " + parseFloat(finalCalc);
      } else {
        return "One of your values isn't a number";
      }
    },
    calculateBoostCost() {
      return (this.boostCost * 100 / this.boostBonus)
    },
  },
};
</script>

<style scoped>
.costs {
  background: gray;
}
</style>