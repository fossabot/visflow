
/*
 * dataflow-filter base class
 */

"use strict";

var extObject = {

  nullValueString: "{N/A}",

  initialize: function(para) {
    DataflowFilter.base.initialize.call(this, para);

    this.viewHeight = 90; // height + padding
    this.dimension = null;
  },

  serialize: function() {
    var result = DataflowFilter.base.serialize.call(this);
    result.dimension = this.dimension;
    return result;
  },

  deserialize: function(save) {
    DataflowFilter.base.deserialize.call(this, save);
    this.dimension = save.dimension;
  },

  show: function() {
    DataflowFilter.base.show.call(this);

    this.jqview
      .removeClass("dataflow-node-shape")
      .addClass("dataflow-node-shape-longflat");

 /*
    this.jqicon = $("<div></div>")
      .appendTo(this.jqview);
*/

    var node = this;
    this.selectDimension = $("<select class='dataflow-select'><option/></select>")
      .appendTo(this.jqview)
      .select2({
        placeholder: "Select"
      })
      .change(function(event){
        node.dimension = event.target.value;
        node.process();

        // push dimension change to downflow
        core.dataflowManager.propagate(node);
      });
    this.updateDimensionList();
    this.selectDimension.select2("val", this.dimension);  // must call after updateDimensionList
  },

  updateDimensionList: function() {
    var dims = this.ports["in"].pack.data.dimensions;
    console.log(dims);
    for (var i in dims) {
      $("<option value='" + i + "'>" + dims[i] + "</option>")
        .appendTo(this.selectDimension);
    }
  },

  filter: function() {
    // filter the data by constraints
  }
};

var DataflowFilter = DataflowNode.extend(extObject);

