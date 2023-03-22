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
    // console.log('top-left: ' + graphOffsets.left + ' ' + (graphOffsets.top));
    // console.log('bot-left: ' + graphOffsets.left + ' ' + (graphOffsets.top + graphOffsets.height));
    // console.log('center: ' + (graphOffsets.left + (graphOffsets.width/2)) + ' ' + (graphOffsets.top + (graphOffsets.height/2)));
    console.log('hit: ' + (x+25) + ' ' + (y+10));

    const calibX = x + 25; // calibrated coordinates
    const calibY = y + 10;

    const cX = Math.abs(calibX - centerX); // distance between dart and center
    const cY = Math.abs(calibY - centerY);

    const R = Math.sqrt(Math.pow(cX, 2) + Math.pow(cY, 2));

    const tens = 100 - (Math.floor(R / 20) * 10);

    // display volume bar accordingly
    $("#pct").html(`${tens}%`)
    $(".fill").css({
        width: `${tens}%`
    })

    console.log("POINTS: " + tens);
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
