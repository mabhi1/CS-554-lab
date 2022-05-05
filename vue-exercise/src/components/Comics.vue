<template>
  <div>
    <div id="page-header">Comics</div>
    <div id="pagination">
      <div id="pagination-items" v-if="previous != null" ><router-link :to="{name: 'comics', params: {page: previous} }">Previous</router-link></div>
      <div id="pagination-items" v-else>Previous</div>
      <div id="pagination-items" >Page : {{previous ? previous * 1 + 2 : next}}</div>
      <div id="pagination-items"  v-if="next != null" ><router-link :to="{name: 'comics', params: {page: next} }">Next</router-link></div>
      <div id="pagination-items" v-else>Next</div>
    </div>
    <ul id="card">
      <li id="card-item" v-for="(comic,index) in comics" :key="index">
        <img v-if="comic.thumbnail.path" :src="comic.thumbnail.path + '.' +  comic.thumbnail.extension" :alt="comic.title"/>
        <div id="card-body">
        <div><router-link :to="{name: 'comic', params: {id: comic.id}}">{{comic.title}}</router-link></div>
        <div>{{comic.description ? comic.description : "Description Not Available"}}</div>
        <div>Characters : {{comic.characters.available}}</div>
        <div>Series : {{comic.series.name ? comic.series.name : "N/A"}}</div>
        <div>Creators : {{comic.creators.available}}</div>
        <div>Stories : {{comic.stories.available}}</div>
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
  name: "comicsComponent",
  data() {
    return {
      comics: [],
      next: null,
      previous: null
    };
  },
  methods: {
    getCharacters(page) {
      axios
        .get("https://gateway.marvel.com:443/v1/public/comics?offset=" + page * 20 + "&" + url)
        .then(({ data }) => {
          (this.comics = data.data.results)
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