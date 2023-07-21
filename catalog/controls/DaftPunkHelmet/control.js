(function (ActionAppCore, $) {
  
  var homeTplName = 'DaftPunkHome'
  var ControlSpecs = {
    options: {
      padding: false,
      required: {
        templates: {
          map:
          {
            homeTplName: {
              source: "__app", name: homeTplName
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

  var eqData = {
    volume: 0
  };

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true: sParameterName[1];
      }
    }
  };

  var data = [];
  var arcs = [];
  var backs = [];
  var displayBands = [];
  var colors = [];
  var showBacks = false;
  var showEQ = false;
  var showStar = false;
  var beatChangeParts = [];


  DaftPunkContoller = {
    svg: null,
    data: [10,
      20,
      50,
      150,
      200,
      250,
      75],
    init: function(theSVG, theG) {
      var svg = theSVG,
      width = +svg.attr("width"),
      height = +svg.attr("height");

      var g = theG;

      this.svgWidth = width;
      this.svgHeight = height;
      this.svg = svg;
      this.gTop = g;

      this.helmetPartCount = 8;
      this.dotCount = 24;


      this.helmetparts = [];

      this.dotsColorScale = d3.scaleSequential()
      .domain([0, this.dotCount-1])
      .interpolator(d3.interpolateRainbow);

      this.volumeColorScale = d3.scaleSequential()
      .domain([0, 255])
      .interpolator(d3.interpolateRainbow);

      this.dots = [];
      this.dotcolors = [];

      for (var i = 0; i < this.helmetPartCount; i++) {
        tmpToFind = 'helmet' + (i+1);
        this.helmetparts.push(svg.selectAll("#" +  tmpToFind + ""));
      }
      for (var i = 0; i < this.dotCount; i++) {
        tmpToFind = 'dot' + (i+1);
        this.dots.push(svg.selectAll("#" +  tmpToFind + ""));
        this.dotcolors.push(this.dotsColorScale(i));
      }

      this.objwrap = svg.selectAll("[appuse='objwrap'");

      d3.interval(function() {
        try {
          DaftPunkContoller.runTest();
        } catch(ex) {
          console.log("Error " + ex.toString());
        }
      }, 100);

    },
    moveDone: function() {
      DaftPunkContoller.isMoveComplete = true;
    },
    repaintWindow: function() {
      return;
      $('body').css("border", "solid 0px red");
          setTimeout(function(){
              $('body').css("border", "solid 0px transparent");
          }, 1000);
    },
    runTest: function() {
      /*
                this.runAt = this.runAt || 0;
                this.runAt++;
                if( this.runAt >= this.helmetPartCount ){
                    this.runAt = 0;
                }
                for( var i = 0 ; i < this.helmetPartCount ; i++){
                    var colorPos = this.runAt + i;
                    if( colorPos >= this.helmetPartCount){
                        colorPos = colorPos - this.helmetPartCount;
                    }
                    this.helmetparts[i].style("fill", this.helmetcolors[colorPos]);
                    this.helmetparts[i].style("outline", "black");
                }
                */
      if (this.hasMoved !== true) {
        this.hasMoved = true;

        this.helmetparts[0].style("fill", "white");
        this.helmetparts[1].style("fill", "DarkGray");
        this.helmetparts[2].style("fill", "green");
        this.helmetparts[3].style("fill", "#A0A0A0");
        this.helmetparts[4].style("fill", "#C0C0C0");
        this.helmetparts[5].style("fill", "green");
        this.helmetparts[6].style("fill", "green");
        this.helmetparts[7].style("fill", "green");

        //--- Optionally add anything here to cycle with the beat
        // beatChangeParts.push(this.helmetparts[2]);
        // beatChangeParts.push(this.helmetparts[5]);
        // beatChangeParts.push(this.helmetparts[6]);
        // beatChangeParts.push(this.helmetparts[7]);
 



        //this.objwrap.attr("transform", "translate(" + ((tmpStarX)-(tmpW/2)-tmpOffset) + "," + ((tmpStarY)-(tmpH/2)-tmpOffset) + ")");


        var tmpScaleObject = 1;
        var tmpSize = this.objwrap.node().getBBox();

        var tmpHelmetScale = 7;
        if( showEQ ){
          tmpHelmetScale = 3;
        }

        var tmpH = parseInt(tmpSize.height) * tmpHelmetScale;
        var tmpW = parseInt(tmpSize.width) * tmpHelmetScale;
        //tmpStart = 100;
        tmpOffset = 1;
        var tmpStarX = 0; //this.svgWidth/2;
        var tmpStarY = 0; //this.svgHeight/2;

        this.objwrap
        .transition()
        .duration(8000)
        //.attr("transform", "translate(" + ((tmpStarX)-(tmpW/2)-tmpOffset) + "," + ((tmpStarY)-(tmpH/2)-tmpOffset) + ") scale(8) ")
        .attr("transform", "scale(" + tmpHelmetScale + ") ")
        .on('end', DaftPunkContoller.moveDone);

      }
      if (this.isMoveComplete == true) {
        //-- cause a refresh to remove fly in anomolies
        this.repaintWindow();
        this.isMoveComplete = null;
      }


      //--- Start rainbowing the dots right away, even while flying in
      this.runDotAt = this.runDotAt || 0;
      this.runDotAt++;
      if (this.runDotAt >= this.dotCount) {
        this.runDotAt = 0;
      }

      for (var i = 0; i < this.dotCount; i++) {
        var colorPos = this.runDotAt + i;
        if (colorPos >= this.dotCount) {
          colorPos = colorPos - this.dotCount;
        }
        // this.dots[i].style("fill", this.dotcolors[colorPos]);
        this.dots[i].style("fill", this.volumeColorScale(eqData['B' + (i+1)]));
        this.dots[i].style("outline", "black");
      }
    }
  };

  function daftPunkStartup() {
    var tmpFromAt = 52;
    var tmpToAt = 60;
    var tmpIncr = 10;

    var cp = $("#controlpanel");

    //var tmpURL = 'ws://localhost:7010/eq';
    var tmpURL = this.connectURL;
    //var tmpURLField = $("#wsurl");
    //tmpURLField.val(tmpURL)

    //var tmpBC = getUrlParameter('bands') || '30';
    //bandCount = parseInt(tmpBC);
    var bandCount = 30


    if (bandCount > 10) {
      tmpFromAt = 52;
      tmpToAt = 57;
      tmpIncr = 8;
    }

    var colorScale = d3.scaleSequential()
    .domain([0, bandCount])
    .interpolator(d3.interpolateRainbow);

    var volScale = d3.scaleLinear()
    .domain([0, 250])
    .range([0, 50])

    data = [];
    arcs = [];
    backs = [];
    displayBands = [];
    colors = [];

    for (var i = 0; i < bandCount; i++) {
      data.push(0);
      colors.push(colorScale(i));
      arcs.push(d3.arc()
        .innerRadius(tmpFromAt)
        .outerRadius(tmpToAt)
        .startAngle(0)
      )
      tmpFromAt += tmpIncr;
      tmpToAt += tmpIncr;
    }

    function refreshFromData() {
      //console.log("refreshFromData",data);
    }



    var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g1 = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var g = g1.append("g").attr("transform", "rotate(-90)");

    var star = svg.selectAll("[use='star']");
    var starwrap = svg.selectAll("[use='starwrap']");


    star.style("fill", "yellow");

    var volume = svg.selectAll("[use='volume']");
    // or DarkGray or someting ??
    volume.style("fill", "#FF2222")
    .attr("r", 30)
    .attr("cx", width / 2)
    .attr("cy", height / 2);

    for (var i = 0; i < bandCount; i++) {

      if (showBacks) {
        backs.push(g.append("path")
          .datum({
            endAngle: tau
          })
          .style("fill", "#ddd")
          .attr("d", arcs[i])
        )
      }

      displayBands.push(
        g.append("path")
        .datum({
          endAngle: 0 * tau
        })
        .style("fill", colors[i])
        .attr("d", arcs[i])
      )


    }

    DaftPunkContoller.init(svg, g);


    if (!showStar) {
      volume.style("display", "none");
      star.style("display", "none");
    } else {
      volume.style("display", "");
      star.style("display", "");
    }

    
    // update the display based on data
    d3.interval(function () {
     
      try {
        //console.log(eqData);
        var tmpVol = eqData.vol || 0;
        //volume.attr("r", volScale(tmpVol));

        var tmpBeatVal = eqData.kCycle;
        var tmpScaleStar = (tmpVol / 255);
        var tmpScaleVol = (tmpBeatVal / 255);

        volume.style("fill", colorScale(tmpBeatVal));

        for( var iPos in beatChangeParts){
          //console.log('fill', colorScale(tmpBeatVal))
          beatChangeParts[iPos].style("fill", colorScale(tmpBeatVal))
        }

        tmpScaleStar = tmpScaleStar * 2;
        star.attr("transform", "scale(" + tmpScaleStar + ")");
        var tmpSize = starwrap.node().getBBox();
        var tmpH = parseInt(tmpSize.height);
        var tmpW = parseInt(tmpSize.width);
        tmpStart = 100;
        tmpOffset = 1;
        var tmpStarX = width / 2;
        var tmpStarY = height / 2;

        starwrap.attr("transform", "translate(" + ((tmpStarX) - (tmpW / 2) - tmpOffset) + "," + ((tmpStarY) - (tmpH / 2) - tmpOffset) + ")");
        //starwrap.attr("transform", "translate(" + (0-( tmpSize.width / 2)) + "," + tmpSize.height / 2 + ")");
        //starwrap.attr("transform", "translate(" + 0-tmpDiff + "," + 0-tmpDiff + ")");
        //console.log('bandCount',bandCount);
        if (showEQ) {
          for (var i = 0; i < bandCount; i++) {
            //console.log('data[i]',i,data[i]);
            var tmpBVal = eqData['B' + (i+1)];
            var tmpDisp = displayBands[i];
            tmpDisp.transition()
            .duration(4)
            .attrTween("d", arcTween((tmpBVal / 255) * tau, arcs[i]));
          }
        }
    } catch (ex) {
        //temp -> 
        console.error("Error ", ex);
      }
    },
      5);


    // Returns a tween for a transition’s "d" attribute, transitioning any selected
    // arcs from their current angle to the specified new angle.
    function arcTween(newAngle, theArc) {

      // The function passed to attrTween is invoked for each selected element when
      // the transition starts, and for each element returns the interpolator to use
      // over the course of transition. This function is thus responsible for
      // determining the starting angle of the transition (which is pulled from the
      // element’s bound datum, d.endAngle), and the ending angle (simply the
      // newAngle argument to the enclosing function).
      return function (d) {

        // To interpolate between the two angles, we use the default d3.interpolate.
        // (Internally, this maps to d3.interpolateNumber, since both of the
        // arguments to d3.interpolate are numbers.) The returned function takes a
        // single argument t and returns a number between the starting angle and the
        // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
        // newAngle; and for 0 < t < 1 it returns an angle in-between.
        var interpolate = d3.interpolate(d.endAngle,
          newAngle);

        // The return value of the attrTween is also a function: the function that
        // we want to run for each tick of the transition. Because we used
        // attrTween("d"), the return value of this last function will be set to the
        // "d" attribute at every tick. (It’s also possible to use transition.tween
        // to run arbitrary code for every tick, say if you want to set multiple
        // attributes from a single function.) The argument t ranges from 0, at the
        // start of the transition, to 1, at the end.
        return function (t) {

          // Calculate the current arc angle based on the transition time, t. Since
          // the t for the transition and the t for the interpolate both range from
          // 0 to 1, we can pass t directly to the interpolator.
          //
          // Note that the interpolated angle is written into the element’s bound
          // data object! This is important: it means that if the transition were
          // interrupted, the data bound to the element would still be consistent
          // with its appearance. Whenever we start a new arc transition, the
          // correct starting angle can be inferred from the data.
          d.endAngle = interpolate(t);

          // Lastly, compute the arc path given the updated data! In effect, this
          // transition uses data-space interpolation: the data is interpolated
          // (that is, the end angle) rather than the path string itself.
          // Interpolating the angles in polar coordinates, rather than the raw path
          // string, produces valid intermediate arcs during the transition.
          return theArc(d);
        };
      };
    }


    //--- End Load

    

    // GET("hello").onclick = function (event) { wstool.write("Hello There"); return false; }



  }

var hasShown = 0;
    function onstream(theStream) {
      try {
        var tmpData = JSON.parse(theStream);
        eqData = tmpData;
        //data = tmpData.B30;
        //console.log("pos " + eqData.pos || '0');
      } catch (ex) {
        if (hasShown < 2) {
          //temp -> console.error("Error on stream " + ex.toString());
          hasShown++
        }
      }
    }


  ControlCode.DaftPunkContoller = DaftPunkContoller;

  ControlCode.connect = function() {
    this.wstool.connect(this.connectURL);
    this.wstool.onstream = onstream;

  }
  
  ControlCode.disconnect = function(){
    this.wstool.close(); 
  }
  
  ControlCode._onInit = _onInit;
  function _onInit() {
    window.DaftPunk = this;
    this.showDebug = false;
    this.loadSpot('body', {}, homeTplName);
    //this.connectURL = 'ws://10.0.0.211:7010/eq';
    this.connectURL = 'ws://localhost:7010/eq';


    daftPunkStartup()

    DaftPunk.getSpot('body').get(1).remove();
    DaftPunk.getSpot('body').css('background-color', 'green');

    // this.colorElems = ThisApp.getByAttr$({
    //     svguse: "color"
    // });
    // console.log('this.colorElems',this.colorElems);
    // this.initColors();

    this.winsock = this.parts.winsock;
    this.wstool = this.winsock.wstool;
    var self = this;
    ThisApp.delay(1000).then(function(){
      self.connect()
    })
  }

  var ThisControl = {
    specs: ControlSpecs,
    options: {
      proto: ControlCode,
      parent: ThisApp
    }};
  return ThisControl;
})(ActionAppCore, $);