export function onNextStep(event) {
  let animating, current_fs, next_fs, left, opacity, scale = '';
  if (animating) return false;
  animating = true;
  let target = event.target;
  let $form = $(target).closest('form');
  current_fs = $(target).closest('fieldset');
  next_fs = $(target).closest('fieldset').next();

  $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index(next_fs))
    .addClass('active').addClass('highlighted');
  $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index(next_fs) - 1)
    .removeClass('highlighted');
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
  current_fs = $(target).closest('fieldset');
  previous_fs = $(target).closest('fieldset').prev();

  $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index(current_fs))
    .removeClass('active').removeClass('highlighted');
  $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index(current_fs) - 1)
    .addClass('highlighted');

  previous_fs.show();
  current_fs.animate({opacity: 0}, {
  	step: function(now, mx) {
  		scale = 0.8 + (1 - now) * 0.2;
  		left = ((1-now) * 50) + '%';
  		opacity = 1 - now;
  		current_fs.css({'left': left, 'position': 'absolute'});
  		previous_fs.css({'transform': 'scale(' + scale +')', 'opacity': opacity,
        'position': 'relative'});
  	},
  	duration: 800,
  	complete: function() {
  		current_fs.hide();
  		animating = false;
  	}
  });
}

export function onCancelForm(event) {
  let opacity, scale, left, current_fs, first_fs = '';
  let target = event.target;
  let $form = $(target).closest('form');
  first_fs = $('fieldset', $form).first();
  current_fs = $(target).closest('fieldset');

  $('fieldset', $form).each(function() {
    $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index($(this)))
      .removeClass('active').removeClass('highlighted');
    $(this).css({'left': left, 'position': 'absolute',
      'transform': 'scale(1)'});
    $(this).hide();
  });

  $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index(first_fs))
    .addClass('active').addClass('highlighted');
  first_fs.show();
  first_fs.css({'transform': 'scale(1)', 'opacity': 1,
    'position': 'relative'});

  $('.modalCreateTrainingStandard').modal('hide');
  $('.modal-edit').modal('hide');
}


export function afterRenderTimeline() {
  $('.msform-subject-timeline').each((index, timeline) => {
    let total_col = parseInt($(timeline)[0].dataset.totalCol);
    let left = 0;
    $('.timeline-block', $(timeline)).each(function(){
      let col = parseInt($(this).data('col'));
      let width = Math.floor(col * 10000 / total_col) / 100;
      $(this).width(width + '%');
      $(this).css('left', left + '%');
      left += width;
    });
  });

  $('.timeline-body .tooltip').on('hover', function(e){
    $(this).tooltip('bottom');
  });

  $('.timeline-heading img').mouseenter(function() {
    let $timeline_heading = $(this).closest('.timeline-heading');
    $timeline_heading.css('z-index', 100);
    let $timeline_body = $(this).parent().parent().next();
    $timeline_body.css('z-index', 99);
    if (!$timeline_body.is(':visible')) {
      $timeline_body.show('slow');
    }
  });

  $('.timeline-heading img').mouseout(function() {
    let $timeline_heading = $(this).closest('.timeline-heading');
    $timeline_heading.css('z-index', 10);
    let $timeline_body = $(this).parent().parent().next();
    $timeline_body.css('z-index', 9);
    $timeline_body.hide('fast');
  });
}

export function afterSubmit(target) {
  let left, current_fs, first_fs = '';
  let $form = $(target).closest('form');
  first_fs = $('fieldset', $form).first();
  current_fs = $(target).closest('fieldset');

  $('fieldset', $form).each(function() {
    $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index($(this)))
      .removeClass('active').removeClass('highlighted');
    $(this).css({'left': left, 'position': 'absolute',
      'transform': 'scale(1)'});
    $(this).hide();
  });

  $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index(first_fs))
    .addClass('active').addClass('highlighted');
  first_fs.show();
  first_fs.css({'transform': 'scale(1)', 'opacity': 1, 'position': 'relative'});
}

export function onDismissModal(target, modal_class_name) {
  let left, current_fs, first_fs = '';
  let $modal = $(target).closest(modal_class_name);
  let $form = $('form', $modal);

  first_fs = $('fieldset', $form).first();
  current_fs = $(target).closest('fieldset');

  $('fieldset', $form).each(function() {
    $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index($(this)))
      .removeClass('active').removeClass('highlighted');
    $(this).css({'left': left, 'position': 'absolute',
      'transform': 'scale(1)'});
    $(this).hide();
  });

  $('.multi-step-progress-bar li', $form).eq($('fieldset', $form).index(first_fs))
    .addClass('active').addClass('highlighted');
  first_fs.show();
  first_fs.css({'transform': 'scale(1)', 'opacity': 1, 'position': 'relative'});
}
