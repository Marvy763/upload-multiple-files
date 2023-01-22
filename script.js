$(function() {
    var imgData = [],
        uploadLabel = $('#upload')
        preview = $('.preview');
        var filesSum = [];

    $("#post-image").on("change", function()
    {
        var files = !!this.files ? this.files : [];
        if(filesSum.length) files.length = filesSum.length;

        if (!files.length || !window.FileReader) return;

        if(files.length){
          for(var i=0;i<files.length;i++){


            createImage(files[i]);
          }

        }

    });
    function createImage(file){
      // console.log(file.type);
      if (/^image/.test( file.type)){
          var reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onloadend = function(){
              //filesSum.push(this.result);
              filesSum.push(file.name);
              preview.find('ul').prepend('<li style="background-image:url('+this.result+');background-size:cover;background-position:center center;" class="in"><i class="fa fa-close"></i></li>');
              uploadLabel.html(filesSum.length+"file(s)<span>(click to upload more)</span>");
          }
      }
    }

    //removing thumbnail
    $('ul').on('click','li i',function(e){
      var target = $(e.target),
          index = Math.abs(target.parent().index() - filesSum.length)-1;
          target.parent().addClass('out');
          setTimeout(function(){
            target.parent().remove();
          },800);

          filesSum.splice(index,1);
          uploadLabel.html(filesSum.length+"file(s)<span>(click to upload more)</span>");
    });
});