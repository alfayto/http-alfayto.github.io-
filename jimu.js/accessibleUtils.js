// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/_base/html dojo/query esri/lang dojo/keys dojo/on".split(" "),function(l,e,k,p,g,m){var f={firstFocusNodeClass:"firstFocusNode",lastFocusNodeClass:"lastFocusNode",lastFocusNodeClassInDOM:"lastFocusNodeInDOM",isInNavMode:function(){return e.hasClass(document.body,"jimu-nav-mode")?!0:!1},initTabIndexAndOrder:function(a){var b=f.getFirstFocusNode(a.domNode,a.inPanel),c=f.getLastFocusNode(a.domNode);b&&!c&&(c=b);a.isController&&(b=c=null);f.initFirstFocusNode(a.domNode,b);
f.initLastFocusNode(a.domNode,c);f.addLabelToWidgetDOM(a)},addLabelToWidgetDOM:function(a){if(0<=["ZoomSlider","AttributeTable","Search","ExtentNavigate","OverviewMap"].indexOf(a.name)){var b=p.substitute({widgetLabel:a.name},window.jimuNls.widgetToolTip);e.setAttr(a.domNode,"aria-label",b)}},isOnScreenNotCloseableOffPanel:function(a){return a.isOnScreen&&!a.inPanel&&!0!==a.closeable},preventMapNavigation:function(a){0<=[g.NUMPAD_PLUS,61,187,g.NUMPAD_MINUS,173,189,g.UP_ARROW,g.NUMPAD_8,g.RIGHT_ARROW,
g.NUMPAD_6,g.DOWN_ARROW,g.NUMPAD_2,g.LEFT_ARROW,g.NUMPAD_4,g.PAGE_UP,g.NUMPAD_9,g.PAGE_DOWN,g.NUMPAD_3,g.END,g.NUMPAD_1,g.HOME,g.NUMPAD_7].indexOf(a.keyCode)&&a.stopPropagation()},_addAttrsOnWidgetDom:function(a){var b=0<=["MyLocation","HomeButton","FullScreen"].indexOf(a.name)?"button":"";a.inPanel||e.setAttr(a.domNode,"role",b)},initWidgetCancelEvent:function(a){this._addAttrsOnWidgetDom(a);m(a.domNode,"keydown",l.hitch(this,function(b){f.preventMapNavigation(b);var c=b.target;a.inPanel||0>[g.ENTER,
g.ESCAPE].indexOf(b.keyCode)||(f.isOnScreenNotCloseableOffPanel(a)?b.keyCode===g.ENTER&&e.hasClass(c,a.baseClass)?(b.preventDefault(),f.focusFirstFocusNode(a.domNode)):b.keyCode===g.ESCAPE&&(e.hasClass(c,a.baseClass)?"Splash"!==a.name&&(c=a.domNode.parentNode,"map"===e.getAttr(c,"id")?(b.preventDefault(),c.focus()):(b="jimu-layout-manager"===e.getAttr(c,"id")?a.domNode:a.domNode.parentNode,f.trapToNextFocusContainer(b))):(b.stopPropagation(),a.domNode.focus())):b.keyCode!==g.ESCAPE||e.hasClass(c,
a.baseClass)||(a.domNode.focus(),a.onClose(),b.preventDefault(),b.stopPropagation()))}))},initFirstFocusNode:function(a,b){var c=f.getFirstFocusNode(a);c&&(e.removeClass(c,f.firstFocusNodeClass),c.firstNodeEvent&&c.firstNodeEvent.remove(),c===a&&(e.setAttr(c,"tabindex",null),e.setAttr(c,"role","")));b&&(b===a&&(e.setAttr(b,"tabindex",0),e.setAttr(b,"role","document")),e.addClass(b,f.firstFocusNodeClass),b.firstNodeEvent=m(b,"keydown",l.hitch(this,function(d){e.hasClass(d.target,f.firstFocusNodeClass)&&
d.keyCode===g.TAB&&(window.currentMsgPopup&&window.currentMsgPopup.firstFocusNode?(window.currentMsgPopup.focusedNodeBeforeOpen=d.target,d.preventDefault(),window.currentMsgPopup.firstFocusNode.focus()):!f.tryToFocusSplashWidget(d,a)&&d.shiftKey&&(d.preventDefault(),d=f.getLastFocusNode(a),f.isDomFocusable(d)?d.focus():(d=f.getFocusNodesInDom(d),1<=d.length&&d[d.length-1].focus())))})))},tryToFocusSplashWidget:function(a,b){var c=k(".jimu-widget-splash",k("#jimu-layout-manager")[0])[0];return c&&
"none"!==e.getStyle(c,"display")&&c!==b?(a.stopPropagation(),a.preventDefault(),k("."+f.firstFocusNodeClass,c)[0].focus(),!0):!1},initLastFocusNode:function(a,b){var c=f.getLastFocusNode(a);c&&(e.removeClass(c,f.lastFocusNodeClass),c.lastNodeEvent&&c.lastNodeEvent.remove(),c===a&&e.setAttr(c,"tabindex",null));b&&(b===a&&e.setAttr(b,"tabindex",0),e.addClass(b,f.lastFocusNodeClass),b.lastNodeEvent=m(b,"keydown",l.hitch(this,function(d){if(!d.shiftKey&&d.keyCode===g.TAB)if(a===b||e.hasClass(d.target,
f.lastFocusNodeClass)&&f.isDomFocusable(d.target))d.preventDefault(),this.focusFirstFocusNode(a);else{var h=this.getFocusNodesInDom(b);if(0===h.length||f._isLastFromInnerNodes(h,d.target))d.preventDefault(),this.focusFirstFocusNode(a)}})))},_isLastFromInnerNodes:function(a,b){var c=!1;if(b===a[a.length-1])c=!0;else for(var d=0;d<a.length;d++)if(b===a[d]&&e.hasClass(a[d],f.lastFocusNodeClassInDOM)){c=!0;break}return c},focusFirstFocusNode:function(a){var b=k("."+f.firstFocusNodeClass,a)[0];(b?b:a).focus()},
getFirstFocusNode:function(a,b){var c=e.hasClass(a,f.firstFocusNodeClass)?a:k("."+f.firstFocusNodeClass,a)[0];!c&&b&&(c=a,null===e.getAttr(c,"tabindex")&&e.setAttr(c,"tabindex","0"));return c},getLastFocusNode:function(a){return e.hasClass(a,f.lastFocusNodeClass)?a:k("."+f.lastFocusNodeClass,a)[0]},getFirstSkipLink:function(){return k("#skipContainer a")[0]},focusOnFirstSkipLink:function(){f.getFirstSkipLink().focus()},traversalDom:function(a,b){b=b?b:[];for(var c=a.childNodes,d=0;d<c.length;d++)a=
c[d],1===a.nodeType&&(b.push(a),f.traversalDom(a,b));return b},getFocusNodesInDom:function(a){a=f.traversalDom(a);for(var b=[],c=0;c<a.length;c++){var d=a[c];f.isDomFocusable(d)&&b.push(d)}return b},isDomFocusable:function(a){var b=["A","INPUT","BUTTON","SELECT","TEXTAREA"],c="hidden"!==e.getAttr(a,"type")&&"none"!==e.getStyle(a,"display"),d=!0!==e.getAttr(a,"disabled"),h=parseInt(e.getAttr(a,"tabindex"),10);return c&&d&&(0<=b.indexOf(a.tagName)&&-1!==h||0>b.indexOf(a.tagName)&&0<=h)?!0:!1},getFrameNodesByAsc:function(){for(var a=
k("#jimu-layout-manager")[0].children,b=[],c=0;c<a.length;c++){var d=a[c];0<parseInt(e.getAttr(d,"tabindex"),10)&&"none"!==e.getStyle(d,"display")&&b.push(d)}b.sort(function(h,n){h=parseInt(e.getAttr(h,"tabindex"),10);n=parseInt(e.getAttr(n,"tabindex"),10);return h<n?-1:h===n?0:1});return b},trapToNextFocusContainer:function(a){var b=f.getFrameNodesByAsc(),c=null;if("skipContainer"===e.getAttr(a,"id"))return(c=b[0])&&c.focus(),c;b.unshift(f.getFirstSkipLink());a=parseInt(e.getAttr(a,"tabindex"),10);
for(var d=0;d<b.length;d++)if(parseInt(e.getAttr(b[d],"tabindex"),10)===a){c=d===b.length-1?b[0]:b[d+1];break}b=!f.isInNavMode()&&"link"===e.getAttr(c,"role");c&&!b&&c.focus();return c},isAutoFocusFirstNodeWidget:function(a){var b=!0;f.isOnScreenNotCloseableOffPanel(a)?b=!1:a.openAtStart?a.openAtStartAysn?b=a.openAtStartAysn=!1:a._isFirstOpenAtStart||(a._isFirstOpenAtStart=!0,b=!1):a.isOnScreen&&"widgetOnScreen"!==a.gid?b=!1:a.inGroupPanel&&(b=!1);return b},_getTooltipLabel:function(a,b){var c=e.getAttr(a,
"aria-label");a=e.getAttr(a,"title");return c||a||b},addTooltipByDomNode:function(a,b,c){a.defaultPosition=["below-centered","above-centered","after-centered","before-centered"];var d;m(b,"focus",l.hitch(this,function(h){f.isInNavMode()&&(d&&e.setAttr(d,"role","presentation"),a.show(f._getTooltipLabel(b,c)+"\x26nbsp;\x26nbsp;",h.target),d||(d=k(".dijitTooltipContainer",document.body)[0],e.setAttr(d,"role","presentation")))}));m(b,"blur",l.hitch(this,function(h){a&&a.hide(h.target)}))}};return f});