Loc = function (){   
    var i18nFiles = ['people'];
    var i18nLang = ['en','fr']; //first is default (warning empty value is not supported in i18n file names)
    var path = 'resources/i18n/';
    return {
	    buildFileName: function(fileName, lang){
			var fd = fileName;
	        if (!!lang)
	            fd += "_" + lang;
	        else
	        	fd += "_" + i18nLang[0];

	        fd += "." + "js"

	        return fd;
		},

	    loadInternationalizedFile: function(fileName, lang){
	        document.write('<script type="text/javascript" src="' + path + this.buildFileName(fileName, lang) + '"></script>');
	    },

	    getI18nFiles : function(){
	        return i18nFiles;
	    },

	    getURLLang : function (paramName){
			paramName = paramName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
			var regexS = "[\\?&]"+paramName+"=([^&#]*)";  
			var regex = new RegExp( regexS );  
			var results = regex.exec( window.location.href ); 
			if( !!results && !! results[1])
				return results[1];
		},

	    getLanguage : function(){
	    	var language = Loc.getURLLang('lang');

	    	if (!language){ 
	    		language = window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.systemLanguage || null;
	    	
	    		if (!!language)
	    			language = language.split("-")[0];
	    	}

	    	for (var i = i18nLang.length - 1; i >= 0; i--) {
			    if (language == i18nLang[i])
			    	return language;
			};
			return i18nLang[0];
	    },

	    setCurrentLoc : function (lang){
	    	var sep = '?';
	    	var curLoc = window.location.href;
	    	if(curLoc.indexOf('?') != -1)
	    		sep = '&';

	    	if (curLoc.indexOf('lang=') != -1)
	    		window.location.href= window.location.href.replace(/lang=\w{2}/g, 'lang='+ lang);
	    	else
	    		window.location.href = window.location.href +  sep + 'lang='+ lang;
	    },

	    goToLoc : function (page){
	    	var language = Loc.getLanguage();
	    	window.location.href= page + ".html?lang=" + language;
	    },

	    w : function(key){
	    	document.write(key);
	    }
	};
}();

for (var i = Loc.getI18nFiles().length - 1; i >= 0; i--) {
	Loc.loadInternationalizedFile(Loc.getI18nFiles()[i], Loc.getLanguage());
}