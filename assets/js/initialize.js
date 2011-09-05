// There's a new BOSS in town; you're end-user!
var BOSS = {};

// During development bind uncompressed Modernizr to uncompress yepnope.
// Useful for when you move to the "production" version of Modernizr (with the Modernizr.load "extra") 
Modernizr.load = function(needs){
  return yepnope(needs);
};

// #basic hash (url fragment identifier) can be used to force BASIC mode on an ADVANCED browser
BOSS.mode = (location.hash == '#basic') ? 'basic' : null;

// ADVANCED mode requires HTML5 Media Query's AND localStorage
if( BOSS.mode !== 'basic' 
    && Modernizr.mq('(min-width: 0px)') 
    && Modernizr.localstorage )
{
  BOSS.mode = 'advanced';
  
  Modernizr.load([
    'assets/css/advanced.default.css',
    'assets/less/advanced.custom.less',
    'assets/js/less-1.1.4.__edited.js'
  ]);
}
else
{
  BOSS.mode = 'basic';
  
  Modernizr.load('assets/css/basic.default.css');
}

// Debug
console.log(BOSS);