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
}