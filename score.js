/**
 * Calculate Points on Dart Board
 */

var graphOffsets = document.getElementById("canvas").getBoundingClientRect();
var boxOffsets = document.getElementById("box").getBoundingClientRect();

var centerX = graphOffsets.left + (graphOffsets.width/2);
var centerY = graphOffsets.top + (graphOffsets.height/2);

//TBD delete
var dSize = 20;

function calcPoints(x, y) {
    let finalValue = 0;
    // console.log('top-left: ' + graphOffsets.left + ' ' + (graphOffsets.top));
    // console.log('bot-left: ' + graphOffsets.left + ' ' + (graphOffsets.top + graphOffsets.height));
    // console.log('center: ' + (graphOffsets.left + (graphOffsets.width/2)) + ' ' + (graphOffsets.top + (graphOffsets.height/2)));
    console.log('hit: ' + (x+25) + ' ' + (y+10));

    const calibX = x + 25; // calibrated coordinates
    const calibY = y + 13;

    const cX = Math.abs(calibX - centerX); // distance between dart and center
    const cY = Math.abs(calibY - centerY);

    const R = Math.sqrt(Math.pow(cX, 2) + Math.pow(cY, 2));

    const tens = 100 - (Math.floor(R / 20) * 10);

    const cartX = centerY - calibY; // simulate cartesian plane, with Q1 in sections 0, 1, cw
    const cartY = calibX - centerX;

    let angle = Math.atan(cartY/cartX); // reference angle
    const SECTION_ANGLE = Math.PI / 5; // 2pi circle, 10 sections, pi/5 radian per section

    // Q2
    if (cartX <= 0 && cartY >= 0) {
        angle += Math.PI;

    // Q3
    } else if (cartX <= 0 && cartY <= 0) {
        angle += Math.PI;

    // Q4
    } else if (cartX >= 0 && cartY <= 0) {
        angle += 2*Math.PI;
    }

    const section = Math.floor(angle / SECTION_ANGLE); // determines section 0-9

    const ones = section;

    finalValue = tens + ones;

    // display volume bar accordingly
    $("#pct").html(`${finalValue}%`)
    $(".fill").css({
        width: `${finalValue}%`
    })

    console.log("centerX: " + centerX);
    console.log("centerY: " + centerY);

    console.log("cartX: " + cartX);
    console.log("cartY: " + cartY);
    console.log("angle: " + (angle * (180/Math.PI)));

    console.log("tens: " + tens);
    console.log("ones: " + ones);

    console.log("POINTS: " + finalValue);
    console.log("RADIUS: " + R);
    console.log("X: " + cX);
    console.log("Y: " + cY);
    
    


    // for(var i = 1; i < 10; i++) {
    //     // TBD TEST
    //     $(`#rectangle${i}`).css({
    //         left: centerX - dSize,
    //         top: centerY - dSize,
    //         width: dSize*2,
    //         height: dSize*2,
    //     })
    //     // ctx.beginPath();
    //     // ctx.arc(centerX, centerY, dSize, 0, Math.PI*2, true);
    //     // ctx.stroke();
    //     dSize += 20;
    // }
}
