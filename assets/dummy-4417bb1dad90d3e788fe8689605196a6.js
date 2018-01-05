"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment"],function(e,t,n,o){Object.defineProperty(e,"__esModule",{value:!0})
var r=void 0
Ember.MODEL_FACTORY_INJECTIONS=!0,r=Ember.Application.extend({modulePrefix:o.default.modulePrefix,podModulePrefix:o.default.podModulePrefix,Resolver:t.default}),(0,n.default)(r,o.default.modulePrefix),e.default=r}),define("dummy/components/app-version",["exports","ember-cli-app-version/components/app-version","dummy/config/environment"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0})
var o=n.default.APP.name,r=n.default.APP.version
e.default=t.default.extend({version:r,name:o})}),define("dummy/components/g-map-address-marker",["exports","ember-g-map/components/g-map-address-marker"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-address-route",["exports","ember-g-map/components/g-map-address-route"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-infowindow",["exports","ember-g-map/components/g-map-infowindow"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-marker",["exports","ember-g-map/components/g-map-marker"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-polyline-coordinate",["exports","ember-g-map/components/g-map-polyline-coordinate"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-polyline",["exports","ember-g-map/components/g-map-polyline"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-route-address-waypoint",["exports","ember-g-map/components/g-map-route-address-waypoint"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-route-waypoint",["exports","ember-g-map/components/g-map-route-waypoint"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-route",["exports","ember-g-map/components/g-map-route"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map-select-travel-mode",["exports","ember-g-map/components/g-map-select-travel-mode"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/components/g-map",["exports","ember-g-map/components/g-map"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({})}),define("dummy/controllers/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({randomVariable:111,addressQuery:"602 North Highland Avenue Northeast, Atlanta, GA 30307",addressQueryInput:Ember.computed.reads("addressQuery"),routeColor:"red",showingAllPolylineCoords:!0,customOptions:Ember.computed(function(){if(google)return{mapTypeId:google.maps.MapTypeId.TERRAIN}}),actions:{refresh:function(){this.set("randomVariable",Math.floor(1e3*Math.random()))},onInfowindowClosed:function(){window.alert("Info Window Closed!")},updateAdressQuery:function(){this.set("addressQuery",this.get("addressQueryInput"))},toggleRouteColor:function(){"red"===this.get("routeColor")?this.set("routeColor","green"):this.set("routeColor","red")},togglePolylineCoords:function(){this.toggleProperty("showingAllPolylineCoords")}}})}),define("dummy/helpers/is-equal",["exports","ember-g-map/helpers/is-equal"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"isEqual",{enumerable:!0,get:function(){return t.isEqual}})}),define("dummy/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","dummy/config/environment"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"App Version",initialize:(0,t.default)(n.default.APP.name,n.default.APP.version)}}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("dummy/initializers/geo",["exports","ember-g-map/initializers/geo"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"initialize",{enumerable:!0,get:function(){return t.initialize}})}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("index",{path:"/"}),this.route("directions"),this.route("turn-by-turn")}),e.default=n}),define("dummy/routes/directions",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({})}),define("dummy/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({})}),define("dummy/routes/turn-by-turn",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({})}),define("dummy/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/services/g-map",["exports","ember-g-map/services/g-map"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"alMcfnbw",block:'{"statements":[[11,"div",[]],[15,"class","container"],[13],[0,"\\n  "],[11,"div",[]],[15,"class","row"],[13],[0,"\\n    "],[11,"div",[]],[15,"class","column column-25"],[13],[0,"\\n      "],[11,"table",[]],[13],[0,"\\n        "],[11,"tr",[]],[13],[0,"\\n"],[6,["link-to"],["index"],null,{"statements":[[0,"          "],[11,"td",[]],[13],[0,"Getting Started"],[14],[0,"\\n"]],"locals":[]},null],[0,"          "],[14],[0,"\\n        "],[11,"tr",[]],[13],[0,"\\n"],[6,["link-to"],["directions"],null,{"statements":[[0,"        "],[11,"td",[]],[13],[0,"Directions"],[14],[0,"\\n"]],"locals":[]},null],[0,"        "],[14],[0,"\\n      "],[14],[0,"\\n    "],[14],[0,"\\n    "],[11,"div",[]],[15,"class","column column-75"],[13],[0,"\\n      "],[1,[26,["outlet"]],false],[0,"\\n    "],[14],[0,"\\n  "],[14],[0,"\\n"],[14],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/application.hbs"}})}),define("dummy/templates/directions",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"DkEZOrWi",block:'{"statements":[[1,[33,["g-map-select-travel-mode"],null,[["default"],[[28,["gMap","travelMode"]]]]],false],[0,"\\n"],[6,["g-map"],null,[["markersFitMode"],["live"]],{"statements":[[0,"\\n"],[6,["if"],[[28,["gMap","clientPosition"]]],null,{"statements":[[0,"    "],[1,[33,["g-map-route"],[[28,["context"]]],[["travelMode","strokeColor","originLat","originLng","destinationLat","destinationLng"],[[28,["gMap","travelMode"]],"blue",[28,["gMap","clientPosition","lat"]],[28,["gMap","clientPosition","lng"]],33.763617,-84.351338]]],false],[0,"\\n"]],"locals":[]},null]],"locals":["context"]},null],[6,["link-to"],["turn-by-turn"],null,{"statements":[[0,"Turn by turn"]],"locals":[]},null],[0,"\\n"],[11,"div",[]],[15,"id","directionsPanel"],[13],[14],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/directions.hbs"}})}),define("dummy/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"BXVNempb",block:'{"statements":[[11,"h2",[]],[15,"id","title"],[13],[0,"Ember-g-map Component"],[14],[0,"\\n\\n"],[11,"form",[]],[5,["action"],[[28,[null]],"updateAdressQuery"],[["on"],["submit"]]],[13],[0,"\\n  "],[11,"p",[]],[13],[0,"\\n    "],[11,"label",[]],[13],[0,"Address Query for Bound Marker"],[14],[0,"\\n    "],[1,[33,["input"],null,[["value"],[[28,["addressQueryInput"]]]]],false],[0,"\\n  "],[14],[0,"\\n  "],[11,"p",[]],[13],[0,"\\n    "],[11,"button",[]],[15,"type","submit"],[13],[0," Update bound marker "],[14],[0,"\\n  "],[14],[0,"\\n  "],[11,"p",[]],[13],[0,"\\n    "],[11,"button",[]],[5,["action"],[[28,[null]],"toggleRouteColor"]],[13],[0," Toggle route color "],[14],[0,"\\n  "],[14],[0,"\\n  "],[11,"p",[]],[13],[0,"\\n    "],[11,"button",[]],[5,["action"],[[28,[null]],"togglePolylineCoords"]],[13],[0," Toggle polyline coords "],[14],[0,"\\n  "],[14],[0,"\\n"],[14],[0,"\\n"],[11,"p",[]],[13],[0,"\\n  "],[11,"strong",[]],[13],[0,"Client Location Error:"],[14],[0," "],[1,[28,["gMap","clientPosition","error"]],false],[0,"\\n"],[14],[0,"\\n\\n"],[6,["g-map"],null,[["markersFitMode","options"],["live",[28,["customOptions"]]]],{"statements":[[0,"\\n"],[6,["g-map-polyline"],[[28,["context"]]],[["strokeColor","strokeWeight","strokeOpacity"],["green","10","0.3"]],{"statements":[[0,"    "],[1,[33,["g-map-polyline-coordinate"],[[28,["coordinateContext"]]],[["lat","lng"],[37.7833,-84.32333]]],false],[0,"\\n"],[6,["if"],[[28,["showingAllPolylineCoords"]]],null,{"statements":[[0,"      "],[1,[33,["g-map-polyline-coordinate"],[[28,["coordinateContext"]]],[["lat","lng"],[33.75432,-84.38979]]],false],[0,"\\n      "],[1,[33,["g-map-polyline-coordinate"],[[28,["coordinateContext"]]],[["lat","lng"],[33.791111,-84.32333]]],false],[0,"\\n"]],"locals":[]},null]],"locals":["coordinateContext"]},null],[0,"\\n  "],[1,[33,["g-map-marker"],[[28,["context"]]],[["lat","lng"],[33.791111,-84.32333]]],false],[0,"\\n\\n"],[0,"\\n"],[6,["g-map-address-marker"],[[28,["context"]]],[["address"],[[28,["addressQuery"]]]],{"statements":[[6,["g-map-infowindow"],[[28,["markerContext"]]],[["openOn","closeOn"],["mouseover","mouseout"]],{"statements":[[0,"      "],[11,"h1",[]],[13],[0,"Bound to Address Query"],[14],[0,"\\n"]],"locals":[]},null]],"locals":["markerContext"]},null],[0,"\\n"],[0,"\\n  "],[1,[33,["g-map-infowindow"],[[28,["context"]]],[["title","message","lat","lng","onClose"],["Blockless Infowindow","includes plain text",37.7633,-122.4367,[33,["action"],[[28,[null]],"onInfowindowClosed"],null]]]],false],[0,"\\n\\n"],[6,["g-map-route"],[[28,["context"]]],[["strokeColor","strokeWeight","strokeOpacity","zIndex","originLat","originLng","destinationLat","destinationLng"],[[28,["routeColor"]],2,0.5,10,33.798349,-84.45044,33.684446,-84.437014]],{"statements":[[0,"    "],[1,[33,["g-map-route-address-waypoint"],[[28,["routeContext"]]],[["address"],["Decatur, Georgia"]]],false],[0,"\\n"]],"locals":["routeContext"]},null],[0,"\\n"],[6,["g-map-address-route"],[[28,["context"]]],[["strokeColor","originAddress","destinationAddress"],["#00FF00","East Point, Georgia","Reynoldstown, Georgia"]],{"statements":[[0,"    "],[1,[33,["g-map-route-address-waypoint"],[[28,["routeContext"]]],[["address"],["Dalton, Georgia"]]],false],[0,"\\n    "],[1,[33,["g-map-route-address-waypoint"],[[28,["routeContext"]]],[["address"],["Macon, Georgia"]]],false],[0,"\\n    "],[1,[33,["g-map-route-address-waypoint"],[[28,["routeContext"]]],[["address"],["Athens, Georgia"]]],false],[0,"\\n"]],"locals":["routeContext"]},null],[0,"\\n  "],[1,[33,["g-map-route"],[[28,["context"]]],[["strokeColor","strokeWeight","strokeOpacity","zIndex","originLat","originLng","destinationLat","destinationLng"],[[28,["routeColor"]],6,0.5,10,33.689257,-84.45739,33.684446,-84.437014]]],false],[0,"\\n\\n  "],[1,[33,["g-map-address-route"],[[28,["context"]]],[["originAddress","destinationAddress"],["Doraville, Georgia","Georgia State University"]]],false],[0,"\\n\\n"],[6,["g-map-marker"],[[28,["context"]]],[["label","lat","lng"],["22",[28,["gMap","clientPosition","lat"]],[28,["gMap","clientPosition","lng"]]]],{"statements":[[6,["g-map-infowindow"],[[28,["geolocationContext"]]],null,{"statements":[[0,"      "],[11,"h1",[]],[13],[0,"My browser thinks I\'m here!"],[14],[0,"\\n"]],"locals":[]},null]],"locals":["geolocationContext"]},null]],"locals":["context"]},null],[11,"div",[]],[15,"id","directionsPanel"],[13],[14],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/index.hbs"}})}),define("dummy/templates/turn-by-turn",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"VPa+dbH8",block:'{"statements":[[1,[28,["gMap","directionsPanel"]],false],[0,"\\n"]],"locals":[],"named":[],"yields":[],"hasPartials":false}',meta:{moduleName:"dummy/templates/turn-by-turn.hbs"}})})
define("dummy/config/environment",[],function(){try{var e="dummy/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n=JSON.parse(unescape(t)),o={default:n}
return Object.defineProperty(o,"__esModule",{value:!0}),o}catch(t){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("dummy/app").default.create({name:"ember-g-map",version:"0.0.25+eb7cad07"})
