/*
 * This file is part of keycombo.js
 *
 * Copyright (c) 2011 DracoBlue, http://dracoblue.net/
 *
 * Licensed under the terms of MIT License. For the full copyright and license
 * information, please see the LICENSE file in the root folder.
 */

KeyComboManager = new Class({

    last_keys: [],
    key_combos: [],
    key_combo_functions: [],
    key_combos_length: 0,

    key_combo_max_length: 0,

    key_log_callback: null,

    enabled: false,

    initialize : function()
    {
        var that = this;
        
        this.key_log_callback = function(event) {
            that.logKey(event.key);
        };
    },

    enable: function()
    {
        if (this.enabled)
        {
            return ;
        }
        this.enabled = true;
        $(window).addEvent('keyup', this.key_log_callback);
    },
    
    disable: function()
    {
        if (!this.enabled)
        {
            return ;
        }
        this.enabled = false;
        $(window).removeEvent('keyup', this.key_log_callback);
    },

    logKey: function(key_name)
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
        
        for (var i = 0; i < this.key_combos_length; i++)
        {
            if (this.key_combos[i].exec(',' + last_code))
            {
                this.last_keys = [];
                
                setTimeout(function()
                {
                    that.key_combo_functions[i]();
                }, 10);
                return ;
            }
        }
    },
    
    addKeyCombo: function(combo_key_names, combo_function)
    {
        this.key_combo_max_length = Math.max(this.key_combo_max_length, combo_key_names.length);
        this.key_combos.push(new RegExp(',' + combo_key_names.join(',') + '$'));
        this.key_combo_functions.push(combo_function);
        this.key_combos_length = this.key_combos.length;
        this.enable();
    }     
});

KeyComboManager.getInstance = function()
{
    if (!this.instance)
    {
        this.instance = new KeyComboManager();
    }
    return this.instance;
};
