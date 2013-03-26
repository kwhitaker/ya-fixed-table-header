Yet Another Fixed Table Header
=====================

A small(ish) jQuery plugin that gives an assigned table a fixed header, which stays
in place as the data is scrolled through.

## Usage

Make sure you're using `jQuery 1.8+`, then simply link to the appropriate javascript and stylesheets

```
<script src="/javascripts/jquery.ya-fixed-table-header.js"></script>
<link rel="stylesheet" href="/stylesheets/ya-fixed-table-header.css">
```

From there, just call it against a table as you would any other jQuery plugin:

```
$(document).ready(function(){
  $("#some-table").yaFixedHeader();
});
```

## Options
There are a few options which can be called on the plugin.

* `width` - defaults to `auto` (which is 100%), but can be set to anything you'd like.
* `height` - defaults to `auto` (which is 100%), but can be set to anything you'd like.
* `wrapClasses` - optional classes to be applied to the outer wrapper.
* `headerClasses` - optional classes to be applied to the fixed header element.
* `cellClasses` - optional classes to be applied to the header "cells".
* `paddedTable` - adds "padding" to the left and right of the table, but keeps the header full-width.

## Examples

## How it's different
I wrote this plugin because I had a very specific set of requirements for a project, and because
none of the other plugins I found worked in a way that was useful to me.  Most of them duplicated
the `thead` with another one, which was just bizarre, in my opinion.

This plugin instead creates an HTML5 `header` element, which duplicates the html and spacing of the
`th` elements contained within the `thead` of a table.  This makes more sense to me, since divs can take
any `position` styling you want, **and** it allows you to use border-collapsing on your tables with ease (one of my requirements).

### License (MIT)
Copyright (c) 2013 Kevin Whitaker

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, 
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or 
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
SOFTWARE.

