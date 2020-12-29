<template>
  <div>
    <PlottingCanvas />
    <CalibrationPoints :x="x" :y="y" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlottingCanvas from "@/components/PlottingCanvas.vue";
import CalibrationPoints from "@/components/CalibrationPoints.vue";

export default {
  name: 'CalibrationView',
  components : {PlottingCanvas, CalibrationPoints},
  data() {
    return {
      count: 0,
    };
  },
  mounted() {
  },
  computed: {
    ...mapState('eyeTracking',['eyeTrackingOn', 'x', 'y']),
  },
  methods: {
    
  }
};
</script>