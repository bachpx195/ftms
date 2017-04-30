export function onNextStep(event) {
  let animating, current_fs, next_fs, left, opacity, scale = '';
  if (animating) return false;
  animating = true;
  let target = event.target;
  let $form = $(target).closest('form');
  current_fs = $(target).closest('fieldset');
  next_fs = $(target).closest('fieldset').next();

  $('.multi-step-progress-bar li', $form)
    .eq($('fieldset', $form).index(next_fs)).addClass('active');
  next_fs.show();

  current_fs.animate({opacity: 0}, {
    step: function(now, mx) {
      scale = 1 - (1 - now) * 0.2;
      left = (now * 50)+'%';
      opacity = 1 - now;
      current_fs.css({
        'transform': 'scale('+scale+')', 'position': 'absolute'
      });
      next_fs.css({'left': left, 'opacity': opacity, 'position': 'relative'});
    },
    duration: 800,
    complete: function(){
      current_fs.hide();
      animating = false;
    }
  });
}

export function onPreviousStep(event) {
  let animating, current_fs, previous_fs, left, opacity, scale = '';
  if (animating) return false;
  animating = true;
  let target = event.target;
  let $form = $(target).closest('form');
  current_fs = $(target).parent().parent();
  previous_fs = $(target).parent().parent().prev();

  $('.multi-step-progress-bar li', $form)
    .eq($('fieldset', $form).index(current_fs)).removeClass('active');

  previous_fs.show();
  current_fs.animate({opacity: 0}, {
  	step: function(now, mx) {
  		scale = 0.8 + (1 - now) * 0.2;
  		left = ((1-now) * 50)+'%';
  		opacity = 1 - now;
  		current_fs.css({'left': left, 'position': 'absolute'});
  		previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity,
        'position': 'relative'});
  	},
  	duration: 800,
  	complete: function(){
  		current_fs.hide();
  		animating = false;
  	}
  });
}
