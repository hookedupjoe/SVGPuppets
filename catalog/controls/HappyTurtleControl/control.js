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
    }, {
      ctl: "control",
      controlname: "WinsockController",
      name: "winsock",
      source: "__app"
    }]
  }

  var ControlCode = {};

  var _charSpecs = {
    inputScale: {
      from: 0,
      to: 255
    },
    index: {
      tail: {
        _strings: [
          "updown"
        ],
        updown: {
          rotate: {
            from: -12,
            to: 12,
            offset: {
              x: 83,
              y: 270
            }
          }
        }
      },
      pupils: {
        _strings: [
          "updown",
          "leftright"
        ],
        updown: {
          translate: {y:{
            from: -15,
            to: 15
          }}
        },
        leftright: {
          translate: {x: {
            from: -15,
            to: 15
          }}
        }
      }
    }
  }

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

  var _charDetails = {
    tail: {
      x: 83,
      y: 270
    },
    frontleft: {
      x: 483,
      y: 217
    },
    backleft: {
      x: 230,
      y: 230
    },
    backright: {
      x: 176,
      y: 202
    },
    frontright: {
      x: 420,
      y: 176
    },
    body: {
      x: 0,
      y: 0
    },
    shell: {
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
    nose: {
      x: 0,
      y: 0
    },
    eyebrowleft: {
      x: 0,
      y: 0
    },
    eyebrowright: {
      x: 0,
      y: 0
    },
    mouth: {
      x: 662,
      y: 326
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
    var tmpFrom = -12;
    var tmpTo = 12;
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
  ControlCode.adjustString = function(theOptions) {
    var tmpOptions = theOptions || {};
    var tmpName = theOptions.name;
    var tmpString = theOptions.string;
    var tmpAmount = theOptions.amount;
    var tmpSpecs = _charSpecs.index[tmpName];
    console.log('tmpSpecs',tmpName, tmpSpecs);
    var tmpEl = _charElems[tmpName];
    var tmpStringSpecs = tmpSpecs[tmpString];
    this.adjCharElement(tmpEl, tmpAmount, tmpStringSpecs);
  }
  
  ControlCode.adjCharElement = function(theEl, theAmount, theSpecs){
    if( theSpecs.rotate ){
      this.rotateElem(theEl, theAmount, theSpecs.rotate);
    }
    if( theSpecs.translate ){
      this.translateElem(theEl, theAmount, theSpecs.translate);
    }
  }

   ControlCode.rotateElem = rotateElem;
   function rotateElem(theEl, theAmount, theSpecs){
    var tmpSpecs = theSpecs || {};
    var tmpElem = theEl.get(0);
    
    var tmpFrom = tmpSpecs.from || 0;
    var tmpTo = tmpSpecs.to || 0;
    var tmpAmt = this.mapNumber(theAmount, 0, 255, tmpFrom, tmpTo);
    
    var tmpOffset = tmpSpecs.offset || {};
    var tmpOffX = tmpOffset.x || 0;
    var tmpOffY = tmpOffset.y || 0;
    
    tmpElem.setAttribute("transform", "rotate(" + tmpAmt + "," + tmpOffX + "," + tmpOffY + ")");
  
   }

   
  ControlCode.translateElem = translateElem;
  function translateElem(theEl, theAmount, theSpecs) {
    var tmpElem = theEl.get(0);

    var tmpXAmt = 0;
    var tmpYAmt = 0;

    var tmpIsX = false;
    var tmpIsY = false;
    
    if( theSpecs.x ){
      tmpIsX = true;
      tmpXAmt = this.mapNumber(theAmount, 0, 255, theSpecs.x.from, theSpecs.x.to);
    }
    if( theSpecs.y ){
      tmpIsY = true;
      tmpYAmt = this.mapNumber(theAmount, 0, 255, theSpecs.y.from, theSpecs.y.to);
    }
  
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
    console.log('tmpElem data', tmpData);

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
  function rotateItem(theItem, thePerc) {
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