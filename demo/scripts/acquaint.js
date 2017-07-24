'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Acquaint = factory());
}(this, function () {

var Acquaint = function(aquaints) {
  this.buffer = 15;
  this.enabled = true;
  this.steps = aquaints;
  this.index = 0;
  this.completeMessage = `That's basically it!`;
  this.elements = [];
};

var getWrapper = function() {
  if(!document.getElementById('acquaint')) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = `<div id="acquaint" class="acquaint-card"></div>`;
    return wrapper.childNodes[0];
  }
  else {
    return document.getElementById('acquaint');
  }
};

var getContents = function(steps, index) {
  var stepCount = steps.length;
  var step = steps[index];
  var text = typeof step.message === 'function' ? step.message() : step.message;
  var title = stepCount > 1 ? `${index+1}/${stepCount} - ${step.title}` : `${step.title}`;
  var el = `
      <div class="acquaint-close">✕</div>
      ${step.title ? `<div class="acquaint-header">${title}</div>` : ''}
      <div class="acquaint-text">${text}</div>
      ${step.button ? `<div class="acquaint-button">${step.button}</div>` : ''}
  `;
  return el;
};

Acquaint.prototype.render = function() {
  var _this = this;
  var step = _this.steps[_this.index];
  var wrapper = getWrapper();
  var template = getContents(_this.steps, _this.index);
  wrapper.innerHTML = template;

  if(step.advance) {
    var event = step.advance.event;
    var element = typeof step.advance.element === 'object' ? step.advance.element : document.querySelector(step.advance.element);
    var originalCallback = element[event];

    var resolve = function(e){
      if(!step.advance.condition && _this.enabled || step.advance.condition(e) && _this.enabled) {

        element[event] = originalCallback;
        if(originalCallback !== null) {
          element[event](e);
        }
        _this.advance();
      }
    };
    originalCallback = element[event];
    element[event] = resolve;
  }
  else if (wrapper.querySelector('.acquaint-button')){
    wrapper.querySelector('.acquaint-button').addEventListener('click', function() {
      _this.advance();
    });
  }
  document.body.appendChild(wrapper);
  _this.elements.push(wrapper);
  wrapper.querySelector('.acquaint-close').onclick = function() {
    // _this.minimize();
    _this.remove();
  };
  this.position();
};

Acquaint.prototype.advance = function() {
  if(this.steps[this.index].callback) {
    this.steps[this.index].callback();
  }
  if(this.index+1 < this.steps.length) {
    this.index++;
    this.render();
  }
  else {
    this.complete();
  }
};

Acquaint.prototype.position = function() {
  var wrapper = this.elements[this.index];
  var target = this.steps[this.index].target;
  var position = this.steps[this.index].position.split('-');
  const ORIENTATION = position[0];
  const ALIGN = position[1];
  const WIN_HEIGHT = window.innerHeight;
  const WIN_WIDTH = window.innerWidth;
  const BUFFER = this.buffer;
  var anchor;
  var top;
  var bottom;
  var left;
  var right;

  if(target === window) {
    anchor = {
      top: -window.scrollY,
      left: 0,
      width: WIN_WIDTH,
      height: WIN_HEIGHT,
    };
    top = BUFFER;
    bottom = anchor.height - BUFFER - wrapper.offsetHeight;
    left = BUFFER;
    right = anchor.width - BUFFER - wrapper.offsetWidth;
    wrapper.style.position = 'fixed';
  }
  else {
    anchor = document.querySelector(target).getBoundingClientRect();
    top = (anchor.top + window.scrollY) - (wrapper.offsetHeight + BUFFER);
    bottom = (anchor.bottom + window.scrollY) + BUFFER;
    left = anchor.left;
    right = anchor.left + (anchor.width - wrapper.offsetWidth);
  }

  switch (ORIENTATION) {
    case 'top':
      top = top;
      left = ALIGN === 'left' ? left : right;
      break;
    case 'bottom':
      top = bottom;
      left = ALIGN === 'left' ? left : right;
      break;
    case 'left':
      left = anchor.left - wrapper.offsetWidth - BUFFER;
      top = ALIGN === 'top' ? anchor.top + window.scrollY : bottom;
      break;
    case 'right':
      left = anchor.left + anchor.width + BUFFER;
      top = ALIGN === 'top' ? anchor.top + window.scrollY : bottom;
      break;
  }
  if(this.steps[this.index].fixed) {
    wrapper.style.position = 'fixed';
    wrapper.style.top = `${top - window.scrollY}px`;
    wrapper.style.left = `${left}px`;
  }
  else {
    wrapper.style.top = `${top}px`;
    wrapper.style.left = `${left}px`;
  }
};

Acquaint.prototype.minimize = function() {
  var _this = this;
  var wrapper = document.createElement('div');
  var stepCount = this.steps.length;
  var title = this.steps[this.index].title;
  var minimized = `<div class="aquaint-minimized">${this.index+1}/${stepCount} - ${title}</div>`;
  var step = this.elements[this.index];
  wrapper.innerHTML = minimized;
  this.enabled = false;
  step.style.display = 'none';
  wrapper.childNodes[0].onclick = function(event) {
    event.target.remove();
    _this.enabled = true;
    step.style.display = 'flex';
  };
  document.body.appendChild(wrapper.childNodes[0]);
};

Acquaint.prototype.remove = function() {
  this.elements[this.index].remove();
  this.enabled = false;
};

Acquaint.prototype.complete = function() {
  var el = this.elements[this.index];
  el.setAttribute('data-complete', this.completeMessage);
  el.classList.add('completed');
  setTimeout(function() {
    el.remove();
  }, 3000);
};

Acquaint.prototype.init = function() {
  var _this = this;
  this.checkForErrors();
  if(document.getElementById('acquaint')){
    document.getElementById('acquaint').remove();
  }
  if(this.enabled) {
    this.render();

    window.onresize = function() {
      _this.position();
    };
  }
};

Acquaint.prototype.checkForErrors = function() {
  for(var i = 0; i < this.steps.length; i++) {
    var step = this.steps[i];
    if(step.button && step.advance) {
      throw new Error('You cannot have both button and advance properties');
    }
  }
};

return Acquaint;
}));
