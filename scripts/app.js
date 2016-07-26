'use strict';

var UI = {
  resourcesOpen: false,
  toggleResources: function() {
    if(UI.resourcesOpen) {
      document.getElementById('dropdownResources').classList.remove('open');
      UI.resourcesOpen = false;
    }
    else {
      document.getElementById('dropdownResources').classList.add('open');
      UI.resourcesOpen = true;
    }
  },
  repaint: function() {
    var classname = '_loadin';
    var elements = document.querySelectorAll('.'+classname);
    for(var i = 0; i < elements.length; i++) {
      elements[i].classList.remove(classname);
      console.log(elements[i].offsetWidth);
      elements[i].classList.add(classname);
    }
  },
  bindEvents: function() {
    document.getElementById('resourcesLink').onclick = UI.toggleResources;
    document.getElementById('nextQuestion').onclick = UI.repaint;
  }
};

UI.bindEvents();
