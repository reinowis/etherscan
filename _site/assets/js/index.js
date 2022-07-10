// Custom Input Quantity 
$(document).ready(function(){
    // Lazy Load
    $("img.lazy").Lazy();

    // Custom Input Quantity
    $('<div class="custom-input__quantity__nav"><div class="custom-input__quantity__button custom-input__quantity__up"><i class="fa-solid fa-angle-up"></i></div><div class="custom-input__quantity__button custom-input__quantity__down"><i class="fa-solid fa-angle-down"></i></div></div>').insertAfter('.custom-input__quantity input');
    $('.custom-input__quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.custom-input__quantity__up'),
        btnDown = spinner.find('.custom-input__quantity__down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });

    // Scroll Effect 
    const aboutAnimationEle = $(".section__animation");
    var observer = new IntersectionObserver(function (e) {
			for (let i = 0; i < e.length; i++) {
        if (e[i].isIntersecting) {
          $(e[i].target).toggleClass('section__animation--activated', true);
        }
        else {
          $(e[i].target).toggleClass('section__animation--activated', false);
        }
      }
		}, { threshold: [0], rootMargin: '-100px 0px -55%' });
		for (let i = 0; i < aboutAnimationEle.length; i++) {
			observer.observe(aboutAnimationEle[i]);
		}

    // Header Effect
    $(window).on('scroll', function(e) {
      if ($(window).scrollTop() > 10) {
        $('.header .header__wrapper').toggleClass('header__wrapper--fixed', true);
      } else {
        $('.header .header__wrapper').toggleClass('header__wrapper--fixed', false);
      }
    });
});
