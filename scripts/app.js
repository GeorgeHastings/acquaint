'use strict';

var UI = {
  scrolling: false,
  currentTop: 0,
  resourcesOpen: false,
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
  autoHideHeader: function() {
    var currentTop = document.body.scrollTop;
    var scrollingDown = currentTop > UI.previousTop;
    if(scrollingDown) {
      document.getElementById('header').classList.add('hidden');
    }
    else {
      document.getElementById('header').classList.remove('hidden');
    }
    UI.previousTop = currentTop;
    UI.scrolling = false;
  },
  showHideHeader: function() {
    if(!UI.scrolling) {
      UI.scrolling = true;
      (!window.requestAnimationFrame) ? setTimeout(UI.autoHideHeader, 250) : requestAnimationFrame(UI.autoHideHeader);
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
    window.onscroll = UI.showHideHeader;
    if (document.getElementById('nextQuestion'), document.getElementById('prevQuestion')) {
      document.getElementById('nextQuestion').onclick = UI.questionFlow.nextQuestion;
      document.getElementById('prevQuestion').onclick = UI.questionFlow.prevQuestion;
      UI.bindToMany('input[type="radio"]', 'onchange', UI.questionFlow.enableButton);
    }
  }
};

UI.bindEvents();
