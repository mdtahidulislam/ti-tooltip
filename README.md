# Installation

-   Use latest jQuery
-   Use ti-tooltip.css from assets folder
-   Copy ti-tooltip.js from assets folder

## HTML markup

```html
<div class="ti-tooltip-target">
    <p>Test Text 1 Test Text 1</p>
    <div class="ti-tooltip">
        <p>
            Test pop-up text 1Test pop-up text 1Test pop-up text 1Test pop-up
            text 1Test pop-up text 1v
        </p>
    </div>
</div>
```

## Stylesheet

```html
<link rel="stylesheet" href="path/ti-tooltip.css" />
```

## Scripts

```js
<script src="path/ti-tooltip.js"></script>
```

## Initialization

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
