// Generated by CoffeeScript 1.6.1

/*
jQuery.ya-fixed-table-header.js
Yet Another Fixed Table Header
A plugin for creating scrollable tables with fixed headers
version 1.0, March 26, 2013
by Kevin Whitaker
*/


(function() {

  (function($) {
    var reSizeTable, scrollWatch;
    $.yaFixedHeader = {
      defaults: {
        height: "auto",
        width: "auto",
        wrapClasses: "",
        headerClasses: "",
        cellClasses: "",
        paddedTable: false
      }
    };
    $.fn.yaFixedHeader = function(options) {
      var _this = this;
      options = $.extend({}, $.yaFixedHeader.defaults, options);
      /*
      If we need a padded table, go ahead and add the class
      */

      if (options.paddedTable === true) {
        options.wrapClasses = options.wrapClasses.concat(" padded-table");
      }
      return this.each(function() {
        /*
        If there's no thead, then there's really no reason for a fixed header
        */

        var header, headerTemplate, wrapper, wrapperHeight, wrapperMarginLeft, wrapperTemplate, wrapperWidth;
        if ($("thead", _this).length > 0) {
          /*
          Move the table into a wrapper object
          */

          wrapperTemplate = "<div class=\"ya-fixed-header-wrap " + options.wrapClasses + "\"/>";
          wrapper = $(wrapperTemplate).insertBefore(_this);
          $(_this).detach().appendTo(wrapper);
          /*
          If a height was provided, use it. Otherwise default to the height of the parent.
          */

          if (options.height !== "auto") {
            wrapperHeight = options.height;
          } else {
            wrapperHeight = wrapper.parent().height() - wrapper.parent().offset().top + wrapper.offset().top;
          }
          if (options.width === "auto" || "100%") {
            if (options.paddedTable === true) {
              wrapperWidth = wrapper.parent().width() + (wrapper.parent().outerWidth() - wrapper.parent().width());
              wrapperMarginLeft = -(wrapper.parent().outerWidth() - wrapper.parent().width()) / 2;
            } else {
              wrapperWidth = wrapper.parent().width();
              wrapperMarginLeft = 0;
            }
          }
          wrapper.css({
            width: wrapperWidth,
            height: wrapperHeight,
            "margin-left": wrapperMarginLeft
          });
          /*
          Build the header
          */

          headerTemplate = "<header class=\"ya-fixed-header-header " + options.headerClasses + "\"/>";
          header = $(headerTemplate).prependTo(wrapper);
          /*
          Create the header cells
          */

          $("thead th", _this).each(function(index, el) {
            var cell, table, tableMargin, thTemplate;
            el = $(el);
            table = el.parents("table");
            tableMargin = parseInt(table.css("margin-left"));
            thTemplate = "<div class=\"ya-fixed-header-cell " + options.cellClasses + "\">" + (el.html()) + "</div>";
            cell = $(thTemplate).appendTo(header);
            /*
            Have to wait for the cells to be created before we modify their CSS
            */

            return setTimeout((function() {
              cell.css({
                width: el.outerWidth(),
                height: el.height(),
                padding: el.css("padding"),
                "padding-left": parseInt(el.css("padding-left")) + tableMargin,
                "text-align": el.css("text-align")
              });
              return el.data({
                headerCell: cell,
                table: table
              });
            }));
          });
          /*
          We don't need the TH anymore for display purposes, so hide it
          BUT we do need it for resizing, so keep it's visiblity "hidden"
          which still affects the DOM
          */

          $("thead", _this).css("visibility", "hidden");
        }
        if (options.width === ("auto" || "100%") || options.height === ("auto" || "100%")) {
          $(window).on("resize", function(e) {
            var table;
            table = $(_this);
            return $(window).resize(function() {
              return reSizeTable(table, options);
            });
          });
        }
        return $(wrapper).scroll(function() {
          return scrollWatch(wrapper, header);
        });
      });
    };
    reSizeTable = function(table, options) {
      var header, wrapper, wrapperHeight, wrapperMarginLeft, wrapperWidth;
      wrapper = table.parents(".ya-fixed-header-wrap");
      header = $(".ya-fixed-header-header", wrapper);
      if (options.width === "auto" || "100%") {
        if (options.paddedTable === true) {
          wrapperWidth = wrapper.parent().width() + (wrapper.parent().outerWidth() - wrapper.parent().width());
          wrapperMarginLeft = -(wrapper.parent().outerWidth() - wrapper.parent().width()) / 2;
        } else {
          wrapperWidth = wrapper.parent().width();
          wrapperMarginLeft = 0;
        }
      }
      if (options.height === "auto" || "100%") {
        wrapperHeight = wrapper.parent().height() - wrapper.parent().offset().top + wrapper.offset().top;
      } else {
        wrapperHeight = options.height;
      }
      wrapper.css({
        width: wrapperWidth,
        height: wrapperHeight,
        "margin-left": wrapperMarginLeft
      });
      return $("thead th", table).each(function(index, el) {
        var cell, tableMargin;
        el = $(el);
        cell = $(el.data("headerCell"));
        table = $(el.data("table"));
        tableMargin = parseInt(table.css("margin-left"));
        return cell.css({
          width: el.outerWidth(),
          height: el.outerHeight(),
          padding: el.css("padding"),
          "padding-left": parseInt(el.css("padding-left")) + tableMargin
        });
      });
    };
    return scrollWatch = function(wrapper, header) {
      header.css("top", wrapper.scrollTop());
      return false;
    };
  })(jQuery);

}).call(this);
