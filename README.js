/*
 !Hark.

 There be keys to be pressed.

 You _will_ want to know which ones they are.

 At a time and place of your choosing. (As long as you choose jQuery)

 And how to choose?

 Spin out your favorite jQuery alias.
*/

var _ = jQuery;

_('.convolution')
  .keybind('a', function(e) {
    // You pressed a!
  })
  .keybind('#', function(e) {
    // You pressed the 'Octothorp'
  });
  .keybind('shift', function(e) {
    // These example callbacks are silly
    // One note, 'this' in the callback is a reference
    // to a jQuery wrapped element that recieved a
    // keydown event.
  });
  
// Use combos!
  _('input')
    .keybind('ctrl+a', callback)
    .keybind('ctrl+shift', cb)
    .keybind('ctrl+shift+enter')
    .keybind('ctrl+>+shift');
    
// See the order really doesn't matter.
// Hmm, what else?

// Oh yeah, the "modifiers" are: shift, ctrl, and alt.
// You can use more than one modifier in a binding.
// All the other keys can only be used one in binding.

// Look at the top of source file.
// The special keys and shift_num objects will let you know
// what you can listen for beyond the alphabet.

// Maybe later it'd be nice to rig it up to listen
// across multiple presses to let you do things like:
// .keybind('ctrl+a+#'), or maybe some sort of chording
// (think emacs). It's all possible, it just doesn't do it today.

/* ---------------------
 License:
 Don't be a Dick License
 Everything will be alright.

(author disclaims all ownership)*/ 
