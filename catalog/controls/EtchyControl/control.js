(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: false,
      required: {
        templates: {
          map:
          {
            "EtchyHome": {
              source: "__app", name: "EtchyHome"
            }
          }
        }
      }
    },
    content: [{
      ctl: "spot",
      name: "body",
      text: ""
    }]
  }

  var ControlCode = {};


  ControlCode.initElems = initElems;
  function initElems() {
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

  var _charSpecs = {
    tail: {strings:['updown']},
    frontleft: {strings:['updown','forwardback']},
    backleft: {strings:['updown','forwardback']},
    backright: {strings:['updown','forwardback']},
    frontright: {strings:['updown','forwardback']},
    body: {strings:['updown']},
    shell: {strings:['updown']},
    pupils: {strings:['updown','leftright']},
    eyebrowleft: {strings:['updown']},
    eyebrowright: {strings:['updown']},
    mouth: {strings:['openclose']},
    head: {strings:['updown']},
  };
  
  //=== ToDo: Refactor and change structure ..
  var _charDetails = {
    
    leftarm: {
      x: 62,
      y: 53
    },
    body: {
      x: 0,
      y: 0
    },
    pupils: {
      x: 0,
      y: 0
    },
    eyeballs: {
      x: 0,
      y: 0
    },
    head: {
      x: 553,
      y: 295
    }
  }

  var _charElems = {}

  window.charDetails = _charDetails;
  window._charElems = _charElems;

  ControlCode.mapNumber = mapNumber;
  function mapNumber (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  ControlCode.moveMouthAmt = moveMouthAmt;
  function moveMouthAmt(theAmount, theString) {

    if (theString == 'openclose') {
      var tmpFromScale = .25;
      var tmpToScale = 1.75;
      var tmpFromTranslate = 160;
      var tmpToTranslate = -160;

      var tmpScale = this.mapNumber(theAmount, 0, 255, tmpFromScale, tmpToScale);
      var tmpTranslate = this.mapNumber(theAmount, 0, 255, tmpFromTranslate, tmpToTranslate);

      this.transformItem('mouth', "translate(0," + tmpTranslate + ") scale(1," + tmpScale + ")")
    }

  }

  ControlCode.reactionDance1 = function(){
        this.pullString({name:'frontleft', amount:ThisApp.common.eqData.B2,  string: 'updown'});
        this.pullString({name:'backleft', amount:ThisApp.common.eqData.B3,  string: 'updown'});
        this.pullString({name:'backright', amount:ThisApp.common.eqData.B2,  string: 'updown'});
        this.pullString({name:'frontright', amount:ThisApp.common.eqData.B3,  string: 'updown'});
        this.pullString({name:'body', amount:ThisApp.common.eqData.B15,  string: 'updown'});
        this.pullString({name:'shell', amount:ThisApp.common.eqData.B16,  string: 'updown'});
        //this.pullString({name:'head', amount:ThisApp.common.eqData.kCycle,  string: 'updown'});

        this.pullString({name:'eyebrowleft', amount:ThisApp.common.eqData.B28,  string: 'updown'});
        this.pullString({name:'eyebrowright', amount:ThisApp.common.eqData.B29,  string: 'updown'});
        //HappyTurtle.pullString({name:'pupils', amount:ThisApp.common.eqData.B30,  string: 'updown'});
        //HappyTurtle.pullString({name:'pupils', amount:ThisApp.common.eqData.B30,  string: 'leftright'});
        
        if( this.moveMouth ){
          this.reactionSpeak();
        }

  }
  
  ControlCode.reactionDance2 = function(){
        this.pullString({name:'frontleft', amount:ThisApp.common.eqData.B11,  string: 'forwardback'});
        this.pullString({name:'frontright', amount:ThisApp.common.eqData.B14,  string: 'forwardback'});
        this.pullString({name:'backleft', amount:ThisApp.common.eqData.B12,  string: 'updown'});
        this.pullString({name:'backright', amount:ThisApp.common.eqData.B13,  string: 'updown'});
        this.pullString({name:'body', amount:ThisApp.common.eqData.B2,  string: 'updown'});
        this.pullString({name:'shell', amount:ThisApp.common.eqData.B3,  string: 'updown', reverse: true});
        //this.pullString({name:'shell', amount:ThisApp.common.eqData.kCycle,  string: 'updown'});

        this.pullString({name:'eyebrowleft', amount:ThisApp.common.eqData.B28,  string: 'updown'});
        this.pullString({name:'eyebrowright', amount:ThisApp.common.eqData.B29,  string: 'updown'});
        //HappyTurtle.pullString({name:'pupils', amount:ThisApp.common.eqData.B30,  string: 'updown'});
        //HappyTurtle.pullString({name:'pupils', amount:ThisApp.common.eqData.B30,  string: 'leftright'});
        //this.reactionSpeak();
        if( this.moveMouth ){
          this.reactionSpeak();
        }

  }
  
  ControlCode.toggleMouth = function(){
    this.moveMouth = !this.moveMouth;
    
  }
  
  
  ControlCode.reactionSpeak = function(){
           // var tmpVol = ThisApp.common.eqData.B15 || 0;
    var tmpEQ = ThisApp.common.eqData;
  
    var tmpAmt = (tmpEQ.B13 + tmpEQ.B14 + tmpEQ.B15 + tmpEQ.B16 + tmpEQ.B17 + tmpEQ.B18 + tmpEQ.B19);
    tmpAmt /= 7;
    tmpAmt = this.mapNumber(tmpAmt, 0, 75, 40, 230);
    
    if( tmpAmt > 255 ){
      tmpAmt = 255;
    }
    if( tmpAmt < 40 ){
      tmpAmt = 40;
    }
    
    this.pullString({name:'mouth', amount:tmpAmt,  string: 'openclose'});

  }
  

  var watchDog1 = 0;
  var ThisControl;
  

  var reactionFunction = false;
  ControlCode.runReaction = function(theName) {
    var tmpFunc = ThisControl[theName];
    if( !(tmpFunc) ) return;
    tmpFunc = tmpFunc.bind(this);
    reactionFunction = tmpFunc;
  }
  
  
  // ControlCode.runReactionAction(theParams, theTarget) {
  //           var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['href']);
    
  // }
  
  ControlCode.startMusicResponse = startMusicResponse;
  function startMusicResponse(){
    // update the display based on data
    this.danceInterval = d3.interval(function () {
     
      try {
        if((reactionFunction)){
          reactionFunction();
        }
        
    } catch (ex) {
        //temp -> 
        if( watchDog1++ > 10){
          return;
        }
        console.error("Error ", ex);
      }
    },
      5);
  }
  
  ControlCode.stopMusicResponse = stopMusicResponse;
  function stopMusicResponse(){
    if( !this.danceInterval ) return;
      
    this.danceInterval.stop();
  }

  
  ControlCode.movePupilsAmt = movePupilsAmt;
  function movePupilsAmt(theAmount, theString) {
    var tmpName = 'pupils';
    var tmpFrom = -15;
    var tmpTo = 15;
    var tmpTranslate = this.mapNumber(theAmount, 0, 255, tmpFrom, tmpTo);

    if (theString == 'updown') {
      translateItem(tmpName, false, tmpTranslate);
    } else if (theString == 'leftright') {
      translateItem(tmpName, tmpTranslate, false);
    }
  }


  ControlCode.moveTailAmt = moveTailAmt;
  function moveTailAmt(theAmount, theString) {
    var tmpName = 'tail';
    var tmpFrom = 12;
    var tmpTo = -12;
    var tmpAmt = this.mapNumber(theAmount, 0, 255, tmpFrom, tmpTo);

    if (theString == 'updown') {
      rotateItem(tmpName, tmpAmt);
    }
  }
  
  ControlCode.moveHeadAmt = moveHeadAmt;
  function moveHeadAmt(theAmount, theString) {
    var tmpName = 'head';
    var tmpFrom = -15;
    var tmpTo = 15;
    var tmpAmt = this.mapNumber(theAmount, 0, 255, tmpFrom, tmpTo);

    if (theString == 'updown') {
      rotateItem(tmpName, tmpAmt);
    }
  }

  ControlCode.moveEyebrowAmt = moveEyebrowAmt;
  function moveEyebrowAmt(theName, theAmount, theString) {
    var tmpName = theName;
    var tmpFrom = -10;
    var tmpTo = 10;
    var tmpAmt = this.mapNumber(theAmount, 0, 255, tmpFrom, tmpTo);

    if (theString == 'updown') {
      translateItem(tmpName, false, tmpAmt);
    } else if (theString == 'leftright') {
      translateItem(tmpName, tmpAmt, false);
    }
  }

  ControlCode.moveShellAmt = moveShellAmt;
  function moveShellAmt(theAmount, theString) {
    var tmpName = 'shell';
    var tmpFrom = -10;
    var tmpTo = 10;
    var tmpAmt = this.mapNumber(theAmount, 0, 255, tmpFrom, tmpTo);

    if (theString == 'updown') {
      translateItem(tmpName, false, tmpAmt);
    }
  }

  ControlCode.moveBodyAmt = moveBodyAmt;
  function moveBodyAmt(theAmount, theString) {
    var tmpName = 'body';
    var tmpFrom = -10;
    var tmpTo = 10;
    var tmpAmt = this.mapNumber(theAmount, 0, 255, tmpFrom, tmpTo);

    if (theString == 'updown') {
      translateItem(tmpName, false, tmpAmt);
    }
  }


  ControlCode.moveLegAmt = moveLegAmt;
  function moveLegAmt(theName, theAmount, theString) {

    var tmpFromRotate = -15;
    var tmpToRotate = 15;
    var tmpFromTranslate = -15;
    var tmpToTranslate = 15;

    var tmpRotate = this.mapNumber(theAmount, 0, 255, tmpFromRotate, tmpToRotate);
    var tmpTranslate = this.mapNumber(theAmount, 0, 255, tmpFromTranslate, tmpToTranslate);
    if (theString == 'forwardback') {
      rotateItem(theName, tmpRotate);
    } else if (theString == 'updown') {
      translateItem(theName, false, tmpTranslate);
    }
  }
  
  // --- Strings: leftright updown forwardback openclose
  ControlCode.pullString = function(theOptions) {
    var tmpOptions = theOptions || {};

    var tmpName = theOptions.name;
    var tmpString = theOptions.string;
    var tmpAmount = theOptions.amount;
    var tmpSpecs = _charDetails[tmpName];
    var tmpElem = _charElems[tmpName].get(0);

    if (tmpName == 'pupils') {
      this.movePupilsAmt(tmpAmount, tmpString);
    } else if (tmpName == 'mouth') {
      this.moveMouthAmt(tmpAmount, tmpString);
    } else if (tmpName == 'tail') {
      this.moveTailAmt(tmpAmount, tmpString);
    } else if (tmpName == 'head') {
      this.moveHeadAmt(tmpAmount, tmpString);
    } else if (tmpName == 'shell') {
      this.moveShellAmt(tmpAmount, tmpString);
    } else if (tmpName == 'body') {
      this.moveBodyAmt(tmpAmount, tmpString);
    } else if (tmpName == 'eyebrowleft' || tmpName == 'eyebrowright') {
      this.moveEyebrowAmt(tmpName, tmpAmount, tmpString)
    } else if (tmpName == 'frontleft' || tmpName == 'frontright' || tmpName == 'backleft' || tmpName == 'backright') {
      this.moveLegAmt(tmpName, tmpAmount, tmpString)
    }

  }

  ControlCode.transformItem = transformItem;
  function transformItem(theItem, theTransform) {
    var tmpSpecs = _charDetails[theItem];
    var tmpElem = _charElems[theItem].get(0);
    tmpElem.setAttribute("transform", theTransform);
  }

  ControlCode.translateItem = translateItem;
  function translateItem(theItem, theXAmt, theYAmt) {
    var tmpEl = _charElems[theItem];
    var tmpElem = tmpEl.get(0);
    var tmpIsX = (theXAmt !== false);
    var tmpIsY = (theYAmt !== false);
    var tmpXAmt = tmpIsX ? theXAmt: 0;
    var tmpYAmt = tmpIsY ? theYAmt: 0;
    var tmpData = tmpEl.data() || {};

    //--- Save element(s) data that is being set
    if (tmpIsX) {
      tmpEl.data('tX', tmpXAmt);
    } else {
      tmpXAmt = tmpEl.data('tX') || 0;
    }
    if (tmpIsY) {
      tmpEl.data('tY', tmpYAmt)
    } else {
      tmpYAmt = tmpEl.data('tY') || 0;
    }

    tmpElem.setAttribute("transform", "translate(" + tmpXAmt + "," + tmpYAmt + ")");
  }

  ControlCode.rotateItem = rotateItem;
  function rotateItem(theItem, thePerc, theOptX, theOptY) {
    var tmpSpecs = _charDetails[theItem];
    var tmpElem = _charElems[theItem].get(0);
    if( theOptX && theOptY){
      tmpElem.setAttribute("transform", "rotate(" + thePerc + "," + theOptX + ',' + theOptY + ")");
    } else {
      tmpElem.setAttribute("transform", "rotate(" + thePerc + "," + tmpSpecs.x + "," + tmpSpecs.y + ")");
    }
  }


  ControlCode._onInit = _onInit;
  function _onInit() {
    //-- For debugging only
    window.Etchy = this;

    this.showDebug = false;
    ThisControl = this;

    this.moveMouth = false

    this.loadSpot('body', {}, 'EtchyHome');
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
