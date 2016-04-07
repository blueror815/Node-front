function registerTextAngularTool(e,t){if(!e||""===e||taTools.hasOwnProperty(e))throw"textAngular Error: A unique name is required for a Tool Definition";if(t.display&&(""===t.display||!validElementString(t.display))||!t.display&&!t.buttontext&&!t.iconclass)throw'textAngular Error: Tool Definition for "'+e+'" does not have a valid display/iconclass/buttontext value';taTools[e]=t}var dropFired=!1,textAngular=angular.module("textAngular",["ngSanitize","textAngularSetup","textAngular.factories","textAngular.DOM","textAngular.validators","textAngular.taBind"]),taTools={};textAngular.constant("taRegisterTool",registerTextAngularTool),textAngular.value("taTools",taTools),textAngular.config([function(){angular.forEach(taTools,function(e,t){delete taTools[t]})}]),textAngular.run([function(){if(!window.rangy)throw"rangy-core.js and rangy-selectionsaverestore.js are required for textAngular to work correctly, rangy-core is not yet loaded.";if(window.rangy.init(),!window.rangy.saveSelection)throw"rangy-selectionsaverestore.js is required for textAngular to work correctly."}]),textAngular.directive("textAngular",["$compile","$timeout","taOptions","taSelection","taExecCommand","textAngularManager","$window","$document","$animate","$log","$q","$parse",function(e,t,a,l,o,n,r,s,i,d,u,c){return{require:"?ngModel",scope:{},restrict:"EA",priority:2,link:function(p,m,f,y){var h,g,v,E,b,x,T,w,S,A,$,C=f.serial?f.serial:Math.floor(1e16*Math.random());p._name=f.name?f.name:"textAngularEditor"+C;var H=function(e,a,l){t(function(){var t=function(){e.off(a,t),l.apply(this,arguments)};e.on(a,t)},100)};if(S=o(f.taDefaultWrap),angular.extend(p,angular.copy(a),{wrapSelection:function(e,t,a){"undo"===e.toLowerCase()?p["$undoTaBindtaTextElement"+C]():"redo"===e.toLowerCase()?p["$redoTaBindtaTextElement"+C]():(S(e,!1,t,p.defaultTagAttributes),a&&p["reApplyOnSelectorHandlerstaTextElement"+C](),p.displayElements.text[0].focus())},showHtml:p.$eval(f.taShowHtml)||!1}),f.taFocussedClass&&(p.classes.focussed=f.taFocussedClass),f.taTextEditorClass&&(p.classes.textEditor=f.taTextEditorClass),f.taHtmlEditorClass&&(p.classes.htmlEditor=f.taHtmlEditorClass),f.taDefaultTagAttributes)try{angular.extend(p.defaultTagAttributes,angular.fromJson(f.taDefaultTagAttributes))}catch(D){d.error(D)}f.taTextEditorSetup&&(p.setup.textEditorSetup=p.$parent.$eval(f.taTextEditorSetup)),f.taHtmlEditorSetup&&(p.setup.htmlEditorSetup=p.$parent.$eval(f.taHtmlEditorSetup)),f.taFileDrop?p.fileDropHandler=p.$parent.$eval(f.taFileDrop):p.fileDropHandler=p.defaultFileDropHandler,T=m[0].innerHTML,m[0].innerHTML="",p.displayElements={forminput:angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),html:angular.element("<textarea></textarea>"),text:angular.element("<div></div>"),scrollWindow:angular.element("<div class='ta-scroll-window'></div>"),popover:angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),popoverArrow:angular.element('<div class="arrow"></div>'),popoverContainer:angular.element('<div class="popover-content"></div>'),resize:{overlay:angular.element('<div class="ta-resizer-handle-overlay"></div>'),background:angular.element('<div class="ta-resizer-handle-background"></div>'),anchors:[angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],info:angular.element('<div class="ta-resizer-handle-info"></div>')}},p.displayElements.popover.append(p.displayElements.popoverArrow),p.displayElements.popover.append(p.displayElements.popoverContainer),p.displayElements.scrollWindow.append(p.displayElements.popover),p.displayElements.popover.on("mousedown",function(e,t){return t&&angular.extend(e,t),e.preventDefault(),!1}),p.showPopover=function(e){p.displayElements.popover.css("display","block"),p.reflowPopover(e),i.addClass(p.displayElements.popover,"in"),H(s.find("body"),"click keyup",function(){p.hidePopover()})},p.reflowPopover=function(e){p.displayElements.text[0].offsetHeight-51>e[0].offsetTop?(p.displayElements.popover.css("top",e[0].offsetTop+e[0].offsetHeight+p.displayElements.scrollWindow[0].scrollTop+"px"),p.displayElements.popover.removeClass("top").addClass("bottom")):(p.displayElements.popover.css("top",e[0].offsetTop-54+p.displayElements.scrollWindow[0].scrollTop+"px"),p.displayElements.popover.removeClass("bottom").addClass("top"));var t=p.displayElements.text[0].offsetWidth-p.displayElements.popover[0].offsetWidth,a=e[0].offsetLeft+e[0].offsetWidth/2-p.displayElements.popover[0].offsetWidth/2;p.displayElements.popover.css("left",Math.max(0,Math.min(t,a))+"px"),p.displayElements.popoverArrow.css("margin-left",Math.min(a,Math.max(0,a-t))-11+"px")},p.hidePopover=function(){var e=function(){p.displayElements.popover.css("display",""),p.displayElements.popoverContainer.attr("style",""),p.displayElements.popoverContainer.attr("class","popover-content")};u.when(i.removeClass(p.displayElements.popover,"in",e)).then(e)},p.displayElements.resize.overlay.append(p.displayElements.resize.background),angular.forEach(p.displayElements.resize.anchors,function(e){p.displayElements.resize.overlay.append(e)}),p.displayElements.resize.overlay.append(p.displayElements.resize.info),p.displayElements.scrollWindow.append(p.displayElements.resize.overlay),p.reflowResizeOverlay=function(e){e=angular.element(e)[0],p.displayElements.resize.overlay.css({display:"block",left:e.offsetLeft-5+"px",top:e.offsetTop-5+"px",width:e.offsetWidth+10+"px",height:e.offsetHeight+10+"px"}),p.displayElements.resize.info.text(e.offsetWidth+" x "+e.offsetHeight)},p.showResizeOverlay=function(e){var t=s.find("body");A=function(a){var l={width:parseInt(e.attr("width")),height:parseInt(e.attr("height")),x:a.clientX,y:a.clientY};(void 0===l.width||isNaN(l.width))&&(l.width=e[0].offsetWidth),(void 0===l.height||isNaN(l.height))&&(l.height=e[0].offsetHeight),p.hidePopover();var o=l.height/l.width,n=function(t){var a={x:Math.max(0,l.width+(t.clientX-l.x)),y:Math.max(0,l.height+(t.clientY-l.y))};if(t.shiftKey){var n=a.y/a.x;a.x=o>n?a.x:a.y/o,a.y=o>n?a.x*o:a.y}var r=angular.element(e);r.attr("height",Math.max(0,a.y)),r.attr("width",Math.max(0,a.x)),p.reflowResizeOverlay(e)};t.on("mousemove",n),H(t,"mouseup",function(a){a.preventDefault(),a.stopPropagation(),t.off("mousemove",n),p.showPopover(e)}),a.stopPropagation(),a.preventDefault()},p.displayElements.resize.anchors[3].on("mousedown",A),p.reflowResizeOverlay(e),H(t,"click",function(){p.hideResizeOverlay()})},p.hideResizeOverlay=function(){p.displayElements.resize.anchors[3].off("mousedown",A),p.displayElements.resize.overlay.css("display","")},p.setup.htmlEditorSetup(p.displayElements.html),p.setup.textEditorSetup(p.displayElements.text),p.displayElements.html.attr({id:"taHtmlElement"+C,"ng-show":"showHtml","ta-bind":"ta-bind","ng-model":"html","ng-model-options":m.attr("ng-model-options")}),p.displayElements.text.attr({id:"taTextElement"+C,contentEditable:"true","ta-bind":"ta-bind","ng-model":"html","ng-model-options":m.attr("ng-model-options")}),p.displayElements.scrollWindow.attr({"ng-hide":"showHtml"}),f.taDefaultWrap&&p.displayElements.text.attr("ta-default-wrap",f.taDefaultWrap),f.taUnsafeSanitizer&&(p.displayElements.text.attr("ta-unsafe-sanitizer",f.taUnsafeSanitizer),p.displayElements.html.attr("ta-unsafe-sanitizer",f.taUnsafeSanitizer)),p.displayElements.scrollWindow.append(p.displayElements.text),m.append(p.displayElements.scrollWindow),m.append(p.displayElements.html),p.displayElements.forminput.attr("name",p._name),m.append(p.displayElements.forminput),f.tabindex&&(m.removeAttr("tabindex"),p.displayElements.text.attr("tabindex",f.tabindex),p.displayElements.html.attr("tabindex",f.tabindex)),f.placeholder&&(p.displayElements.text.attr("placeholder",f.placeholder),p.displayElements.html.attr("placeholder",f.placeholder)),f.taDisabled&&(p.displayElements.text.attr("ta-readonly","disabled"),p.displayElements.html.attr("ta-readonly","disabled"),p.disabled=p.$parent.$eval(f.taDisabled),p.$parent.$watch(f.taDisabled,function(e){p.disabled=e,p.disabled?m.addClass(p.classes.disabled):m.removeClass(p.classes.disabled)})),f.taPaste&&(p._pasteHandler=function(e){return c(f.taPaste)(p.$parent,{$html:e})},p.displayElements.text.attr("ta-paste","_pasteHandler($html)")),e(p.displayElements.scrollWindow)(p),e(p.displayElements.html)(p),p.updateTaBindtaTextElement=p["updateTaBindtaTextElement"+C],p.updateTaBindtaHtmlElement=p["updateTaBindtaHtmlElement"+C],m.addClass("ta-root"),p.displayElements.scrollWindow.addClass("ta-text ta-editor "+p.classes.textEditor),p.displayElements.html.addClass("ta-html ta-editor "+p.classes.htmlEditor),p._actionRunning=!1;var z=!1;if(p.startAction=function(){return p._actionRunning=!0,z=r.rangy.saveSelection(),function(){z&&r.rangy.restoreSelection(z)}},p.endAction=function(){p._actionRunning=!1,z&&(p.showHtml?p.displayElements.html[0].focus():p.displayElements.text[0].focus(),r.rangy.restoreSelection(z),r.rangy.removeMarkers(z)),z=!1,p.updateSelectedStyles(),p.showHtml||p["updateTaBindtaTextElement"+C]()},b=function(){p.focussed=!0,m.addClass(p.classes.focussed),w.focus(),m.triggerHandler("focus")},p.displayElements.html.on("focus",b),p.displayElements.text.on("focus",b),x=function(e){return p._actionRunning||s[0].activeElement===p.displayElements.html[0]||s[0].activeElement===p.displayElements.text[0]||(m.removeClass(p.classes.focussed),w.unfocus(),t(function(){p._bUpdateSelectedStyles=!1,m.triggerHandler("blur"),p.focussed=!1},0)),e.preventDefault(),!1},p.displayElements.html.on("blur",x),p.displayElements.text.on("blur",x),p.displayElements.text.on("paste",function(e){m.triggerHandler("paste",e)}),p.queryFormatBlockState=function(e){return!p.showHtml&&e.toLowerCase()===s[0].queryCommandValue("formatBlock").toLowerCase()},p.queryCommandState=function(e){return p.showHtml?"":s[0].queryCommandState(e)},p.switchView=function(){p.showHtml=!p.showHtml,i.enabled(!1,p.displayElements.html),i.enabled(!1,p.displayElements.text),p.showHtml?t(function(){return i.enabled(!0,p.displayElements.html),i.enabled(!0,p.displayElements.text),p.displayElements.html[0].focus()},100):t(function(){return i.enabled(!0,p.displayElements.html),i.enabled(!0,p.displayElements.text),p.displayElements.text[0].focus()},100)},f.ngModel){var _=!0;y.$render=function(){if(_){_=!1;var e=p.$parent.$eval(f.ngModel);void 0!==e&&null!==e||!T||""===T||y.$setViewValue(T)}p.displayElements.forminput.val(y.$viewValue),p.html=y.$viewValue||""},m.attr("required")&&(y.$validators.required=function(e,t){var a=e||t;return!(!a||""===a.trim())})}else p.displayElements.forminput.val(T),p.html=T;if(p.$watch("html",function(e,t){e!==t&&(f.ngModel&&y.$viewValue!==e&&y.$setViewValue(e),p.displayElements.forminput.val(e))}),f.taTargetToolbars)w=n.registerEditor(p._name,p,f.taTargetToolbars.split(","));else{var W=angular.element('<div text-angular-toolbar name="textAngularToolbar'+C+'">');f.taToolbar&&W.attr("ta-toolbar",f.taToolbar),f.taToolbarClass&&W.attr("ta-toolbar-class",f.taToolbarClass),f.taToolbarGroupClass&&W.attr("ta-toolbar-group-class",f.taToolbarGroupClass),f.taToolbarButtonClass&&W.attr("ta-toolbar-button-class",f.taToolbarButtonClass),f.taToolbarActiveButtonClass&&W.attr("ta-toolbar-active-button-class",f.taToolbarActiveButtonClass),f.taFocussedClass&&W.attr("ta-focussed-class",f.taFocussedClass),m.prepend(W),e(W)(p.$parent),w=n.registerEditor(p._name,p,["textAngularToolbar"+C])}p.$on("$destroy",function(){n.unregisterEditor(p._name)}),p.$on("ta-element-select",function(e,t){w.triggerElementSelect(e,t)&&p["reApplyOnSelectorHandlerstaTextElement"+C]()}),p.$on("ta-drop-event",function(e,a,l,o){p.displayElements.text[0].focus(),o&&o.files&&o.files.length>0?(angular.forEach(o.files,function(e){try{u.when(p.fileDropHandler(e,p.wrapSelection)||p.fileDropHandler!==p.defaultFileDropHandler&&u.when(p.defaultFileDropHandler(e,p.wrapSelection))).then(function(){p["updateTaBindtaTextElement"+C]()})}catch(t){d.error(t)}}),l.preventDefault(),l.stopPropagation()):t(function(){p["updateTaBindtaTextElement"+C]()},0)}),p._bUpdateSelectedStyles=!1,angular.element(window).on("blur",function(){p._bUpdateSelectedStyles=!1,p.focussed=!1}),p.updateSelectedStyles=function(){var e;$&&t.cancel($),void 0!==(e=l.getSelectionElement())&&e.parentNode!==p.displayElements.text[0]?w.updateSelectedStyles(angular.element(e)):w.updateSelectedStyles(),p._bUpdateSelectedStyles&&($=t(p.updateSelectedStyles,200))},h=function(){return p.focussed?void(p._bUpdateSelectedStyles||(p._bUpdateSelectedStyles=!0,p.$apply(function(){p.updateSelectedStyles()}))):void(p._bUpdateSelectedStyles=!1)},p.displayElements.html.on("keydown",h),p.displayElements.text.on("keydown",h),g=function(){p._bUpdateSelectedStyles=!1},p.displayElements.html.on("keyup",g),p.displayElements.text.on("keyup",g),v=function(e,t){t&&angular.extend(e,t),p.$apply(function(){return w.sendKeyCommand(e)?(p._bUpdateSelectedStyles||p.updateSelectedStyles(),e.preventDefault(),!1):void 0})},p.displayElements.html.on("keypress",v),p.displayElements.text.on("keypress",v),E=function(){p._bUpdateSelectedStyles=!1,p.$apply(function(){p.updateSelectedStyles()})},p.displayElements.html.on("mouseup",E),p.displayElements.text.on("mouseup",E)}}}]),textAngular.service("textAngularManager",["taToolExecuteAction","taTools","taRegisterTool",function(e,t,a){var l={},o={};return{registerEditor:function(a,n,r){if(!a||""===a)throw"textAngular Error: An editor requires a name";if(!n)throw"textAngular Error: An editor requires a scope";if(o[a])throw'textAngular Error: An Editor with name "'+a+'" already exists';var s=[];return angular.forEach(r,function(e){l[e]&&s.push(l[e])}),o[a]={scope:n,toolbars:r,_registerToolbar:function(e){this.toolbars.indexOf(e.name)>=0&&s.push(e)},editorFunctions:{disable:function(){angular.forEach(s,function(e){e.disabled=!0})},enable:function(){angular.forEach(s,function(e){e.disabled=!1})},focus:function(){angular.forEach(s,function(e){e._parent=n,e.disabled=!1,e.focussed=!0,n.focussed=!0})},unfocus:function(){angular.forEach(s,function(e){e.disabled=!0,e.focussed=!1}),n.focussed=!1},updateSelectedStyles:function(e){angular.forEach(s,function(t){angular.forEach(t.tools,function(a){a.activeState&&(t._parent=n,a.active=a.activeState(e))})})},sendKeyCommand:function(a){var l=!1;return(a.ctrlKey||a.metaKey)&&angular.forEach(t,function(t,o){if(t.commandKeyCode&&t.commandKeyCode===a.which)for(var r=0;r<s.length;r++)if(void 0!==s[r].tools[o]){e.call(s[r].tools[o],n),l=!0;break}}),l},triggerElementSelect:function(e,a){var l=function(e,t){for(var a=!0,l=0;l<t.length;l++)a=a&&e.attr(t[l]);return a},o=[],r={},i=!1;a=angular.element(a);var d=!1;if(angular.forEach(t,function(e,t){e.onElementSelect&&e.onElementSelect.element&&e.onElementSelect.element.toLowerCase()===a[0].tagName.toLowerCase()&&(!e.onElementSelect.filter||e.onElementSelect.filter(a))&&(d=d||angular.isArray(e.onElementSelect.onlyWithAttrs)&&l(a,e.onElementSelect.onlyWithAttrs),e.onElementSelect.onlyWithAttrs&&!l(a,e.onElementSelect.onlyWithAttrs)||(r[t]=e))}),d?(angular.forEach(r,function(e,t){e.onElementSelect.onlyWithAttrs&&l(a,e.onElementSelect.onlyWithAttrs)&&o.push({name:t,tool:e})}),o.sort(function(e,t){return t.tool.onElementSelect.onlyWithAttrs.length-e.tool.onElementSelect.onlyWithAttrs.length})):angular.forEach(r,function(e,t){o.push({name:t,tool:e})}),o.length>0)for(var u=0;u<o.length;u++){for(var c=o[u].tool,p=o[u].name,m=0;m<s.length;m++)if(void 0!==s[m].tools[p]){c.onElementSelect.action.call(s[m].tools[p],e,a,n),i=!0;break}if(i)break}return i}}},o[a].editorFunctions},retrieveEditor:function(e){return o[e]},unregisterEditor:function(e){delete o[e]},registerToolbar:function(e){if(!e)throw"textAngular Error: A toolbar requires a scope";if(!e.name||""===e.name)throw"textAngular Error: A toolbar requires a name";if(l[e.name])throw'textAngular Error: A toolbar with name "'+e.name+'" already exists';l[e.name]=e,angular.forEach(o,function(t){t._registerToolbar(e)})},retrieveToolbar:function(e){return l[e]},retrieveToolbarsViaEditor:function(e){var t=[],a=this;return angular.forEach(this.retrieveEditor(e).toolbars,function(e){t.push(a.retrieveToolbar(e))}),t},unregisterToolbar:function(e){delete l[e]},updateToolsDisplay:function(e){var t=this;angular.forEach(e,function(e,a){t.updateToolDisplay(a,e)})},resetToolsDisplay:function(){var e=this;angular.forEach(t,function(t,a){e.resetToolDisplay(a)})},updateToolDisplay:function(e,t){var a=this;angular.forEach(l,function(l,o){a.updateToolbarToolDisplay(o,e,t)})},resetToolDisplay:function(e){var t=this;angular.forEach(l,function(a,l){t.resetToolbarToolDisplay(l,e)})},updateToolbarToolDisplay:function(e,t,a){if(!l[e])throw'textAngular Error: No Toolbar with name "'+e+'" exists';l[e].updateToolDisplay(t,a)},resetToolbarToolDisplay:function(e,a){if(!l[e])throw'textAngular Error: No Toolbar with name "'+e+'" exists';l[e].updateToolDisplay(a,t[a],!0)},removeTool:function(e){delete t[e],angular.forEach(l,function(t){delete t.tools[e];for(var a=0;a<t.toolbar.length;a++){for(var l,o=0;o<t.toolbar[a].length;o++){if(t.toolbar[a][o]===e){l={group:a,index:o};break}if(void 0!==l)break}void 0!==l&&(t.toolbar[l.group].slice(l.index,1),t._$element.children().eq(l.group).children().eq(l.index).remove())}})},addTool:function(e,t,o,n){a(e,t),angular.forEach(l,function(a){a.addTool(e,t,o,n)})},addToolToToolbar:function(e,t,o,n,r){a(e,t),l[o].addTool(e,t,n,r)},refreshEditor:function(e){if(!o[e])throw'textAngular Error: No Editor with name "'+e+'" exists';o[e].scope.updateTaBindtaTextElement(),o[e].scope.$$phase||o[e].scope.$digest()}}}]),textAngular.directive("textAngularToolbar",["$compile","textAngularManager","taOptions","taTools","taToolExecuteAction","$window",function(e,t,a,l,o,n){return{scope:{name:"@"},restrict:"EA",link:function(r,s,i){if(!r.name||""===r.name)throw"textAngular Error: A toolbar requires a name";angular.extend(r,angular.copy(a)),i.taToolbar&&(r.toolbar=r.$parent.$eval(i.taToolbar)),i.taToolbarClass&&(r.classes.toolbar=i.taToolbarClass),i.taToolbarGroupClass&&(r.classes.toolbarGroup=i.taToolbarGroupClass),i.taToolbarButtonClass&&(r.classes.toolbarButton=i.taToolbarButtonClass),i.taToolbarActiveButtonClass&&(r.classes.toolbarButtonActive=i.taToolbarActiveButtonClass),i.taFocussedClass&&(r.classes.focussed=i.taFocussedClass),r.disabled=!0,r.focussed=!1,r._$element=s,s[0].innerHTML="",s.addClass("ta-toolbar "+r.classes.toolbar),r.$watch("focussed",function(){r.focussed?s.addClass(r.classes.focussed):s.removeClass(r.classes.focussed)});var d=function(t,a){var l;if(l=t&&t.display?angular.element(t.display):angular.element("<button type='button'>"),t&&t["class"]?l.addClass(t["class"]):l.addClass(r.classes.toolbarButton),l.attr("name",a.name),l.attr("ta-button","ta-button"),l.attr("ng-disabled","isDisabled()"),l.attr("tabindex","-1"),l.attr("ng-click","executeAction()"),l.attr("ng-class","displayActiveToolClass(active)"),t&&t.tooltiptext&&l.attr("title",t.tooltiptext),t&&!t.display&&!a._display&&(l[0].innerHTML="",t.buttontext&&(l[0].innerHTML=t.buttontext),t.iconclass)){var o=angular.element("<i>"),n=l[0].innerHTML;o.addClass(t.iconclass),l[0].innerHTML="",l.append(o),n&&""!==n&&l.append("&nbsp;"+n)}return a._lastToolDefinition=angular.copy(t),e(l)(a)};r.tools={},r._parent={disabled:!0,showHtml:!1,queryFormatBlockState:function(){return!1},queryCommandState:function(){return!1}};var u={$window:n,$editor:function(){return r._parent},isDisabled:function(){return"function"!=typeof this.$eval("disabled")&&this.$eval("disabled")||this.$eval("disabled()")||"html"!==this.name&&this.$editor().showHtml||this.$parent.disabled||this.$editor().disabled},displayActiveToolClass:function(e){return e?r.classes.toolbarButtonActive:""},executeAction:o};angular.forEach(r.toolbar,function(e){var t=angular.element("<div>");t.addClass(r.classes.toolbarGroup),angular.forEach(e,function(e){r.tools[e]=angular.extend(r.$new(!0),l[e],u,{name:e}),r.tools[e].$element=d(l[e],r.tools[e]),t.append(r.tools[e].$element)}),s.append(t)}),r.updateToolDisplay=function(e,t,a){var l=r.tools[e];if(l){if(l._lastToolDefinition&&!a&&(t=angular.extend({},l._lastToolDefinition,t)),null===t.buttontext&&null===t.iconclass&&null===t.display)throw'textAngular Error: Tool Definition for updating "'+e+'" does not have a valid display/iconclass/buttontext value';null===t.buttontext&&delete t.buttontext,null===t.iconclass&&delete t.iconclass,null===t.display&&delete t.display;var o=d(t,l);l.$element.replaceWith(o),l.$element=o}},r.addTool=function(e,t,a,o){r.tools[e]=angular.extend(r.$new(!0),l[e],u,{name:e}),r.tools[e].$element=d(l[e],r.tools[e]);var n;void 0===a&&(a=r.toolbar.length-1),n=angular.element(s.children()[a]),void 0===o?(n.append(r.tools[e].$element),r.toolbar[a][r.toolbar[a].length-1]=e):(n.children().eq(o).after(r.tools[e].$element),r.toolbar[a][o]=e)},t.registerToolbar(r),r.$on("$destroy",function(){t.unregisterToolbar(r.name)})}}}]);