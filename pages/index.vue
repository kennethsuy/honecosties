<template>
  <div id="mainpage" class="min-h-screen antialiased bg-gray-100">
    <main class="container mx-auto py-8" role="main">
      <div class="max-w-2xl mx-auto bg-gray-200 rounded-lg shadow-md">
        <div
          class="
            py-2
            w-full
            mx-auto
            text-center
            bg-gray-300
            rounded-t-lg
            border-b border-solid border-gray-400
          "
        >
          <div class="text-xl font-bold">
            Honing Cost Calculator - {{ this.currentslot.toUpperCase() }} -
            {{ this.currentlevel }}
          </div>
          <button
            style="display: inline-block"
            @click.prevent="updateReqs('tier3a', 'armor', '9to10')"
          >
            Load Level
          </button>
        </div>
        <section class="py-2 border-b border-solid border-gray-400">
          <div>
            <div
              class="px-2 py-4 w-full flex flex-wrap gap-x-12 justify-center"
            >
              <div class="w-1/3">
                <p>Stone Requirement</p>
                <input
                  class="
                    px-4
                    py-2
                    w-full
                    rounded-lg
                    border border-gray-400
                    focus:border-green-600 focus:outline-none
                    transition
                  "
                  type="number"
                  v-model="stonereq"
                />
              </div>
              <div class="w-1/3">
                <p>Stone Cost (per 10)</p>
                <input
                  class="
                    px-4
                    py-2
                    w-full
                    rounded-lg
                    border border-gray-400
                    focus:border-green-600 focus:outline-none
                    transition
                  "
                  type="number"
                  v-model="stoneCost"
                />
              </div>
            </div>
          </div>
          <div>
            <div
              class="px-2 py-4 w-full flex flex-wrap gap-x-12 justify-center"
            >
              <div class="w-1/3">
                <p>Leapstone Requirement</p>
                <input
                  class="
                    px-4
                    py-2
                    w-full
                    rounded-lg
                    border border-gray-400
                    focus:border-green-600 focus:outline-none
                    transition
                  "
                  type="number"
                  v-model="leapreq"
                />
              </div>
              <div class="w-1/3">
                <p>Leapstone Cost</p>
                <input
                  class="
                    px-4
                    py-2
                    w-full
                    rounded-lg
                    border border-gray-400
                    focus:border-green-600 focus:outline-none
                    transition
                  "
                  type="number"
                  v-model="leapCost"
                />
              </div>
            </div>
          </div>
          <div>
            <div
              class="px-2 py-4 w-full flex flex-wrap gap-x-12 justify-center"
            >
              <div class="w-1/3">
                <p>Shard Requirement</p>
                <input
                  class="
                    px-4
                    py-2
                    w-full
                    rounded-lg
                    border border-gray-400
                    focus:border-green-600 focus:outline-none
                    transition
                  "
                  type="number"
                  v-model="shardreq"
                />
              </div>
              <div class="w-1/3">
                <p>Shard Cost (per 1000)</p>
                <input
                  class="
                    px-4
                    py-2
                    w-full
                    rounded-lg
                    border border-gray-400
                    focus:border-green-600 focus:outline-none
                    transition
                  "
                  type="number"
                  v-model="shardCost"
                />
              </div>
            </div>
          </div>
        </section>
        <section class="py-2 border-b border-solid border-gray-400">
          <div class="px-2 py-4 w-full flex flex-wrap gap-x-12 justify-center">
            <div class="w-1/3">
              <p>Base Honing Chance (0-100)</p>
              <input
                class="
                  px-4
                  py-2
                  w-full
                  rounded-lg
                  border border-gray-400
                  focus:border-green-600 focus:outline-none
                  transition
                "
                type="number"
                v-model="honechance"
              />
            </div>
            <div class="py-2 w-1/3 flex flex-col justify-between">
              <div class="flex flex-row justify-between">
                <div class="text-md font-bold">Cost per attempt</div>
                <div>
                  {{ this.calculateHoneAttemptCost.toLocaleString("en-US") }}
                </div>
              </div>
              <div class="flex flex-row justify-between">
                <div class="text-md font-bold">Cost to succeed</div>
                <div>
                  {{ this.calculateHoneSuccessCost.toLocaleString("en-US") }}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="py-2 border-b border-solid border-gray-400">
          <p>{{ this.currentboosttype }}</p>
          <button
            style="display: inline-block"
            @click.prevent="updateBoostType('solargrace')"
          >
            Load Solar Grace
          </button>
          <button
            style="display: inline-block"
            @click.prevent="updateBoostType('solarblessing')"
          >
            Load Solar Blessing
          </button>
          <button
            style="display: inline-block"
            @click.prevent="updateBoostType('solarprotection')"
          >
            Load Solar Protection
          </button>
        </section>
        <section class="py-2">
          <div class="px-2 py-4 w-full flex flex-wrap gap-x-12 justify-center">
            <div class="w-1/3">
              <p>Boost Bonus Per Item (%)</p>
              <input
                class="
                  px-4
                  py-2
                  w-full
                  rounded-lg
                  border border-gray-400
                  focus:border-green-600 focus:outline-none
                  transition
                "
                type="number"
                v-model="boostbonus"
              />
            </div>
            <div class="w-1/3">
              <p>Boost Cost</p>
              <input
                class="
                  px-4
                  py-2
                  w-full
                  rounded-lg
                  border border-gray-400
                  focus:border-green-600 focus:outline-none
                  transition
                "
                type="number"
                v-model="boostCost"
              />
            </div>
          </div>
          <div class="px-2 py-4 w-full flex flex-wrap gap-x-12 justify-center">
            <div class="w-1/3">
              <div class="flex flex-row justify-between">
                <div class="text-md font-bold">
                  Cost per attempt with boosts
                </div>
                <div>
                  {{ this.calculateBoostAttempt.toLocaleString("en-US") }}
                </div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="flex flex-row justify-between">
                <div class="text-md font-bold">Cost to succeed with boosts</div>
                <div>{{ this.calculateBoostCost.toLocaleString("en-US") }}</div>
              </div>
            </div>
          </div>
          <div class="w-1/3">
            <div class="flex flex-row justify-between">
              <div
                class="text-md font-bold"
                v-if="this.calculateBoostCost < this.calculateHoneSuccessCost"
              >
                Gold saved per boost
              </div>
              <div
                class="text-md font-bold"
                v-if="this.calculateBoostCost >= this.calculateHoneSuccessCost"
              >
                Gold LOST per boost
              </div>
              <div>{{ this.calculateGoldSaved.toLocaleString("en-US") }}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  /*async asyncData({ $axios }) {
    const requiredmats = await $axios.get("/get-material-req");
    return{

    }
  },*/
  methods: {
    test() {
      this.$axios.get("/ping").then((res) => {
        console.log(res);
      });
    },
    updateReqs(thisTier, thisSlot, thisLevel) {
      //
      this.$axios
        .get("/get-material-req", {
          params: { tier: thisTier, slot: thisSlot },
        })
        .then((res) => {
          this.currentslot = thisSlot;
          this.currenttier = thisTier;
          this.currentlevel = thisLevel;
          this.stonereq = res.data[thisLevel].stonereq;
          this.shardreq = res.data[thisLevel].shardreq;
          this.leapreq = res.data[thisLevel].leapreq;
          this.flatgold = res.data[thisLevel].flatgold;
          this.honechance = res.data[thisLevel].honechance;
          this.solargrace = res.data[thisLevel].solargrace;
          this.solarblessing = res.data[thisLevel].solarblessing;
          this.solarprotection = res.data[thisLevel].solarprotection;
          this.tailoring = res.data[thisLevel].tailoring;
          if (res.data[thisLevel].boostbonus) {
            //for tier 1 and 2 which we don't have
            this.boostbonus = res.data[thisLevel].boostbonus;
          }
        });
    },
    updateBoostType(thisType) {
      this.currentboosttype = thisType;
      this.boostbonus = this[thisType];
      this.boostCost = this[thisType + "cost"];
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
      stonereq: "258",
      stoneCost: "53",
      leapreq: "8",
      leapCost: "171",
      shardreq: "60",
      shardCost: "240",
      honechance: "40",
      boostCost: "70",
      boostbonus: "0.84",
      flatgold: "100",
      solargrace: "0.84",
      solarblessing: "1.67",
      solarprotection: "5",
      solargracecost: "70",
      solarblessingcost: "200",
      solarprotectioncost: "700",
      tailoring: "10",
      currentslot: "weapon",
      currenttier: "tier2",
      currentlevel: "8to9",
      currentboosttype: "solargrace",
    };
  },
  computed: {
    calculateHoneAttemptCost() {
      let cost =
        (parseFloat(this.stonereq) * parseFloat(this.stoneCost)) / 10 +
        parseFloat(this.leapreq) * parseFloat(this.leapCost) +
        (parseFloat(this.shardreq) * parseFloat(this.shardCost)) / 1000;
      if (cost) {
        return parseInt(cost);
      } else {
        return "Invalid input";
      }
    },
    calculateHoneSuccessCost() {
      let cost =
        (((parseFloat(this.stonereq) * parseFloat(this.stoneCost)) / 10 +
          parseFloat(this.leapreq) * parseFloat(this.leapCost) +
          (parseFloat(this.shardreq) * parseFloat(this.shardCost)) / 1000) *
          100) /
        parseFloat(this.honechance);
      if (cost) {
        return parseInt(cost);
      } else {
        return "Invalid input";
      }
    },
    calculateBoostCost() {
      return parseInt((this.boostCost * 100) / this.boostbonus);
    },
    calculateBoostAttempt() {
      return (
        ((this.boostCost * 100) / this.boostbonus) * 0.01 * this.honechance
      );
    },
    calculateGoldSaved() {
      return (
        (this.calculateHoneSuccessCost - this.calculateBoostCost) *
        0.01 *
        this.boostbonus
      );
    },
  },
};
</script>

<style scoped>
.costs {
  background: gray;
}
</style>
