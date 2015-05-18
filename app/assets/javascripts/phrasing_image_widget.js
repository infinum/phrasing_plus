function PhrasingImageWidget(options){
  var fileInput = options.fileInput;
  var $fileInputLabel = options.$fileInputLabel;
  var $discardChangeLabel = options.$discardChangeLabel;
  var $wrapper = options.$wrapper;
  var $image = options.$image;
  var $form = options.$form;
  var $submitButton = options.$submitButton;

  var showSaveDiscardButtons = function() {
    $fileInputLabel.hide();
    $discardChangeLabel.css('display', 'block');
    $submitButton.css('display', 'block');
  };

  var hideSaveDiscardButtons = function() {
    $fileInputLabel.css('display', 'block');
    $discardChangeLabel.hide();
    $submitButton.hide();
  };

  var getImageSrc = function(){
    if($image.size() !== 0){
      return $image.attr('src');
    }else{
      return $wrapper.css('background-image');
    }
  };

  var setImageSrc = function(src){
    if($image.size() !== 0){
      $image.attr('src', src);
    }else{
      $wrapper.css('background-image', src);
    }
  };

  var showChosenImage = function(){
    rememberOriginalImage();
    setChosenImageAsSource();
    showSaveDiscardButtons();
  };

  var setChosenImageAsSource = function(){
    if (fileInput.files && fileInput.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        if($image.size() !== 0){
          setImageSrc(e.target.result);
        }else{
          setImageSrc('url(' + e.target.result + ')');
        }
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  };

  var rememberOriginalImage = function(){
    $wrapper.data('original-src', getImageSrc());
  };

  var discardChosenImage = function(){
    revertImageToOriginal();
    $form.get(0).reset();
    hideSaveDiscardButtons();
  };

  var revertImageToOriginal = function(){
    setImageSrc($wrapper.data('original-src'));
    $wrapper.removeData('original-src');
  };

  var uploadChosenImage = function(){
    $.ajax({
      type: 'PUT',
      url: $form.attr('action'),
      data: new FormData( $form[0] ),
      processData: false,
      contentType: false,
      success: function(data) {
        handleSuccessfullUpload(data);
      },
      error: function(data) {
        handleFailedUpload(data);
      }
     });
  };

  var handleSuccessfullUpload = function(data){
    $form.get(0).reset();
    addNewSrcToImage(data.image.url);
    hideSaveDiscardButtons();
    showSuccessNotification(data);
  };

  var showSuccessNotification = function(data){
    alert('Image successfully updated');
  };

  var addNewSrcToImage = function(imgSrc){
    if($image.size() !== 0){
      setImageSrc(imgSrc);
    }else{
      setImageSrc('url(' + imgSrc + ')');
    }
    $wrapper.removeData('original-src');
  };

  var handleFailedUpload = function(data){
    $form.get(0).reset();
    revertImageToOriginal();
    hideSaveDiscardButtons();
    showFailureNotification(data);
  };

  var showFailureNotification = function(data){
    alert(data.responseJSON.errors);
  };

  return { showChosenImage: showChosenImage,
           discardChosenImage: discardChosenImage,
           uploadChosenImage: uploadChosenImage };
}
