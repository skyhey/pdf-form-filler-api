window.rr=function(){return{version:"1.0.0"}}();
rr.string={xmlGet:function(a,b){return this.getPartBetween(a,"<"+b+">","</"+b+">")},xmlMakeTag:function(a,b){return"<"+a+">"+b+("</"+a+">")},xmlContains:function(a,b){return this.contains(a,"<"+b+">")},vget:function(a,b,c){3>arguments.length&&(c={});if(!this.contains(b,".")){var d=c;return a&&a.propertyIsEnumerable(b)?a[b]:d}var e,f,d=b.split(".");f=a;for(var g=0;g<d.length;g++){e=d[g];var h=c;f=f&&f.propertyIsEnumerable(e)?f[e]:h}return f},toObject:function(a,b,c){var d={};if(!a)return d;b||(b=";");
c||(c=":");a=a.split(b);b=a.length;for(var e,f,g=0;g<b;g++)e=a[g],f=this.getPartBefore(e,c),e=this.getPartAfter(e,c),f=this.trim(f),e=this.trim(e),f&&(d[f]=e);return d},join:function(a,b,c){c=c?c:"/";this.endWith(a,c)||(a+=c);this.startWith(b,c)&&(b=this.getPartAfter(b,c));return a+b},getPartBefore:function(a,b){if(!a)return"";var c=a.indexOf(b);return 0>c?"":a.substring(0,c)},getPartAfter:function(a,b){if(!a)return"";var c=a.indexOf(b),d=a.length;if(0>c)return"";c+=b.length;return a.substring(c,
c+d-c)},getPartBetween:function(a,b,c){if(!a)return"";a=this.getPartAfter(a,b);return a=this.getPartBefore(a,c)},revGetPartBefore:function(a,b){if(!a)return"";var c=a.length;if(0==c)return"";c=a.lastIndexOf(b,c-1);return 0>c?"":a.substring(0,c)},revGetPartAfter:function(a,b){if(!a)return"";var c=a.length;if(0==c)return"";var d=a.lastIndexOf(b,c-1);if(0>d)return"";d+=b.length;return a.substring(d,d+c-d)},getKeyValue:function(a,b,c,d){if(!a)return"";c=a.split(c);if(!c)return"";var e,f;for(a=0;a<c.length;a++)if(e=
c[a],f=this.getPartBefore(e,d),f=this.trim(f),b==f)return this.getPartAfter(e,d);return""},setKeyValue:function(a,b,c,d,e){var f=b+e;if(!this.contains(a,f))return a+d+f+c;a=a.split(d);var f=a.length,g,h,k,l="";for(g=0;g<f;g++)h=a[g],l&&(l+=d),this.contains(h,e)?(k=h.split(e),h=k[0],k=k[1],b==h&&(k=c),l+=h+e+k):l+=h;return l},contains:function(a,b){return a?!(0>a.indexOf(b)):!1},startWith:function(a,b){return a?0==a.indexOf(b):!1},endWith:function(a,b){if(!a)return!1;var c=a.length,d=b.length;return c<
d?!1:!(0>a.indexOf(b,c-d))},replace:function(a,b,c){for(var d="";this.contains(a,b);)d+=this.getPartBefore(a,b)+c,a=this.getPartAfter(a,b);return d+a},replacePlace:function(a,b,c){return this.replace(a,"%"+b+"%",c)},chopLeft:function(a,b){return a.substring(b)},chopRight:function(a,b){var c=a.length;return 0>=b?a:b>=c?"":a.substring(0,c-b)},getLeft:function(a,b){return 0>=b?"":b>=a.length?a:a.substring(0,b)},getRight:function(a,b){var c=a.length;return 0>=b?"":b>=c?a:a.substring(c-b,c)},mid:function(a,
b,c){var d=a.length-1;c=b+c;0>b&&(b=0);return c>d?a.substring(b):a.substring(b,c)},toBool:function(a){return a?""==a?!1:"0"==a?!1:"false"==a?!1:"False"==a?!1:"FALSE"==a?!1:"no"==a?!1:"No"==a?!1:"NO"==a?!1:"1"==a?!0:"true"==a?!0:"True"==a?!0:"TRUE"==a?!0:"yes"==a?!0:"Yes"==a?!0:"YES"==a?!0:!1:!1},toInt:function(a){return""==a?0:parseInt(a,10)},toFloat:function(a){return""==a?0:parseFloat(a)},toString:function(a){return String(a)},boolToInt:function(a){return a?1:0},toBit:function(a){a=this.toString(a);
a=this.toBool(a);return a=this.boolToInt(a)},toUpper:function(a){return a?a.toUpperCase():""},toLower:function(a){return a?a.toLowerCase():""},isNumeric:function(a){return!isNaN(a)},isInteger:function(a){return a===parseInt(a,10)?!0:!1},isString:function(a){return"string"==typeof a?!0:!1},isObject:function(a){return"object"==typeof a?!0:!1},isArray:function(a){return a instanceof Array},trim:function(a){return a.replace(/(^\s+|\s+$)/g,"")}};
rr.collection=function(){function a(){this._keys=[];this._items=[];this._objects={}}a.prototype._keys;a.prototype._items;a.prototype._objects;a.prototype.add=function(a,c){this.exists(a)||(this._keys.push(a),this._items.push(c),this._objects[a]=c)};a.prototype.remove=function(a){if(this.exists(a)){var c=this.index(a);this._keys.splice(c,1);this._items.splice(c,1);delete this._objects[a]}};a.prototype.clear=function(){for(var a;0<this._keys.length;)a=this._keys.length-1,a=this._keys[a],delete this._objects[a],
this._keys.pop(),this._items.pop()};a.prototype.insert=function(a,c,d){if(!(this.exists(c)||0>a)){var e=this._keys.length;if(a>e-1)this.add(c,d);else{var f=this._keys.splice(a,e-a);a=this._items.splice(a,e-a);this._keys.push(c);this._items.push(d);this._keys=this._keys.concat(f);this._items=this._items.concat(a);this._objects[c]=d}}};a.prototype.set=function(a,c){var d;if("string"==typeof a)this.exists(a)&&(d=this.index(a),this._items[d]=c,this._objects[a]=c);else{d=a;var e=this._keys.length;0>d||
d>e-1||(e=this._keys[d],this._items[d]=c,this._objects[e]=c)}};a.prototype.count=function(){return this._keys.length};a.prototype.item=function(a){return"string"==typeof a?this._objects[a]:this._items[a]};a.prototype.index=function(a){for(var c=this._keys,d=c.length;d--;)if(c[d]==a)return d;return-1};a.prototype.key=function(a){return this._keys[a]};a.prototype.exists=function(a){return this._objects.propertyIsEnumerable(a)};a.prototype.dump=function(){var a=this._keys,c=this._items,d,e="";for(d=
0;d<a.length;d++){0<d&&(e+="|");var f=a[d]+"=",g;g=c[d];if("string"!=typeof g)if("object"!=typeof g)g=String(g);else{var h="",k=void 0,l=void 0,m=void 0;for(l in g)k=l.toString(),""!=h&&(h+=";"),m=g[k],h+=k+":"+m;g=h}e+=f+g}return e};return new a};
rr.action={ajaxstore:function(a,b){var c=this,d=0,e=a.length-1,f=function(){d==e?setTimeout(function(){b&&b(a)},10):(d+=1,setTimeout(function(){g(d)},10))},g=function(b){b=a[b];c._ajaxstore_obj=b;c.ajax(b.url,function(a){c._ajaxstore_obj.data=a;f()})};g(d)},discard:function(a){this.remove(a);var b;b=window.__garbageBin;"undefined"===typeof b&&(b=document.createElement("div"),b.style.display="none",document.body.appendChild(b),window.__garbageBin=b);b.appendChild(a);b.innerHTML=""},names:function(a){a=
a||{};var b="",c,d;for(d in a)a.propertyIsEnumerable(d)&&(c=d.toString(),b+=c+",");return b},alert:function(a){a=rr.string.isString(a)?a:JSON.stringify(a);alert(a)},dlg:function(a){(function(a){var c={parentId:"",tag:"div",x:100,y:100,zIndex:99999},c=rr.action.add(c);c.onclick=function(){this.style.display="none"};c={parent:c,tag:"textarea",width:500,height:400};c=rr.action.add(c);rr.action.setValue(c,a)})(a)},isEventSupported:function(a){return function(){var a={select:"input",change:"input",submit:"form",
reset:"form",error:"img",load:"img",abort:"img"};return function(c){var d=document.createElement(a[c]||"div");c="on"+c;var e=c in d;e||(d.setAttribute(c,"return;"),e="function"==typeof d[c]);return e}}()(a)},callback:function(a){var b={fireTime:0},c={},d=function(){b.downTime=0;b.downId=""},e=function(){var a=b.downId;a&&(1500<(new Date).getTime()-b.downTime?(d(),setTimeout(function(){k(a,null,null,"press")},10)):f())},f=function(){setTimeout(function(){e()},100)},g=function(c,d,e){if(!b.downId){var g=
(new Date).getTime();b.downTime=g;b.downId=c;(g=a.mousedown)&&g(c,d,e);f()}},h=function(a,c,e){var f=b.downId;if(f){var g=b.downTime,g=500>(new Date).getTime()-g;d();a==f&&g&&k(a,c,e,"click")}},k=function(c,d,e,f){var g=null;"click"==f?g=a.click:"press"==f&&(g=a.press);f=b.fireTime;var h=(new Date).getTime();500>h-f||(b.fireTime=h,g&&!b.disabled&&(b.disabled=!0,setTimeout(function(){g(c,d,e)},10),setTimeout(function(){b.disabled=!1},500)))};c.touchstart=function(a,b,c){g(a,b,c)};c.touchend=function(a,
b,c){h(a,b,c)};c.touchleave=function(a,b,c){d()};c.touchcancel=function(a,b,c){d()};c.touchmove=function(a,b,c){d()};c.mousedown=function(a,b,c){g(a,b,c)};c.mouseout=function(a,b,c){d()};c.mouseup=function(a,b,c){h(a,b,c)};c.blur=function(b,c,d){var e=a.blur;e&&e(b,c,d)};c.focus=function(b,c,d){var e=a.focus;e&&e(b,c,d)};return c},forEach:function(a,b){for(var c=a.length,d,e=0;e<c;e++)d=a[e],a[e]=b(d,e);return a},each:function(a,b){for(var c=a.length,d,e=0;e<c;e++)d=a[e],b(d,e);return a},scrollTo:function(a,
b){window.scrollTo&&window.scrollTo(a,b)},scrollTop:function(a){a||(a=0);window.documentElement?window.documentElement.scrollTop=a:document.body.scrollTop=a},message:function(a,b){return{_handlers:null,register:function(a,b){this._handlers||(this._handlers={});this._handlers[a]=b},fire:function(a,b,e){var f=this._handlers;return f?(a=f[a])?a(b,e):null:null}}},addScript:function(a,b){var c=this;c._addScript_loaded=!1;var d=function(){e()},e=function(a){if(0<=navigator.userAgent.indexOf("MSIE")&&(a=
c._addScript_element,"complete"!=a.readyState&&"loaded"!=a.readyState)){setTimeout(d,100);return}c._addScript_loaded||(c._addScript_loaded=!0,b&&b())},f=document.getElementsByTagName("head")[0];if(!f)return null;var g=document.createElement("script");if(!g)return null;c._addScript_element=g;b&&(0<=navigator.userAgent.indexOf("MSIE")?g.attachEvent?g.attachEvent("onreadystatechange",e):g.onload&&(g.onload=e):g.onload=e);g.type="text/javascript";g.async=!0;g.src=a;f.appendChild(g);return g},require:function(a,
b){var c=this,d=0,e=a.length-1,f=function(){d==e?setTimeout(function(){b&&b()},10):(d+=1,setTimeout(function(){g(d)},10))},g=function(b){c.addScript(a[b],function(){f()})};g(d)},getStyleRuleValue:function(a,b){for(var c=0;c<document.styleSheets.length;c++){var d=document.styleSheets[c],d=d.cssRules?d.cssRules:d.rules;if(!d)return"";for(var e=0;e<d.length;e++)if(d[e].selectorText&&d[e].selectorText.toLowerCase()===a)return d[e].style[b]}},loadStyleSheet:function(a){if(document.createStyleSheet)try{document.createStyleSheet(a)}catch(b){}else{var c;
c=document.createElement("link");c.rel="stylesheet";c.type="text/css";c.media="all";c.href=a;document.getElementsByTagName("head")[0].appendChild(c)}},addStyleSheet:function(a,b){return rr.string.isArray(b)?this._addStyleSheetByArray(a,b):this._addStyleSheet(a,b)},_addStyleSheetByArray:function(a,b){for(var c=b,d={},e=c.length,f,g,h=0;h<e;h++)f=c[h],g=rr.string.getPartBefore(f,"{"),f=rr.string.getPartAfter(f,"{"),d[g]="{"+f;return rr.action.addStyleSheet(a,d)},_addStyleSheet:function(a,b){var c=document.createElement("style");
document.getElementsByTagName("head")[0].appendChild(c);a&&(c.id=a);if(!window.createPopup)try{c.appendChild(document.createTextNode(""))}catch(d){}c=document.styleSheets[document.styleSheets.length-1];for(selector in b)if(c.insertRule)try{c.insertRule(selector+b[selector],c.cssRules.length)}catch(e){}else try{var f=b[selector];rr.string.contains(f,"}")&&(f=rr.string.getPartBetween(f,"{","}"));c.addRule(selector,f)}catch(g){}return c},isNative:function(){return this._isNative()},_isNative:function(){return window.__native},
_local_ajax:function(a,b){var c=new XMLHttpRequest;c.open("GET",a);c.onreadystatechange=function(){4==c.readyState&&b(c.responseText)};c.send()},ajax:function(a,b){if(rr.string.isString(a)&&rr.string.startWith(a,"chrome"))this._local_ajax(a,b);else{var c=this._isNative()&&rr.string.isString(a);c&&(c=!rr.string.startWith(a,"http"));c?this._local_ajax(a,b):rr.action.ajax_.ajax(a,b)}},vget:function(a,b,c){3>arguments.length&&(c={});if(!rr.string.contains(b,"."))return this._vget(a,b,c);var d,e,f=b.split(".");
e=a;for(var g=0;g<f.length;g++)d=f[g],e=this._vget(e,d,c);return e},_vget:function(a,b,c){return a&&this.has(a,b)?a[b]:c},has:function(a,b){return a.propertyIsEnumerable(b)},exists:function(a,b){return a.propertyIsEnumerable(b)},clone:function(a){if("string"==typeof a||"object"!=typeof a)return a;var b={},c,d,e;for(d in a)c=d.toString(),e=a[c],b[c]="object"==typeof e?this.clone(e):e;return b},stringify:function(a){if("string"==typeof a)return a;if("object"!=typeof a)return String(a);var b="",c,d,
e;for(d in a)c=d.toString(),""!=b&&(b+=","),e=a[c],c='"'+c+'":',e="string"==typeof e?'"'+e+'"':String(e),b+=c+e;return"{"+b+"}"},viewport:function(){var a=function(){if(window.innerWidth)return window.innerWidth;if(document.documentElement&&document.documentElement.clientWidth)return document.documentElement.clientWidth;if(document.body.clientWidth)return document.body.clientWidth}(),b=function(){if(window.innerWidth)return window.innerHeight;if(document.documentElement&&document.documentElement.clientWidth)return document.documentElement.clientHeight;
if(document.body.clientWidth)return document.body.clientHeight}();return{width:a,height:b}},add:function(a){return rr.action.doc_.add(a)},get:function(a){return rr.action.doc_.get(a)},remove:function(a){a=this.get(a);return rr.action.doc_.remove(a)},setValue:function(a,b){var c=this.get(a);return rr.action.doc_.setValue(c,b)},getValue:function(a,b){var c=this.get(a);return rr.action.doc_.getValue(c)},setStyle:function(a,b){var c=this.get(a);rr.action.doc_.setStyle(c,b);return c},setAlpha:function(a,
b){rr.action.doc_.setAlpha(a,b)},setAttr:function(a,b,c){if(3==arguments.length)return this._setAttr(a,b,c);var d=this.get(a);rr.action.doc_.setAttributes(d,b);return d},_setAttr:function(a,b,c){a=this.get(a);if(!a)return null;if(a.setAttribute)a.setAttribute(b,c);else try{a[b]=c}catch(d){}},getAttr:function(a,b){var c=this.get(a);if(!c)return null;if(c.getAttribute)return c.getAttribute(b);try{return c[b]}catch(d){return null}},setClass:function(a,b){var c=this.get(a);rr.action.doc_.setClass(c,b);
return c},addClass:function(a,b){var c=this.get(a),d=c.className;c.className=d+(" "+b)},removeClass:function(a,b){var c=this.get(a),d=c.className,d=d.replace(new RegExp("\b"+b+"\b"),"");c.className=d},toPx:function(a){var b;b=rr.string.toLower(""+a);if(rr.string.isNumeric(b))return rr.string.toInt(b);a="px";if(rr.string.contains(b,a))return b=rr.string.replace(b,a,""),rr.string.toInt(b);a=rr.string.contains(b,"%")?"%":"em";rr.string.contains(b,a)&&(b=rr.string.replace(b,a,""));b=rr.string.toFloat(b);
return Math.round(("em"==a?16:.16)*b)},toEm:function(a){var b=""+a;a=rr.string.contains(b,"%")?"%":"px";rr.string.contains(b,a)&&(b=rr.string.replace(b,a,""));b=rr.string.toFloat(b);return("px"==a?.0625:.01)*b},getX:function(a){a=this.get(a);return rr.action.doc_.getX(a)},getY:function(a){a=this.get(a);return rr.action.doc_.getY(a)},getW:function(a){a=this.get(a);return rr.action.doc_.getW(a)},getH:function(a){a=this.get(a);return rr.action.doc_.getH(a)},setX:function(a,b){var c=this.get(a);rr.action.doc_.setLeft(c,
b)},setY:function(a,b){var c=this.get(a);rr.action.doc_.setTop(c,b)},setW:function(a,b){var c=this.get(a);rr.action.doc_.setWidth(c,b)},setH:function(a,b){var c=this.get(a);rr.action.doc_.setHeight(c,b)},setInlineBlockVisible:function(a,b){var c=this.get(a);c&&c.style&&(c.style.display=b?"inline-block":"none")},getInlineBlockVisible:function(a){return(a=this.get(a))&&a.style?"inline-block"==a.style.display:!1},setBlockVisible:function(a,b){var c=this.get(a);c&&c.style&&(c.style.display=b?"block":
"none")},getBlockVisible:function(a){return(a=this.get(a))&&a.style?"block"==a.style.display:!1},setInlineVisible:function(a,b){var c=this.get(a);c&&c.style&&(c.style.display=b?"inline":"none")},getInlineVisible:function(a){return(a=this.get(a))&&a.style?"inline"==a.style.display:!1},setVisible:function(a,b){var c=this.get(a);c&&c.style&&(c.style.visibility=b?"visible":"hidden")},getVisible:function(a){return(a=this.get(a))&&a.style?"visible"==a.style.visibility:!1},removeListener:function(a,b,c){a=
this.get(a);a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent("on"+b,c):a["on"+b]=null},addListener:function(a,b,c,d){(a=this.get(a))&&this._addEventListener(a,b,c,d)},listen:function(a,b,c,d){(b=this.get(b))&&this._listenEvents(a,b,c,d)},_listenEvents:function(a,b,c,d){var e,f,g;for(f in c)e=f.toString(),(g=c[e])&&this._attachElementEvent(a,b,e,g,d)},_attachElementEvent:function(a,b,c,d,e){this._addEventListener(b,c,function(c){return d(a,b,c)},e)},_addEventListener:function(a,
b,c,d){a.addEventListener?a.addEventListener(b,c,d?!0:!1):a.attachEvent&&a.attachEvent("on"+b,c)}};
rr.action.doc_={get:function(a){return rr.string.isString(a)?document.getElementById(a):a},getTagName:function(a){return a?(a=a.tagName)?rr.string.toLower(a):"":""},getType:function(a){return a=(a=a.type)?rr.string.toLower(a):""},_getValueKey:function(a){switch(a){case "img":return"src";case "input":return"value";case "textarea":return"value";default:return"innerHTML"}},setValue:function(a,b){var c=this.getTagName(a);this._setValue(c,a,b)},_setValue:function(a,b,c){if(b)try{var d=b.type;if(d)switch(d=
rr.string.toLower(d),d){case "checkbox":b.checked=rr.string.toBool(c);return;case "radio":b.checked=rr.string.toBool(c);return}var e=this._getValueKey(a);b[e]=c}catch(f){}},getValue:function(a){if(!a)return"";var b=this.getTagName(a),b=this._getValueKey(b);return a[b]},remove:function(a){if(a)try{var b=a.parentNode;b&&b.removeChild(a)}catch(c){}},_toFuncKey:function(a){a=rr.string.toLower(a);a=a.split("-");var b=a.length,c,d,e="";for(c=0;c<b;c++)d=a[c],e=0<c?e+this._toFuncPart(d):e+d;return e},_toFuncPart:function(a){var b=
rr.string.getLeft(a,1);a=rr.string.chopLeft(a,1);return a=rr.string.toUpper(b)+a},_setFuncProperty:function(a,b,c){try{a.style[b]=c}catch(d){}},_getFuncProperty:function(a,b){try{return a.style[b]}catch(c){return null}},_setStyleProperty:function(a,b,c){b=this._toFuncKey(b);this._setFuncProperty(a,b,c)},setStyle:function(a,b){if(a&&b){var c=b.split(";"),d=c.length,e,f,g;for(e=0;e<d;e++)f=c[e],g=rr.string.getPartBefore(f,":"),f=rr.string.getPartAfter(f,":"),g=rr.string.trim(g),f=rr.string.trim(f),
g&&this._setStyleProperty(a,g,f);return a}},setAttributes:function(a,b){if(a&&b){var c=b.split(";"),d=c.length,e,f,g;for(e=0;e<d;e++)f=c[e],g=rr.string.getPartBefore(f,"="),f=rr.string.getPartAfter(f,"="),g=rr.string.trim(g),f=rr.string.trim(f),g&&this.setAttr(a,g,f)}},setAttr:function(a,b,c){if(a.setAttribute)a.setAttribute(b,c);else try{return a[b]=c}catch(d){}},setClass:function(a,b){if(a&&b)try{a.className=b}catch(c){}},getW:function(a){return a?a.offsetWidth:-1},getH:function(a){return a?a.offsetHeight:
-1},getX:function(a){if(!a)return-1;for(var b=0;a;)b+=a.offsetLeft,a=a.offsetParent;return b},getY:function(a){var b=document;if(!a)return-1;var c=0,d;for(d=a;d;d=d.offsetParent)c+=d.offsetTop;for(d=a.parentNode;d&&d!=b.body;d=d.parentNode)d.scrollTop&&(c-=d.scrollTop);return c},_toPx:function(a){a=""+a;rr.string.isNumeric(a)&&(a+="px");return a},setLeft:function(a,b){b=this._toPx(b);this._setStyle(a,"left",b)},setTop:function(a,b){b=this._toPx(b);this._setStyle(a,"top",b)},setWidth:function(a,b){b=
this._toPx(b);this._setStyle(a,"width",b)},setHeight:function(a,b){b=this._toPx(b);this._setStyle(a,"height",b)},setAlpha:function(a,b){var c=this._getTransparentStyle(b);this.setStyle(a,c)},_setStyle:function(a,b,c){if(a&&a.style)try{a.style[b]=c}catch(d){}},_getTransparentStyle:function(a){a||(a=0);1<a&&(a=1);var b=1-a;a=100*b;b=rr.string.replacePlace(";filter:alpha(opacity=%opacity2%);-moz-opacity:%opacity%;opacity:%opacity%;","opacity",b);return b=rr.string.replacePlace(b,"opacity2",a)},add:function(a){var b=
this,c=function(a){a=""+a;return rr.string.isNumeric(a)?a+"px":a},d=function(a){var b=a.tag;b||(b="div");var c=null;try{return c=document.createElement(b),a.id&&(c.id=a.id),c}catch(d){return null}};a.id||(a.id="");a.style||(a.style="");a.tag||(a.tag="div");if(!rr.string.contains(a.style,"position:")&&a.propertyIsEnumerable("x")){var e=";position:absolute;";rr.string.contains(a.style,"overflow")||(e+=";overflow:hidden;");a.style+=e}if(a.borderRadius){for(var e=a.borderRadius.split(" "),f="",g=e.length,
h=0;h<g;h++)f&&(f+=" "),f+=""+e[h]+"px";e=rr.string.replacePlace(";-moz-border-radius:%v%;border-radius:%v%;","v",f);a.style+=e}d=a.meElement?a.meElement:d(a);if(!d)return null;(function(a,b){var c=null;b.parent?c=b.parent:b.parentId?c=document.getElementById(b.parentId):b.propertyIsEnumerable("parentId")&&""==b.parentId&&(c=document.body);c&&c.appendChild(a)})(d,a);(function(a,d){var e="";d.propertyIsEnumerable("style")&&(e=d.style);d.propertyIsEnumerable("width")&&(d.w=d.width);d.propertyIsEnumerable("height")&&
(d.h=d.height);d.propertyIsEnumerable("w")&&(e+=";width:"+c(d.w));d.propertyIsEnumerable("h")&&(e+=";height:"+c(d.h));d.propertyIsEnumerable("x")&&(e+=";left:"+c(d.x));d.propertyIsEnumerable("y")&&(e+=";top:"+c(d.y));d.propertyIsEnumerable("zIndex")&&(e+=";z-index:"+d.zIndex);d.propertyIsEnumerable("alpha")&&(e+=b._getTransparentStyle(d.alpha));b.setStyle(a,e);d.propertyIsEnumerable("attr")&&b.setAttributes(a,d.attr);d.propertyIsEnumerable("class")&&b.setClass(a,d["class"]);d.propertyIsEnumerable("className")&&
b.setClass(a,d.className);if(d.propertyIsEnumerable("type"))try{a.type=d.type}catch(f){return null}d.propertyIsEnumerable("data")&&b.setValue(a,d.data)})(d,a);return d}};
rr.action.ajax_={ajax:function(a,b){"string"==typeof a&&(a={url:a});var c=a.post?"POST":"GET",d=a.data;d||(d="");this._serverRequest(c,a,function(a,c){var d="";a&&(d=a);b(d,c)})},_serverRequest:function(a,b,c){var d;try{if(d=this._createXMLHttpRequest(),null==d)return!1}catch(e){}var f=function(){try{if(4==d.readyState)if(200==d.status){var a=d.responseText,b={req:d};c&&c(a,b,"")}else b={status:d.status,responseText:d.responseText,req:d},c&&c("",b,"")}catch(e){}};try{var g=b.url,h=b.data;d.onreadystatechange=
f;d.open(a,g,!0);d.setRequestHeader("Cache-Control","no-cache");if(b.requestHeaders){var k=b.requestHeaders,l=k.count();for(a=0;a<l;a++){var m=k.key(a),n=k.item(m);m&&n&&d.setRequestHeader(m,n)}}b.onprogress&&(d.onprogress=b.onprogress);b.onload&&(d.onload=b.onload);b.onerror&&(d.onerror=b.onerror);b.timeout&&(d.timeout=b.timeout);b.ontimeout&&(d.ontimeout=b.ontimeout);b.responseType&&(d.responseType=b.responseType);d.send(h)}catch(p){c&&c("","","")}return!0},_createXMLHttpRequest:function(){var a;
a=null;if(window.XMLHttpRequest)try{a=new XMLHttpRequest}catch(b){a=null}else if(window.ActiveXObject)try{a=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){try{a=new ActiveXObject("Microsoft.XMLHTTP")}catch(d){a=null}}return a}};rr.action.util={isIE:function(){return 0<=navigator.userAgent.indexOf("MSIE")?!0:!1},isEnterKey:function(a){var b=window,c;c=0<=navigator.userAgent.indexOf("MSIE")?!0:!1;return c?13==b.event.keyCode:a?13==(a.which?a.which:a.keyCode):!1}};
var skyheyForm={_url:"",_data:"",_parseResult:function(a){var b=rr.string.xmlContains(a,"ok"),c=rr.string.xmlGet(a,"ok"),d=(c=rr.string.toBool(c))?rr.string.xmlGet(a,"data"):"";return{ok:c,validSession:b,data:d,result:a}},_next:function(){var a=this;setTimeout(function(){a._checkFilledPdf()},3E3)},_processPdfReady:function(){if(this._handler){var a=this._formName,a={success:!0,url:rr.string.xmlGet(this._data,"downloadUrl"),formName:a};this._handler(a)}},_errorExit:function(){this._handler&&this._handler({success:!1})},
_checkFilledPdf:function(){var a=this,b=a._url,c=rr.string.xmlGet(a._data,"downloadSession"),d=rr.string.xmlMakeTag("cmd","checkFilledPdf"),d=d+rr.string.xmlMakeTag("downloadSession",c);rr.action.ajax({url:b,post:!0,data:d},function(b){b=a._parseResult(b);b.validSession?b.validSession&&b.ok&&(b=rr.string.xmlGet(b.data,"exist"),rr.string.toBool(b)?a._processPdfReady():a._next()):a._errorExit()})},generateFilledPdf:function(a,b){var c=this,d=a.url,e=a.formId,f=a.formName,g=a.formData;rr.string.isObject(g)&&
(g=JSON.stringify(g));c._url=d;c._formName=f;c._handler=b;var h=rr.string.xmlMakeTag("cmd","generateFilledPdf"),h=h+rr.string.xmlMakeTag("workbookId","1"),h=h+rr.string.xmlMakeTag("sheetId",e),h=h+rr.string.xmlMakeTag("name",f),h=h+rr.string.xmlMakeTag("formData",g);rr.action.ajax({url:d,post:!0,data:h},function(a){a=c._parseResult(a);a.ok?(c._data=a.result,c._next()):c._errorExit()})}};