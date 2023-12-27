<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const knotStyle = ref({
  width: "30px",
  height: "15px",
  padding: "0 5px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  fontSize: "10px",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid gray",
  borderRadius: "3px",
  cursor: "pointer",
  color: "#007bff",
});

const arrowBaseStyle = {
  width: 0,
  height: 0,
};

const arrowDownStyle = {
  borderTop: "5px solid #007bff",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent"
}

const arrowUpStyle = {
  borderBottom: "5px solid #007bff",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent"
}

const arrowStyle = computed(() => {
  const style = props.collapsed ? arrowUpStyle : arrowDownStyle
  return {...arrowBaseStyle, ...style}
})

</script>

<template>
  <div :style="knotStyle" class="default-knot" @click="(e) => emit('click', e)">
    <div :style="arrowStyle"/>
    <div>
      {{ props.num }}
    </div>
  </div>
</template>
