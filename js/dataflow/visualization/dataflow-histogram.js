
"use strict";

var extObject = {

  initialize: function(para) {
    DataflowVisualization.initialize.call(this, para);
    this.inPorts = [
      {
        id: "in",
        type: "in-single"
      }
    ];
    this.outPorts = [
      {
        id: "out",
        type: "out-multiple"
      }
    ];
    this.prepare();
  },

  show: function() {

    this.base.show.call(this); // call parent settings

    this.jqicon = $("<div></div>")
      .addClass("dataflow-histogram-icon")
      .appendTo(this.jqview);
  }

};

var DataflowHistogram = DataflowVisualization.extend(extObject);