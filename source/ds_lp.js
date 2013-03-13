/* DS_LP */
/* Author: Will Rosenberg (Digital Surgeons)
 * TODO: On Keypress(enter) trigger blur() on last field to convert to decimal so minutes are not lost when form submits.
 * TODO: Since form submits via AJAX and updates the page, script below needs to be rewritten to use $elem.live(). Otherwise page must refresh.
 **/
jQuery.noConflict();
(function($) {
  $(function() {
    
	$('.activity_row input').each(function(){

        // dim vars
        var $this = $(this);
        var val = $this.val();

        // assume this is decimal, since that is the default for LP
        var minutes = to_minutes(val);
        var decimal = val;

        // assign data
        $this.data('minutes', minutes);
        $this.data('decimal', decimal);

	});

    $('.activity_row input').focus(function(){

        // dim vars
        var $this = $(this);
        var val = $this.val();

        // take action if val is not empty.
        if (val) {
            // indentify and convert
            var minutes = to_minutes(val);
            var decimal = val;

            // assign data
            $this.data('minutes', minutes);
            $this.data('decimal', decimal);

            // swap value
            $this.val(minutes);
        }

    }).blur(function(){

        // dim vars
    	var $this = $(this);
    	var val = $this.val();

    	// indentify and convert
    	if (val.indexOf(':') > -1) {
            // assume this is h:mm
            var minutes = val;
    		var decimal = to_decimal(val);

            // assign data
            $this.data('minutes', minutes);
            $this.data('decimal', decimal);

            // swap value
            $this.val(decimal);

    	} else {
            // this is decimal, like it should be.
        }

    });

  });
})(jQuery);


function to_decimal(val) {
    var hmarr = val.split(':');
    var decimal = Math.round( hmarr[0] * 1000 ) / 1000 ;
    decimal = decimal + Math.round( hmarr[1] * 1 / 60 * 1000) / 1000;
	return decimal;
}
function to_minutes(val) {
    var hm = parseFloat(val);
    var hours = parseInt(hm);
    var minutes = Math.round(( hm * 60 ) % 60);
    if (minutes < 10) {
        // make two digits if needed
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes;
}


/* */// END OF FILE
