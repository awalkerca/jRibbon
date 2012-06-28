(function($){
  $.fn.ribbon = function(options){
    return this.each(function() {
      var ribbon = new Ribbon(this, options);
      ribbon.render();
    });
  }
  function Ribbon(element,options){

    this.element = $(element);
    this.width = this.element.outerWidth();
    this.height = this.element.outerHeight();
    this.options = $.extend({
      darken_by: 20,
      ends: 'both',
      triangle_width: 15,
      direction: 'up',
      shadow: '0 5px 5px rgba(0,0,0,0.5)'
    },options);

    this.dark_color = this.darken(this.element.css('backgroundColor'), this.options.darken_by);
  }

  Ribbon.prototype = {
    render: function render(){
      var container = this.buildContainer(),
          width = $(this.element).width() + this.options.triangle_width * (this.options.ends === 'both'? 2 : 1);

      this.element.css('width',width);
      if(this.options.shadow){
        this.addShadow();
      }
      this.element.replaceWith(
          container.append(
              this.addEnds(container,this.options.ends)).append(this.element.clone()
          )
      );
    },

    buildContainer: function buildContainer(){
      var container = $('<div class="rectangle"></div>');
        container.css({
          position: this.element.css('position'),
          zIndex: '50',
          display: 'inline-block',
          bottom: this.element.css('bottom'),
          top: this.element.css('top'),
          left: this.element.css('left'),
          right: this.element.css('right')
        });
      this.element.css('position','relative');
      return container;
    },

    calculateOffset: function calculateOffset(el){
      var offsetCalc = function(el,direction){
          var val = parseInt($(el).css(direction)),
              offset = isNaN(val) ? 0 : val;
          return offset;
        };

      return -1 * this.options.triangle_width  + offsetCalc(el,'left') + offsetCalc(el,'right');
    },

    addEnds: function addEnds(container,ends){
      var end = "",
          direction = !isNaN(parseInt($(container).css('right'))) ? 'right' : 'left';
      switch(ends){
        case this.ends.left:
          $(container).css(direction, this.calculateOffset(container));
          this.element.css({
            left:0,
            bottom: 'auto',
            right: 'auto'
          });
          return $('<div></div>').addClass('triangle triangle-l').css(
              $.extend(
                  {
                    borderColor: 'transparent ' + this.dark_color + ' transparent transparent',
                    left:  -1 * this.options.triangle_width
                  },
                  this.endCss(),
                  this.endDirectionCss()
              ));
        case this.ends.right:
          return end = $('<div></div>').addClass('triangle triangle-r').css(
              $.extend(
                  {
                    borderColor: 'transparent transparent transparent ' + this.dark_color,
                    right: -1 * this.options.triangle_width
                  },
                  this.endCss(),
                  this.endDirectionCss()
              ));

        case this.ends.both:
          return this.addEnds(container,this.ends.left).after(this.addEnds(container,this.ends.right));
      }
      return end;
    },

    addShadow: function addShadow(){
      this.element.css({
        '-moz-box-shadow': this.options.shadow,
        '-webkit-box-shadow': this.options.shadow,
        'box-shadow': this.options.shadow
      });
    },

    endCss: function endCss(){
      return  {
        borderStyle: 'solid',
        borderWidth: this.options.triangle_width ,
        height: '0px',
        width: '0px',
        position: 'absolute',
        zIndex: '-1'
      };
    },

    endDirectionCss: function endDirectionCss(){
      switch(this.options.direction){
        case 'down':
          return {top: -1 * this.options.triangle_width};
        case 'up':
          return {bottom: -1 * this.options.triangle_width};
      }
    },

    darken: function darken(color,percentage){
      var local_color = color,
          deduction = Math.round(255 * (percentage / 100)),
          parts = new Array(), r, g, b;

      if (color.charAt(0)=='#'){
        local_color = this.hex2rgb(color.substring(1));
      }
      if(parts = local_color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)){
        r = (parts[1] - deduction > 0) ? parts[1] - deduction : 0;
        g = (parts[2] - deduction > 0) ? parts[2] - deduction : 0;
        b = (parts[3] - deduction > 0) ? parts[3] - deduction : 0;
      }else{
        r = g = b = 256;
      }

      return 'rgb('+r+','+g+','+b+')';
    },

    hex2rgb: function hex2rgb(hex){
      var hex = (hex.substr(0,1)=="#") ? hex.substr(1) : hex;
      return 'rgb('+parseInt(hex.substr(0,2), 16) + ','+
          parseInt(hex.substr(2,2), 16)+ ',' +
          parseInt(hex.substr(4,2), 16) + ')';
    },

    ends: {
      both:   'both',
      left:   'left',
      right:  'right'
    }
  }

})(jQuery);