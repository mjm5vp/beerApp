"use strict";

$(".navbar-header a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});

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
  .controller("startpage",[startFunction])
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
  // .controller("CommentNewController",["CommentFactory",CommentNewControllerFunction])
  // .controller("CommentEditController",["CommentFactory","$stateParams",CommentEditControllerFunction])
  .controller("BeerPercentController",[
    "BeerFactory",
    BeerPercentControllerFunction
  ])
  .controller("BeerIbuController",[
    "BeerFactory",
    BeerIbuControllerFunction
  ])
  .controller("BeerMoodController",[
    "BeerFactory",
    BeerMoodControllerFunction
  ])
  .controller("BrewMoodController",[
    "BreweryFactory",
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

  function startFunction(){

    this.start =function (){

      if (this.termsRead==2){
        localStorage.setItem("startpage", true)
        this.startpage=true
      }
      else
      {
        alert('Please, click on read and agree to the Terms and Conditions and Privacy Policy')
      }

      // location.reload()
    }

    console.log("startFunction");
    this.startpage= localStorage.getItem("startpage")
    console.log(this.startpage);
  }
  
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
    if (this.numberOfStandardDrink<50)
    {
      this.numberOfStandardDrink++
    }
    else {
      alert("Please enter lower value. The maximum is 50.")
    }
    }
    this.Down = function (){
      if (this.numberOfStandardDrink>0){
        this.numberOfStandardDrink--
      }
      else {
        alert("Please enter higher value. The minimum is 0.")
      }
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
  .state("beerIbu", {
    url: "/beer-ibu",
    templateUrl: "ng-views/home-views/beer-ibu.html",
    controller: "BeerIbuController",
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
    controllerAs: "vm"
})

// .state("commentNew",{
//   url: "/comments/new",
//   templateUrl: "js/ng-views/comment/comment-new.html",
//   controller: "CommentNewController",
//   controllerAs: "vm"
// })
// .state("commentEdit",{
//   url: "/comments/:id/edit",
//   templateUrl: "js/ng-views/comment/comment-edit.html",
//   controller: "CommentEditController",
//   controllerAs: "vm"
// })
  .state("beerMood", {
    url: "/beer-mood",
    templateUrl: "ng-views/home-views/beer-mood.html",
    controller: "BeerMoodController",
    controllerAs: "vm"
  })
  .state("brewMood", {
    url: "/brew-mood",
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
  this.comment = new CommentFactory();
  this.create = function(){
    this.comment.$save()
  }
}
function CommentShowControllerFunction(CommentFactory, $stateParams){
  console.log("Am CommentShowControllerFunction");

  this.comment = CommentFactory.get({id: $stateParams.id});
}
// function CommentNewControllerFunction(CommentFactory){
//   console.log("Am CommentNewControllerFunction");
//   this.comment = new CommentFactory();
//   this.create = function(){
//     this.comment.$save()
//   }
// }

// function CommentEditControllerFunction( CommentFactory, $stateParams ){
//   console.log("Am CommentEditControllerFunction");
//   this.comment = CommentFactory.get({id: $stateParams.id});
//   this.update = function(){
//     this.comment.$update({id: $stateParams.id})
//   }
//   this.destroy = function(){
//     this.comment.$delete({id: $stateParams.id})
//   }
// }
function BreweryShowControllerFunction(BreweryFactory, $stateParams){
  this.brewery = BreweryFactory.get({id: $stateParams.id});
  console.log(this.brewery.beers_list)
}

function BeerShowControllerFunction(BeerFactory, BreweryFactory, $stateParams){

  let self = this
  let colorDiv = $(".beer-color")
  BeerFactory.get({id: $stateParams.id}).$promise.then(function(data){
    // console.log(this.beer)
    self.beer = data
    var color = "#" + self.beer.srm_hex
    colorDiv.css('background-color', color)
    console.log (data.srm_hex)
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

function BeerIbuControllerFunction(BeerFactory){
  var ibu = $("#abvInput")
  this.beers = BeerFactory.query()
  this.ibuMod = 30
  ibu.on("change", function(){
    var currentVal = ibu.val()
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

function BeerMoodControllerFunction(BeerFactory){
  console.log("test")
  this.beers = BeerFactory.query()

  // Variables - Private
  var self = this;

  // Variables - Public
  self.filter = {};
  self.models = {};
  self.cats = [

    {category: 'British Origin Ales', abv_strength: 'Very low', glass: 'Flute', isOrganic: "Y", servingTemperatureDisplay: "Very Cold - (0-4C/32-39F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'North American Origin Ales', abv_strength: 'Low', glass: 'Goblet', isOrganic: "N", servingTemperatureDisplay: "Cold - (4-7C/39-45F)", bitterness: 'Low', a_brewery_state: 'District of Columbia'},
    {category: 'Hybrid/mixed Beer', abv_strength: 'Medium', glass: 'Mug', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Medium', a_brewery_state: 'Maryland'},
    {category: 'Belgian And French Origin Ales', abv_strength: 'High', glass: 'Pilsner', isOrganic: "Y", servingTemperatureDisplay: "Cellar - (12-14C/54-57F)", bitterness: 'High', a_brewery_state: 'Virginia'},
    {category: 'North American Lager', abv_strength: 'Very high', glass: 'Pint', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very high', a_brewery_state: 'Virginia'},
    {category: 'German Origin Ales', abv_strength: 'High', glass: 'Snifter', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'European-germanic Lager', abv_strength: 'High', glass: 'Stange', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'Irish Origin Ales', abv_strength: 'High', glass: 'Tulip', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'Other Lager', abv_strength: 'High', glass: 'Weizen', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'International Styles', abv_strength: 'High', glass: 'Oversized Wine Glass', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'International Ale Styles', abv_strength: 'High', glass: 'Willi', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'Mead, Cider, & Perry', abv_strength: 'High', glass: 'Thistle', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'Malternative Beverages', abv_strength: 'High', glass: 'Flute', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'European-germanic Lager', abv_strength: 'High', glass: 'Flute', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
    {category: 'Other Origin', abv_strength: 'High', glass: 'Flute', isOrganic: "Y", servingTemperatureDisplay: "Cool - (8-12C/45-54F)", bitterness: 'Very low', a_brewery_state: 'Virginia'},
  ];

  self.catNames = ["Brewery Location", "Alcohol Strength", "Bitterness", "Category", "Glass Type", "Organic?", "Serving Temperature"]

  // Functions - Public
  self.filterByProperties = filterByProperties;
  self.getValuesFor = getValuesFor;
  // console.log("self.filter: " + self.filter)

  // Functions - Definitions
  function filterByProperties(bur) {
    // console.log("self.filter" + self.filter)
    // console.log("Object.keys(self.filter): " + Object.keys(self.filter))
    var activeFilterProps = Object
      .keys(self.filter)
      .filter(function (prop) {
        return !noFilter(self.filter[prop]);
      });

    // Use this snippet for matching with AND
    return activeFilterProps.
      every(function (prop) { return self.filter[prop][bur[prop]]; });
    // Use this snippet for matching with OR
    //return !activeFilterProps.length || activeFilterProps.
    //  some(function (prop) { return self.filter[prop][bur[prop]]; });
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

function BrewMoodControllerFunction(BreweryFactory){
  console.log("test")
  this.breweries = BreweryFactory.query()

  // Variables - Private
  var self = this;

  // Variables - Public
  self.filter = {};
  self.models = {};
  self.cats = [
    {a_region: "Virginia", locality: "Alexandria", locationTypeDisplay: "Micro Brewery"},
    {a_region: "District of Columbia", locality: "Fairfax", locationTypeDisplay: "Macro Brewery"},
    {a_region: "Maryland", locality: "Falls Church", locationTypeDisplay: "Nano Brewery"},
    {a_region: "Virginia", locality: "Leesburg", locationTypeDisplay: "Brewpub"},
    {a_region: "Virginia", locality: "Lovettsville", locationTypeDisplay: "Production Facility"},
    {a_region: "Virginia", locality: "Arlington", locationTypeDisplay: "Office"},
    {a_region: "Virginia", locality: "McLean", locationTypeDisplay: "Tasting Room"},
    {a_region: "Virginia", locality: "Manassas", locationTypeDisplay: "Restaurant/Ale House"},
    {a_region: "Virginia", locality: "Reston", locationTypeDisplay: "Cidery"},
    {a_region: "Virginia", locality: "Centreville", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Vienna", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Annadale", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Charlottesville", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Washington", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Bethesda", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Baltimore", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Silver Spring", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Gaithersburg", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Columbia", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "National Harbor", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Annapolis", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Hanover", locationTypeDisplay: "Meadery"},
    {a_region: "Virginia", locality: "Prince Frederick", locationTypeDisplay: "Meadery"}
  ];

  self.catNames = ["State", "City", "Type"]

  // Functions - Public
  self.filterByProperties = filterByProperties;
  self.getValuesFor = getValuesFor;
  // console.log("self.filter: " + self.filter)

  // Functions - Definitions
  function filterByProperties(brew) {
    // console.log("self.filter" + self.filter)
    // console.log("Object.keys(self.filter): " + Object.keys(self.filter))
    var activeFilterProps = Object
      .keys(self.filter)
      .filter(function (prop) {
        return !noFilter(self.filter[prop]);
      });

    // Use this snippet for matching with AND
    return activeFilterProps.
      every(function (prop) { return self.filter[prop][brew[prop]]; });
    // Use this snippet for matching with OR
    //return !activeFilterProps.length || activeFilterProps.
    //  some(function (prop) { return self.filter[prop][brew[prop]]; });
  }

  function getValuesFor(prop) {
    return (self.cats || []).
      map(function (brew) { return brew[prop]; }).
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
    return $resource("http://localhost:3000/comments/:id.json", {}, {
        update: { method: "PUT" }
    })
  }
