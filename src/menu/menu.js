/**
 * @fileoverview Fixed top menu (navbar) for VisFlow.
 */

'use strict';

/** @const */
visflow.menu = {};

/** @private @const {number} */
visflow.menu.TOOLTIP_DELAY_ = 1000;

/**
 * Initializes the menu.
 */
visflow.menu.init = function() {
  var navbar = $('.visflow > .navbar-fixed-top');

  // Diagram dropdown
  var diagram = navbar.find('#diagram');
  diagram.find('#new').click(function() {
    visflow.diagram.new();
  });
  diagram.find('#save').click(function() {
    visflow.diagram.save();
  });
  diagram.find('#load').click(function() {
    visflow.diagram.load();
  });

  // Edit dropdown
  var edit = navbar.find('#edit');
  edit.find('#add-node').click(function() {
    visflow.nodePanel.toggle(true);
  });

  // Alt hold
  var alted = navbar.find('#alted');
  alted.click(function() {
    visflow.interaction.toggleAltHold();
    visflow.menu.updateAlt();
  });

  // VisMode button
  var visMode = navbar.find('#vis-mode');
  visMode
    .click(function() {
      visflow.flow.toggleVisMode();
      visMode.children('.btn').toggleClass('active');
    })
    .on('mouseenter', function() {
      visflow.flow.previewVisMode(true);
    })
    .on('mouseleave', function() {
      visflow.flow.previewVisMode(false);
    });

  var help = navbar.find('#help');
  help.find('#documentation').click(function() {
    visflow.documentation();
  });
  help.find('#about').click(function() {
    visflow.about();
  });

  var upload = navbar.find('#upload');
  upload.click(function() {
    visflow.upload.dialog();
  });

  navbar.find('.to-tooltip').tooltip({
    delay: visflow.menu.TOOLTIP_DELAY_
  });
};

/**
 * Updates the alt button's active class to reflect the system's alted state.
 */
visflow.menu.updateAlt = function() {
  var alted = visflow.interaction.isPressed(visflow.interaction.keyCodes.ALT);
  var btnAlt = $('.visflow > .navbar-fixed-top #alted > .btn');
  if (alted) {
    btnAlt.addClass('active');
  } else {
    btnAlt.removeClass('active');
  }
};
