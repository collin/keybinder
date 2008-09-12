// Look, I'm like all the cool kids!
;(function(_) {

_.special_keys = {
	27:'esc',
	27:'escape',
	9:'tab',
	32:'space',
	13:'return',
	13:'enter',
	8:'backspace',

	145:'scrolllock',
	145:'scroll_lock',
	145:'scroll',
	20:'capslock',
	20:'caps_lock',
	20:'caps',
	144:'numlock',
	144:'num_lock',
	144:'num',
	
	19:'pause',
	19:'break',
	
	45:'insert',
	36:'home',
	46:'delete',
	35:'end',
	
	33:'pageup',
	33:'page_up',
	33:'pu',

	34:'pagedown',
	34:'page_down',
	34:'pd',

	37:'left',
	38:'up',
	39:'right',
	40:'down',

	112:'f1',
	113:'f2',
	114:'f3',
	115:'f4',
	116:'f5',
	117:'f6',
	118:'f7',
	119:'f8',
	120:'f9',
	121:'f10',
	122:'f11',
	123:'f12',
	
	188:',',
	190:'.'
};

_.shift_nums = {
	"`":"~",
	"1":"!",
	"2":"@",
	"3":"#",
	"4":"$",
	"5":"%",
	"6":"^",
	"7":"&",
	"8":"*",
	"9":"(",
	"0":")",
	"-":"_",
	"=":"+",
	";":":",
	"'":"\"",
	",":"<",
	".":">",
	"/":"?",
	"\\":"|"
};
_.fn.extend({
  keybindings: function(bindings) {
    var old = this.data('__keybindings__') || {};
    if(bindings) {
      return this.data('__keybindings__', _.extend(old, bindings));
    } 
    return old;
  }
  
  ,keybind: function(binding, fn) {
    var bindings = {}
      ,that = this;
    bindings[binding] = fn;
    this.keybindings(bindings);
    if(!this.data("__keybound__")) {
      this.data("__keybound__", true);
      this.keydown(function(e){
        var bindings = that.keybindings()
          ,binding
          ,keys
          ,modified
          ,matched
          ,modKeys = 'shift ctrl alt meta'.split(/ /)
          ,key; 
        
        if(_.special_keys[e.keyCode]) key = _.special_keys[e.keyCode];        
        else if(e.which == 188) key=","; //If the user presses , when the type is onkeydown
			  else if(e.which == 190) key="."; //If the user presses , when the type is onkeydown
        else if(e.which != 0) key = String.fromCharCode(e.which); 
        
        for(binding in bindings) {
          modified = true;
          _(modKeys).each(function() {
            // false if the modifier is wanted, but it isn't given
            if(binding.match(this) !== null) modified = e[this+"Key"];
            //console.log(binding.match(this) !== null, this, binding, modified, e[this+"Key"])
          });
          keys = binding.replace(/shift|ctrl|alt|meta/, '').split(/\++/);
          matched = false;
          _(keys).each(function() {
            if(this !== "") matched = (this == key);
          });
          if(modified && matched) {
            bindings[binding](e);
            e.preventDefault();
          }
        }
      });
    }
    return this;
  }
});  
})(jQuery);
