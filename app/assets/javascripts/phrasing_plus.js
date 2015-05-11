var Phrasing = Phrasing || {};

var PhrasingPlus = PhrasingPlus || {};

Phrasing.isEditModeEnabled = function(){
  if($.cookie('editing_mode') === null){
    $.cookie('editing_mode', 'true');
  }

  return $.cookie("editing_mode") === "true" ? true : false;
};

function PhrasableImageWidget(options){
  this.fileInput = options.fileInput;
  this.$fileInputLabel = options.$fileInputLabel;
  this.$discardChangeLabel = options.$discardChangeLabel;
  this.$wrapper = options.$wrapper;
  this.$image = options.$image;
  this.$form = options.$form;
  this.$submitButton = options.$submitButton;
}

PhrasableImageWidget.prototype.showChosenImage = function(){
  this.rememberOriginalImage();
  this.setChosenImageAsSource();
  this.$fileInputLabel.hide();
  this.$discardChangeLabel.show();
  this.$submitButton.show();
};

PhrasableImageWidget.prototype.setChosenImageAsSource = function(){
  if (this.fileInput.files && this.fileInput.files[0]) {
    var reader = new FileReader();
    var widget = this;
    reader.onload = function (e) {
      widget.$image.attr('src', e.target.result);
    };
    reader.readAsDataURL(this.fileInput.files[0]);
  }
};

PhrasableImageWidget.prototype.rememberOriginalImage = function(){
  this.$image.data('original-src', this.$image.attr('src'));
};

PhrasableImageWidget.prototype.discardChosenImage = function(){
  this.revertImageToOriginal();
  this.$form[0].reset();
  this.$fileInputLabel.show();
  this.$discardChangeLabel.hide();
  this.$submitButton.hide();
};

PhrasableImageWidget.prototype.revertImageToOriginal = function(){
  this.$image.attr('src', this.$image.data('original-src'));
  this.$image.removeData('original-src');
};

PhrasableImageWidget.prototype.uploadChosenImage = function(){
  var widget = this;

  $.ajax({
    type: "PUT",
    url: widget.$form.attr('action'),
    data: new FormData( widget.$form[0] ),
    processData: false,
    contentType: false,
    success: function(data)
    {
      widget.handleSuccessfullUpload(data);
    },
    failure: function(data){
      widget.handleFailedUpload();
    }
   });
};

PhrasableImageWidget.prototype.handleSuccessfullUpload = function(data){
  this.$form[0].reset();
  this.addNewSrcToImage(data.image.url);
  this.$fileInputLabel.show();
  this.$discardChangeLabel.hide();
  this.$submitButton.hide();
};

PhrasableImageWidget.prototype.addNewSrcToImage = function(imgSrc){
  this.$image.attr('src', imgSrc);
  this.$image.removeData('original-src');
};

PhrasableImageWidget.prototype.handleFailedUpload = function(data){
  this.$form[0].reset();
  this.revertImageToOriginal();
  this.$fileInputLabel.show();
  this.$discardChangeLabel.hide();
  this.$submitButton.hide();
};

// PhrasableImageWidgetFactory
var generatePhrasableImageWidget = function($wrapper){
  return new PhrasableImageWidget({
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
    var phrasingImageWrapper = generatePhrasableImageWidget($(this).closest('.phrasable-image-wrapper'));
    phrasingImageWrapper.showChosenImage();
  });

  $('.phrasable-image-wrapper label.discard-change').on('click', function(){
    var phrasingImageWrapper = generatePhrasableImageWidget($(this).closest('.phrasable-image-wrapper'));
    phrasingImageWrapper.discardChosenImage();
  });

  $(".phrasable-image-wrapper form").submit(function(e) {
    var phrasingImageWrapper = generatePhrasableImageWidget($(this).closest('.phrasable-image-wrapper'));
    phrasingImageWrapper.uploadChosenImage();
    e.preventDefault();
  });

});

