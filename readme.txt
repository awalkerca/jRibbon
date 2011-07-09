#################################################
#            jQuery Ribbon                      #
#################################################
About:
This plugin generates a 3D ribbon effect for a given element.

Required CSS:
- The element should have a width defined in some way.
- The element should be positioned relative or absolute.
- The element should have a background-colour declared.

Default Usage:
$('{selector}').ribbon();

Attributes:

darken_by: integer 
This represents a percentage to darken the ribbon fold.
The default is 20 (%).

left_curl, right_curl: boolean
Setting this to false will prevent the ribbon from curling under
on the given side.
The default for both is true.

triangle_width: integer
This defines the size of the triangle, in pixels.
The default is 15.