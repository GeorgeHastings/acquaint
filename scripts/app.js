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
  bindEvents: function() {
    document.getElementById('resourcesLink').onclick = UI.toggleResources;
  }
};

UI.bindEvents();
