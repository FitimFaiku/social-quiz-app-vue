<template>
  <div class="news">
    <h1>Neuigkeiten</h1>

    <h2>Motivation</h2>
    <span>Immer mehr menschen mit Kognitiven Einschränkungen surfen im Web oder spielen Spiele. 
    Wir wollen diesen Menschen das Leben erleichtern, indem wir ihnen die Möglichkeit geben spiele zu Spielen nur durch das Anschauen der Elemente oder Auswahlmöglichkeiten.</span>

    <h2>Eye-Tracking</h2>
    <span>Um die Augen zu verfolgen, wurden zwei Drittanbieter verwendet. 
    Webgazer ist eine Eye-Tracking-Bibliothek, die von der braunen HCI-Gruppe erstellt wurde, um die Koordinaten zu messen und zu berechnen, auf die die Augen möglicherweise schauen. 
    Webgazer wird als erweiterter Code verwendet und die Berechnung der Vorhersage erfolgt durch den eigenen PC. 
    Dies führt zu einer höheren Nutzung der Computerressourcen. 
    Gazerecorder ist der andere Drittanbieter von Bibliotheken, der Eye-Tracking mit einem anderen Ansatz anbietet, indem Anforderungen mit Screenshots und Daten dauerhaft an einen Server gesendet werden. 
    Die Berechnung wird vom Remote-Server durchgeführt und die eigenen Computerressourcen werden aufgrund der Cloud-Berechnung und permanenten Kommunikation nicht so stark beansprucht wie mit Webgazer.
    Mit Webgazer haben Sie also mehr Kontrolle über die Web-Cam-Daten, die für das Eye-Tracking aufgezeichnet werden, sowie eine höhere Auslastung der Resourcen, und mit Gazerecorder geben wir diese Daten an den Drittanbieter weiter und haben somit weniger Berechnungen durchzuführen durch den eigenen Computer.</span>

    <h2>Implementierte Ziele</h2>
    <ul>
      <li>Profil erstellen</li>
      <li>Eye-Tracking verwenden mittels Gazerecorder oder Webgazer</li>
      <li>Eye-Tracking Einstellungen verwalten</li>
      <li>Quiz spielen alleine</li>
      <li>Quiz erstellen und updaten</li>
      <li>Markdown Syntax als Frage oder Antwort eingeben</li>
    </ul>

    <h2>Zukünftige Ziele</h2>
    <ul>
      <li>Freundschaften verwalten</li>
      <li>Multiplayer Spiele spielen</li>
      
    </ul>

  
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import { mapState } from 'vuex'
export default {
  name: 'News',
  computed: {
    ...mapState({
            alert: state => state.alert,
            currentUser: state => state.auth.user
    }),
  },
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    /* UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    ); */
  }
};
</script>

<style scoped>
ul li {
    list-style-type: none;
}
h2 {
  margin-top: 0.5rem;
}
</style>