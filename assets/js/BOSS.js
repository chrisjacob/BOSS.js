// BOSS.js

window.BOSS = (function( window, document, undefined ){

  var 
  version = '0.0.1',
  BOSS = {
    // #basic hash (url fragment identifier) can be used to force BASIC mode on an ADVANCED browser
    'mode': (location.hash == '#basic') ? 'basic' : null,
    'load': [],
    'data': {}
  },
  docElement = document.documentElement,
  docHead = document.head || document.getElementsByTagName('head')[0],
  iframeElem = document.createElement('iframe'), 
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
  },
  storageEvent = function(event) {
    // Handle changes to localStorage
    console.log(event.key, event);
  };
  
  // Listen for localStorage items being added/updated/deleted in from other windows
  window.addEventListener('storage', storageEvent, false);
  
  // Setup a proxy iframe to trigger the "storage" event within the current window
  // A proxy is required because browsers only trigger the "storage" event from "other" windows
  // The iframe src can target a 404 page (as long as it's on the same domain) and this still works
  // http://html5doctor.com/storing-data-the-simple-html5-way-and-a-few-tricks-you-might-not-have-known/
  iframeElem = iframeElem;
  iframeElem.style.display = "none";
  iframeElem.src = '/storage-proxy-url-can-haz-404';
  docElement.appendChild(iframeElem);
  
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
            Modernizr.load('assets/js/lib/jquery/jquery-1.6.3.min.js');
          }
        }
      },
      {
        test: window.JSON,
        nope: 'assets/js/lib/JSON-js/json2.js',
        complete: function () {
          if(localStorage.BOSS !== undefined)
          {
            BOSS.data = JSON.parse(localStorage.BOSS);
            BOSS.data.previousVisit = BOSS.data.timestamp;
          }
          BOSS.data.timestamp = new Date().getTime();
          iframeElem.contentWindow.localStorage.BOSS = JSON.stringify(BOSS.data);
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