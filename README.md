# How to use

-   Use latest jQuery
-   Use ti-tooltip.css from assets folder
-   Copy ti-tooltip.js from assets folder

# How to initialize

```js
// Initialize tooltips on page load
$(".ti-tooltip-target").each(function () {
    const target = $(this);
    const customOptions = {
        trigger: "hover",
        offset: 20,
        animationDuration: 200,
        maxWidth: 340,
    };
    new Tooltip(target, customOptions);
});
```

# Options
