<script>
import webgazer from "webgazer";
export default {
  name: "WebGazer",
  render: (h) => h(),
  props: {
    off: {
      type: Boolean,
      default: false,
    },
    quit: {
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
  computed: {
    quitWebGazer() {
      if(this.quitWebGazer){
        webgazer.end();
      }
    }
  },
  async created() {
    if (window && !this.off) {
      const thiz = this;
      window.applyCalmanFilter = true;
      window.saveDataAccrossSessions = true;
      webgazer.params.showVideoPreview = true;
      await webgazer
        .setRegression("ridge")
        .setGazeListener(function(data) {
          if (data) {
            console.log("Data:", data);
            thiz.x = data.x;
            thiz.y = data.y;
            thiz.$emit("update", { x: data.x, y: data.y });
          }
        })
        .begin();
      webgazer.showPredictionPoints(true);
    }
  },
  beforeDestroy() {
    webgazer.end();
  },
};
</script>

<style lang="stylus" scoped></style>
