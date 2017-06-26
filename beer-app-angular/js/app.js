"use strict";


angular
  .module("beerApp", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("BreweryIndexController", [
    "BreweryFactory",
    BreweryIndexControllerFunction
  ])
  .controller("BeerIndexController", [
    "BeerFactory",
    BeerIndexControllerFunction
  ])

  .controller("BreweryShowController",[
    "BreweryFactory",
    "$stateParams",
    BreweryShowControllerFunction
  ])
  .controller("BeerShowController",[
    "BeerFactory",
    "$stateParams",
    BeerShowControllerFunction
  ])


  // .controller("BreweryNewController",[
  //   "BreweryFactory",
  //   BreweryNewControllerFunction
  // ])
  // .controller("BreweryEditController",[
  //   "BreweryFactory",
  //   "$stateParams",
  //   BreweryEditControllerFunction
  // ])

  .factory("BreweryFactory",[
    "$resource",
    BreweryFactoryFunction
  ])
  .factory("BeerFactory",[
    "$resource",
    BeerFactoryFunction
  ])

function RouterFunction($stateProvider){
  $stateProvider
  .state("breweryIndex", {
    url: "/breweries",
    templateUrl: "ng-views/breweries/brewery-index.html",
    controller: "BreweryIndexController",
    controllerAs: "vm"
  })
  .state("beerIndex", {
    url: "/beers",
    templateUrl: "ng-views/beers/beer-index.html",
    controller: "BeerIndexController",
    controllerAs: "vm"
  })
  .state("breweryShow", {
    url: "/breweries/:id",
    templateUrl: "ng-views/breweries/brewery-show.html",
    controller: "BreweryShowController",
    controllerAs: "vm"
  })
  .state("beerShow", {
    url: "/beers/:id",
    templateUrl: "ng-views/beers/beer-show.html",
    controller: "BeerShowController",
    controllerAs: "vm"
  })

  // .state("breweryNew",{
  //   url: "/breweries/new",
  //   templateUrl: "js/ng-views/new.html",
  //   controller: "BreweryNewController",
  //   controllerAs: "vm"
  // })
  // .state("breweryEdit",{
  //   url: "/breweries/:id/edit",
  //   templateUrl: "js/ng-views/edit.html",
  //   controller: "BreweryEditController",
  //   controllerAs: "vm"
  // })
}

function BreweryIndexControllerFunction( BreweryFactory ){
  this.breweries = BreweryFactory.query();
}

function BeerIndexControllerFunction( BeerFactory ){
  console.log("controller working")
  this.beers = BeerFactory.query()
  console.log("beers: " + this.beers)
}

function BreweryShowControllerFunction(BreweryFactory, $stateParams){
  this.brewery = BreweryFactory.get({id: $stateParams.id});
}

function BeerShowControllerFunction(BeerFactory, $stateParams){
  this.beer = BeerFactory.get({id: $stateParams.id});
}

// function BreweryNewControllerFunction(GrumbleFactory){
//   this.brewery = new BreweryFactory();
//   this.create = function(){
//     this.brewery.$save()
//   }
// }

// function BreweryEditControllerFunction( BreweryFactory, $stateParams ){
//   this.brewery = BreweryFactory.get({id: $stateParams.id});
//   this.update = function(){
//     console.log("updated")
//     this.brewery.$update({id: $stateParams.id})
//   }
// }


  function BreweryFactoryFunction( $resource ){
    return $resource( "http://localhost:3000/breweries/:id")
  }

  function BeerFactoryFunction( $resource ){
    return $resource( "http://localhost:3000/beers/:id")
  }
