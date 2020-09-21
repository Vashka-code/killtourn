$(document).ready(function(){
  // Заменяю img с путём к svg, на тот же svg
  $('img.svg').each(function(){
    var $img = $(this);
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);

    }, 'xml');
  });
  
  // fancybox
  $('.fancybox').fancybox()

   // Настройка якоря 
   $('a.anchor').on('click', function(e){
    e.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });

  // меню в моб. версии
  $('.menuBtn').click(function (e) { 
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('active');
  });

  // input и вставка картинки
  const fileInputs = document.querySelectorAll('input[type=file]');
  const image = document.querySelector('.addImage');

  for(let i = 0 ; i < fileInputs.length; i++){
    fileInputs[i].addEventListener('change', function() {
      if (this.files) {
        const file = this.files[0];
        $('.addImage').addClass('newImg');
        if (!checkFileType(file.name)) {
          console.log(`${ file.name } is not an image`);
          return;
        }
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          image.src = e.target.result;
        }
      }
    })
  }

  function checkFileType(filename) {
    const filenameParts = filename.split('.');
    const extension = filenameParts[filenameParts.length - 1];
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'tiff':
      case 'webp':
        return true;

      default:
        return false;
    }
  }
});