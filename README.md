# pScript

A very small, but simple to use javascript library for improving your UI.
PScript extends the functionality of Jquery and adds functions that let you modify your items directly through a Jquery object.
I made it for myself and thought I share it with y'all ;D.

## Getting Started

Just copy the files (pscript.js and pscript.css) into your project and make a reference with script and link tags where you want to use it.
By default, the script will inject the animate.css file by Daniel Eden from a CDN link. 
If you want to include it yourself, to, for example use a newer version, feel free to replace it in the script file.
You will also need to reference jquery.js from (https://jquery.com/) if you don't have it already. Make sure, that jquery will be loaded before pscript.

## Features

Here you will find an overwiev of the features pscript has to offer.

### Animations

#### Using Animations in HTML

You can animate html elements by adding a class "js-anim" and a class that specifies the animation type, e. g. :

```
<div class="js-anim js-fadeInLeft"></div>
```

The animation will be triggered when the element is completely visible in the window. This can occur directly at the beginning or by scrolling.

Complete list of animations (remember to write js- before the class name if you use it in html as shown in the example above)

| Class Name        |                    |                     |                      |
| ----------------- | ------------------ | ------------------- | -------------------- |
| `bounce`          | `flash`            | `pulse`             | `rubberBand`         |
| `shake`           | `headShake`        | `swing`             | `tada`               |
| `wobble`          | `jello`            | `bounceIn`          | `bounceInDown`       |
| `bounceInLeft`    | `bounceInRight`    | `bounceInUp`        | `bounceOut`          |
| `bounceOutDown`   | `bounceOutLeft`    | `bounceOutRight`    | `bounceOutUp`        |
| `fadeIn`          | `fadeInDown`       | `fadeInDownBig`     | `fadeInLeft`         |
| `fadeInLeftBig`   | `fadeInRight`      | `fadeInRightBig`    | `fadeInUp`           |
| `fadeInUpBig`     | `fadeOut`          | `fadeOutDown`       | `fadeOutDownBig`     |
| `fadeOutLeft`     | `fadeOutLeftBig`   | `fadeOutRight`      | `fadeOutRightBig`    |
| `fadeOutUp`       | `fadeOutUpBig`     | `flipInX`           | `flipInY`            |
| `flipOutX`        | `flipOutY`         | `lightSpeedIn`      | `lightSpeedOut`      |
| `rotateIn`        | `rotateInDownLeft` | `rotateInDownRight` | `rotateInUpLeft`     |
| `rotateInUpRight` | `rotateOut`        | `rotateOutDownLeft` | `rotateOutDownRight` |
| `rotateOutUpLeft` | `rotateOutUpRight` | `hinge`             | `jackInTheBox`       |
| `rollIn`          | `rollOut`          | `zoomIn`            | `zoomInDown`         |
| `zoomInLeft`      | `zoomInRight`      | `zoomInUp`          | `zoomOut`            |
| `zoomOutDown`     | `zoomOutLeft`      | `zoomOutRight`      | `zoomOutUp`          |
| `slideInDown`     | `slideInLeft`      | `slideInRight`      | `slideInUp`          |
| `slideOutDown`    | `slideOutLeft`     | `slideOutRight`     | `slideOutUp`         |

##### Hide Elements

By default the element is always shown and will be animated when it's in the part of the window that is currently visible for the user. 
If you want it to be hidden until it is visible you can use the js-anim-hidden class:

```
<div class="js-anim js-fadeInLeft js-anim-hidden"></div>
```

##### Repeat Animation

By default an animation is only triggered once. 
If you want it to be repeatable when the user scrolls out of its range and returns to it later, you can use the js-anim-repeat class:

```
<div class="js-anim js-fadeInLeft js-anim-repeat"></div>
```

This can also be combined with js-anim-hidden to hide the element again if it is not visible:

```
<div class="js-anim js-fadeInLeft js-anim-repeat js-anim-hidden"></div>
```

##### Delayed Animations

You can set a value in seconds to delay a certain animation after it was triggered. 
You can achieve this by using the js-anim-delay-2 class where the last character (2) represents the delay amount in seconds. 

```
<div class="js-anim js-fadeInLeft js-anim-delay-2"></div>
```

##### Animation Duration

You can set a value in seconds to change the duration of an animation after it was triggered. 
You can achieve this by using the js-anim-duration-2 class where the last character (2) represents the duration in seconds. 

```
<div class="js-anim js-fadeInLeft js-anim-duration-2"></div>
```

##### Animation Iteration

You can set a value to loop the animation. 
You can achieve this by using the js-anim-iteration-2 class where the last character (2) represents the amount of loops (standard is 1).
You can also set it to infinite if you want the loop to never stop ;D.

```
<div class="js-anim js-fadeInLeft js-anim-iteration-2"></div>
<div class="js-anim js-fadeInLeft js-anim-iteration-infinite"></div>
```

#### Using Animations in JavaScript

You can also animate items directly in JavaScript.  
To do this, you can call the animateItem() function on your item which takes one optional argument: 

```
$(item).animateItem(animationSettingsObject);
```

```
$(item).animateItem({
    animation:'wobble',
    delay:1,
    iteration:2,
    repeat:false,
    duration:3,
    hidden:true,
    callback:function(){console.log('hello world');}
});
```

The object consists of the following arguments:
* animation = class name of the animation - don't use "js-" before class name (see table in last section for a complete list)
* delay = a number (seconds) that sets a delay time until the animation will be executed
* iteration = a number that sets the amount of times that the animation will be played (or set to 'infinite' if you want it to never stop)
* repeat = set to true if animation should be repeated after user returns (through scrolling) to item animation range
* duration = a number (seconds) that sets the duration of the animation
* hidden = set to true if you want to hide the element if the user exits the item animation range
* callback = a custom callback function that will be invoked after the animation is executed

If you leave a property blank, it will be set to its default value:

##### Animate and hide

If you want to hide the element after the animation was executed you can simply call animateItemAndHide() instead:

```
$(item).animateItemAndHide(animationSettingsObject);
```

This function will take the same optional object as animateItem but will also hide the item after the animation and before your custom function.

##### Events

You can attach an event listener with Jquery to listen for an event called animationStart or animationEnd.

```
$('#div').on('animationStart', function(){
    console.log('Started animation');
});
```

```
$('#div').on('animationEnd', function(){
    console.log('End of animation');
});
```

### Alerts

To create a new alert simply invoke one of the following members of pScript:

```
pScript.showSuccess(title, body, duration, isClosable);
pScript.showSuccess('myTitle', 'messageBody', 3000, true);
pScript.showInfo('myTitle', 'messageBody', 2000, false);
pScript.showWarning('myTitle', 'messageBody', 5000, true);
pScript.showDanger('myTitle', 'messageBody', 8000, false);
```

* title = title of alert
* body = your message
* duration = duration in milliseconds (e. g. 3000 for 3 seconds), if undefined = unlimited duration
* isCloasable = adds a close button (x) to the top right corner that enables to close the alert box with a click (default is false)

### UI Effects
<b>!WIP!</b>
You can create slick looking and high customizable effects. Check them out!

#### Scaling

Add CSS class js-scale to any HTML element to have it be scaled/enlarged when it is fully visible on the screen:

```
<div class="js-scale"></div>
```
When the user scrolls down, it will keep its size. When the user scrolls up again, it will return to its start size.

##### Offsets

You can define an optional offset, so that the scaling process will be triggered after a certain distance between bottom of the screen and de bottom of the element has been reached. The offset value is measured in percent of the screen height.

```
<div class="js-scale js-scale-offset-20"></div>
```

##### Scaling factors

You can define optional values for the scaling factors (how large your object will be). The factors are measured in persent of screen width/height. 

```
<div class="js-scale js-scale-x-100 js-scale-y-50"></div>
```

##### Duration

The default duration of the transition is 400ms. If you want to change this you can do this via the js-scale-duration-ms class.

```
<div class="js-scale js-scale-duration-400"></div>
```

##### Events

You can attach an event listener with Jquery to listen for an event called scaleIn or scaleOut.

```
$('#div').on('scaleIn', function(){
    console.log('Now I'm large!');
});
```

```
$('#div').on('scaleOut', function(){
    console.log('Now I'm small again!');
});
```

#### Parallax
WIP

#### Hover Zoom
WIP

#### Validation Feedback
WIP

### Jquery Functions

* animateItem
* animateItemAndHide
* getAnimationClass
* visibleOnScreen
* getValueFromClass

### pScript Functions

* showSuccess
* showInfo
* showDanger
* showWarning
* getRandomColorHex

## Built With

* [Animate.css](https://daneden.github.io/animate.css/) - CSS Library made by Daniel Eden
* [Jquery](https://jquery.com/) - JavaScript Framework

## Authors

* **Delta843** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
