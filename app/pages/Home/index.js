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
// // input: r,g,b in [0,1], out: h in [0,360) and s,v in [0,1]
// function rgb2hsv(r,g,b) {
//   let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
//   let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c));
//   var tmpH = 60*(h<0?h+6:h);
//   var tmpS = v&&c/v;
//   var tmpV = v;
//   return [(tmpH/255),(tmpS/255) ,(tmpV/255) ];
// }


/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
  var r,
  g,
  b,
  i,
  f,
  p,
  q,
  t;
  if (arguments.length === 1) {
    s = h.s,
    v = h.v,
    h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v,
      g = t,
      b = p; break;
    case 1: r = q,
      g = v,
      b = p; break;
    case 2: r = p,
      g = v,
      b = t; break;
    case 3: r = p,
      g = q,
      b = v; break;
    case 4: r = t,
      g = p,
      b = v; break;
    case 5: r = v,
      g = p,
      b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}


function rgb2hsv (r, g, b) {
  let rabs,
  gabs,
  babs,
  rr,
  gg,
  bb,
  h,
  s,
  v,
  diff,
  diffc,
  percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs),
  diff = v - Math.min(rabs, gabs, babs);
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100)
  };
}


//--------

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}


/* accepts parameters
 * r  Object = {r:x, g:y, b:z}
 * OR 
 * r, g, b
*/
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


// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
function hsv2rgb2(h,s,v) 
{                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  var tmpR = f(5);
  var tmpG = f(3);
  var tmpB = f(1);
  
  return {r: tmpR*255,g: tmpG*255,b: tmpB*255};       
}   

var hueOffset = 20;

actions.testColorChange = function() {
  var tmpAllColors = ThisApp.getByAttr$({
    svguse: "color"
  });
  var self = this;
  for (var i = 0; i < tmpAllColors.length; i++) {
    var tmpEntry = $(tmpAllColors[i]);
    var tmpFill = tmpEntry.css('fill');
    console.log('tmpFill', tmpFill);
    var tmpColors = tmpFill.replace('rgb(', '').replace(')', '').replace(' ', '');
    tmpColors = tmpColors.split(',');
    var tmpR = parseInt(tmpColors[0]);
    var tmpG = parseInt(tmpColors[1]);
    var tmpB = parseInt(tmpColors[2]);
    console.log('tmpR,tmpG,tmpB', tmpR,tmpG,tmpB);
    var tmpHSV = RGBtoHSV(tmpR, tmpG, tmpB);
    console.log('tmpHSV', tmpHSV);
    var tmpH = tmpHSV.h
    var tmpS = tmpHSV.s;
    var tmpV = tmpHSV.v;
    console.log('tmpH,tmpS,tmpV', tmpH,tmpS,tmpV);
    tmpH = 360*tmpH;
    tmpH += hueOffset;
    if( tmpH > 360){
      tmpH = tmpH - 360;
    }
    
    var tmpNewRGB = hsv2rgb2(tmpH,tmpS,tmpV)
    console.log('tmpNewRGB', tmpNewRGB);
    var tmpNewRGBFill = 'rgb(' + tmpNewRGB.r + ',' + tmpNewRGB.g + ',' + tmpNewRGB.b + ')';
    tmpEntry.css('fill',tmpNewRGBFill);
  }
}
//~YourPageCode~//~

})(ActionAppCore, $);
