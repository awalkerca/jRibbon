(function($){  
  $.fn.extend({
    ribbon: function(options) {

      var options =  $.extend({
        darken_by: 20,
        left_curl: true,
        right_curl: true,
        triangle_width: 15,
    		direction: 'up'
      }, options);
      return this.each(function() {
        var o = options;								              //params to be used
        var ribbon = $(this);							            //root item to be "ribbon-ed"                
        var color = ribbon.css('backgroundColor');	  //background colour of root item
        var height = ribbon.outerHeight();			      //height, including any padding, margins and borders		
        var width = ribbon.outerWidth();				      //width, including any padding, margins and borders
        var dark_color = darken(color,o.darken_by);
        ribbon.wrap('<div class="rectangle"></div>');	//add container to ribbon to group triangles
        ribbon.parent().css({
        	position: 'relative',
        	zIndex: '50',
        	display: 'inline-block'
        });
    		
    		var corner_css = {
      	  'border-style': 'solid',
      	  'border-width': o.triangle_width + 'px',
      	  'height': '0px',
      	  'width': '0px',
      	  'position': 'absolute',
      	  'z-index': '-1'
      	};
    		
        if ((o.left_curl) && (o.right_curl)){
          ribbon.css('width',ribbon.width() + (2*o.triangle_width));
          width = ribbon.outerWidth();					    //reset width now that corners are accounted for
        }

        if (o.left_curl){
          ribbon.parent().css('left',-o.triangle_width);
          $('<div></div>').addClass('triangle triangle-l').css(
            $.extend({
              'border-color': 'transparent ' + dark_color + 'transparent transparent',
              'top': (o.direction == 'down') ? ribbon.position().top - parseInt(o.triangle_width) : ribbon.position().top + parseInt(height) - parseInt(o.triangle_width),
              'left': ribbon.position().left - o.triangle_width,
            },corner_css)  
          ).appendTo($(ribbon).parent());
        }
        
        if (o.right_curl){
          if (!o.left_curl){
            ribbon.parent().css('right',-o.triangle_width);
          }
          $('<div></div>').addClass('triangle triangle-r').css(
            $.extend({
              'border-color': 'transparent transparent transparent '+ dark_color,
              'top': (o.direction == 'down')? ribbon.position().top - o.triangle_width : ribbon.position().top + parseInt(height) - o.triangle_width,
              'left': ribbon.position().left + width - (o.triangle_width),
      			},corner_css)  
          ).appendTo($(ribbon).parent());
        }
      });
      
      // convert hex to rgb
      function hex2rgb(hex) {
        hex = (hex.substr(0,1)=="#") ? hex.substr(1) : hex;
        return 'rgb('+parseInt(hex.substr(0,2), 16) + ','+ parseInt(hex.substr(2,2), 16)+ ',' + parseInt(hex.substr(4,2), 16) + ')';
      }

    	//darkden a given colour by a percentage
      function darken(color,percentage){
        var local_color = color;
        var deduction = Math.round(255 * (percentage / 100));
        if (color.charAt(0)=='#'){
            local_color = hex2rgb(color.substring(1));
        }
        var parts = new Array();
        parts = local_color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var r = (parts[1] - deduction > 0) ? parts[1] - deduction : 0;
        var g = (parts[2] - deduction > 0) ? parts[2] - deduction : 0;
        var b = (parts[3] - deduction > 0) ? parts[3] - deduction : 0;
        return 'rgb('+r+','+g+','+b+')';
      }
    }
  });
})(jQuery);