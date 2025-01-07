(function ($) {
    "use strict";
    jQuery(document).ready(function ($) {
        // Initialize tooltips on page load
        $(".ti-tooltip-target").each(function () {
            const target = $(this);
            // const customOptions = target.data('tooltip-options') || {};
            const customOptions = {
                trigger: "hover",
                offset: 20,
                // position: "top",
                animationDuration: 200,
                maxWidth: 340,
                // backgroundColor: "red",
                // textColor: "#fff",
                // textAlignment: "left",
                // borderWidth: "1px",
                // borderColor: "#ececec",
                // borderRadius: "5px",
                // arrowColor: "#333"
            };
            new Tooltip(target, customOptions);
        });
    });
})(jQuery);

// Initialize tooltips on page load
// $(function () {

// });
