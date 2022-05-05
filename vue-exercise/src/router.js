import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Characters from "./components/Characters.vue";
import Character from "./components/Character.vue";
import Series from "./components/Series.vue";
import IndividualSeries from "./components/IndividualSeries.vue";
import Comics from "./components/Comics.vue";
import Comic from "./components/Comic.vue";
import Error from "./components/Error.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/characters/page/:page",
            name: "characters",
            component: Characters,
        },
        {
            path: "/characters/:id",
            name: "character",
            component: Character,
        },
        {
            path: "/comics/page/:page",
            name: "comics",
            component: Comics,
        },
        {
            path: "/comics/:id",
            name: "comic",
            component: Comic,
        },
        {
            path: "/series/page/:page",
            name: "series",
            component: Series,
        },
        {
            path: "/series/:id",
            name: "individualSeries",
            component: IndividualSeries,
        },
        {
            path: "/404",
            name: "error",
            component: Error,
        },
    ],
});
