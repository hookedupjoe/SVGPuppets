(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: false,
      required: {
        templates: {
          map:
          {
            "HappyTurtle": {
              source: "__app", name: "HappyTurtle"
            }
          }
        }
      }
    },
    content: [{
      ctl: "spot",
      name: "body",
      text: ""
    },{
      ctl: "control",
      controlname: "WinsockController",
      name: "winsock",
      source: "__app"
    }]
  }

  var ControlCode = {};

  ControlCode.initElems = initElems;
  function initElems(){
    this.elemIndex = {};
    this.charElems = this.getByAttr$({
        appuse: "charpart"
    });
    
    for (var i = 0; i < this.charElems.length; i++) {
      var tmpEntry = $(this.charElems[i]);
      var tmpID = tmpEntry.attr('id');
      _charElems[tmpID] = tmpEntry;
    }
    
  }
   
  var _charDetails = {
  	tail: {x:83,y:270},
  	frontleft: {x:483,y:217},
  	backleft: {x:230,y:230},
  	backright: {x:176,y:202},
  	frontright: {x:420,y:176},
  	body: {x:0,y:0},
  	shell: {x:0,y:0},
  	pupils: {x:0,y:0},
    eyeballs: {x:0,y:0},
    nose: {x:0,y:0},
    mouth: {x:662,y:326},
  	head: {x:553,y:295}
  }
  
  var _charElems = {
  	
  }
  
  window.charDetails = _charDetails;
  window._charElems = _charElems;

  ControlCode.mapNumber = mapNumber;
  function mapNumber (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  ControlCode.moveMouthAmt = moveMouthAmt;
  function moveMouthAmt(theAmount, theString){
    
    if( theString == 'openclose'){
      var tmpFromScale = .25;
      var tmpToScale = 1.75;
      var tmpFromTranslate = 160;
      var tmpToTranslate = -160;
  
      var tmpScale = this.mapNumber(theAmount,0,255,tmpFromScale,tmpToScale);
      var tmpTranslate = this.mapNumber(theAmount,0,255,tmpFromTranslate,tmpToTranslate);
  
      this.transformItem('mouth',"translate(0," + tmpTranslate + ") scale(1," + tmpScale + ")")   
    }
   
  }
  
  ControlCode.movePupilsAmt = movePupilsAmt;
  function movePupilsAmt(theAmount, theString){
    var tmpName = 'pupils';
    var tmpFromTranslate = -15;
    var tmpToTranslate = 15;
    var tmpTranslate = this.mapNumber(theAmount,0,255,tmpFromTranslate,tmpToTranslate);

    if( theString == 'updown' ){
      translateItem(tmpName,0,tmpTranslate);
    } else if( theString == 'leftright' ){
      translateItem(tmpName,tmpTranslate,0);
    }
  }
  
  
  
  ControlCode.moveLegAmt = moveLegAmt;
  function moveLegAmt(theName, theAmount, theString){
   
    var tmpFromRotate = -15;
    var tmpToRotate = 15;
    var tmpFromTranslate = -15;
    var tmpToTranslate = 15;

    var tmpRotate = this.mapNumber(theAmount,0,255,tmpFromRotate,tmpToRotate);
    var tmpTranslate = this.mapNumber(theAmount,0,255,tmpFromTranslate,tmpToTranslate);
    if( theString == 'forwardback' ){
      rotateItem(theName,tmpRotate);
    } else if( theString == 'updown' ){
      translateItem(theName,0,tmpTranslate);
    }
  }
  
  // --- Strings: leftright updown forwardback openclose
  ControlCode.pullString = function(theOptions){
    var tmpOptions = theOptions || {};
    
    var tmpName = theOptions.name;
    var tmpString = theOptions.string;
    var tmpAmount = theOptions.amount;
    var tmpSpecs = _charDetails[tmpName];
    var tmpElem = _charElems[tmpName].get(0);
    
    if( tmpName == 'pupils' ){
      this.movePupilsAmt(tmpAmount, tmpString)
    } else if( tmpName == 'mouth'){
      this.moveMouthAmt(tmpAmount, tmpString);
    } else if( tmpName == 'frontleft' || tmpName == 'frontright' || tmpName == 'backleft' || tmpName == 'backright'){
      this.moveLegAmt(tmpName,tmpAmount, tmpString)
    }
    
  }

  ControlCode.transformItem = transformItem;
  function transformItem(theItem,theTransform) {
      var tmpSpecs = _charDetails[theItem];
      var tmpElem = _charElems[theItem].get(0);
      tmpElem.setAttribute("transform", theTransform);
  }  
  
  ControlCode.translateItem = translateItem;
  function translateItem(theItem,theXAmt, theYAmt) {
      var tmpElem = _charElems[theItem].get(0);
      tmpElem.setAttribute("transform", "translate(" + theXAmt + "," + theYAmt + ")");
  } 
  
  ControlCode.rotateItem = rotateItem;
  function rotateItem(theItem,thePerc) {
      var tmpSpecs = _charDetails[theItem];
      var tmpElem = _charElems[theItem].get(0);
      tmpElem.setAttribute("transform", "rotate(" + thePerc + "," + tmpSpecs.x + "," + tmpSpecs.y + ")");
  }  

  
  ControlCode._onInit = _onInit;
  function _onInit() {
    //-- For debugging only
    window.HappyTurtle = this;
    this.showDebug = false;


    this.loadSpot('body', {}, 'HappyTurtle');
    this.initElems();
    this.getSpot('body').css('background-color', 'green');

  }
 

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);