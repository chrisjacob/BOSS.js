
window.BOSS = (function( window, document, undefined ){

  var 
  version = '0.0.1',
  BOSS = {
    // #basic hash (url fragment identifier) can be used to force BASIC mode on an ADVANCED browser
    'mode': (location.hash == '#basic') ? 'basic' : null,
    'load': []
  },
  docElement = document.documentElement,
  docHead = document.head || document.getElementsByTagName('head')[0],
  elementAddClass = function( element, addClass ){
    element.className = element.className + ' ' + addClass;
  },
  elementReplaceClass = function( element, replaceClass, addClass ){
    element.className = element.className.replace(replaceClass, addClass);
  },
  triggerLoaded = { 
    load: 'assets/css/load.loaded.css',
    complete: function(){
      // Trigger the "loaded" styling / state.
      elementReplaceClass(docElement, 'loading', 'loaded');
    }
    // Consider following this with the loading of "defered" resources
    // i.e. things not critical to display/interact with the page immediately.
  };
  
  // During development bind uncompressed Modernizr to uncompress yepnope.
  // Useful for when you move to the "production" version of Modernizr (with the Modernizr.load "extra") 
  Modernizr.load = function(needs){
    return yepnope(needs);
  };

  // ADVANCED mode requires HTML5 Media Query's AND localStorage
  if( BOSS.mode !== 'basic' 
      && Modernizr.mq('(min-width: 0px)') 
      && Modernizr.localstorage )
  {
    BOSS.mode = 'advanced';
    elementAddClass(docElement, BOSS.mode);
  
    BOSS.load = [
      'assets/css/advanced.default.css',
      'assets/less/advanced.custom.less',
      'assets/js/lib/less/less-1.1.4.__edited.js',
      triggerLoaded
    ];
  }
  else
  {
    BOSS.mode = 'basic';
    elementAddClass(docElement, BOSS.mode);

    BOSS.load = [
      'assets/css/basic.default.css',
      triggerLoaded
    ];
  }
  
  // Get the party started
  Modernizr.load(BOSS.load);

  // Debug
  console.log(BOSS);

  return BOSS;

})(this, this.document);