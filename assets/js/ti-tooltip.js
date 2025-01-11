/**
 * Tooltip constructor
 * @param {jQuery} target The target element to bind the tooltip to
 * @param {Object} options Custom options to override the default settings
 * @constructor
 */
function Tooltip(target, options) {
    /**
     * The target element to bind the tooltip to
     * @type {jQuery}
     */
    this.target = $(target);

    /**
     * The tooltip element
     * @type {jQuery}
     */
    this.tooltip = $('<div id="ti-tooltip"></div>');
    /**
     * The custom options
     * @type {Object}
     */
    this.settings = options;
    // this.settings = $.extend({
    //     /**
    //      * The trigger event for the tooltip
    //      * @type {string}
    //      */
    //     trigger: 'hover',
    //     /**
    //     * The offset from the target element to position the tooltip
    //     * @type {number}
    //     */
    //     offset: 20,
    //     /**
    //      * The animation duration of the tooltip
    //      * @type {number}
    //      */
    //     animationDuration: 200,
    //     /**
    //      * The position of the tooltip relative to the target element
    //      * @type {string}
    //      */
    //     position: 'auto',
    //     /**
    //      * The maximum width of the tooltip
    //      * applied by method adjustMaxWidth
    //      * @type {number}
    //      */
    //     maxWidth: 340,
    //     /**
    //      * The background color of the tooltip
    //      * @type {string}
    //      */
    //     backgroundColor: '#fff',
    //     /**
    //      * The color of the tooltip text
    //      * @type {string}
    //      */
    //     color: '#000',
    //     /**
    //      * The alignment of the tooltip text
    //      * @type {string}
    //      */
    //     alignment: 'center',
    //     /**
    //      * The width of the border
    //      * @type {string}
    //      */
    //     borderWidth: '2px',
    //     /**
    //      * The color of the border
    //      * @type {string}
    //      */
    //     borderColor: '#82ACDD',
    //     /**
    //      * The radius of the border
    //      * @type {string}
    //      */
    //     borderRadius: '0px',
    //     /**
    //      * The color of the tooltip arrow
    //      * @type {string}
    //      */
    //     arrowColor: '#fff',
    // }, options);

    // Initialize tooltip
    this.init();
}

// Utility function to update CSS variables in :root
function updateCSSVariable(variableName, value) {
    if (variableName && value !== undefined) {
        document.documentElement.style.setProperty(variableName, value);
    }
}

/**
 * Method to initialize the tooltip
 * @memberof Tooltip
 * @instance
 */
Tooltip.prototype.init = function () {
    this.adjustMaxWidth();
    this.bindEvents();
};

/**
 * Method to bind events to the target element based on the trigger event
 * @memberof Tooltip
 * @instance
 */
Tooltip.prototype.bindEvents = function () {
    const self = this;

    // Set the tooltip position on resize
    $(window).on("resize", function () {
        self.positionTooltip();
    });

    // Bind events based on the trigger event
    switch (this.settings.trigger) {
        case "hover":
            this.target
                .on("mouseenter", function () {
                    self.showTooltip();
                })
                .on("mouseleave", function () {
                    self.removeTooltip();
                });
            break;
        case "click":
            this.target.on("click", function () {
                self.showTooltip();
            });
            break;
        case "focus":
            this.target
                .on("focus", function () {
                    self.showTooltip();
                })
                .on("blur", function () {
                    self.removeTooltip();
                });
            break;
        default:
            this.target
                .on("mouseenter", function () {
                    self.showTooltip();
                })
                .on("mouseleave", function () {
                    self.removeTooltip();
                });
            break;
    }
};

// Update Tooltip Styles
Tooltip.prototype.updateStyles = function () {
    updateCSSVariable("--ti-tooltip-bg", this.settings.backgroundColor);
    updateCSSVariable("--ti-tooltip-color", this.settings.textColor);
    updateCSSVariable("--ti-tooltip-alignment", this.settings.textAlignment);
    updateCSSVariable("--ti-tooltip-border-width", this.settings.borderWidth);
    updateCSSVariable("--ti-tooltip-border-color", this.settings.borderColor);
    updateCSSVariable("--ti-tooltip-border-radius", this.settings.borderRadius);
    updateCSSVariable("--ti-tooltip-arrow-color", this.settings.arrowColor);
    updateCSSVariable("--ti-tooltip-maxwidth", this.settings.maxWidth);
};

/**
 * Method to show the tooltip
 * @memberof Tooltip
 * @instance
 */
