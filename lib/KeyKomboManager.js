/*
 * This file is part of keycombo.js
 *
 * Copyright (c) 2011-2015 DracoBlue, http://dracoblue.net/
 *
 * Licensed under the terms of MIT License. For the full copyright and license
 * information, please see the LICENSE file in the root folder.
 */

var KeyComboManager = function() {
    var that = this;
    this.last_keys = [];
    this.key_combos = [];
    this.key_combo_functions = [];
    this.key_combos_length = 0;
    this.key_combo_max_length = 0;
    this.key_log_callback = null;
    this.enabled = false;
    this.key_log_callback = function(event) {
        that.logKey(event.key);
    };
};

KeyComboManager.prototype.enable = function()
{
    if (this.enabled)
    {
        return ;
    }
    this.enabled = true;
    window.addEventListener('keyup', this.key_log_callback, false);
};
    
KeyComboManager.prototype.disable = function()
{
    if (!this.enabled)
    {
        return ;
    }
    this.enabled = false;
    window.removeEventListener('keyup', this.key_log_callback, false);
};

KeyComboManager.prototype.logKey = function(key_name)
{
    var that = this;
    var limit = this.key_combo_max_length + 1;
    
    if (this.last_keys.length > limit * 3)
    {
        this.last_keys = this.last_keys.slice(this.last_keys.length - limit);
    }
    this.last_keys.push(key_name);
    
    var last_code = null;
    
    if (this.last_keys.length > limit)
    {
        last_code = this.last_keys.slice(this.last_keys.length - limit).join(',');
    }
    else
    {
        last_code = this.last_keys.join(',');
    }
    
    var selected_i = -1;
    
    for (var i = 0; i < this.key_combos_length; i++)
    {
        if (this.key_combos[i].exec(',' + last_code))
        {
            this.last_keys = [];
            
            selected_i = i;
            break;
        }
    }
    
    if (selected_i != -1)
    {
        setTimeout(function()
        {
            that.key_combo_functions[selected_i]();
        }, 10);
    }
};
    
KeyComboManager.prototype.addKeyCombo = function(combo_key_names, combo_function)
{
    this.key_combo_max_length = Math.max(this.key_combo_max_length, combo_key_names.length);
    this.key_combos.push(new RegExp(',' + combo_key_names.join(',') + '$'));
    this.key_combo_functions.push(combo_function);
    this.key_combos_length = this.key_combos.length;
    this.enable();
};

KeyComboManager.getInstance = function()
{
    if (!KeyComboManager.instance)
    {
        KeyComboManager.instance = new KeyComboManager();
    }
    return KeyComboManager.instance;
};
