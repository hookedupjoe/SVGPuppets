(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");

    //~thisPageSpecs//~
var thisPageSpecs = {
	"pageName": "Etchy",
	"pageTitle": "Etchy",
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
  east: {html: 'east'},
  west: false,
  center: { control: "EtchyControl", source: "__app" },
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
actions.startMusicResponse();
actions.runReaction2();
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
actions.startMusicResponse = function(){
  ThisPage.parts.center.startMusicResponse();
}
actions.stopMusicResponse = function(){
  ThisPage.parts.center.stopMusicResponse();
}

actions.runReaction1 = function(){
  ThisPage.parts.center.runReaction('reactionDance1');
}

actions.runReaction2 = function(){
  ThisPage.parts.center.runReaction('reactionDance2');
}

actions.toggleMouth = function(){
  ThisPage.parts.center.toggleMouth();
}
//~YourPageCode~//~

})(ActionAppCore, $);
