<template>
  <div v-if="this.series.title != null" id="item">
    <h1>{{this.series.title}}</h1>
    <br />
    <img v-if="this.series.thumbnail.path" :src="this.series.thumbnail.path + '.' +  this.series.thumbnail.extension" :alt="this.series.title"/>
    <br />
    <h2 v-if="this.series.description" v-html="this.series.description"></h2>
    <h2 v-else>Description not Available</h2>
    <br />
    <div>Stories:</div>
    <ul v-if="this.series.stories.available > 0">
      <li v-for="story in this.series.stories.items" :key="story.name">{{story.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Comics:</div>
    <ul v-if="this.series.comics.available > 0">
      <li v-for="comic in this.series.comics.items" :key="comic.name">{{comic.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Characters:</div>
    <ul v-if="this.series.characters.available > 0">
      <li v-for="character in this.series.characters.items" :key="character.name">{{character.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Creators:</div>
    <ul v-if="this.series.creators.available > 0">
      <li v-for="creator in this.series.creators.items" :key="creator.name">{{creator.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Events:</div>
    <ul v-if="this.series.events.available > 0">
      <li v-for="event in this.series.events.items" :key="event.name">{{event.name}}</li>
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
  name: "individualSeries",
  data() {
    return {
      id: this.$route.params.id,
      series: { title: null, description: null, thumbnail: { path: null, extension: null }, events: null, comics: null, stories: null, characters: null, creators: null },
      name: null
    };
  },
  methods: {
    getSeries(id) {
      axios
        .get("https://gateway.marvel.com:443/v1/public/series/" + id + "?" + url)
        .then(({ data }) => (this.series = data.data.results[0]))
        .catch(()=>this.$router.push({name: "error"}))
    }
  },
  created() {
    this.getSeries(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getSeries(this.$route.params.id);
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