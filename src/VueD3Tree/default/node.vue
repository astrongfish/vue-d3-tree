<script setup>

const props = defineProps({
  title:String,
  style:Object
});
</script>

<template>
  <div :style="props.style">
    {{ props.title }}
  </div>
</template>
