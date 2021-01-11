<template>
<div>
  <div id ="gazeCloudDot"  :style="style" style="display: block; position: fixed; z-index: 99999; left: -5px; top: -5px; background: red; border-radius: 100%; opacity: 0.7; width: 10px; height: 10px;"></div>
</div>
 <!--<canvas ref="point" id="point-canvas" width="1000" height="1000"></canvas>-->
  <!--<div id="webgazerGazeDot"v-bind:style ="{'display': 'block;', 'position': 'fixed;','z-index': '99999;', 'left': '-5px;','top':'-5px;', 'background':'red;','border-radius': '100%;','opacity':'0.7;','width':'10px;', 'height':'10px;','transform':'translate3d(100px, 100px, 0px);' }"></div> -->
</template>

<script>

//import {GazeCloudAPI} from '@/assets/GazeCloudAPI.js'
export default {
  name: "GazeCloud",
  props: {
    off: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      canvas: null,
      display:'none',
      x: 0,
      y: 0,
    };
  },
  computed: {
    style () {
        return { transform: 'translate3d(' +this.x +'px, '+ this.y +'px, 0px)'}
     }
  },
  mounted() {
    /* this.clear();
    this.resize();
    var c = document.getElementById("point-canvas");
    this.canvas = c.getContext('2d'); */

  },
  created() {
    if(window.GazeCloudAPI){
      const thiz = this;
      window.GazeCloudAPI.StartEyeTracking();
      window.GazeCloudAPI.UseClickRecalibration = true;
      window.GazeCloudAPI.OnCalibrationComplete =function(){
        console.log("Calibration complete");
        window.GazeCloudAPI.OnResult = function(GazeData) {
          //console.log("$$$$$RESULTSW in COMPLETE $$$$$$$$$$$$$");
          thiz.updateGazeData(GazeData);
        };
      };
    }  
    
  },
  methods: {
    updateGazeData(GazeData){
      //if(GazeData.state == 0){ //0 == valid state
        //console.log("Data", GazeData);
        this.x = GazeData.GazeX;
        this.y =GazeData.GazeY;
        //console.log("screenWidth", screenWidth, "screenHeight:", screenHeight, 'BodyHeight:', body.clientHeight);

        //console.log("Vorher x:", this.x, "Vorher y:", this.y);
        //console.log("ClientWidth", window.clientWidth/2);
        //this.x -= window.clientWidth/2;
        //this.y -= window.clientHeight/2;
        //console.log("Nachher x:", this.x, "Nachher y:", this.y);
        this.$emit("update", { x: this.x, y:this.y });

        //this.drawBall(GazeData.GazeX,GazeData.GazeY );
        //this.clear();
      //} 
    },
    logssss(){
      console.log("LOG");
    },
    drawBall(x, y){
      //console.log("Drawing Ball X:" , x, "Y:", y)
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    },
    clear() {
      if (this.$refs.plot) {
        const { width, height } = this.$refs.plot;
        const ctx = this.$refs.plot.getContext("2d");
        ctx.clearRect(0, 0, width, height);
      }
    },
    resize() {
      if (this.$refs.plot && window) {
        this.$refs.plot.width = window.innerWidth;
        this.$refs.plot.height = window.innerHeight;
      }
    },
  },
  
};
</script>

<style lang="stylus" scoped></style>
