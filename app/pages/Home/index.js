(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    //~thisPageSpecs//~
var thisPageSpecs = {
	"pageName": "Home",
	"pageTitle": "Home",
	"navOptions": {
		"topLink": true,
		"sideLink": true
	}
}
//~thisPageSpecs~//~

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';

    //~layoutOptions//~
thisPageSpecs.layoutOptions = {
        baseURL: pageBaseURL,
        north: false,
        east: { html: 'east' },
        west: false,
        center: { html: "center" },
        south: false
    }
//~layoutOptions~//~

    //~layoutConfig//~
thisPageSpecs.layoutConfig = {
        west__size: "500"
        , east__size: "250"
    }
//~layoutConfig~//~
    //~required//~
thisPageSpecs.required = {

    }
//~required~//~

    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    var actions = ThisPage.pageActions;

    ThisPage._onPreInit = function (theApp) {
        //~_onPreInit//~

//~_onPreInit~//~
    }

    ThisPage._onInit = function () {
        //~_onInit//~

//~_onInit~//~
    }


    ThisPage._onFirstActivate = function (theApp) {
        //~_onFirstActivate//~

//~_onFirstActivate~//~
        ThisPage.initOnFirstLoad().then(
            function () {
                //~_onFirstLoad//~

//~_onFirstLoad~//~
                ThisPage._onActivate();
            }
        );
    }


    ThisPage._onActivate = function () {
        //~_onActivate//~

//~_onActivate~//~
    }

    ThisPage._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {
        //~_onResizeLayout//~

//~_onResizeLayout~//~
    }

    //------- --------  --------  --------  --------  --------  --------  -------- 
    //~YourPageCode//~
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
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
function HSVtoRGB(h,s,v) {                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  var tmpR = f(5);
  var tmpG = f(3);
  var tmpB = f(1);
  
  return {r: tmpR*255,g: tmpG*255,b: tmpB*255};       
}   

var hueOffset = 20;
var brtOffset = 20;
var allColors = [];

actions.testColorChange = function() {

  var tmpAllColors = ThisApp.getByAttr$({
    svguse: "color"
  });

  window.allColors = [];
  for (var i = 0; i < tmpAllColors.length; i++) {
    var tmpEntry = $(tmpAllColors[i]);
    window.allColors.push(tmpEntry);
    
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
    if( tmpH > 360){
      tmpH = tmpH - 360;
    }
    var tmpBrtInt = 255*tmpV;
    tmpBrtInt += brtOffset;
    if( tmpBrtInt > 255){
      tmpBrtInt = tmpBrtInt - 255;
    }
    if( tmpBrtInt < 100){
      tmpBrtInt = 100;
    }
    tmpV = tmpBrtInt/255;
    var tmpNewRGB = HSVtoRGB(tmpH,tmpS,tmpV)
    var tmpNewRGBFill = 'rgb(' + tmpNewRGB.r + ',' + tmpNewRGB.g + ',' + tmpNewRGB.b + ')';
    tmpEntry.css('fill',tmpNewRGBFill);
  }
}
//~YourPageCode~//~

})(ActionAppCore, $);
