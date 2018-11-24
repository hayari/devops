/*
 * Tiny Scrollbar
 * http://www.baijs.nl/tinyscrollbar/
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 13 / 08 / 2012
 * @version 1.81
 * @author Maarten Baijs
 *
 */
(function($)
{$.tiny=$.tiny||{};$.tiny.scrollbar={options:{axis:'y',wheel:40,scroll:true,lockscroll:true,size:'auto',sizethumb:'auto',invertscroll:false}};$.fn.tinyscrollbar=function(params)
{var options=$.extend({},$.tiny.scrollbar.options,params);this.each(function()
{$(this).data('tsb',new Scrollbar($(this),options));});return this;};$.fn.tinyscrollbar_update=function(sScroll)
{if($(this).data('tsb'))
return $(this).data('tsb').update(sScroll);};function Scrollbar(root,options)
{var viewportClass='calp-scroll-viewport';var contentClass='calp-scroll-overview';var scrollbarClass='calp-scroll-scrollbar';var trackClass='calp-scroll-track';var thumbClass='calp-scroll-thumb';var endClass='calp-scroll-end';var baseHtml='<div class="'+scrollbarClass+'"><div class="'+trackClass+'">'+'<div class="'+thumbClass+'"><div class="'+endClass+'"></div></div></div></div>';var wrapper='<div class="'+viewportClass+'"><div class="'+contentClass+'">'+root.html()+'</div><div>';root.html(baseHtml+wrapper);var oSelf=this,oWrapper=root,oViewport={obj:$('.calp-scroll-viewport',root)},oContent={obj:$('.calp-scroll-overview',root)},oScrollbar={obj:$('.calp-scroll-scrollbar',root)},oTrack={obj:$('.calp-scroll-track',oScrollbar.obj)},oThumb={obj:$('.calp-scroll-thumb',oScrollbar.obj)},sAxis=options.axis==='x',sDirection=sAxis?'left':'top',sSize=sAxis?'Width':'Height',iScroll=0,iPosition={start:0,now:0},iMouse={},touchEvents='ontouchstart'in document.documentElement;function initialize()
{var viewportHeight=root.height();oViewport.obj.css('height',viewportHeight);oSelf.update();setEvents();return oSelf;}
this.update=function(sScroll)
{oViewport[options.axis]=oViewport.obj[0]['offset'+sSize];oContent[options.axis]=oContent.obj[0]['scroll'+sSize];oContent.ratio=oViewport[options.axis]/oContent[options.axis];oScrollbar.obj.toggleClass('disable',oContent.ratio>=1);oTrack[options.axis]=options.size==='auto'?oViewport[options.axis]:options.size;oThumb[options.axis]=Math.min(oTrack[options.axis],Math.max(0,(options.sizethumb==='auto'?(oTrack[options.axis]*oContent.ratio):options.sizethumb)));oScrollbar.ratio=options.sizethumb==='auto'?(oContent[options.axis]/oTrack[options.axis]):(oContent[options.axis]-oViewport[options.axis])/(oTrack[options.axis]-oThumb[options.axis]);iScroll=(sScroll==='relative'&&oContent.ratio<=1)?Math.min((oContent[options.axis]-oViewport[options.axis]),Math.max(0,iScroll)):0;iScroll=(sScroll==='bottom'&&oContent.ratio<=1)?(oContent[options.axis]-oViewport[options.axis]):isNaN(parseInt(sScroll,10))?iScroll:parseInt(sScroll,10);setSize();};function setSize()
{var sCssSize=sSize.toLowerCase();oThumb.obj.css(sDirection,iScroll/oScrollbar.ratio);oContent.obj.css(sDirection,-iScroll);iMouse.start=oThumb.obj.offset()[sDirection];oScrollbar.obj.css(sCssSize,oTrack[options.axis]);oTrack.obj.css(sCssSize,oTrack[options.axis]);oThumb.obj.css(sCssSize,oThumb[options.axis]);}
function setEvents()
{if(!touchEvents)
{oThumb.obj.bind('mousedown',start);oTrack.obj.bind('mouseup',drag);}
else
{oViewport.obj[0].ontouchstart=function(event)
{if(1===event.touches.length)
{start(event.touches[0]);event.stopPropagation();}};}
if(options.scroll&&window.addEventListener)
{oWrapper[0].addEventListener('DOMMouseScroll',wheel,false);oWrapper[0].addEventListener('mousewheel',wheel,false);}
else if(options.scroll)
{oWrapper[0].onmousewheel=wheel;}}
function start(event)
{$("body").addClass("noSelect");var oThumbDir=parseInt(oThumb.obj.css(sDirection),10);iMouse.start=sAxis?event.pageX:event.pageY;iPosition.start=oThumbDir=='auto'?0:oThumbDir;if(!touchEvents)
{$(document).bind('mousemove',drag);$(document).bind('mouseup',end);oThumb.obj.bind('mouseup',end);}
else
{document.ontouchmove=function(event)
{event.preventDefault();drag(event.touches[0]);};document.ontouchend=end;}}
function wheel(event)
{if(oContent.ratio<1)
{var oEvent=event||window.event,iDelta=oEvent.wheelDelta?oEvent.wheelDelta/120:-oEvent.detail/3;iScroll-=iDelta*options.wheel;iScroll=Math.min((oContent[options.axis]-oViewport[options.axis]),Math.max(0,iScroll));oThumb.obj.css(sDirection,iScroll/oScrollbar.ratio);oContent.obj.css(sDirection,-iScroll);if(options.lockscroll||(iScroll!==(oContent[options.axis]-oViewport[options.axis])&&iScroll!==0))
{oEvent=$.event.fix(oEvent);oEvent.preventDefault();}}}
function drag(event)
{if(oContent.ratio<1)
{if(options.invertscroll&&touchEvents)
{iPosition.now=Math.min((oTrack[options.axis]-oThumb[options.axis]),Math.max(0,(iPosition.start+(iMouse.start-(sAxis?event.pageX:event.pageY)))));}
else
{iPosition.now=Math.min((oTrack[options.axis]-oThumb[options.axis]),Math.max(0,(iPosition.start+((sAxis?event.pageX:event.pageY)-iMouse.start))));}
iScroll=iPosition.now*oScrollbar.ratio;oContent.obj.css(sDirection,-iScroll);oThumb.obj.css(sDirection,iPosition.now);}}
function end()
{$("body").removeClass("noSelect");$(document).unbind('mousemove',drag);$(document).unbind('mouseup',end);oThumb.obj.unbind('mouseup',end);document.ontouchmove=document.ontouchend=null;}
return initialize();}}(jQuery));
