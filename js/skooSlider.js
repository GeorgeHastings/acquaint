
var skooSlider = {
  allSliders: document.querySelectorAll(".skooSlider"),
  currentSlider: "",
  slideCount:1,
  slideWidth: 0,
  slideAmt: 0,

  getWidth: function(){
    this.slideWidth = document.querySelector(".skooSlider").offsetWidth;
  },
  pageRight: function(){
    this.updadeSlideAmt();

    if(this.slideCount < this.slideAmt-1) {
      this.updadeSlideAmt();
      this.setCount();
      this.slideCount++;
      this.updateCount();
      this.updateImage();
    }
  },
  pageLeft: function(){
    this.updadeSlideAmt();

    if(this.slideCount > 0) {
      this.updadeSlideAmt();
      this.setCount();
      this.slideCount--;
      this.updateCount();
      this.updateImage();
    }
  },
  setCount: function() {
    this.slideCount = this.currentSlider.getAttribute("data-count");
  },
  updateCount: function() {
    this.currentSlider.setAttribute("data-count", this.slideCount);
  },
  updateImage: function() {
    var currentContainer = this.currentSlider.getElementsByClassName("container")[0];
    currentContainer.style.webkitTransform = "translate3d("+(-this.slideCount*this.slideWidth)+"px,0,0)";
    currentContainer.style.MozTransform = "translate3d("+(-this.slideCount*this.slideWidth)+"px,0,0)";
    currentContainer.style.OTransform = "translate3d("+(-this.slideCount*this.slideWidth)+"px,0,0)";
    currentContainer.style.transform = "translate3d("+(-this.slideCount*this.slideWidth)+"px,0,0)";
  },
  updadeSlideAmt: function() {
    this.slideAmt = this.currentSlider.getElementsByTagName("li").length;
  },
  setWidths: function() {
    for ( var i = 0; i < this.allSliders.length; i++ ) {
      var thisContainer = this.allSliders[i].getElementsByClassName("container")[0];
      var slideCount = thisContainer.getElementsByTagName("li").length;
      var thisSlider = this.allSliders[i];
      thisContainer.style.width = slideCount*this.slideWidth+"px";

      for (var j = 0; j < slideCount; j++ ) {
        thisSlider.querySelectorAll("li")[j].style.width = this.slideWidth+"px";
      }
    }
  },
  initSliders: function() {
    for ( var i = 0; i < this.allSliders.length; i++ ) {
      this.allSliders[i].setAttribute("id", Math.floor(Math.random()*90000) + 10000);
      this.allSliders[i].setAttribute("data-count", 0);
    }
  }
};

$(".page-left").on("click", function(){
  var thisId = $(this).parent(".skooSlider").attr("id");
  skooSlider.currentSlider = document.getElementById(thisId);
  skooSlider.setCount();
  skooSlider.pageLeft();
});

$(".page-right").on("click", function(){
  var thisId = $(this).parent(".skooSlider").attr("id");
  skooSlider.currentSlider = document.getElementById(thisId);
  skooSlider.setCount();
  skooSlider.pageRight();
});

$(document).on("ready", function(){
  skooSlider.getWidth();
  skooSlider.setWidths();
  skooSlider.initSliders();
});

$(window).on("resize", function(){
  skooSlider.getWidth();
  skooSlider.setWidths();
});