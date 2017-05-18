;(function($, window, document, undefined) {

    "use strict";

    var pluginName = "navbarAffix";
    var defaults = {
        class: 'affix',
        target: null
    };

    function NavbarAffix(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(NavbarAffix.prototype, {
        init: function() {
            this.top = $(this.element).offset().top;

            if (typeof this.top !== 'undefined') {
                this.attachScrollHandler();
                $(window).scroll();
            }
        },
        attachScrollHandler: function() {
            var _this = this;
            $(window).on('scroll', function () {
                var top = $(this).scrollTop();
                var $target = _this.getTarget();
                if (top >= _this.top) {
                    $target.addClass(_this.settings.class);
                } else {
                    $target.removeClass(_this.settings.class);
                }
            });
        },
        getTarget: function() {
            if (this.settings.target) {
                if (typeof this.settings.target === 'string') {
                    return $(this.settings.target);
                } else if (typeof this.settings.target === 'object') {
                    return this.settings.target;
                }
            }

            return $(this.element);
        },
    });

    //
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new NavbarAffix(this, options));
            }
        });
    };

})(jQuery, window, document);