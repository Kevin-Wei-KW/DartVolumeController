function draw() {
    const canvas = document.getElementById("canvas");

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FFFFFF"


    /**
     * Board Creation
     */

    const R = 220;

    // rings
    for(let r = 220; r > 0; r-=20) {
        ctx.beginPath();
        ctx.arc(250, 250, r, 0, Math.PI * 2, true);
        ctx.stroke(); 
    }

    let dX = 0;
    let dY = R;
    let theta = 0;
    // lines
    for(let l = 1; l <= 10; l++) {
        // find X and Y start point
        dX = R * Math.sin(theta);
        dY = R * Math.cos(theta);

        // draw the line
        ctx.beginPath();
        ctx.moveTo(250 + dX, 250 + dY);
        ctx.lineTo(250, 250);
        ctx.stroke();

        // change angle to calculate next line segment
        theta += (2 * Math.PI) / 10;
    }

    // fill center circle
    ctx.beginPath();
    ctx.arc(250, 250, 20, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();

    // label board sections
    ctx.globalAlpha = 0.2;
    ctx.font = "70px Arial";
    ctx.fillStyle = "white";

    // one's digits
    ctx.fillText("0", 275, 140);
    ctx.fillText("1", 340, 190);
    ctx.fillText("2", 370, 275);
    ctx.fillText("3", 340, 355);
    ctx.fillText("4", 275, 410);
    ctx.fillText("5", 190, 410);
    ctx.fillText("6", 120, 355);
    ctx.fillText("7", 90, 275);
    ctx.fillText("8", 120, 190);
    ctx.fillText("9", 190, 140);

    // label board rings
    ctx.globalAlpha = 0.8;
    ctx.font = "10px Arial";
    ctx.fillStyle = "silver";

    // ten's digits
    for(let t = 1; t <= 10; t++) {
        ctx.beginPath();
        ctx.fillText(100 - 10*t, 250 + 16.3*t, 250 - 12.3*t);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.fillText(100, 242, 252);
    ctx.stroke();


}

/**
    * Dart Calculation/Animation
    */

const TIME = 1.25; // always in flight for 1.25s
const g = 10; // acceleration of falling to ground
const Vx = 0; // variable x-direction velocity pointed horizontally on screen
const Vy = 0; // variable y-direction velocity pointed vertically on screen
// const Vz = 2; // z-direction velocity pointed into the screen, set at 2 m/s
                // (1.25 s for dart to hit the board)

function calculateFlight() {
    if(thrown) {
        $('#dartFlight').css({
            left: $('#dartHand').css.left,
            top: $('#dartHand').css.top,
        })
    }
}

var ignore = false;
var thrown = false;

let prevMouseX = -1;
let prevMouseY = -1;
let prevTime = new Date();

$(document).mousedown(function() {
    if(!ignore) {
        $('#dartHand').css({
            visibility: 'visible',
        })
        $('body').css('cursor', 'none');
    }
});

$(document).mouseup(function() {
    $('#dartHand').css({
        visibility: 'hidden',
    })
    $('body').css('cursor', 'default');

    thrown = true;

    window.setTimeout(() => thrown = false, 1250);
});

$(document).ready(function() {
    $(document).on('mousemove', function(e) {
        const curX = e.pageX-50; // -50 to calibrate for cursor
        const curY = e.pageY-50;

        $('#dartHand').css({
            left: curX,
            top: curY,
        });
        
        let time = new Date();

        // const dX = Math.abs(e.pageX - 50 - )
        const dTime = time - prevTime; // delta time in milliseconds

        

        prevMouseX = e.pageX-50;
        prevMouseY = e.pageY-50;
    })
});

function setIgnore() {
    ignore = true;
}
function setUnignore() {
    ignore = false;
}