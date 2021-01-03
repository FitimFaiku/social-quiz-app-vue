<script>

//import {GazeCloudAPI} from '@/assets/GazeCloudAPI.js'
export default {
  name: "GazeCloud",
  render: (h) => h(),
  props: {
    off: {
      type: Boolean,
      default: false,
    }
  },
  data: () => {
    return {
      x: 0,
      y: 0,
    };
  },
  mounted() {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', 'https://api.gazerecorder.com/GazeCloudAPI.js');
    document.head.appendChild(recaptchaScript);
  },
  created() {
    /* if(GazeCloudAPI){
      GazeCloudAPI.StartEyeTracking();
      GazeCloudAPI.OnCalibrationComplete =function(){ 
        console.log("gaze Calibration Complete");
      };
    } */ 
    
  },
  
};
</script>

<style lang="stylus" scoped></style>
