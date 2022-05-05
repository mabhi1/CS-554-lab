<template>
  <div v-if="this.character.name != null" id="item">
    <h1>{{this.character.name}}</h1>
    <br />
    <img v-if="this.character.thumbnail.path" :src="this.character.thumbnail.path + '.' +  this.character.thumbnail.extension" :alt="this.character.name"/>
    <br />
    <h2 v-if="this.character.description" v-html="this.character.description"></h2>
    <h2 v-else>Description not Available</h2>
    <br />
    <div>Stories:</div>
    <ul v-if="this.character.stories.available > 0">
      <li v-for="story in this.character.stories.items" :key="story.name">{{story.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Series</div>
    <ul v-if="this.character.series.available > 0">
      <li v-for="individualSeries in this.character.series.items" :key="individualSeries.name">{{individualSeries.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Events:</div>
    <ul v-if="this.character.events.available > 0">
      <li v-for="event in this.character.events.items" :key="event.name">{{event.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Comics:</div>
    <ul v-if="this.character.comics.available > 0">
      <li v-for="comic in this.character.comics.items" :key="comic.name">{{comic.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
const md5 = require("blueimp-md5");
const publicKey = "3259461401d9167609d907ea0174e849";
const privateKey = "cb8f948f06755387b107f7fddeb62d27902efe81";
const ts = new Date().getTime();
const stringToHash = ts + privateKey + publicKey;
const hash = md5(stringToHash);
const url = "ts=" + ts + "&apikey=" + publicKey + "&hash=" + hash;
export default {
  name: "characterComponent",
  data() {
    return {
      id: this.$route.params.id,
      character: { name: null, description: null, thumbnail: { path: null, extension: null }, events: null, series: null, stories: null, comics: null },
      name: null
    };
  },
  methods: {
    getCharacter(id) {
      axios
        .get("https://gateway.marvel.com:443/v1/public/characters/" + id + "?" + url)
        .then(({ data }) => (this.character = data.data.results[0]))
        .catch(()=>this.$router.push({name: "error"}))
    }
  },
  created() {
    this.getCharacter(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getCharacter(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
img{
  width: 300px;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
#item div {
  font-size: larger;
  text-decoration: underline;
  width: 70%;
  margin: auto;
}
ul li{
  text-align: center;
  font-size: large;
}
h2{
  font-size: large;
  font-weight: 100;
  width: 70%;
  margin: auto;
}
</style>