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
    "BreweryFactory",
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
  .controller("CommentIndexController",["CommentFactory",CommentIndexControllerFunction])
  .controller("CommentShowController",["CommentFactory","$stateParams",CommentShowControllerFunction])
  .controller("CommentNewController",["CommentFactory",CommentNewControllerFunction])
  .controller("CommentEditController",["CommentFactory","$stateParams",CommentEditControllerFunction])
  .controller("BeerPercentController",[
    "BeerFactory",
    BeerPercentControllerFunction
  ])
  .controller("BrewMoodController",[
    "BeerFactory",
    BrewMoodControllerFunction
  ])
  .filter('capitalizeFirst', capitalizeFirstFilter)

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
  .factory("CommentFactory",["$resource",
  CommentFactoryFunction])

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
      let bodyWeightInGrams= this.bodyWeightInPound*454
      let genderContant=this.gender
      let abv=this.abv
      let lossInTime = this.elapsedTime * 0.015
      let maximumAllowedBACPercentage= 0.08 + lossInTime
      let alcholDose= maximumAllowedBACPercentage*bodyWeightInGrams*genderContant/100
      let numberOfStandardDrink=alcholDose/(14*abv)
      this.allowednumberOfStandardDrink=numberOfStandardDrink.toFixed(1)
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

  .state("commentIndex", {
    url: "/comments",
    templateUrl: "ng-views/comment/comment-index.html",
    controller: "CommentIndexController",
    controllerAs: "vm"
  })
  .state("commentShow", {
    url: "/comments/:id",
    templateUrl: "ng-views/comment/comment-show.html",
    controller: "CommentShowController",
})

.state("commentNew",{
  url: "/comments/new",
  templateUrl: "js/ng-views/comment/comment-new.html",
  controller: "CommentNewController",
  controllerAs: "vm"
})
.state("commentEdit",{
  url: "/comments/:id/edit",
  templateUrl: "js/ng-views/comment/comment-edit.html",
  controller: "CommentEditController",
  controllerAs: "vm"
})
  .state("brewMood", {
    url: "/brewmood",
    templateUrl: "ng-views/home-views/brew-mood.html",
    controller: "BrewMoodController",
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


  // var allBrew = $(".breweries-contatiner")
  // console.log(allBrew)
  // // var htmlText = "<div data-ng-repeat='brewery in vm.breweries'><p><a data-ui-sref='breweryShow({id: brewery.id})''>{{brewery.name}} </a></p></div>"
  // // var test = "<p>test<p>"
  // // allBrew.append(test)
  //
  // var newDiv = $("<div></div>")
  // console.log(newDiv)
  // // newDiv.css('ng-repeat', 'brewery in vm.breweries')
  // // newDiv.css()
  // newDiv.addClass("test")
  // console.log(newDiv.className)
  // allBrew.append(newDiv)


}

function BeerIndexControllerFunction( BeerFactory, BreweryFactory ){
  this.beers = BeerFactory.query()
  let self = this
}
function CommentIndexControllerFunction( CommentFactory ){
  console.log("Am CommentIndexControllerFunction");
  this.comments = CommentFactory.query();
  console.log(this.comments);
}
function CommentShowControllerFunction(CommentFactory, $stateParams){
  console.log("Am CommentShowControllerFunction");

  this.comment = CommentFactory.get({id: $stateParams.id});
}
function CommentNewControllerFunction(GrumbleFactory){
  console.log("Am CommentNewControllerFunction");
  this.comment = new CommentFactory();
  this.create = function(){
    this.comment.$save()
  }
}

function CommentEditControllerFunction( BreweryFactory, $stateParams ){
  console.log("Am CommentEditControllerFunction");
  this.comment = CommentFactory.get({id: $stateParams.id});
  this.update = function(){
    this.comment.$update({id: $stateParams.id})
  }
  this.destroy = function(){
    this.comment.$delete({id: $stateParams.id})
  }
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

function capitalizeFirstFilter() {
  return function _doFilter(str) {
    return str && (str.charAt(0).toUpperCase() + str.substring(1));
  };
}

function BrewMoodControllerFunction(BeerFactory){
  console.log("test")
  this.beers = BeerFactory.query()

  // Variables - Private
  var self = this;

  // Variables - Public
  self.filter = {};
  self.models = {};
  self.cats = [

    {category: 'British Origin Ales', abv_strength: 'very low', glass: 'Flute', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'North American Origin Ales', abv_strength: 'low', glass: 'Goblet', isOrganic: "N", servingTemperature: "cold", bitterness: 'low'},
    {category: 'Hybrid/mixed Beer', abv_strength: 'medium', glass: 'Mug', isOrganic: "Y", servingTemperature: "cool", bitterness: 'medium'},
    {category: 'Belgian And French Origin Ales', abv_strength: 'high', glass: 'Pilsner', isOrganic: "Y", servingTemperature: "very_cold", bitterness: 'high'},
    {category: 'North American Lager', abv_strength: 'very high', glass: 'Pint', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very high'},
    {category: 'German Origin Ales', abv_strength: 'high', glass: 'Snifter', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'European-germanic Lager', abv_strength: 'high', glass: 'Stange', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'Irish Origin Ales', abv_strength: 'high', glass: 'Tulip', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'Other Lager', abv_strength: 'high', glass: 'Weizen', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'International Styles', abv_strength: 'high', glass: 'Oversized Wine Glass', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'International Ale Styles', abv_strength: 'high', glass: 'Willi', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'Mead, Cider, & Perry', abv_strength: 'high', glass: 'Thistle', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'Malternative Beverages', abv_strength: 'high', glass: 'Flute', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'European-germanic Lager', abv_strength: 'high', glass: 'Flute', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
    {category: 'Other Origin', abv_strength: 'high', glass: 'Flute', isOrganic: "Y", servingTemperature: "cellar", bitterness: 'very low'},
  ];

  self.catNames = ["Alcohol Strength", "Bitterness", "Category", "Glass Type", "Organic?", "Serving Temperature"]

  // Functions - Public
  self.filterByProperties = filterByProperties;
  self.getValuesFor = getValuesFor;
  // console.log("self.filter: " + self.filter)

  // Functions - Definitions
  function filterByProperties(wine) {
    // console.log("self.filter" + self.filter)
    // console.log("Object.keys(self.filter): " + Object.keys(self.filter))
    var activeFilterProps = Object
      .keys(self.filter)
      .filter(function (prop) {
        return !noFilter(self.filter[prop]);
      });

    // Use this snippet for matching with AND
    return activeFilterProps.
      every(function (prop) { return self.filter[prop][wine[prop]]; });
    // Use this snippet for matching with OR
    //return !activeFilterProps.length || activeFilterProps.
    //  some(function (prop) { return self.filter[prop][wine[prop]]; });
  }

  function getValuesFor(prop) {
    return (self.cats || []).
      map(function (beer) { return beer[prop]; }).
      filter(function (value, idx, arr) { return arr.indexOf(value) === idx; });
  }

  function noFilter(filterObj) {
    return Object.
      keys(filterObj).
      every(function (key) {
        // console.log("filterObj: " + filterObj[key])
        return !filterObj[key];

      });
  }


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
  function CommentFactoryFunction($resource){
    return $resource("http://localhost:3000/comments/:id", {}, {
        update: { method: "PUT" }
    })
  }
