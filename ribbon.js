(function($){
    $.fn.extend({
        //pass the options variable to the function
        ribbon: function(options) {

            //Set the default values
            var defaults = {
                darken_by: 20,
                left_curl: true,
                right_curl: true,
                triangle_width: 15,
				direction: 'up'
            }
            var options =  $.extend(defaults, options);
            return this.each(function() {
				var o = options;								//params to be used
				var ribbon = $(this);							//root item to be "ribbon-ed"                
				var color = $(ribbon).css('backgroundColor');	//background colour of root item
				var height = $(ribbon).outerHeight();			//height, including any padding, margins and borders		
				var width = $(ribbon).outerWidth();				//width, including any padding, margins and borders
				var dark_color = darken(color,o.darken_by);
				$(ribbon).wrap('<div class="rectangle"></div>');	//add container to ribbon to group triangles
				$(ribbon).parent().css({
					position: 'relative',
					zIndex: '50',
					display: 'inline-block'
				});
				if ((o.left_curl) && (o.right_curl)){
					$(ribbon).css('width',$(ribbon).width() + (2*o.triangle_width));
					width = $(ribbon).outerWidth();					//reset width
				}
                if (o.left_curl){								//if a left curl is required
					$(ribbon).parent().append('<div class="triangle triangle-l"></div>');
                    var tl_l = $(ribbon).position().left - o.triangle_width;
					var tl_t;
					if (o.direction == 'down'){
						tl_t = $(ribbon).position().top - parseInt(o.triangle_width);
					}else{
						tl_t = $(ribbon).position().top + parseInt(height) - parseInt(o.triangle_width);
					}
                    var tl =$(ribbon).parent().find('.triangle-l');
                    tl.css({
						'border-color': 'transparent ' + dark_color + 'transparent transparent',
						'border-style': 'solid',
						'border-width': o.triangle_width + 'px',
						'top': tl_t,
						'left': tl_l,
						'height': '0px',
						'width': '0px',
						'position':'absolute',
						'z-index': '-1'
					});
                }
                if (o.right_curl){
					$(ribbon).parent().append('<div class="triangle triangle-r"></div>');
                    var tr_l = $(ribbon).position().left + width - (o.triangle_width);
					var tr_t;
					if (o.direction == 'down'){
						tr_t = $(ribbon).position().top - o.triangle_width;
					}else{
						tr_t = $(ribbon).position().top + parseInt(height) - o.triangle_width;
					}
                    var tr = $(ribbon).parent().find('.triangle-r');
                    tr.css({
						'border-color': 'transparent transparent transparent '+ dark_color,
						'top': tr_t,
						'left': tr_l,
						'border-style':'solid',
						'border-width': o.triangle_width + 'px',
						'height': '0px',
						'width': '0px',
						'position': 'absolute',
						'z-index': '-1'
					});
                }

				if ((o.right_curl) && (!o.left_curl)){	//if the right curl is defined, but not the left, offset to the right
					$(ribbon).parent().css('right',-o.triangle_width);
				}else if (o.left_curl){					//if the left curl is defined, then offset to the left
					$(ribbon).parent().css('left',-o.triangle_width);
				}
            });
            // convert hex to rgb
            function hex2rgb(hex) {
                hex = (hex.substr(0,1)=="#") ? hex.substr(1) : hex;
                return 'rgb('+parseInt(hex.substr(0,2), 16) + ','+ parseInt(hex.substr(2,2), 16)+ ',' + parseInt(hex.substr(4,2), 16) + ')';
            }

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