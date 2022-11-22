// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/Deferred dojo/promise/all jimu/WidgetManager jimu/portalUrlUtils esri/lang ./NlsStrings".split(" "),function(q,k,g,m,n,r,t,h,u){var l=q([],{_candidateMenuItems:null,_displayItems:null,_layerInfo:null,_layerType:null,_appConfig:null,constructor:function(a,b,c,e){this.nls=u.value;this._layerInfo=a;this._layerType=c;this.layerListWidget=e;this._initCandidateMenuItems();this._initDisplayItems(b)},_getATagLabel:function(){var a;var b=this._layerInfo.getUrl();
(a=this._layerInfo.isItemLayer())?(b=this._getItemDetailsPageUrl(a)||b,a=this.nls.itemShowItemDetails):!b||"CSVLayer"!==this._layerType&&"KMLLayer"!==this._layerType?(b=b&&"WMSLayer"===this._layerType?b+(-1<b.indexOf("?")?"\x26":"?")+"SERVICE\x3dWMS\x26REQUEST\x3dGetCapabilities":b&&"WFSLayer"===this._layerType?b+(-1<b.indexOf("?")?"\x26":"?")+"SERVICE\x3dWFS\x26REQUEST\x3dGetCapabilities":b?b:"",a=this.nls.itemDesc):a=this.nls.itemDownload;this._ATagLabelUrl=b;return'\x3ca class\x3d"menu-item-description" target\x3d"_blank" href\x3d"'+
b+'"\x3e'+a+"\x3c/a\x3e"},_getItemDetailsPageUrl:function(a){var b="";return b=t.getItemDetailsPageUrl(a.portalUrl,a.itemId)},_initCandidateMenuItems:function(){this._candidateMenuItems=[{key:"separator",label:""},{key:"empty",label:this.nls.empty},{key:"zoomto",label:this.nls.itemZoomTo},{key:"transparency",label:this.nls.itemTransparency},{key:"setVisibilityRange",label:this.nls.itemSetVisibilityRange},{key:"moveup",label:this.nls.itemMoveUp},{key:"movedown",label:this.nls.itemMoveDown},{key:"table",
label:this.nls.itemToAttributeTable},{key:"controlPopup",label:this.nls.removePopup},{key:"controlLabels",label:this.nls.showLabels},{key:"url",label:this._getATagLabel()}]},_initDisplayItems:function(a){this._displayItems=[];k.forEach(a,function(b){k.forEach(this._candidateMenuItems,function(c){b.key===c.key&&(this._displayItems.push(g.clone(c)),b.onClick&&(this._displayItem.onClick=b.onClick))},this)},this)},_getSupportTableInfoForAllSublayers:function(a){var b=[];a.traversal(function(c){var e=
new m;c.getSupportTableInfo().then(function(f){f.layerInfo=c;e.resolve(f)});b.push(e)});return n(b)},_isSupportedByAT:function(a,b){return k.some(b,function(c){return c.isSupportedLayer&&c.isSupportQuery&&!c.otherReasonCanNotSupport?!0:!1})},getDeniedItems:function(){var a=new m,b=[];this.layerListWidget.layerListView.isFirstDisplayedLayerInfo(this._layerInfo)&&b.push({key:"moveup",denyType:"disable"});this.layerListWidget.layerListView.isLastDisplayedLayerInfo(this._layerInfo)&&b.push({key:"movedown",
denyType:"disable"});this._ATagLabelUrl||b.push({key:"url",denyType:"disable"});this._layerInfo.canShowLabel()||b.push({key:"controlLabels",denyType:"hidden"});this._layerInfo.originOperLayer.featureCollection?b.push({key:"setVisibilityRange",denyType:"hidden"}):this._layerInfo.isRootLayer()||"esri.layers.ArcGISTiledMapServiceLayer"!==this._layerInfo.getRootLayerInfo().layerObject.declaredClass?this._layerInfo.isRootLayer()||"esri.layers.ArcGISDynamicMapServiceLayer"!==this._layerInfo.getRootLayerInfo().layerObject.declaredClass||
this._layerInfo.getRootLayerInfo().layerObject.supportsDynamicLayers||b.push({key:"setVisibilityRange",denyType:"disable"}):b.push({key:"setVisibilityRange",denyType:"hidden"});var c=this._layerInfo.isSupportPopupNested(),e=this._getSupportTableInfoForAllSublayers(this._layerInfo);n({isPopupSupported:c,supportTableInfo:e}).then(g.hitch(this,function(f){f.isPopupSupported||b.push({key:"controlPopup",denyType:"hidden"});f=f.supportTableInfo;var d=this.layerListWidget.appConfig.getConfigElementsByName("AttributeTable")[0];
d&&d.visible?this._isSupportedByAT(d,f)||(b.push({key:"table",denyType:"disable"}),this._layerInfo.isMapNotesLayerInfo()||this._layerInfo.parentLayerInfo&&this._layerInfo.parentLayerInfo.isMapNotesLayerInfo()?b.push({key:"table",denyType:"hidden"}):b.push({key:"table",denyType:"disable"})):b.push({key:"table",denyType:"hidden"});a.resolve(b)}),function(){a.resolve(b)});return a},getDisplayItems:function(){return this._displayItems},onPopupMenuClick:function(a){var b={closeMenu:!0};switch(a.itemKey){case "zoomto":this._onItemZoomToClick(a);
break;case "moveup":this._onMoveUpItemClick(a);break;case "movedown":this._onMoveDownItemClick(a);break;case "table":this._onTableItemClick(a);break;case "transparencyChanged":this._onTransparencyChanged(a);b.closeMenu=!1;break;case "controlPopup":this._onControlPopup();break;case "controlLabels":this._onControlLabels()}return b},_onItemZoomToClick:function(a){this._layerInfo.zoomTo()},_isValidExtent:function(a){var b=!1;h.isDefined(a)&&h.isDefined(a.xmin)&&isFinite(a.xmin)&&h.isDefined(a.ymin)&&
isFinite(a.ymin)&&h.isDefined(a.xmax)&&isFinite(a.xmax)&&h.isDefined(a.ymax)&&isFinite(a.ymax)&&(b=!0);return b},_onMoveUpItemClick:function(a){this._layerInfo.isFirst||a.layerListView.moveUpLayer(this._layerInfo)},_onMoveDownItemClick:function(a){this._layerInfo.isLast||a.layerListView.moveDownLayer(this._layerInfo)},_onTableItemClick:function(a){this._getSupportTableInfoForAllSublayers(this._layerInfo).then(g.hitch(this,function(b){var c=this.layerListWidget.appConfig.getConfigElementsByName("AttributeTable")[0];
if(this._isSupportedByAT(c,b)){var e=r.getInstance();k.forEach(b,function(f){f.isSupportedLayer&&e.triggerWidgetOpen(c.id).then(g.hitch(this,function(d){d&&e.activateWidget(d);a.layerListWidget.publishData({target:"AttributeTable",layer:f.layerInfo})}))},this)}}))},_onTransparencyChanged:function(a){this.layerListWidget._denyLayerInfosOpacityResponseOneTime=!0;this._layerInfo.setOpacity(1-a.extraData.newTransValue)},_onControlPopup:function(a){this._layerInfo.isPopupNestedEnabled()?this._layerInfo.disablePopupNested():
this._layerInfo.enablePopupNested();this._layerInfo.map.infoWindow.hide()},_onControlLabels:function(a){this._layerInfo.canShowLabel()&&(this._layerInfo.isShowLabels()?this._layerInfo.hideLabels():this._layerInfo.showLabels())}});l.create=function(a,b){var c=new m,e=a.isRootLayer(),f={RootLayer:[{key:"zoomto"},{key:"transparency"},{key:"setVisibilityRange"},{key:"separator"},{key:"controlPopup"},{key:"separator"},{key:"moveup"},{key:"movedown"},{key:"separator"},{key:"table"},{key:"separator"},{key:"url"}],
RootLayerAndFeatureLayer:[{key:"zoomto"},{key:"transparency"},{key:"setVisibilityRange"},{key:"separator"},{key:"controlPopup"},{key:"separator"},{key:"controlLabels"},{key:"separator"},{key:"moveup"},{key:"movedown"},{key:"separator"},{key:"table"},{key:"separator"},{key:"url"}],FeatureLayer:[{key:"setVisibilityRange"},{key:"separator"},{key:"controlPopup"},{key:"separator"},{key:"table"},{key:"separator"},{key:"url"}],SublayerOfDynamicMapserviceLayer:[{key:"setVisibilityRange"},{key:"separator"},
{key:"url"}],GroupLayer:[{key:"setVisibilityRange"},{key:"separator"},{key:"controlPopup"},{key:"separator"},{key:"table"},{key:"separator"},{key:"url"}],Table:[{key:"table"},{key:"separator"},{key:"url"}],BasemapLayer:[{key:"zoomto"},{key:"transparency"},{key:"separator"},{key:"url"}],"default":[{key:"controlPopup"},{key:"separator"},{key:"url",onClick:null}]};a.getLayerType().then(g.hitch(this,function(d){var p="";p=a.isBasemap()&&a.isRootLayer()?"BasemapLayer":a.isBasemap()?"default":!e||"FeatureLayer"!==
d&&"CSVLayer"!==d&&"ArcGISImageServiceLayer"!==d&&"StreamLayer"!==d&&"ArcGISImageServiceVectorLayer"!==d?e?"RootLayer":"FeatureLayer"===d||"CSVLayer"===d?"FeatureLayer":a.isLeaf()&&a.getRootLayerInfo()&&a.getRootLayerInfo().layerObject&&"esri.layers.ArcGISDynamicMapServiceLayer"===a.getRootLayerInfo().layerObject.declaredClass?"SublayerOfDynamicMapserviceLayer":"GroupLayer"===d?"GroupLayer":"Table"===d?"Table":"default":"RootLayerAndFeatureLayer";c.resolve(new l(a,f[p],d,b))}),g.hitch(this,function(){c.resolve(new l(a,
[{key:"empty"}]))}));return c};return l});