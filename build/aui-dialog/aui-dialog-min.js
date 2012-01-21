AUI.add("aui-dialog",function(o){var Z=o.Lang,u=o.Object,J=Z.isBoolean,B=Z.isArray,O=Z.isObject,D=o.WidgetStdMod,T=function(A){return parseInt(A,10)||0;},L=o.config.doc,t="",U="boundingBox",X="button",c="buttons",V="close",P="closethick",K="constrain2view",d="dd",Q="default",W="destroyOnClose",w="dialog",x=".",m="draggable",C="dragConfig",k="dragInstance",g="footerContent",R="hd",I="height",G="icon",b="icons",r="io",v="loading",z="modal",Y="proxy",e="resizable",F="resizableConfig",l="resizableInstance",E="stack",i="useARIA",N="viewportRegion",f="width",p="resize:resize",M="resize:end",h=o.getClassName,y=h(w),a=h(w,R),s=h(G,v),n=h(d),H=L.createTextNode("");var q=function(A){if(!o.DialogMask){o.DialogMask=new o.OverlayMask().render();}};o.mix(q,{NAME:w,ATTRS:{bodyContent:{value:H},buttons:{value:[],validator:B},close:{value:true},constrain2view:{setter:"_setConstrain2view",value:false,validator:J},destroyOnClose:{value:false,validator:J},draggable:{value:true},dragConfig:{setter:function(aa){var A=this;return o.merge({bubbleTargets:A,node:A.get(U),handles:[x+a]},aa||{});},writeOnce:true,value:{},validator:O},dragInstance:{setter:"_setDragInstance",value:null},modal:{lazyAdd:false,validator:J,value:false},resizableConfig:{setter:function(aa){var A=this;return o.merge({bubbleTargets:A,handles:"r,br,b",minHeight:100,minWidth:200,constrain2view:true,node:A.get(U),proxy:true,after:{end:o.bind(A._syncResizableDimentions,A),resize:o.bind(A._syncResizableDimentions,A)}},aa||{});},writeOnce:true,value:{},validator:O},resizableInstance:{setter:"_setResizableInstance",value:null},resizable:{value:true},stack:{value:true,setter:function(A){return this._setStack(A);},validator:J},strings:{value:{close:"Close dialog"}}}});q.prototype={initializer:function(ab){var A=this;var ac=A.get(b);var ae=A.get(V);var ad=A.get(c);if(ad&&ad.length&&!A.get(g)){A.set(g,H);}if(ae){var aa={icon:P,id:P,handler:{fn:A.close,context:A},title:A.get("strings").close};if(ac){ac.push(aa);}A.set(b,ac);}A.publish("close",{defaultFn:A._close});A.addTarget(o.DialogManager);A.after("constrain2viewChange",A._afterConstrain2viewChange);A.after("draggableChange",A._afterDraggableChange);A.after("dragInstanceChange",A._afterDragInstanceChange);A.after("render",A._afterRenderer);A.after("resizableChange",A._afterResizableChange);A.after("resizableInstanceChange",A._afterResizableInstanceChange);},bindUI:function(){var A=this;A._bindLazyComponents();},syncUI:function(){var A=this;if(A.get(i)){A.plug(o.Plugin.Aria,{attributes:{visible:{ariaName:"hidden",format:function(aa){return !aa;}}}});}},destructor:function(){var A=this;var aa=A.get(U);o.Event.purgeElement(aa,true);o.DialogManager.remove(A);},alignToViewport:function(ab,aa){var A=this;var ac=o.getDoc().get(N);A.move([ac.left+T(ab),ac.top+T(aa)]);},_bindLazyComponents:function(){var A=this;var aa=A.get(U);aa.on("mouseenter",o.bind(A._initLazyComponents,A));},close:function(){var A=this;A.fire("close");},_afterRenderer:function(aa){var A=this;A._initButtons();A.get(E);A.get(r);},_close:function(){var A=this;if(A.get(W)){A.destroy();}else{A.hide();}},_initButtons:function(){var A=this;var ab=A.get(c);if(ab.length){var aa=new o.Toolbar({children:ab});aa._DEFAULT_CONTEXT=A;aa.render(A.footerNode);A.fire("contentUpdate");A.buttons=aa;}},_initLazyComponents:function(){var A=this;A.get(k);A.get(l);},_setDefaultARIAValues:function(){var A=this;if(!A.get(i)){return;}A.aria.setRole("dialog",A.get(U));if(A.icons){var aa=A.icons.item(P);if(aa){A.aria.setAttribute("controls",A.get("id"),aa.get(U));}}},_setDragInstance:function(aa){var A=this;if(A.get(m)){aa=new o.DD.Drag(A.get(C));A._updateDDConstrain2view(aa);}return aa;},_setResizableInstance:function(aa){var A=this;if(A.get(e)){aa=new o.Resize(A.get(F));}return aa;},_setStack:function(aa){var A=this;if(aa){o.DialogManager.register(A);}else{o.DialogManager.remove(A);}return aa;},_syncResizableDimentions:function(ab){var A=this;var aa=ab.type;var ac=ab.info;if((aa===M)||((aa===p)&&!ab.currentTarget.get(Y))){A.set(I,ac.offsetHeight);A.set(f,ac.offsetWidth);}},_updateDDConstrain2view:function(ab){var A=this;var aa=A.get(K);if(aa){ab.plug(o.Plugin.DDConstrained,{constrain2view:aa});}else{ab.unplug(o.Plugin.DDConstrained);}},_afterConstrain2viewChange:function(aa){var A=this;A._updateDDConstrain2view(A.get(k));},_afterDraggableChange:function(aa){var A=this;A.set(k,null);},_afterDragInstanceChange:function(aa){var A=this;if(aa.prevVal){aa.prevVal.destroy();}},_afterResizableChange:function(aa){var A=this;A.set(l,null);},_afterResizableInstanceChange:function(aa){var A=this;if(aa.prevVal){aa.prevVal.destroy();}}};o.Dialog=o.Component.create({NAME:w,EXTENDS:o.Panel,AUGMENTS:[q,o.WidgetPosition,o.WidgetStack,o.WidgetPositionAlign,o.WidgetPositionConstrain]});var j=new o.OverlayManager({zIndexBase:1000});var S={};j._MODALS=S;j.after(["dialog:destroy","dialog:modalChange","dialog:render","dialog:visibleChange"],function(aa){var A=aa.target;if(A){var ab=A.get("id");if(aa.type!=="dialog:destroy"&&A.get("visible")&&A.get("modal")){S[ab]=true;o.DialogMask.show();}else{delete S[ab];if(u.isEmpty(S)){o.DialogMask.hide();}}}});o.mix(j,{findByChild:function(A){return o.Widget.getByNode(o.one(A).ancestor(x+y,true));},closeByChild:function(A){return j.findByChild(A).close();},refreshByChild:function(aa){var A=j.findByChild(aa);if(A&&A.io){A.io.start();}}});o.DialogManager=j;},"@VERSION@",{skinnable:true,requires:["aui-panel","dd-constrain","aui-button-item","aui-overlay-manager","aui-overlay-mask","aui-io-plugin","aui-resize"]});