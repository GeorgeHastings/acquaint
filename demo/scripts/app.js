'use strict';

var intro = new Acquaint([
  {
    title: 'Welcome',
    message: 'Welcome to Acquaint. This floating box is what a step looks like.',
    button: 'Next',
    target: '.intro p',
    position: 'bottom-left'
  },
  {
    title: 'Navigating',
    message: 'While "next" buttons are nice, it\'s much more compelling to advance by doing things. For instance, scroll down to the demo.',
    target: '.intro p',
    position: 'bottom-left',
    advance: {
      element: window,
      event: 'onscroll',
      condition: () => {return window.scrollY > 30;}
    },
  },
  {
    title: 'Your Name',
    message: 'Learning by doing is much better right? Try typing your name in that field and press enter.',
    target: '.demo input',
    position: 'top-right',
    advance: {
      element: '.demo input',
      event: 'onkeyup',
      condition: (e) => {return e.keyCode === 13;}
    },
  },
  {
    title: 'Reading Data',
    message: () => {return `Hello ${document.getElementById('userName').value}! Acquaint can get user input dynamically as you move through.`;},
    button: 'What else?',
    target: '.demo input',
    position: 'top-left',
  },
  {
    title: 'Other Inputs',
    message: 'Try choosing one of these next.',
    target: '.radio-group',
    position: 'top-right',
    advance: {
      element: '.radio-group',
      event: 'onchange'
    },
  },
  {
    title: 'Variable Messages',
    message: () => {
      var radiogroup = document.querySelector('input[name="radiobuttons"]:checked');
      var response;
      switch(radiogroup.value) {
        case 'ok': {
          response = 'OK isn\'t bad. Good news is';
          break;
        }
        case 'great': {
          response = 'That\'s great! So is the fact that';
          break;
        }
        case 'whatever': {
          response = 'One thing that isn\'t whatever is that';
          break;
        }
      }
      return response += ' messages can return variable outcomes.';
    },
    button: 'Cool',
    target: '.radio-group',
    position: 'top-right',
  }
]);

intro.init();
