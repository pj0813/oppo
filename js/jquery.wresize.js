(function($) {
    $.fn.wresize = function(f) {
        version = '1.1';
        wresize = {
            fired : false,
            width : 0
        };

        function resizeOnce() {
            if (/msie/.test(navigator.userAgent.toLowerCase())) {
                if (!wresize.fired) {
                    wresize.fired = true;
                } else {
                    console.log($.support)
                    var version = parseInt($.support.version, 10);
                    wresize.fired = false;
                    if (version < 7) {
                        return false;
                    } else if (version == 7) {
                        // a vertical resize is fired once, an horizontal resize
                        // twice
                        var width = $(window).width();
                        if (width != wresize.width) {
                            wresize.width = width;
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        function handleWResize(e) {
            if (resizeOnce()) {
                console.log("bbb");
                return f.apply(this, [ e ]);
            }
        }

        this.each(function() {
            if (this == window) {
                $(this).resize(handleWResize);
            } else {
                $(this).resize(f);
            }
        });
        return this;
    };
})(jQuery);
