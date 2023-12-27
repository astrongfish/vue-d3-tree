<script setup>
import "./style.css";
import { ref } from "vue"


const bigSize = ref(true)

const emit = defineEmits(["click"]);

function onClick() {
  bigSize.value = !bigSize.value
  emit('click')
}

</script>

<template>
  <div 
    class="change-size-node" 
    :class="[bigSize ? 'big-size' : 'small-size']"
    @click="onClick">
    {{ bigSize ? "点击变小" : "点击变大" }}
  </div>
</template>
<style scoped>
.change-size-node {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
  cursor: pointer;
  font-size: 10px;
}

.big-size {
  width: 60px;
  height: 60px;
}

.small-size {
  width: 40px;
  height: 40px;
}
</style>