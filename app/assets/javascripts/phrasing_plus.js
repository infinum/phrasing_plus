var Phrasing = Phrasing || {};

Phrasing.isEditModeEnabled = function(){
  if($.cookie('editing_mode') === null){
    $.cookie('editing_mode', 'true');
  }

  return $.cookie("editing_mode") === "true" ? true : false;
};

$(document).ready(function(){
  if(Phrasing.isEditModeEnabled()){
    $('.phrasable-image-wrapper').addClass('phrasable-on');
  }

  $('.phrasable-image-wrapper button').on('click', function(){

  });
});
