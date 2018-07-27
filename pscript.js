;
(function () {
    if (window.$ === undefined) {
        console.log('Did not find jQuery. Please make sure, you load this script after jQuery has been loaded. jQuery is required for pscript to work properly.');
    }
}());


$(function () {
    // Injects Animate.css Stylesheet that adds css classes for the animation needed. Feel free to remove this and include this file by yourself
    $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css">');

    // Inject an alert container into the body element to be able to stack alert boxes
    $('body').prepend('<div id="js-alert-container"><div id="js-alert-container-padding"></div><div id="js-alert-container-body"></div></div>');
});

var pScript = {};

(function (global, $) {

    // Array of all css classes used by this script
    var animationClasses = [
        'bounce',
        'flash',
        'pulse',
        'rubberBand',
        'shake',
        'headShake',
        'swing',
        'tada',
        'wobble',
        'jello',
        'bounceIn',
        'bounceInDown',
        'bounceInLeft',
        'bounceInRight',
        'bounceInUp',
        'bounceOut',
        'bounceOutDown',
        'bounceOutLeft',
        'bounceOutRight',
        'bounceOutUp',
        'fadeIn',
        'fadeInDown',
        'fadeInDownBig',
        'fadeInLeft',
        'fadeInLeftBig',
        'fadeInRight',
        'fadeInRightBig',
        'fadeInUp',
        'fadeInUpBig',
        'fadeOut',
        'fadeOutDown',
        'fadeOutDownBig',
        'fadeOutLeft',
        'fadeOutLeftBig',
        'fadeOutRight',
        'fadeOutRightBig',
        'fadeOutUp',
        'fadeOutUpBig',
        'flipInX',
        'flipInY',
        'flipOutX',
        'flipOutY',
        'lightSpeedIn',
        'lightSpeedOut',
        'rotateIn',
        'rotateInDownLeft',
        'rotateInDownRight',
        'rotateInUpLeft',
        'rotateInUpRight',
        'rotateOut',
        'rotateOutDownLeft',
        'rotateOutDownRight',
        'rotateOutUpLeft',
        'rotateOutUpRight',
        'hinge',
        'jackInTheBox',
        'rollIn',
        'rollOut',
        'zoomIn',
        'zoomInDown',
        'zoomInLeft',
        'zoomInRight',
        'zoomInUp',
        'zoomOut',
        'zoomOutDown',
        'zoomOutLeft',
        'zoomOutRight',
        'zoomOutUp',
        'slideInDown',
        'slideInLeft',
        'slideInRight',
        'slideInUp',
        'slideOutDown',
        'slideOutLeft',
        'slideOutRight',
        'slideOutUp'
    ];

    var version = '0.3';

    // Warning: Only change if you know what you are doing! 
    // CSS class names have to be renamed in the stylesheets too.
    const ANIM_CLASS = 'js-anim';
    const ANIM_ACTIVE_CLASS = 'js-anim-active';
    const ANIM_HIDDEN_CLASS = 'js-anim-hidden';
    const ANIM_REPEAT_CLASS = 'js-anim-repeat';
    const ANIM_DELAY_CLASS = 'js-anim-delay';
    const ANIM_ITERATION_CLASS = 'js-anim-iteration';
    const ANIM_DURATION_CLASS = 'js-anim-duration';
    const ANIM_PAUSE_CLASS = 'js-anim-pause';

    const ANIMATE_CSS_ANIMATED = 'animated';

    const SCALE_CLASS = 'js-scale';
    const SCALE_OFFSET_CLASS = 'js-scale-offset';
    const SCALE_X_CLASS = 'js-scale-x';
    const SCALE_Y_CLASS = 'js-scale-y';
    const SCALE_DURATION_CLASS = 'js-scale-duration';



    // Function to detect when an animation has ended
    var animationEnd = (function (el) {
        var animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd',
        };

        for (var t in animations) {
            if (el.style[t] !== undefined) {
                console.log('end ' + t);
                return animations[t];
            }
        }
    });

    // var animationSettings = {
    //     animation:'',
    //     delay:0,
    //     repeat:false,
    //     iterations:1,
    //     duration:1,
    //     hidden:false,
    //     callback: null
    // };

    initAnimationSettings = function (obj) {
        var ret = {};
        if (obj === undefined) {
            ret = obj = {};
        }
        ret.animation = obj.animation || 'slideInUp';
        ret.delay = obj.delay || 0;
        ret.repeat = obj.repeat || false;
        ret.iterations = obj.iterations || 1;
        ret.duration = obj.duration || 1;
        ret.pause = obj.pause || 0;
        ret.hidden = obj.hidden || false;
        ret.callback = obj.callback || null;
        ret.reset = obj.reset || false;

        return ret;
    };

    // Extend Jquery with pscript objects and functions
    jQuery.fn.extend({
        animateItem: function (obj) {
            var self = this;

            if (obj.reset) {
                // Reset animation classes
                self.removeClass(ANIMATE_CSS_ANIMATED);
                for (i = 0; i < animationClasses.length; i++) {
                    self.removeClass(animationClasses[i]);
                }
            }

            // Set small timeout duration to make sure the element will recognize DOM manipulation and execute animation            
            var addClasses = function () {
                obj = initAnimationSettings(obj);
                animation = obj.animation;
                self.css('animation-delay', obj.delay + 's');
                self.css('-webkit-animation-delay', obj.delay + 's');
                self.css('animation-duration', obj.duration + 's');
                self.css('-webkit-animation-duration', obj.duration + 's');
                self.css('animation-iteration-count', obj.iterations);
                self.css('-webkit-animation-iteration-count', obj.iterations);

                if (obj.repeat) {
                    self.addClass(ANIM_REPEAT_CLASS);
                }

                if (obj.hidden) {
                    self.addClass(ANIM_HIDDEN_CLASS);
                }

                self.addClass(ANIMATE_CSS_ANIMATED);
                self.addClass(animation);
                self.trigger('animationStart');
                self.data('animating', true);

                var triggerAnimEnd = function () {
                    self.trigger('animationEnd');
                };

                setTimeout(function () {
                    // Invoke callback function if existing
                    if (obj.callback !== null && obj.callback !== undefined) {
                        self.one(animationEnd, obj.callback());
                    }
                    // Trigger animated event
                    self.one(animationEnd, triggerAnimEnd());

                    if (obj.pause > 0 && (obj.iterations > 1 || obj.iterations === "infinite")) {
                        obj.delay = obj.pause
                        obj.reset = true;
                        self.animateItem(obj);

                        if (obj.iterations !== 'infinite') {
                            obj.iterations--;
                        }                        
                    } else {
                        self.data('animating', false);
                    }
                }, (Number(obj.delay) + Number(obj.duration)) * 1000);
            };

            if (obj.reset) {
                // Set a small timeout to let the browser realize, that there was a change
                setTimeout(addClasses, 10);
            } else {
                addClasses();
            }

        },
        animateItemAndHide: function (obj) {
            obj.callback = function () {
                $(this).hide();
                obj.callback();
            };

            $(this).animateItem(obj);
        },
        getAnimationClass: function () {
            var classes = this.attr('class').split(' ');

            for (var i = 0; i < animationClasses.length; i++) {
                var currClass = 'js-' + animationClasses[i];
                if (classes.indexOf(currClass) > -1) {
                    return animationClasses[i];
                }
            }
        },
        highlightItemRed: function () {
            //TODO
            this.addClass('js-highlight-red');
        },
        highlightItemGreen: function (item) {
            //TODO
            this.addClass('js-highlight-green');
        },
        visibleOnScreen: function () {
            let bottom_of_object = $(this).offset().top + $(this).outerHeight();
            let top_of_window = $(window).scrollTop();
            let bottom_of_window = top_of_window + $(window).height();

            // If the object is completely visible in the window
            return (bottom_of_window >= bottom_of_object && top_of_window <= bottom_of_object);
        },
        getValueFromClass: function (className) {
            var classes = $(this).attr('class').split(' ');
            var value = 0;
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].indexOf(className) !== -1) {
                    // Get value from delay class, e.g. js-anim-delay-4=4s
                    value = classes[i].substring(className.length + 1);
                    return value;
                }
            }
            return 0;
        }
    });

    var checkAnimatedItems = function () {
        // Check the location of each element
        $('.' + ANIM_CLASS).each(function (index) {
            let item = $(this);

            // If the object is completely visible in the window, fade it in 
            if ($(this).visibleOnScreen()) {
                // Check if it has not been animated yet
                if (!($(item).hasClass(ANIM_ACTIVE_CLASS))) {
                    $(item).addClass(ANIM_ACTIVE_CLASS);
                    let animationSettings = {};

                    // Get animation class
                    animationSettings.animation = $(item).getAnimationClass();

                    // Check if js-anim-delay class was added
                    animationSettings.delay = $(item).getValueFromClass(ANIM_DELAY_CLASS);

                    // Check if js-anim-duration was added
                    animationSettings.duration = $(item).getValueFromClass(ANIM_DURATION_CLASS);

                    // Check if js-anim-iteration was added
                    animationSettings.iterations = $(item).getValueFromClass(ANIM_ITERATION_CLASS);

                    // Check if js-anim-pause was added
                    animationSettings.pause = $(item).getValueFromClass(ANIM_PAUSE_CLASS);

                    $(item).animateItem(animationSettings);
                }
            } else {
                // If the object is repeatable then remove classes to repeat animations if they are later visible again
                if ($(item).hasClass(ANIM_REPEAT_CLASS) && !$(item).data('animating')) {
                    if ($(item).hasClass(ANIM_ACTIVE_CLASS)) {
                        $(item).removeClass(ANIM_ACTIVE_CLASS);
                        $(item).removeClass(ANIMATE_CSS_ANIMATED);
                        let animationClass = $(item).getAnimationClass();
                        $(item).removeClass(animationClass);
                    }
                }
            }
        });
    };

    var checkScaledItems = function () {
        $('.' + SCALE_CLASS).each(function (index) {
            let height_of_Window = $(window).height();
            let bottom_of_object = $(this).offset().top + $(this).outerHeight();
            let width_of_object = $(this).width();
            let width_of_window = $(window).width();
            let top_of_window = $(window).scrollTop();
            let bottom_of_window = top_of_window + height_of_Window;
            let offset = $(this).getValueFromClass(SCALE_OFFSET_CLASS);
            let item = $(this);

            // If the object is completely visible in the window, fade it in 
            if (bottom_of_window - (height_of_Window * offset * 0.01) > bottom_of_object) {
                let scaleWidth = width_of_window / width_of_object;
                let scaleDuration = $(item).getValueFromClass(SCALE_DURATION_CLASS) * 0.001;
                let scaleFactorX = $(item).getValueFromClass(SCALE_X_CLASS) * 0.01;
                let scaleFactorY = $(item).getValueFromClass(SCALE_Y_CLASS) * 0.01;

                scaleDuration = (scaleDuration > 0) ? scaleDuration : 0.4;
                scaleFactorX = (scaleFactorX > 0) ? scaleFactorX : 1;
                scaleFactorY = (scaleFactorY > 0) ? scaleFactorY : 1;

                scaleFactorX = scaleFactorX * scaleWidth;

                if (!$(item).data('scale')) {
                    $(item).trigger('scaleIn');
                    $(item).data('scale', true);
                }

                $(item).css('transition', `transform ${scaleDuration}s`);
                $(item).css('-webkit-transform', `scale(${scaleFactorX}, ${scaleFactorY})`);
                $(item).css('-ms-transform', `scale(${scaleFactorX}, ${scaleFactorY})`);
                $(item).css('transform', `scale(${scaleFactorX}, ${scaleFactorY})`);
                $(item).data('scale', true);
            } else {
                if ($(item).data('scale')) {
                    $(item).trigger('scaleOut');
                    $(item).data('scale', false);
                }

                $(item).css('-webkit-transform', 'scale(1,1)');
                $(item).css('-ms-transform', 'scale(1,1)');
                $(item).css('transform', `scale(1,1)`);
            }
        });
    };

    // Every time the window is scrolled...
    $(window).scroll(function () {
        checkAnimatedItems();
        checkScaledItems();
    });

    // Check on startUp
    $(function () {
        checkAnimatedItems();
    });

}(window, jQuery));


