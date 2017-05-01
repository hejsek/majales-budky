/// <reference path="libs/leaflet.d.ts"/>
/// <reference path="libs/mapbox.d.ts"/>
/// <reference path="libs/jquery.d.ts"/>
/// <reference path="libs/osmtogeojson.d.ts"/>

var map;

var boothJson, voronoiJson, callplanJson, logJson;
var boothLayer, voronoiLayer;
var boothIcon;
var boothOwners;
//var colors = ["red","blue","lime","cyan","magenta","yellow","orange","green","darkviolet","brown"];
var colors = ["#f00","#00f","#0f0","cyan","magenta","yellow","orange","green","darkviolet","brown"];
$.getJSON("assets/libs/booth.geojson", function(data) {
	boothJson = data;
	main();
});

$.getJSON("assets/libs/voronoi.geojson", function(data) {
	voronoiJson = data;
	main();
});

function refreshData(){
	$.getJSON("assets/libs/callplan.json", function(data) {
		callplanJson = data;
		addTimers();
	});

	$.getJSON("assets/libs/log.json", function(data) {
		logJson = data;
		buildBoothOwners();
	});
}

function main() {
	if (!boothJson || !voronoiJson)
		return;
	// L.mapbox.accessToken = 'pk.eyJ1Ijoiam9uYXRhbjEwMjQiLCJhIjoiY2ltZHVpNDJ4MDAzM3Z1bTNmYjFoaXZvMyJ9._ZpLUtfKD1x21UfRhOEd7g';
	L.mapbox.accessToken = 'pk.eyJ1IjoiaGVqc2VrIiwiYSI6ImNqMjZlM3F3aTAwM28zM3NhZHFzaGkyYWQifQ.UvqIFoh1OK2X5giVpq4Ppw';



  map = L.mapbox.map('mapid', 'mapbox.light');
	map.setView([48.974562, 14.474294], 15);

	boothIcon = L.icon({iconUrl:'assets/libs/images/telephone.png',iconAnchor:[24,24]});

  window['refreshData'] = refreshData;
  window['refreshTimers'] = refreshTimers;

	loadGeoJson();
	//
	// $.ajaxSetup({ cache: false });
	// setInterval(refreshData, 60*1000);
	refreshData();
	//
	// setInterval(refreshTimers, 100);
	refreshTimers();
}

function buildBoothOwners(){
	boothOwners = {};
	for(var i in logJson){
		var team = logJson[i].team;
		if(team == -1)
			continue;
		var boothId = logJson[i].call.boothId;
		boothOwners[boothId] = team;
	}
	voronoiLayer.setStyle(function(feature) {
		var team = boothOwners[feature.properties.id];
		var style = {
			weight: 1,
			clickable: false
		}
		style.color = colors[team];
		if(!style.color){
			style.color = team ? "white" : "black";
		}
		return style;
	});
}

function loadGeoJson(){
	var boothStyle = {
		icon: boothIcon
	};

	boothLayer = L.geoJson("", {pointToLayer: function (feature, latlng) {
        return L.marker(latlng, boothStyle);
    } });
	boothLayer.addData(boothJson);
	boothLayer.addTo(map);

	var voronoiStyle = {
		color: "#000",
		weight: 1,
		clickable: false
	};

	voronoiLayer = L.geoJson();
	voronoiLayer.addData(voronoiJson);
	voronoiLayer.addTo(map);

	boothLayer.bringToBack();
}

function addTimers(){
	var boothTimers = [];
	var now = Math.floor(Date.now() / 1000);
	for (var i in callplanJson) {
		var call = callplanJson[i];
		if(call.time < now)
			continue;
		if(boothTimers[call.boothId])
			continue;
		boothTimers[call.boothId] = call.time;
	}
	boothLayer.eachLayer(function(marker){
		marker.time = boothTimers[marker.feature.properties.id];
		if(!marker.time)
			return;
		if(!marker.getLabel()){
			marker.bindLabel('', {noHide: true});
		}
		marker.showLabel();
	});
}

function pad00(t){
	if(t == 0){
		t = '00';
	}else if(t < 10){
		t = '0'+t;
	}
	return t;
}

function refreshTimers(){
	var now = Math.floor(Date.now() / 1000);
	boothLayer.eachLayer(function(marker){
		if(!marker.time)
			return;
		if(marker.time < now){
			marker.hideLabel();
			marker.time = undefined;
			return;
		}
		var seconds = marker.time - now;
		var minutes = Math.floor(seconds/60);
		seconds -= minutes*60;
		var hours = Math.floor(minutes/60);
		minutes -= hours*60;
		seconds = pad00(seconds);
		minutes = pad00(minutes);
		hours = pad00(hours);
		var tstring = hours+':'+minutes+':'+seconds;
		marker.getLabel().setContent(tstring);
	});
}
