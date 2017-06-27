"use strict";

angular
  .module("beerApp", [
    "ngMap",
    "ui.router",
    "ngResource",
    'angular.filter'
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
    "BreweryFactory",
    "$stateParams",
    BeerShowControllerFunction
  ])
  .controller("BeerPercentController",[
    "BeerFactory",

    BeerPercentControllerFunction
  ])

  .controller("HomePageController",[HomePageControllerFunction])



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

  function HomePageControllerFunction(){
    console.log("Am the homepage controller");
    //Note: This data will be replaced with the real data
    var cities = [
      {cityid: 1, name: 'DC', countryId: 1},
      {cityid: 2, name: 'Maryland', countryId: 1},
      {cityid: 3, name: 'Virginia', countryId: 1},
      {cityid: 5, name: 'Hamilton', countryId: 2},
      {cityid: 6, name: 'Toronto', countryId: 2},
      {cityid: 7, name: 'Addis Ababa', countryId: 3}
    ];
    var countries= [
      {countryId: 1, name: 'USA'},
      {countryId: 2, name: 'Canada'},
      {countryId: 3, name: 'Ethiopia'}
    ]
    this.countries = countries
    this.cities=cities



    var messageBoard=false;
    let initialNumberOfDrink = 0
    this.numberOfStandardDrink=initialNumberOfDrink
    this.Up = function (){
      this.numberOfStandardDrink++
    }
    this.Down = function (){
      this.numberOfStandardDrink--
    }
    this.recommend =function (){
      this.messageBoard = true;
      // this.detail=false;
      this.message=message
      let bodyWeightInGrams= this.bodyWeightInPound*454
      let genderContant=this.gender
      let lossInTime=this.elapsedTime*0.015
      let maximumAllowedBACPercentage= 0.08 + lossInTime
      let alcholDose= maximumAllowedBACPercentage*bodyWeightInGrams*genderContant/100
      let numberOfStandardDrink=alcholDose/14
      this.allowednumberOfStandardDrink=numberOfStandardDrink.toFixed(1)
      let message= "Sorry, Nothing to say now."
    }
    this.calculate = function(){
      this.messageBoard = true;
      let bodyWeightInGrams= this.bodyWeightInPound*454
      let alcholDose=this.numberOfStandardDrink*14
      let genderContant=this.gender
      let lossInTime=this.elapsedTime*0.015
      let BACPercentage= alcholDose*100/(bodyWeightInGrams*genderContant)
      let currentBACPercentage=BACPercentage-lossInTime
      this.BACPercentage=BACPercentage.toFixed(3)
      this.currentBACPercentage=currentBACPercentage.toFixed(3)
        if ( currentBACPercentage<0.08){
          let message= "you are safe to drive"
          this.message=message
        }
        else {
          let message= "you are not safe to drive, please use transport or call to your non-drunk friends"
          this.message=message
        }
      }

    }
function RouterFunction($stateProvider){
  $stateProvider
  .state("homePage", {
    url: "/",
    templateUrl: "ng-views/home-views/bac_calculator.html",
    controller: "HomePageController",
    controllerAs: "vm"
  })
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
  .state("beerPercent", {
    url: "/beerpercent",
    templateUrl: "ng-views/home-views/beer-percent.html",
    controller: "BeerPercentController",
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
  this.beers = BeerFactory.query()
}

function BreweryShowControllerFunction(BreweryFactory, $stateParams){
  this.brewery = BreweryFactory.get({id: $stateParams.id});
}

function BeerShowControllerFunction(BeerFactory, BreweryFactory, $stateParams){
  let self = this
   BeerFactory.get({id: $stateParams.id}).$promise.then(function(data){
     // console.log(this.beer)
     self.beer = data
     var brewId = data.brewery_id
     var brewery = BreweryFactory.get({id: brewId}).$promise.then(function(brewdata){
     console.log("brewId: " + brewId)
     console.log(brewery)
     self.brewery = brewdata
     console.log(self.brewery)
   })
 })
}
function BeerPercentControllerFunction(BeerFactory){

  var abv = $("#abvInput")


  this.beers = BeerFactory.query()
  this.abvMod = 8


  abv.on("change", function(){
    var currentVal = abv.val()
    if (currentVal > 10){
      console.log("over 10")
    }
  })




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
