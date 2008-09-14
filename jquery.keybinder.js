// Look, I'm like all the cool kids!
;(function(_) {
  _.special_keys = {
	  27:'esc',
	  9:'tab',
	  32:'space',
	  13:'enter',
	  8:'backspace',

	  145:'scroll_lock',
	  20:'caps_lock',
	  144:'num_lock',
	
	  19:'pause',
	
	  45:'insert',
	  36:'home',
	  46:'delete',
	  35:'end',
	
	  33:'page_up',

	  34:'page_down',

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
      var old = this.data("__keybindings__") || {};
      if(bindings) {
        return this.data("__keybindings__", _.extend(old, bindings));
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
            ,key
            ,requested_presses
            ,presses; 
          
          if(_.special_keys[e.keyCode]) key = _.special_keys[e.keyCode];        
          else if(e.keyCode == 188) key=","; //If the user presses , when the type is onkeydown
			    else if(e.keyCode == 190) key="."; //If the user presses , when the type is onkeydown
          else if(e.charCode != 0) key = String.fromCharCode(e.charCode); 
          
          for(binding in bindings) {
            presses = 0;
            requested_presses = binding.split('+').length;
            modified = true;
            _(modKeys).each(function() {
              // false if the modifier is wanted, but it isn't given
              if(binding.match(this) !== null) modified = e[this+"Key"];
              if(e[this+"Key"]) presses++;
              //console.log(binding.match(this) !== null, this, binding, modified, e[this+"Key"])
            });
            keys = binding.replace(/shift|ctrl|alt|meta/, '').split(/\++/);
            matched = false;
            _(keys).each(function() {
              if(this !== "") 
                if(this == key) {
                  matched = true;
                  presses++;
                }
            });
            console.log(key, requested_presses, presses)
            if(modified && matched && presses === requested_presses) {
              bindings[binding].call(this, e);
              e.preventDefault();
              break;
            }
          }
        });
      }
      return this;
    }
  });  
})(jQuery);
