// BOSS.js

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
  // Also if <= 480px default to BASIC to promote a Mobile First strategy... speed is king on mobile.
  if( BOSS.mode !== 'basic' 
      && Modernizr.mq('(min-width: 481px)') 
      && Modernizr.localstorage )
  {
    BOSS.mode = 'advanced';
    elementAddClass(docElement, BOSS.mode);
  
    BOSS.load = [
      'assets/css/advanced.default.css',
      'assets/less/advanced.custom.less',
      'assets/js/lib/less/less-1.1.4.__edited.js',
      triggerLoaded,
      {
        // Grab Google CDN's jQuery, with a protocol relative URL, fall back to local if offline
        load: '//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js',
        complete: function () {
          if ( !window.jQuery ) {
            // .load()'s that follow will wait for the jQuery fallback to load and execute if it needs to.
            Modernizr.load('assets/js/jquery-1.6.2.min.js');
          }
        }
      },
      'assets/js/advanced.js'
    ];
  }
  else
  {
    BOSS.mode = 'basic';
    elementAddClass(docElement, BOSS.mode);

    BOSS.load = [
      'assets/css/basic.default.css',
      triggerLoaded,
      'assets/js/basic.js'
    ];
  }
  
  // Get the party started
  Modernizr.load(BOSS.load);

  // Debug
  console.log(BOSS);

  return BOSS;

})(this, this.document);