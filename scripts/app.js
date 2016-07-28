'use strict';

var UI = {
  questionFlow: {
    signposts: document.querySelectorAll('.signpost li'),
    questions: document.querySelectorAll('.question'),
    index: 0,
    enableButton: function() {
      console.log('it worked');
      document.getElementById('nextQuestion').removeAttribute('disabled');
    },
    nextQuestion: function() {
      UI.questionFlow.questions[UI.questionFlow.index].style.display = 'none';
      UI.questionFlow.index++;
      UI.questionFlow.questions[UI.questionFlow.index].style.display = 'block';
      document.getElementById('nextQuestion').setAttribute('disabled', true);
      UI.questionFlow.updateSignPost();
      UI.repaint();
    },
    prevQuestion: function() {
      UI.questionFlow.questions[UI.questionFlow.index].style.display = 'none';
      UI.questionFlow.index--;
      UI.questionFlow.questions[UI.questionFlow.index].style.display = 'block';
      document.getElementById('nextQuestion').removeAttribute('disabled');
      UI.questionFlow.updateSignPost();
      UI.repaint();
    },
    updateSignPost: function() {
      for (var i = 0; i < UI.questionFlow.signposts.length; i++) {
        UI.questionFlow.signposts[i].classList.remove('active');
      }
      UI.questionFlow.signposts[UI.questionFlow.index].classList.add('active');
    }
  },
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
  bindToMany: function(elements, eventType, fn) {
    var els = document.querySelectorAll(elements);
    for(var i = 0; i < els.length; i++) {
      els[i][eventType] = fn;
    }
  },
  bindEvents: function() {
    document.getElementById('resourcesLink').onclick = UI.toggleResources;
    document.getElementById('nextQuestion').onclick = UI.questionFlow.nextQuestion;
    document.getElementById('prevQuestion').onclick = UI.questionFlow.prevQuestion;
    UI.bindToMany('input[type="radio"]', 'onchange', UI.questionFlow.enableButton);
  }
};

UI.bindEvents();
