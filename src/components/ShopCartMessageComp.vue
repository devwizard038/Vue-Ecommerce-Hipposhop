<template>
  <div class="pop-message">
    <div class="message">
      <div>
        Ești sigur că vrei să ștergi produsul din coș?
      </div>
      <div>
        <button
            class="press-yes"
            @click="confirm = 2; buttonPress()"
        >
          Da
        </button>
        <button
            class="press-no"
            @click="confirm = 1; buttonPress()"
        >
          Nu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      confirm: 0,
      showMessage: true,
    }
  },
  computed: {
    ...mapGetters({
      getMessageState: "message/getMessage",
    }),
  },
  methods: {
    ...mapActions({
      loadMessageState: "message/loadMessage"
    }),
    buttonPress() {
      if (this.confirm === 1) {
        console.log(this.getMessageState)
        this.loadMessageState()
        console.log(this.getMessageState)

      } else if (this.confirm === 2) {
        console.log(this.getMessageState)
        this.loadMessageState()
        console.log(this.getMessageState)

      }
    }
  }
}
</script>

<style>
.pop-message {
  display: flex;
  padding-top: 50px;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

.message {
  display: flex;
  padding: 2rem;
  position: absolute;
  flex-direction: column;
  align-items: center;
  background-color: #2d2d2d;
  color: #efefef;
  font-family: 'Poppins', sans-serif;
  border-radius: 5px;
  font-size: 18px;

}

.press-yes {
  background-color: #efefef;
  color: black;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border: #efefef 1px solid;
  border-radius: 5px;
  margin: 1rem 0.5rem 0.5rem;
}

.press-yes:hover {
  background-color: lightcoral;
  color: #efefef;
}

.press-yes:focus {
  box-shadow: ghostwhite;
}

.press-yes:active {
  background-color: coral;
  box-shadow: none;
  color: #efefef;
}

.press-no {
  background-color: #efefef;
  color: black;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border: #efefef 1px solid;
  border-radius: 5px;
  margin: 1rem 0.5rem 0.5rem;
}

.press-no:hover {
  background-color: mediumseagreen;
  color: #efefef;
}

.press-no:focus {
  box-shadow: ghostwhite;
}

.press-no:active {
  background-color: seagreen;
  box-shadow: none;
  color: #efefef;
}
</style>