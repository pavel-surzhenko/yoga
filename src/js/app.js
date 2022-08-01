import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();

//------------------Scroll by click---------------
const menuLinks = document.querySelectorAll('.menu__link[data-goto], .menu__sub-link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('lock');
		        iconMenu.classList.remove('_active');
		        menuBody.classList.remove('_active');
            }
            window.scrollTo({
                top: gotoBlockValue,
                behavior:"smooth"
            });
            e.preventDefault();
        }
    }
    
}
//----------------Menu Burger----------------------------
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('lock')
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
}
//---------------------gallery----------------------------------
const item = document.querySelectorAll('.gallery__item')
if(item.length > 0) {
    item.forEach(item => {
        item.addEventListener("click", function(e) {
            document.body.classList.toggle('lock');
            item.classList.toggle('_active');
        });
    });
}
//---------------------header scroll---------------------
let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
  if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
      //scroll down
      header.classList.add('hide');
  }
  else if(scrollPosition() < defaultOffset ){
      //scroll up
      header.classList.remove('hide');
  }
  lastScroll = scrollPosition();
})

//--------------animate----------------------------
const animItems = document.querySelectorAll('.anim-items');
if(animItems.length > 0) {
    window.addEventListener('scroll', animonSroll);
    function animonSroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if(animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_anim');
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
        srollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        srollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + srollTop, left: rect.left + srollLeft}
    }
    setTimeout(() => {
        animonSroll();
    }, 400);
    
}
//-----------------Preload------------------------------
window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

//--------------------animate number-----------------------------

var check = 1;
var target = $('.column__price'); // класс блока для запуска анимации
var targetPos = target.offset().top;
var winHeight = $(window).height();
var scrollToElem = targetPos - winHeight;

$(window).scroll(function() {
  var winScrollTop = $(this).scrollTop();
  if(winScrollTop > scrollToElem && check) {
    $('.number').each(function() {     // класс тега с цифрами
      $(this).prop('Counter', -1).animate({
        Counter: $(this).text()
      },{
        duration: 2500, 
        easing: 'swing',
        step: function(now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
    check = 0;
  }
});
