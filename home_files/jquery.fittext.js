/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY,
		  'useWidthAlg' : false,
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function() {
	      var t = $this.text();
      	if (t.length > 0) {
      		var w = $this.width();
      		var h = $this.height();
			    $this.css('font-size', settings.useWidthAlg ?
				    (h>0?Math.min(h * 0.8, (w / (t.length)) * 2):(w / (t.length)) * 2)
				    : Math.max(Math.min(w / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
		    };
	    }
	    // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
