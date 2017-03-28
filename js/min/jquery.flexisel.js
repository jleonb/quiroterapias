!function($){$.fn.flexisel=function(options){var itemsWidth,defaults=$.extend({visibleItems:5,animationSpeed:200,autoPlay:!0,autoPlaySpeed:3e3,pauseOnHover:!0,setMaxWidthAndHeight:!0,enableResponsiveBreakpoints:!0,flipPage:!1,clone:!0,responsiveBreakpoints:{portrait:{changePoint:480,visibleItems:1},landscape:{changePoint:640,visibleItems:2},tablet:{changePoint:768,visibleItems:1}}},options),object=$(this),settings=$.extend(defaults,options),canNavigate=!0,itemsVisible=settings.visibleItems,totalItems=object.children().length,responsivePoints=[],methods={init:function(){return this.each(function(){methods.appendHTML(),methods.setEventHandlers(),methods.initializeItems()})},initializeItems:function(){var listParent=object.parent(),childSet=(listParent.height(),object.children());methods.sortResponsiveObject(settings.responsiveBreakpoints);var innerWidth=listParent.width();itemsWidth=innerWidth/itemsVisible,childSet.width(itemsWidth),settings.clone&&(childSet.last().insertBefore(childSet.first()),childSet.last().insertBefore(childSet.first()),object.css({left:-itemsWidth})),object.fadeIn(),$(window).trigger("resize")},appendHTML:function(){object.addClass("nbs-flexisel-ul"),object.wrap("<div class='nbs-flexisel-container'><div class='nbs-flexisel-inner'></div></div>"),object.find("li").addClass("nbs-flexisel-item");var flexiselInner=object.parent();if(settings.setMaxWidthAndHeight){var baseWidth=$(".nbs-flexisel-item img").width(),baseHeight=$(".nbs-flexisel-item img").height();$(".nbs-flexisel-item img").css("max-width",baseWidth),$(".nbs-flexisel-item img").css("max-height",baseHeight)}if($("<div class='nbs-flexisel-nav-left'></div><div class='nbs-flexisel-nav-right'></div>").insertAfter(flexiselInner),settings.clone){var cloneContent=object.children().clone();object.append(cloneContent)}},setEventHandlers:function(){var listParent=object.parent(),flexiselInner=listParent.parent(),childSet=object.children(),leftArrow=flexiselInner.find(".nbs-flexisel-nav-left"),rightArrow=flexiselInner.find(".nbs-flexisel-nav-right");$(window).on("resize",function(event){methods.setResponsiveEvents();var innerWidth=$(listParent).width(),innerHeight=$(listParent).height();if(itemsWidth=innerWidth/itemsVisible,childSet.width(itemsWidth),settings.clone?object.css({left:-itemsWidth}):object.css({left:0}),!settings.clone&&itemsVisible>=totalItems)leftArrow.add(rightArrow).css("visibility","hidden");else{leftArrow.add(rightArrow).css("visibility","visible");var halfArrowHeight=leftArrow.height()/2,arrowMargin=innerHeight/2-halfArrowHeight;leftArrow.css("top",arrowMargin+"px"),rightArrow.css("top",arrowMargin+"px")}}),$(leftArrow).on("click",function(event){methods.scrollLeft()}),$(rightArrow).on("click",function(event){methods.scrollRight()}),1==settings.pauseOnHover&&$(".nbs-flexisel-item").on({mouseenter:function(){canNavigate=!1},mouseleave:function(){canNavigate=!0}}),1==settings.autoPlay&&setInterval(function(){1==canNavigate&&methods.scrollRight()},settings.autoPlaySpeed)},setResponsiveEvents:function(){var contentWidth=$("html").width();if(settings.enableResponsiveBreakpoints){var largestCustom=responsivePoints[responsivePoints.length-1].changePoint;for(var i in responsivePoints){if(contentWidth>=largestCustom){itemsVisible=settings.visibleItems;break}if(contentWidth<responsivePoints[i].changePoint){itemsVisible=responsivePoints[i].visibleItems;break}}}},sortResponsiveObject:function(obj){var responsiveObjects=[];for(var i in obj)responsiveObjects.push(obj[i]);responsiveObjects.sort(function(a,b){return a.changePoint-b.changePoint}),responsivePoints=responsiveObjects},scrollLeft:function(){if(object.position().left<0&&1==canNavigate){canNavigate=!1;var listParent=object.parent(),innerWidth=listParent.width();itemsWidth=innerWidth/itemsVisible;var childSet=object.children(),increment=settings.flipPage?innerWidth:itemsWidth;object.animate({left:"+="+increment},{queue:!1,duration:settings.animationSpeed,easing:"linear",complete:function(){settings.clone&&childSet.last().insertBefore(childSet.first()),methods.adjustScroll(),canNavigate=!0}})}},scrollRight:function(){var listParent=object.parent(),innerWidth=listParent.width();itemsWidth=innerWidth/itemsVisible;var difObject=itemsWidth-innerWidth,objPosition=object.position().left+(totalItems-itemsVisible)*itemsWidth-innerWidth,increment=settings.flipPage?innerWidth:itemsWidth;if(difObject<=Math.ceil(objPosition)&&!settings.clone)1==canNavigate&&(canNavigate=!1,object.animate({left:"-="+increment},{queue:!1,duration:settings.animationSpeed,easing:"linear",complete:function(){methods.adjustScroll(),canNavigate=!0}}));else if(settings.clone&&1==canNavigate){canNavigate=!1;var childSet=object.children();object.animate({left:"-="+increment},{queue:!1,duration:settings.animationSpeed,easing:"linear",complete:function(){childSet.first().insertAfter(childSet.last()),methods.adjustScroll(),canNavigate=!0}})}},adjustScroll:function(){var listParent=object.parent(),childSet=object.children(),innerWidth=listParent.width();itemsWidth=innerWidth/itemsVisible,childSet.width(itemsWidth);var increment=settings.flipPage?innerWidth:itemsWidth;settings.clone&&object.css({left:-increment})}};return methods[options]?methods[options].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof options&&options?void $.error('Method "'+method+'" does not exist in flexisel plugin!'):methods.init.apply(this)}}(jQuery);