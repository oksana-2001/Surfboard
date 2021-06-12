"use strict";function menuHamburger(){var e=document.querySelector(".hamburger"),t=document.querySelector(".menu__close"),n=document.querySelector(".menu");function o(e,t){e.classList.add(t)}e.addEventListener("click",function(e){e.preventDefault(),o(n,"menu-opened")}),t.addEventListener("click",function(e){e.preventDefault(),o(n,"menu-opened")}),n.addEventListener("click",function(e){e=e.target;console.log(e),e.classList.contains("menu__link")&&(e="menu-opened",n.classList.remove(e))})}menuHamburger();var openItem=function(e){var t=e.closest(".team__item"),n=t.find(".team__content"),e=n.find(".team__content-block").height();t.addClass("active"),n.height(e)},closeEveryItem=function(e){var t=e.find(".team__content");e.find(".team__item").removeClass("active"),t.height(0)};$(".team__title").click(function(e){var t=$(e.currentTarget),e=t.closest(".team");t.closest(".team__item").hasClass("active")?closeEveryItem(e):(closeEveryItem(e),openItem(t))});var slider=$(".products").bxSlider({pager:!1,controls:!1});$(".products-slider__arrows--direction--prev").click(function(e){e.preventDefault(),slider.goToPrevSlide()}),$(".products-slider__arrows--direction--next").click(function(e){e.preventDefault(),slider.goToNextSlide()});var validateFilds=function(e,t){return t.forEach(function(e){e.removeClass("input-error"),""===e.val().trim()&&e.addClass("input-error")}),0===e.find(".input-error").length};$(".form").submit(function(e){e.preventDefault();var t=$(e.currentTarget),n=t.find("[name='name']"),o=t.find("[name='phone']"),i=t.find("[name='comment']"),e=t.find("[name='to']"),r=$("#modal"),a=r.find(".modal__content");r.removeClass("error-modal"),validateFilds(t,[n,o,i,e])&&((e=$.ajax({url:"https://webdev-api.loftschool.com/sendmail",method:"post",data:{name:n.val(),phone:o.val(),comment:i.val(),to:e.val()},error:function(e){}})).done(function(e){a.text(e.message)}),e.fail(function(e){e=e.responseJSON.message;a.text(e),r.addClass("error-modal")}),e.always(function(){$.fancybox.open({src:"#modal",type:"inline"})}))}),$(".app-close-modal").click(function(e){e.preventDefault(),$.fancybox.close()});var myMap,findBlockByAlias=function(n){return $(".reviews__item").filter(function(e,t){return $(t).attr("data-linked-width")===n})};$(".reviews-switcher__link").click(function(e){e.preventDefault();var t=$(e.currentTarget),e=t.attr("data-open"),e=findBlockByAlias(e),t=t.closest(".reviews-switcher__item");e.addClass("active").siblings().removeClass("active"),t.addClass("active").siblings().removeClass("active")});var init=function(){myMap=new ymaps.Map("map",{center:[55.76,37.64],zoom:10,controls:[]});var t=new ymaps.GeoObjectCollection({},{draggable:!1,iconLayout:"default#image",iconImageHref:"./img/label.svg",iconImageSize:[46,57],iconImageOffset:[-35,-52]});[[55.752004,37.576133],[55.75864,37.658958],[55.612111,37.611895]].forEach(function(e){t.add(new ymaps.Placemark(e))}),myMap.geoObjects.add(t),myMap.behaviors.disable("scrollZoom")};ymaps.ready(init);var sections=$("section"),display=$(".maincontent"),sideMenu=$(".fixed-menu"),menuItems=sideMenu.find(".fixed-menu__item"),inScroll=!1;sections.first().addClass("active");var countSectionPosition=function(e){e*=-100;return isNaN(e)?(console.error("передаю не верное значение в contSectionPosition"),0):e},changeMenuThemeForSection=function(e){var t="fixed-menu--shadowed";"black"===sections.eq(e).attr("data-sidemenu-theme")?sideMenu.addClass(t):sideMenu.removeClass(t)},resetActiveClassForItem=function(e,t,n){e.eq(t).addClass(n).siblings().removeClass(n)},performTransition=function(e){var t;inScroll||(inScroll=!0,t=countSectionPosition(e),changeMenuThemeForSection(e),display.css({transform:"translateY(".concat(t,"%)")}),resetActiveClassForItem(sections,e,"active"),setTimeout(function(){inScroll=!1,resetActiveClassForItem(menuItems,e,"fixed-menu__item--active")},1300))},viewportScroller=function(){var e=sections.filter(".active"),t=e.next(),n=e.prev();return{next:function(){t.length&&performTransition(t.index())},prev:function(){n.length&&performTransition(n.index())}}};$(window).on("wheel",function(e){var t=e.originalEvent.deltaY,e=viewportScroller();0<t&&e.next(),t<0&&e.prev()}),$(window).on("keydown",function(e){var t=e.target.tagName.toLowerCase(),t="input"===t||"textarea"===t,n=viewportScroller();if(!t)switch(e.keyCode){case 38:n.prev();break;case 40:n.next()}}),$(".wrapper").on("touchmove",function(e){return e.preventDefault()}),$("[data-scroll-to]").click(function(e){e.preventDefault();e=$(e.currentTarget).attr("data-scroll-to"),e=$("[data-section-id=".concat(e,"]"));performTransition(e.index())});var player,verticalAcco3=function(){function o(){var e=window.innerWidth-t[0].offsetWidth*t.length;return 524<e?524:e}var t=document.querySelectorAll(".overview-menu__trigger"),i=document.querySelector("body");t.forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();var t=e.target.closest(".overview-menu__trigger"),n=document.querySelector(".overview-menu__item.active");console.log(n),n&&((e=n).querySelector(".overview-menu__content").style.width="0px",e.classList.remove("active")),n&&n.querySelector(".overview-menu__trigger")===t||((t=t.closest(".overview-menu__item")).classList.add("active"),t=t.querySelector(".overview-menu__content"),480<i.offsetWidth?(t.style.width=o()+"px",widthEl=o()):t.style.width="100%")})})};function onYouTubeIframeAPIReady(){player=new YT.Player("yt-player",{height:"390",width:"662",videoId:" Lxb3EKWsInQ",playerVars:{playsinline:1},events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}})}verticalAcco3();