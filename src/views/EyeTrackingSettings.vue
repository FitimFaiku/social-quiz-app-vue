<template>
  <div>
    <h1>Eye-Tracking Einstellungen</h1>
    <b-form-group label="Wähle aus zwischen GazeCloudAPI und Webgazer als Tool für die berechnung des Punktes wo die Augen hin schauen" v-slot="{ ariaDescribedby }">
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
      description="Interval in millisekunden, zum abfragen der neuen x,y Koordinaten und erhöhung des Wertes vom berechnetem Element um eins"
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

    <!-- <b-form-group
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
    </b-form-group> -->
    <div :style="{display:'flex', 'flex-direction':'column'}">
      <label for="focus-range-id" class="form-label">Ab welchen Wert soll ein Element fokusiert werden: {{countFocusLocal}}</label>
      <input type="range" v-model="countFocusLocal" class="form-range" :min="1" :max="10" :step="1" id="focus-range-id">
    </div>

    <div style="display: flex; flex-direction: column;">
    <label for="click-range-id" class="form-label">Ab welchen Wert soll ein Element geklickt werden: {{countClickLocal}}</label>
    <input type="range" v-model="countClickLocal" class="form-range" v-bind:min="countFocusLocal" :max="20" :step="1" id="click-range-id">
    </div>

    <!-- <b-form-group
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
    </b-form-group> -->

    <b-button style="margin-top:0.5rem" variant="outline-primary" @click="handleSave" >
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
      intervalDurationLocal: 500,
      countFocusLocal: 3,
      countClickLocal: 6,
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
    console.log( "1Created;",this.intervalDurationLocal, "countFocusLocal:", this.countFocusLocal );
    if(this.intervalDuration){
      this.intervalDurationLocal = this.intervalDuration;
    }
    if(this.countFocus){
      this.countFocusLocal = this.countFocus;
    }
    if(this.countClick){
      this.countClickLocal = this.countClick;
    }
    
    console.log(this.intervalDuration, "Created;",this.intervalDurationLocal, "countFocusLocal:", this.countFocusLocal );
  },
  methods: {
    handleSave() {
      console.log("Handle handleSave");
      console.log("countClickLocal:", this.countClickLocal,"countFocusLocal",this.countFocusLocal, "t/f:", this.countClickLocal>this.countFocusLocal,typeof(this.countClickLocal) );
      // TODO let a Service Do this handleSaveAndStoreValues(this.intervalDurationLocal,this.countFocusLocal)
      if(parseInt(this.countClickLocal)>parseInt(this.countFocusLocal)){
        console.log("greater than this.countFocusLocal");
        this.$store.commit('eyeTracking/setIntervalDuration', this.intervalDurationLocal);
        this.$store.commit('eyeTracking/setCountFocus', this.countFocusLocal);
        this.$store.commit('eyeTracking/setCountClick', this.countClickLocal);
        this.$store.dispatch('alert/success', "Die Eye-Tracking Einstellungen wurden erfolgreich gespeichert");
      } else {
        console.log("smaller than this.countFocusLocal");
        this.$store.dispatch('alert/error', "Die Eye-Tracking Einstellungen wurden nicht erfolgreich gespeichert, da Click Range immer größer als Focus Range sein muss");
      }
    },
  }
};
</script>

<style scoped>
</style>