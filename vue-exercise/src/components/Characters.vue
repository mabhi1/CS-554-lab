<template>
  <div>
    <div id="page-header">Characters</div>
    <div id="pagination">
      <div id="pagination-items" v-if="previous != null" ><router-link :to="{name: 'characters', params: {page: previous} }">Previous</router-link></div>
      <div id="pagination-items" v-else>Previous</div>
      <div id="pagination-items">Page : {{previous ? previous * 1 + 2 : next}}</div>
      <div id="pagination-items" v-if="next != null" ><router-link :to="{name: 'characters', params: {page: next} }">Next</router-link></div>
      <div id="pagination-items" v-else>Next</div>
    </div>
    <ul id="card">
      <li id="card-item" v-for="(character,index) in characters" :key="index">
        <img v-if="character.thumbnail.path" :src="character.thumbnail.path + '.' +  character.thumbnail.extension" :alt="character.name"/>
        <div id="card-body">
        <div><router-link :to="{name: 'character', params: {id: character.id}}">{{character.name}}</router-link></div>
        <div>{{character.description ? character.description : "Description Not Available"}}</div>
        <div>Comics : {{character.comics.available}}</div>
        <div>Series : {{character.series.available}}</div>
        <div>Stories : {{character.stories.available}}</div>
        </div>
      </li>
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
  name: "charactersComponent",
  data() {
    return {
      characters: [],
      next: null,
      previous: null
    };
  },
  methods: {
    getCharacters(page) {
      axios
        .get("https://gateway.marvel.com:443/v1/public/characters?offset=" + page * 20 + "&" + url)
        .then(({ data }) => {
          (this.characters = data.data.results)
          if (data.data.offset >= data.data.total) this.$router.push({name: "error"})
          if (page == '0') this.previous = null; else this.previous = (parseInt(page) - 1).toString()
          if (data.data.offset + 20 > data.data.total) this.next =null; else this.next = (parseInt(page) + 1).toString()
          })
        .catch(()=>this.$router.push({name: "error"}))
    }
  },
  created() {
    this.getCharacters(this.$route.params.page);
  },
  watch: {
    $route() {
      if (isNaN(this.$route.params.page)) this.$router.push({name: "error"})
      this.getCharacters(this.$route.params.page);
    }
  }
};

</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
#page-header{
  font-size: 20px;
  background: aliceblue;
  padding: 10px;
  margin-bottom: 20px;
}
#pagination{
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 17px;
}
#pagination-items{
  margin: 0px 100px 0px 100px;
}
img{
  width: 100%;
  height: 235px;
  border-radius: 5px 5px 0px 0px;
}
#card{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#card a{
  color: #2c3e50;
}
#card-item{
  width: 15%;
  margin: 25px;
  box-shadow: 1px 1px 5px -1px #bdbdbd;
  border-radius: 5px;
}
#card-body{
  padding: 15px;
}
#card-body div {
  margin-bottom: 10px;
  max-height: 20px;
  overflow: hidden;
}
</style>