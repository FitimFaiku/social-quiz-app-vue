<template>
  <div>
    <PlottingCanvas />
    <CalibrationPoints :x="x" :y="y" :calibrationSuceededForOnePoint="calibrationSuceededForOnePoint"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlottingCanvas from "@/components/PlottingCanvas.vue";
import CalibrationPoints from "@/components/CalibrationPoints.vue";
import { router } from '../router';

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
    calibrationSucedded() {
      if(this.count >=9){
        console.log("Calibration suceed");
        localStorage.setItem('hasCalibrated', JSON.stringify(true));
        this.router.push('/home');

      }
    }
  },
  methods: {
    calibrationSuceededForOnePoint(){
      this.count = this.count + 1;
    }
  }
};
</script>