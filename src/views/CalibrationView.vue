<template>
  <div>
    <PlottingCanvas />
    <CalibrationPoints :x="x" :y="y"/>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import PlottingCanvas from "@/components/PlottingCanvas.vue";
import CalibrationPoints from "@/components/CalibrationPoints.vue";

export default {
  name: 'CalibrationView',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
  },
  computed: {
    ...mapState({
            x: state => state.x,
            y: state => state.auth.y,
            eyeTrackingOn: state => state.eyeTrackingOn
    }),
  },
};
</script>