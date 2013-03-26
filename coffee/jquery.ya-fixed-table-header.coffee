###
jQuery.ya-fixed-table-header.js
Yet Another Fixed Table Header
A plugin for creating scrollable tables with fixed headers
version 1.0, March 26, 2013
by Kevin Whitaker
###

(($) ->
  $.yaFixedHeader = defaults:
    height: "auto"
    width: "auto"
    wrapClasses: ""
    headerClasses: ""
    cellClasses: ""
    paddedTable: false

  $.fn.yaFixedHeader = (options) ->
    options = $.extend({}, $.yaFixedHeader.defaults, options)

    ###
    If we need a padded table, go ahead and add the class
    ###
    if options.paddedTable is true
      options.wrapClasses = options.wrapClasses.concat(" padded-table")

    @each =>
      ###
      If there's no thead, then there's really no reason for a fixed header
      ###
      if $("thead", @).length > 0

        ###
        Move the table into a wrapper object
        ###
        wrapperTemplate = "<div class=\"ya-fixed-header-wrap #{options.wrapClasses}\"/>"
        wrapper = $(wrapperTemplate).insertBefore(@)
        $(@).detach().appendTo wrapper

        ###
        If a height was provided, use it. Otherwise default to the height of the parent.
        ###
        if options.height isnt "auto"
          wrapperHeight = options.height
        else
          wrapperHeight = wrapper.parent().height() - wrapper.parent().offset().top + wrapper.offset().top

        if options.width is "auto" or "100%"
          if options.paddedTable is true
            wrapperWidth = wrapper.parent().width() + 
              (wrapper.parent().outerWidth() - wrapper.parent().width())
            wrapperMarginLeft =  -(wrapper.parent().outerWidth() - wrapper.parent().width())/2
          else
            wrapperWidth = wrapper.parent().width()
            wrapperMarginLeft = 0

        wrapper.css
          width: wrapperWidth
          height: wrapperHeight
          "margin-left": wrapperMarginLeft

        ###
        Build the header
        ###
        headerTemplate = "<header class=\"ya-fixed-header-header clear #{options.headerClasses}\"/>"
        header = $(headerTemplate).prependTo wrapper
        header.css
          top: wrapper.parent().offset().top
          left: wrapper.offset().left
          width: wrapper.width()

        ###
        Create the header cells
        ###
        $("thead th", @).each (index, el) ->
          el = $(el)
          table = el.parents("table")
          tableMargin = parseInt(table.css("margin-left"))
          thTemplate = "<div class=\"ya-fixed-header-cell #{options.cellClasses}\">#{el.html()}</div>"
          cell = $(thTemplate).appendTo header

          ###
          Have to wait for the cells to be created before we modify their CSS
          ###
          setTimeout (->
            cell.css
              width: el.outerWidth()
              height: el.outerHeight()
              padding: el.css "padding"
              "padding-left": parseInt(el.css("padding-left")) + tableMargin

            el.data
              headerCell: cell
              table: table
          )

        ###
        We don't need the TH anymore for display purposes, so hide it
        BUT we do need it for resizing, so keep it's visiblity "hidden"
        which still affects the DOM
        ###
        $("thead", @).css "visibility", "hidden"

      if options.width is ("auto" or "100%") or options.height is ("auto" or "100%")
        ###
        Using timeouts here so that we can run the code *after*
        the resizing is done, in theory.
        http://www.jquery4u.com/events/jquery-capture-window-resize-event/
        ###
        $(window).on "resize", (e) =>
          table = $(@)
          $(window).resize ->
            reSizeTable table, options

  reSizeTable = (table, options) ->
    wrapper = table.parents ".ya-fixed-header-wrap"
    header = $(".ya-fixed-header-header", wrapper)

    if options.width is "auto" or "100%"
      if options.paddedTable is true
        wrapperWidth = wrapper.parent().width() + 
          (wrapper.parent().outerWidth() - wrapper.parent().width())
        wrapperMarginLeft =  -(wrapper.parent().outerWidth() - wrapper.parent().width())/2
      else
        wrapperWidth = wrapper.parent().width()
        wrapperMarginLeft = 0

    if options.height is "auto" or "100%"
      wrapperHeight = wrapper.parent().height() - wrapper.parent().offset().top + wrapper.offset().top

    wrapper.css
      width: wrapperWidth
      height: wrapperHeight
      "margin-left": wrapperMarginLeft

    header.css 
      width: wrapper.width()
      top: wrapper.parent().offset().top

    $("thead th", table).each (index, el) ->
      el = $(el)
      cell = $(el.data("headerCell"))
      table = $(el.data("table"))
      tableMargin = parseInt(table.css("margin-left"))

      cell.css
        width: el.outerWidth()
        height: el.outerHeight()
        padding: el.css "padding"
        "padding-left": parseInt(el.css("padding-left")) + tableMargin

) jQuery