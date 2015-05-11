function PhrasingImageWidget(options){
  this.fileInput = options.fileInput;
  this.$fileInputLabel = options.$fileInputLabel;
  this.$discardChangeLabel = options.$discardChangeLabel;
  this.$wrapper = options.$wrapper;
  this.$image = options.$image;
  this.$form = options.$form;
  this.$submitButton = options.$submitButton;
}

PhrasingImageWidget.prototype.showChosenImage = function(){
  this.rememberOriginalImage();
  this.setChosenImageAsSource();
  this.$fileInputLabel.hide();
  this.$discardChangeLabel.show();
  this.$submitButton.show();
};

PhrasingImageWidget.prototype.setChosenImageAsSource = function(){
  if (this.fileInput.files && this.fileInput.files[0]) {
    var reader = new FileReader();
    var widget = this;
    reader.onload = function (e) {
      widget.$image.attr('src', e.target.result);
    };
    reader.readAsDataURL(this.fileInput.files[0]);
  }
};

PhrasingImageWidget.prototype.rememberOriginalImage = function(){
  this.$image.data('original-src', this.$image.attr('src'));
};

PhrasingImageWidget.prototype.discardChosenImage = function(){
  this.revertImageToOriginal();
  this.$form[0].reset();
  this.$fileInputLabel.show();
  this.$discardChangeLabel.hide();
  this.$submitButton.hide();
};

PhrasingImageWidget.prototype.revertImageToOriginal = function(){
  this.$image.attr('src', this.$image.data('original-src'));
  this.$image.removeData('original-src');
};

PhrasingImageWidget.prototype.uploadChosenImage = function(){
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
    error: function(data){
      widget.handleFailedUpload(data);
    }
   });
};

PhrasingImageWidget.prototype.handleSuccessfullUpload = function(data){
  this.$form[0].reset();
  this.addNewSrcToImage(data.image.url);
  this.$fileInputLabel.show();
  this.$discardChangeLabel.hide();
  this.$submitButton.hide();
  this.showSuccessNotification(data);
};

PhrasingImageWidget.prototype.showSuccessNotification = function(data){
  alert('Image successfully updated');
};

PhrasingImageWidget.prototype.addNewSrcToImage = function(imgSrc){
  this.$image.attr('src', imgSrc);
  this.$image.removeData('original-src');
};

PhrasingImageWidget.prototype.handleFailedUpload = function(data){
  this.$form[0].reset();
  this.revertImageToOriginal();
  this.$fileInputLabel.show();
  this.$discardChangeLabel.hide();
  this.$submitButton.hide();
  this.showFailureNotification(data);
};

PhrasingImageWidget.prototype.showFailureNotification = function(data){
  alert(data.responseJSON.errors);
};