(function (global, $) {
    var sexyAlert = function (status) {
        return function (title, body, duration, closeable, bootstrap) {
            const INTRO_ANIM = "zoomIn";
            const OUTRO_ANIM = "zoomOut";           

            //create new alert
            let alertHtml = '<div class="js-alert js-alert-' + status + '">\
            <div class="js-alert-title">' + title + '</div>\
            <div class="js-alert-body">' + body + '</div>\
            </div>';

            if (bootstrap){
                alertHtml = '<div class="alert js-alert-bootstrap alert-' + status + '">\
                <div class="js-alert-title">' + title + '</div>\
                <div class="js-alert-body">' + body + '</div>\
                </div>';
            }

            let alert = $(alertHtml);

            //add close button if closeable
            if (closeable) {
                let alertClose = '<span class="js-alert-btn-close">x</span>';
                let closeButton = $(alertClose);
                alert.prepend(closeButton);
                closeButton.click(function () {
                    $(alert).animateItemAndHide(
                        {
                            animation: OUTRO_ANIM
                        });
                });
            }

            $('#js-alert-container-body').prepend(alert);

            //animate item
            $(alert).animateItem(
                {
                    animation: INTRO_ANIM
                });

            if (duration !== undefined) {
                //outro animation and destroy after some duration
                setTimeout(
                    function () {
                        $(alert).animateItemAndHide(
                            {
                                animation: OUTRO_ANIM
                            });
                    },
                    duration
                );
            }
        };
    }

    pScript.showSuccess = sexyAlert('success');
    pScript.showInfo = sexyAlert('info');
    pScript.showWarning = sexyAlert('warning');
    pScript.showDanger = sexyAlert('danger');

    pScript.getRandomColorHex = function () {
        var hue = Math.floor(Math.random() * 30) * 12;

        return $.Color({
            hue: hue,
            saturation: 0.85,
            lightness: 0.4,
            alpha: 1
        }).toHexString();
    }
}
)(window, jQuery);
