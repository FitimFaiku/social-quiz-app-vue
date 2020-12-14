<script>
import webgazer from "webgazer";
export default {
  coordinate : {x: 0, y:0},
  name: "WebGazer",
  render: (h) => h(),
  props: {
    off: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      x: 0,
      y: 0,
    };
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
            thiz.x = data.x;
            thiz.y = data.y;
            this.setXAndY(data.x, data.y);
            thiz.$emit("update", { x: data.x, y: data.y });
          }
        })
        .begin();
      webgazer.showPredictionPoints(true);
    }
  },
  setXAndY(x, y) {
    this.coordinate.x=x;
    this.coordinate.y=y;
  },
  getX(){
    return this.coordinate.x;
  },
  getY(){
    return this.coordinate.y;
  },
  beforeDestroy() {
    webgazer.end();
  },
};
</script>

<style lang="stylus" scoped></style>
