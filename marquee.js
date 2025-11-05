import gsap from "gsap"

export function setupMarqueeAnimation() {
    // Selects all <h1> elements inside any element with class "marquee" and converts them to an array
    const marqueeItems = gsap.utils.toArray(".marquee h1");
    
    // Checks if there are marquee items present
    if(marqueeItems.length > 0) {
        // Runs a horizontal looping animation on all selected marquee items
        // (horizonalLoop is presumably a GSAP helper function, perhaps custom or from an external utility)
        const t1 = horizonalLoop(marqueeItems, {
            repeat: -1,           // Animation will repeat infinitely
            paddingRight: 30,     // Space between the items in the loop (pixels)
        })
    }
}


function horizonalLoop(items, config) {
    items = gsap.utils.toArray(items); 
    config = config || {}
    let t1 = gsap.timeline({
        repeat: config.repeat, 
        defaults: {ease: "none"},
    });

    let length = items.length;
    let startX = items[0].offsetLeft;
    let widths = [];
    let xPercents = [];
    let pixelsPerSecond = (config.speed || 1) * 100;
    let totalWidth, curX, distanceToStart, distanceToLoop, item, i;

    gsap.set(items, {
        xPercent: (i, el) => {
            let w = (widths[i] =  parseFloat(gsap.getProperty(el, "width", "px")));
            xPercents[i] =(parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100  + gsap.getProperty(e1, "xPercent");

            return xPercents[i];
        },

    });

    gsap.set(items, { x: 0});
    totalWidth = items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);

    for ( i=0 ; 1 <length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

        t1.to(
            item, 
            {
                xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
                duration: distanceToLoop / pixelsPerSecond,
            },
            0
        ).fromTo(
            item, 
            { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i])*100},
            {
                xPercent:xPercents[i],
                duration:(curX - distanceToLoop + totalWidth -curX) / pixelsPerSecond,
                immediateRender:false,
            },
            distanceToLoop / pixelsPerSecond
        );
    }

    t1.progress(1, true). progress(0, true);
    return t1;
}