Tooltip.prototype.showTooltip = function () {
    this.updateStyles();
    const tipContent = this.target.children(".ti-tooltip").html();
    if (!tipContent) {
        return;
    }

    // Append the tooltip to the body and set its opacity to 0
    this.tooltip.html(tipContent).css("opacity", 0).appendTo("body");

    // Call the positionTooltip method to position the tooltip
    this.positionTooltip();
};

/**
 * Adjusts the max-width of the tooltip based on the window width.
 * If the window width is less than the tooltip width * 1.5, the max-width is set to half of the window width.
 * Otherwise, the max-width is set to the value specified in the settings.
 * @memberof Tooltip
 * @instance
 */
// Tooltip.prototype.adjustMaxWidth = function () {
//     const windowWidth = $(window).width();

//     const adjustedWidth =
//         windowWidth <
//         this.tooltip.outerWidth() * this.settings.horizontaPosition
//             ? windowWidth / 2
//             : this.settings.maxWidth;
//     this.tooltip.css("max-width", adjustedWidth);
// };
Tooltip.prototype.adjustMaxWidth = function () {
    // Get calculated left position
    const { left, windowWidth, rightSpace, leftSpace } =
        this.calculatePosition();
    const tooltipWidth = this.tooltip.outerWidth();
    console.log(
        "left:",
        left,
        "windowWidth:",
        windowWidth,
        "rightSpace:",
        rightSpace,
        "leftSpace:",
        leftSpace
    );

    let adjustedWidth;

    // Check if the tooltip overflows the right side of the window
    // if (windowWidth < tooltipWidth + left) {
    //     adjustedWidth = Math.min(
    //         tooltipWidth / this.settings.horizontaPosition,
    //         windowWidth - left - 20 // Ensure 20px margin
    //     );
    //     adjustedWidth = windowWidth / 2;
    // } else {
    //     adjustedWidth = this.settings.maxWidth;
    // }
    // if (left < 0) {
    if (rightSpace === 0) {
        // adjustedWidth = Math.min(
        //     tooltipWidth / this.settings.horizontaPosition,
        //     windowWidth - left - 20 // Ensure 20px margin
        // );
        if (leftSpace > this.settings.maxWidth) {
            console.log("leftSpacebig:");

            adjustedWidth = this.settings.maxWidth;
        } else {
            adjustedWidth = windowWidth - 20;
            console.log("leftSpacesmall:");
        }
        // adjustedWidth = windowWidth - this.settings.offset - 20;
    } else {
        adjustedWidth = this.settings.maxWidth;
    }

    // Apply the adjusted max-width
    this.tooltip.css("max-width", adjustedWidth);
};

/**
 * Method to calculate position of the tooltip based on the target element's position.
 * The position is calculated as follows:
 * - top/bottom:
 *    baseline then place it above the target and finally make some distance between the target and the tooltip.
 *    baseline then place it bottom the target and finally make some distance between the target and the tooltip.
 *    (-ve) means off-screen or out of the viewport boundary.
 *    (+ve) means on-screen or within the viewport boundary.
 * - If the tooltip is positioned below the target, the top position is calculated as the target's bottom position plus
 *   the offset.
 * - If the tooltip is positioned to the left of the target, the left position is calculated as the target's left position
 *   minus the tooltip's width minus the offset.
 * - If the tooltip is positioned to the right of the target, the left position is calculated as the target's right position
 *   plus the offset.
 * The tooltip is then positioned at the calculated left and top positions.
 * @return {Object} An object with left and top properties set to the calculated positions.
 */
// Tooltip.prototype.calculatePosition = function () {
//     console.log("target:", this.target.offset().left);

//     var pos_left = Math.round(
//         this.target.offset().left +
//             this.target.outerWidth() / 2 -
//             this.tooltip.outerWidth() / 2
//     );
//     var pos_top = Math.round(
//         this.target.offset().top -
//             this.tooltip.outerHeight() -
//             this.settings.offset
//     );
//     // Adjust if tooltip is out of bounds
//     if (pos_left < 0) {
//         pos_left = Math.round(
//             this.target.offset().left +
//                 this.target.outerWidth() / 2 -
//                 this.settings.offset
//         ); // for horizontal custom positioning
//         this.tooltip.addClass("left");
//     } else {
//         this.tooltip.removeClass("left");
//     }

//     if (pos_left + this.tooltip.outerWidth() > $(window).width()) {
//         pos_left = Math.round(
//             this.target.offset().left -
//                 this.tooltip.outerWidth() +
//                 this.target.outerWidth() / 2 +
//                 this.settings.offset
//         );
//         this.tooltip.addClass("right");
//     } else {
//         this.tooltip.removeClass("right");
//     }

