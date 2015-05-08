var Phrasing = Phrasing || {};

var PhrasingPlus = PhrasingPlus || {};

Phrasing.isEditModeEnabled = function(){
  if($.cookie('editing_mode') === null){
    $.cookie('editing_mode', 'true');
  }

  return $.cookie("editing_mode") === "true" ? true : false;
};

function PhrasableImageWrapper(options){
  this.fileInput       = options.fileInput;
  this.$fileInputLabel = options.$fileInputLabel;
  this.$wrapper        = options.$wrapper;
  this.$image          = options.$image;
  this.$submitButton   = options.$submitButton;
}

PhrasableImageWrapper.prototype.handleImageUpload = function(){
  this.rememberOriginal();
  this.showChosenImage();
  this.$fileInputLabel.hide();
  this.$submitButton.show();
};

PhrasableImageWrapper.prototype.showChosenImage = function(){
  if (this.fileInput.files && this.fileInput.files[0]) {
    var reader = new FileReader();

    var widget = this;

    reader.onload = function (e) {
      widget.$image.attr('src', e.target.result);
    };

    reader.readAsDataURL(this.fileInput.files[0]);
  }
};

PhrasableImageWrapper.prototype.rememberOriginal = function(){
  this.$image.data('original-src', this.$image.attr('src'));
};


$(document).ready(function(){
  if(Phrasing.isEditModeEnabled()){
    $('.phrasable-image-wrapper').addClass('phrasable-on');
  }

  $('.phrasable-image-wrapper input[type=file]').change(function(){

    var phrasingImageWrapper = new PhrasableImageWrapper({
      fileInput : this,
      $fileInputLabel : $(this).prev('label'),
      $wrapper : $(this).closest('.phrasable-image-wrapper'),
      $image : $(this).closest('.phrasable-image-wrapper').find('img.phrasable-image'),
      $submitButton : $(this).closest('.phrasable-image-wrapper').find('button[type=submit]')
    });

    phrasingImageWrapper.handleImageUpload();
  });
});

