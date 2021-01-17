<template>
  <div>
    <h1>Eye-Tracking Einstellungen</h1>
    <b-form-group label="Wähle aus zwischen GazeCloudAPI und Webgazer als Tool für die berechnung des Punktes, wo die Augen hin schauen" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-1"
        v-model="selectedValue"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radio-options"
      ></b-form-radio-group>
    </b-form-group>
    <b-form-group
      id="interval-duration-id"
      description="Interval in millisekunden, zum abfragen der neuen x,y Koordinaten"
      label="Gib einen Wert ein in welchen Interval, die neuen x,y Koordinaten abgefragt werden sollen"
      label-for="interval-duration-number"
      valid-feedback="Danke!"
    >
      <b-form-input
        id="interval-duration-number"
        v-model="intervalDurationLocal"
        type="number"
        class="form-control"
        name="descriptiontext" trim
      />
    </b-form-group>   

    <b-form-group
      id="count-to-focus-id"
      description="Wie oft muss ein Element angeschaut werden, damit es fokusiert wird?"
      label="Gib einen Wert ein zwischen 1-10, um ab diesem ereichten Wert wird ein Element fokusiert"
      label-for="count-focus"
      valid-feedback="Danke!"
    >
      <b-form-input
        id="count-focus"
        v-model="countFocusLocal"
        type="number"
        class="form-control"
        name="descriptiontext" trim
      />
    </b-form-group>

    <b-form-group
      id="count-to-click-id"
      description="Wie oft muss ein Element angeschaut werden, damit es geklickt wird?"
      label="Gib einen Wert ein, der höher als der Fokus wert ist und zwischen 2-20, um ab diesem Wert wird ein Element geklickt"
      label-for="count-click"
      valid-feedback="Danke!"
    >
      <b-form-input
        id="count-click"
        v-model="countClickLocal"
        type="number"
        class="form-control"
        name="descriptiontext" trim
      />
    </b-form-group>

    <b-button variant="outline-primary" @click="handleSave" >
        Speichern
      </b-button>

  </div>
</template>

<script>
// import firebase from 'firebase';
import { mapState } from 'vuex';

export default {
  name: 'EyeTrackingSettings',
  data() {
    return {
      intervalDurationLocal: 700,
      countFocusLocal: 4,
      countClickLocal: 10,
      selectedEyeTracking: 'gazerecorder',
      options: [
          { text: 'GazecloudAPI', value: 'gazerecorder' },
          { text: 'Webgazer', value: 'webgazer' },
      ],
    };
  },
  computed: {
    ...mapState('auth',['user']),
    ...mapState('alert', ['alert']),
    ...mapState('eyeTracking',['eyeTrackingOn', 'webgazerOn', 'gazerecorderOn', 'intervalDuration', 'countFocus', 'countClick']),
    selectedValue: {
      get() {
          return this.selectedEyeTracking;
      },

      set(newValue) {
          this.selectedEyeTracking = newValue;
          if(newValue === 'webgazer'){
            this.$store.commit('eyeTracking/setWebgazer', true);
          }
          if(newValue === 'gazerecorder'){
            this.$store.commit('eyeTracking/setGazerecorder', true);
          }
          console.log("NewValue is", newValue);
          // this.$emit('change', newValue);
      }
    }
  },
  created() {
    console.log("Created;")
    this.intervalDurationLocal = this.intervalDuration;
    this.countFocusLocal = this.countFocus;
    this.countClickLocal = this.countClick;
  },
  methods: {
    handleSave() {
      console.log("Handle handleSave");
       this.$store.commit('eyeTracking/setIntervalDuration', this.intervalDurationLocal);
       this.$store.commit('eyeTracking/setCountFocus', this.countFocusLocal);
       this.$store.commit('eyeTracking/setCountClick', this.countClickLocal);
    },
  }
};
</script>

<style scoped>
</style>