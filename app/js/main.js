$(document).ready(function(){
  $('.content__main__slider').slick({
    autoplay: true,
    autoplaySpeed:5000,

  });
});
$(document).ready(function(){
  $('.content__corp__slider').slick({
    appendArrows:'.arrow__place',
    prevArrow:'<div class="arrow__left"></div>',
    nextArrow:'<div class="arrow__right "></div>'

  });
});

$('.content__bottom__slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
    autoplaySpeed:4000,
    appendArrows:'.arrow__bottom__place',
    prevArrow:'<div class="arrow__left__black"></div>',
    nextArrow:'<div class="arrow__right__black"></div>'
});

