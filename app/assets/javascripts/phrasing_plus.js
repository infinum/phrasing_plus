//=require phrasing_image_widget

var Phrasing = Phrasing || {};

var PhrasingPlus = PhrasingPlus || {};

Phrasing.isEditModeEnabled = function(){
  if($.cookie('editing_mode') === null){
    $.cookie('editing_mode', 'true');
  }

  return $.cookie("editing_mode") === "true" ? true : false;
};

// PhrasableImageWidgetFactory
var generatePhrasingImageWidget = function($wrapper){
  return new PhrasingImageWidget({
    fileInput : $wrapper.find('input[type=file]')[0],
    $fileInputLabel : $wrapper.find('label.edit-image'),
    $discardChangeLabel : $wrapper.find('label.discard-change'),
    $wrapper : $wrapper,
    $image : $wrapper.find('img.phrasable-image'),
    $form : $wrapper.find('form'),
    $submitButton : $wrapper.find('button[type=submit]')
  });
};

$(document).ready(function(){
  if(Phrasing.isEditModeEnabled()){
    $('.phrasable-image-wrapper').addClass('phrasable-on');
  }

  $('.phrasable-image-wrapper input[type=file]').change(function(){
    var phrasingImageWrapper = generatePhrasingImageWidget($(this).closest('.phrasable-image-wrapper'));
    phrasingImageWrapper.showChosenImage();
  });

  $('.phrasable-image-wrapper label.discard-change').on('click', function(){
    var phrasingImageWrapper = generatePhrasingImageWidget($(this).closest('.phrasable-image-wrapper'));
    phrasingImageWrapper.discardChosenImage();
  });

  $(".phrasable-image-wrapper form").submit(function(e) {
    var phrasingImageWrapper = generatePhrasingImageWidget($(this).closest('.phrasable-image-wrapper'));
    phrasingImageWrapper.uploadChosenImage();
    e.preventDefault();
  });

  // $('.phrasable-image-wrapper img').animate({
  //   opacity: 0.4,
  // }, 2000, function() {
  //   $(this).animate({
  //     opacity: 1
  //   });
  // });

});



