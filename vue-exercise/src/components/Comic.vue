<template>
  <div v-if="this.comic.title != null" id="item">
    <h1>{{this.comic.title}}</h1>
    <br />
    <img v-if="this.comic.thumbnail.path" :src="this.comic.thumbnail.path + '.' +  this.comic.thumbnail.extension" :alt="this.comic.title"/>
    <br />
    <h2 v-if="this.comic.description" v-html="this.comic.description"></h2>
    <h2 v-else>Description not Available</h2>
    <br />
    <div>Stories:</div>
    <ul v-if="this.comic.stories.available > 0">
      <li v-for="story in this.comic.stories.items" :key="story.name">{{story.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Series</div>
    <ul>
        <li v-if="this.comic.series.name">{{this.comic.series.name}}</li>
        <li v-else>Not Available</li>
    </ul>
    <div>Characters:</div>
    <ul v-if="this.comic.characters.available > 0">
      <li v-for="character in this.comic.characters.items" :key="character.name">{{character.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Creators:</div>
    <ul v-if="this.comic.creators.available > 0">
      <li v-for="creator in this.comic.creators.items" :key="creator.name">{{creator.name}}</li>
    </ul>
    <ul v-else>
        <li>Not Available</li>
    </ul>
    <div>Events:</div>
    <ul v-if="this.comic.events.available > 0">
      <li v-for="event in this.comic.events.items" :key="event.name">{{event.name}}</li>
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
  name: "comicComponent",
  data() {
    return {
      id: this.$route.params.id,
      comic: { title: null, description: null, thumbnail: { path: null, extension: null }, events: null, series: null, stories: null, characters: null, creators: null },
      name: null
    };
  },
  methods: {
    getComic(id) {
      axios
        .get("https://gateway.marvel.com:443/v1/public/comics/" + id + "?" + url)
        .then(({ data }) => (this.comic = data.data.results[0]))
        .catch(()=>this.$router.push({name: "error"}))
    }
  },
  created() {
    this.getComic(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getComic(this.$route.params.id);
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