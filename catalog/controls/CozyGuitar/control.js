(function (ActionAppCore, $) {

  var ControlSpecs = {
    options: {
      padding: true,
      required: {
        templates: {
          map:
          {
            "CozyGuitarHome": {
              source: "__app", name: "CozyGuitarHome"
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
			
			var tmpKickCycle = eqData.kCycle;
			var tmpKCP = tmpKickCycle/255;
			var tmpNewHueOffset = tmpKCP * 360;
			this.hueShiftTo(tmpNewHueOffset);
			if( this.showDebug ){
			   console.log('tmpNewHueOffset',tmpNewHueOffset);
			}
			data = tmpData.b30;
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
    //this.wsURL = 'ws://localhost:8080/eq';
    this.wsURL = 'ws://10.0.0.211:8080/eq';
    
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

  
  
  ControlCode.hueShiftTo = function(theOffset) {

    // var tmpAllColors = ThisApp.getByAttr$({
    //     svguse: "color"
    // });
  

    for (var i = 0; i < this.colorElems.length; i++) {
      var tmpEntry = $(this.colorElems[i]);
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
  
  ControlCode.initColors = initColors;
  function initColors(){
    this.elemIndex = {};
    
    for (var i = 0; i < this.colorElems.length; i++) {
      var tmpEntry = $(this.colorElems[i]);
      var tmpID = tmpEntry.attr('id');
      var tmpFillRGB = tmpEntry.css('fill');
      var tmpColors = getColorsFromFillValue(tmpFillRGB);
      
      this.elemIndex[tmpID] = {
        el: tmpEntry,
        colors: tmpColors
      }
    }
    
    console.log('this.elemIndex',this.elemIndex);
  }
   
  ControlCode._onInit = _onInit;
  function _onInit() {
    this.showDebug = false;
    this.loadSpot('body', {}, 'CozyGuitarHome');
    
    this.colorElems = ThisApp.getByAttr$({
        svguse: "color"
    });
    console.log('this.colorElems',this.colorElems);
    this.initColors();
    
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