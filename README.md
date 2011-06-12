keycombo.js README
===========================

Version: 1.0.0

Official Site: <http://dracoblue.net/>

keycombo.js is copyright 2011 by DracoBlue <http://dracoblue.net>

What is keycombo.js?
--------------------
This library is meant to be an easy library to bind functions in javascript
to key combinations by the user. It is currently necessary to have mootools
installed. It's intended that this dependency is removed soon. See the
`examples/clock-wise.html` for an example.

## Example

    var key_combo_manager = KeyComboManager.getInstance();
    key_combo_manager.addKeyCombo(['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'], function() 
    {
        alert('You pressed the konami code!');
    });

## API

### KeyComboManager#addKeyCombo(keys, callback)

An array of keys and the callback, which will be invoked as soon as the key
combo has been pressed.

    key_combo_manager.addKeyCombo(['up', 'right', 'down', 'left'], function() 
    {
        alert('Clock-wise!');
    });

This function will enable the KeyComboManager, if it wasn't enabled, yet.

### KeyComboManager#enable()

Enable the listener for key combos. It will be called implicit by
`KeyComboManager#addKeyCombo`.

### KeyComboManager#disable()

Disables the listener for key combos. You should call that after 
`KeyComboManager#addKeyCombo` if you want to disable the
KeyComboManager.

Changelog
---------

- 1.0.0 (2011/06/12)
  - Initial release

Contributors
------------

- DracoBlue http://dracoblue.net

License
--------

keycombo.js is licensed under the terms of MIT. See LICENSE for more information.
