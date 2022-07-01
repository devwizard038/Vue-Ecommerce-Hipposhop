<template>
  <div class="pop-message">
    <div class="message">
      <div>
        Voulez-vous vraiment supprimer du panier:
        <br>{{ itemName }}?
      </div>
      <div>
        <button
          class="press-yes"
          @click="deleteConfirm(true)"
        >
          Oui
        </button>
        <button
          class="press-no"
          @click="deleteConfirm(false)"
        >
          Non
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ShopCartMessageComp",
  props: {
    itemName: {
      type: String,
      default: () => "",
    },
    deleteConfirm: Function
  },
  data() {
    return {
      confirm: 0,
    }
  },
}
</script>

<style>
.pop-message {
  top: 0;
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
  text-align: center;
  top: 40%;
}

.press-yes {
  background-color: #efefef;
  color: black;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 5px;
  margin: 1rem 0.5rem 0.5rem;
  cursor: pointer;
  border: none;
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
  border-radius: 5px;
  margin: 1rem 0.5rem 0.5rem;
  cursor: pointer;
  border: none;
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