 var toggleImgZoom = function (el){
    thisSrc = el.attr("src");

    if(el.hasClass("zoomed")){
      $(".image-overlay").removeClass("display");
      $(".image-overlay img").attr("src", "");
    }
    else {
      $(".image-overlay img").attr("src", thisSrc);
      setTimeout(function(){
        $(".image-overlay").addClass("display");
      }, 0);  
    }
  }
  
  var addZoom = function (){
    $(".zoomable").find("img").addClass("zoomable");
  }
  
  $(document).on("click", "img.zoomable", function(){
    el = $(this);
    toggleImgZoom(el);
  });

  $(".image-overlay").on("click", function(){
    $(this).removeClass("display");
  })

$(document).on("ready", function(){
   addZoom();            
});