//     if (pos_top < 0) {
//         pos_top = Math.round(
//             this.target.offset().top + this.target.outerHeight()
//         );
//         this.tooltip.addClass("top");
//     } else {
//         this.tooltip.removeClass("top");
//     }
//     console.log("pos_left:", pos_left, "pos_top:", pos_top);
//     return { left: pos_left, top: pos_top };
// };
Tooltip.prototype.calculatePosition = function () {
    let windowWidth = $(window).width();
    let rightSpace =
        windowWidth - (this.target.offset().left + this.target.outerWidth());
    let leftSpace = windowWidth - this.tooltip.outerWidth();
    let pos_left = Math.round(
        this.target.offset().left +
            this.target.outerWidth() -
            this.settings.offset
    );
    let pos_top = Math.round(
        this.target.offset().top -
            this.tooltip.outerHeight() -
            this.settings.offset
    );

    // Check for right overflow
    // if (pos_left + this.tooltip.outerWidth() > $(window).width()) {
    if (rightSpace === 0) {
        // Position tooltip on the left side of the target
        pos_left = Math.round(
            this.target.offset().left +
                this.target.outerWidth() -
                this.tooltip.outerWidth() -
                this.settings.offset
        );
        console.log("right_overflow_pos_left:", pos_left);
        this.tooltip.addClass("right");
    } else {
        this.tooltip.removeClass("right");
    }
    // var pos_left = Math.round(
    //     this.target.offset().left +
    //         this.target.outerWidth() / 2 -
    //         this.tooltip.outerWidth() / 2
    // );
    // var pos_top = Math.round(
    //     this.target.offset().top -
    //         this.tooltip.outerHeight() -
    //         this.settings.offset
    // );
    // console.log("pos_left:", pos_left, "pos_top:", pos_top);
    // // Adjust if tooltip is out of bounds
    // if (pos_left < 0) {
    //     pos_left = Math.round(
    //         this.target.offset().left +
    //             this.target.outerWidth() / 2 -
    //             this.settings.offset
    //     ); // for horizontal custom positioning
    //     this.tooltip.addClass("left");
    // } else {
    //     this.tooltip.removeClass("left");
    // }

    // if (pos_left + this.tooltip.outerWidth() > $(window).width()) {
    //     pos_left = Math.round(
    //         this.target.offset().left -
    //             this.tooltip.outerWidth() +
    //             this.target.outerWidth() / 2 +
    //             this.settings.offset
    //     );
    //     this.tooltip.addClass("right");
    // } else {
    //     this.tooltip.removeClass("right");
    // }

    if (pos_top < 0) {
        pos_top = Math.round(
            this.target.offset().top + this.target.outerHeight()
        );
        this.tooltip.addClass("top");
    } else {
        this.tooltip.removeClass("top");
    }
    console.log("pos_left:", pos_left, "pos_top:", pos_top);
    return { left: pos_left, top: pos_top, windowWidth, rightSpace, leftSpace };
};

/**
 * Method to position the tooltip based on the target element's position.
 * This method is called after the tooltip is created and appended to the body.
 * It first adjusts the max width of the tooltip based on the window width.
 * Then it calculates the position of the tooltip based on the target's position and the settings.
 * The tooltip is then positioned at the calculated left and top positions using CSS.
 * An animation is also triggered to make the tooltip appear smoothly.
 */
Tooltip.prototype.positionTooltip = function () {
    /**
     * Adjust max width of tooltip based on window width.
     * If window width is less than tooltip width * 1.5, set max width to half of window width.
     * Otherwise, use the setting's max width.
     */
    this.adjustMaxWidth();

    /**
     * Calculate position of the tooltip based on the target element's position.
     * @return {Object} An object with left and top properties set to the calculated positions.
     */
    const { left, top } = this.calculatePosition();

    /**
     * Position the tooltip at the calculated left and top positions using CSS.
     * An animation is also triggered to make the tooltip appear smoothly.
     */
    this.tooltip
        .css({ left, top })
        .animate({ top: "+=10", opacity: 1 }, this.settings.animationDuration);
};

/**
 * Method to remove tooltip
 * @description Removes the tooltip element from the DOM.
 * @memberof Tooltip
 * @instance
 */
Tooltip.prototype.removeTooltip = function () {
    /**
     * Animates the tooltip to fade out, then removes it from the DOM.
     * @param {number} duration Duration of the animation in milliseconds.
     * @param {function} complete Callback function to run when the animation is complete.
     */
    // this.tooltip.animate(
    //     { top: "-=10", opacity: 0 },
    //     this.settings.animationDuration,
    //     () => {
    //         this.tooltip.remove();
    //     }
    // );
};
