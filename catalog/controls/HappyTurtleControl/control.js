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

  var hasShown = 0;
 // var doneOnce = false;
	function onstream(theStream) {
		try {
			var tmpData = JSON.parse(theStream);
			eqData = tmpData;
			if( !eqData){
			  console.log('nada');
			  return;
			}
			this.eqData = eqData;
			var tmpKickCycle = eqData.kCycle;
			var tmpKCP = tmpKickCycle/255;
			var tmpNewHueOffset = tmpKCP * 360;
			this.setElemColor(tmpNewHueOffset);
			if( this.showDebug ){
			   console.log('tmpNewHueOffset',tmpNewHueOffset);
			}
			
			
			//data = tmpData.b30;
			if( this.showDebug ){
			  console.log('kCycle - val',eqData.kCycle, eqData.kVal);
			}
		} catch (ex) {
			if (hasShown < 2) {
				console.error("Error on stream " + ex.toString());
				hasShown++
			}
		}
	}
	
	
  ControlCode.runTest = function(){
    //this.wsURL = 'ws://localhost:7010/eq';
    this.wsURL = 'ws://10.0.0.211:7010/eq';
    
    this.wstool.connect(this.wsURL);
	  this.wstool.onstream = onstream.bind(this);
  }

  function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
      g = r.g,
      b = r.b,
      r = r.r;
    }
    var max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min,
    h,
    s = (max === 0 ? 0: d / max),
    v = max / 255;

    switch (max) {
      case min: h = 0; break;
      case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
      case g: h = (b - r) + d * 2; h /= 6 * d; break;
      case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
      h: h,
      s: s,
      v: v
    };
  }
  function HSVtoRGB(h, s, v) {
    let f = (n, k = (n+h/60)%6) => v - v*s*Math.max(Math.min(k, 4-k, 1), 0);
    var tmpR = f(5);
    var tmpG = f(3);
    var tmpB = f(1);

    return {
      r: tmpR*255,
      g: tmpG*255,
      b: tmpB*255
    };
  }

  var hueOffset = 20;
  var brtOffset = 10;
  var allColors = [];

  
  
  ControlCode.setElemColor = function(theOffset) {

    // var tmpAllColors = ThisApp.getByAttr$({
    //     svguse: "color"
    // });
  //   var tmpBC1 = tmpData.b8;
		// var tmpBC2 = tmpData.b27;
		// var tmpCol1 = $(this.charElems[1]);
		// var tmpCol2 = $(this.charElems[11]);
			
			console.log('eqData',this.eqData);

    for (var i = 0; i < this.charElems.length; i++) {
      var tmpEntry = $(this.charElems[i]);
      var tmpID = tmpEntry.attr('id');
      //console.log('tmpID',tmpID);
      //var tmpFillRGB = tmpEntry.css('fill');
      var tmpOrig = this.elemIndex[tmpID].colors;
      
      
      var tmpNewH = tmpOrig.h;
      tmpNewH += theOffset;
      if( tmpNewH > 360 ){
        tmpNewH = tmpNewH - 360;
      }
      var tmpS = tmpOrig.s/255;
       var tmpV = tmpOrig.v/255;
      //console.log('tmpNewH, tmpS, tmpV',tmpNewH, tmpS, tmpV);
      var tmpBand = (i+1)*2;
      var tmpBandVal = this.eqData['B'+tmpBand];
      var tmpAdjBVal = (tmpBandVal/255)*155;
      
      tmpBandVal = 100 + tmpAdjBVal;
      var tmpV = tmpBandVal/255;
      //console.log('tmpBandVal',tmpBandVal);
      
      var tmpNewRGB = HSVtoRGB(tmpNewH, tmpS, tmpV)
      var tmpNewRGBFill = 'rgb(' + tmpNewRGB.r + ',' + tmpNewRGB.g + ',' + tmpNewRGB.b + ')';
      //console.log('tmpEntry',tmpNewRGBFill);
      tmpEntry.css('fill', tmpNewRGBFill);
    }
  }

  
  ControlCode.testColorChange = function() {

    var tmpAllColors = ThisApp.getByAttr$({
        svguse: "color"
    });
  
  
    for (var i = 0; i < tmpAllColors.length; i++) {
      var tmpEntry = $(tmpAllColors[i]);
      allColors.push(tmpEntry);
  
      var tmpFill = tmpEntry.css('fill');
      var tmpColors = tmpFill.replace('rgb(', '').replace(')', '').replace(' ', '');
      tmpColors = tmpColors.split(',');
      var tmpR = parseInt(tmpColors[0]);
      var tmpG = parseInt(tmpColors[1]);
      var tmpB = parseInt(tmpColors[2]);
      var tmpHSV = RGBtoHSV(tmpR, tmpG, tmpB);
      var tmpH = tmpHSV.h
      var tmpS = tmpHSV.s;
      var tmpV = tmpHSV.v;
      tmpH = 360*tmpH;
      tmpH += hueOffset;
      if (tmpH > 360) {
        tmpH = tmpH - 360;
      }
      var tmpBrtInt = 255*tmpV;
      tmpBrtInt += brtOffset;
      if (tmpBrtInt > 255) {
        tmpBrtInt = tmpBrtInt - 255;
      }
      if (tmpBrtInt < 100) {
        tmpBrtInt = 100;
      }
      tmpV = tmpBrtInt/255;
      var tmpNewRGB = HSVtoRGB(tmpH, tmpS, tmpV)
      console.log('tmpH, tmpS, tmpV',tmpH, tmpS, tmpV);
      var tmpNewRGBFill = 'rgb(' + tmpNewRGB.r + ',' + tmpNewRGB.g + ',' + tmpNewRGB.b + ')';
      tmpEntry.css('fill', tmpNewRGBFill);
    }
  }

  ControlCode.setup = setup;
  function setup() {}

  function getColorsFromFillValue(theCSSValue){
    var tmpColors = theCSSValue.replace('rgb(', '').replace(')', '').replace(' ', '');
      tmpColors = tmpColors.split(',');
      var tmpR = parseInt(tmpColors[0]);
      var tmpG = parseInt(tmpColors[1]);
      var tmpB = parseInt(tmpColors[2]);
      var tmpColors = RGBtoHSV(tmpR, tmpG, tmpB);

      tmpColors.r = tmpR;
      tmpColors.g = tmpG;
      tmpColors.b = tmpB;
      
      tmpColors.h = Math.round(tmpColors.h * 360);
      tmpColors.s = Math.round(tmpColors.s * 255 );
      tmpColors.v = Math.round(tmpColors.v * 255 );
      
      return tmpColors
  }
  
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
    
    console.log('._charElems',_charElems);
  }
   
  var _charDetails = {
  	tail: {x:83,y:270},
  	frontleft: {x:483,y:217},
  	backleft: {x:230,y:230},
  	backright: {x:176,y:202},
  	frontright: {x:420,y:176},
  	body: {x:0,y:0},
  	shell: {x:0,y:0},
  	head: {x:553,y:295}
  }
  
  var _charElems = {
  	
  }
  
  window.charDetails = _charDetails;
  window._charElems = _charElems;
  
  ControlCode.rotateItem = rotateItem;
  function rotateItem(theItem,thePerc) {
    console.log('rotateItem',theItem,thePerc)
      var tmpSpecs = _charDetails[theItem];
      var tmpElem = _charElems[theItem].get(0);
      console.log('tmpSpecs tmpElem',thePerc + "," + tmpSpecs.x + "," + tmpSpecs.y)
      tmpElem.setAttribute("transform", "rotate(" + thePerc + "," + tmpSpecs.x + "," + tmpSpecs.y + ")");
  }  
  
  ControlCode.rotateItemSet = rotateItemSet;
  function rotateItemSet(theItem,thePerc,theX,theY) {
    
      var tmpElem = _charElems[theItem].get(0);
      tmpElem.setAttribute("transform", "rotate(" + thePerc + "," + theX + "," + theY + ")");
  }  
  
  
  ControlCode._onInit = _onInit;
  function _onInit() {
    window.HappyTurtle = this;
    this.showDebug = false;
    this.loadSpot('body', {}, 'HappyTurtle');
    this.initElems();
   
  
//tmpTail.setAttribute("transform", "translate(" + tmpX + "," + tmpY + ") rotate(10,50,150) scale(" + (tmpScale) + "," + tmpScale + ") ");


//tmpTail.setAttribute("transform", "rotate(10,50,150)");


  
var tmpScale = '1';
var tmpX = 0;
var tmpY = 0;

var tmpTail = this.charElems[0];
window.tmpBackRight = this.charElems[3];

//console.log('tmpTail',tmpTail.getAttribute('transform'));
window.tmpTail = tmpTail;
//    console.log('this.charElems',this.charElems);
    
  //rotate(-10 50 100)  
    this.winsock = this.parts.winsock;
    this.wstool = this.winsock.wstool;
  }
 

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);