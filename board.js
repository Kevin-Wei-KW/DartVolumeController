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
let Vx = 0; // variable x-direction velocity pointed horizontally on screen
let Vy = 0; // variable y-direction velocity pointed vertically on screen
let dartX= 0;
let dartY = 0;
let dartSize = 80;
// const Vz = 2; // z-direction velocity pointed into the screen, set at 2 m/s
                // (1.25 s for dart to hit the board)

let xMax = 0;
let yMax = 0;

function resetState() {
    Vx = 0;
    Vy = 0;
    dartX = 0;
    dartY = 0;
    xMax = 0;
    yMax = 0;
    dartSize = 80;
}

function simulateFlight() {

    $('#dartFlight').css({
        visibility: 'visible',
    })

    const flightInterval = setInterval(() => {
        $('#dartFlight').css({
            left: dartX,
            top: dartY,
            fontSize: dartSize,
        })

        dartX += Vx * 0.05;
        dartY += Vy * 0.05;
        Vy = Vy + g * 0.05;

        dartSize -= 0.5;

        if(!thrown) {
            clearInterval(flightInterval);
            // $('#dartFlight').css({
            //     visibility: 'hidden',
            // })
            
            resetState();
        }
    }, 10);
}

var ignore = false;
var thrown = false;
var holding = false;

let curX = -1;
let curY = -1;
let prevMouseX = -1;
let prevMouseY = -1;
let prevTime = new Date();

// start holding dart
$(document).mousedown(function() {
    if(!ignore) {
        $('#dartHand').css({
            visibility: 'visible',
        })
        $('body').css('cursor', 'none');

        holding = true;
    }
    resetState();
});

// release dart
$(document).mouseup(function() {
    $('#dartHand').css({
        visibility: 'hidden',
    })
    $('body').css('cursor', 'default');

    console.log(Vx + ' ' + Vy);


    thrown = true;
    holding = false;

    dartX = curX;
    dartY = curY;
    simulateFlight();

    window.setTimeout(() => thrown = false, 1250);
});

$(document).ready(function() {
    $(document).on('mousemove', function(e) {
        curX = e.pageX-50; // -50 to calibrate for cursor
        curY = e.pageY-50;

        $('#dartHand').css({
            left: curX,
            top: curY,
        });
        
        let curTime = new Date();

        // const dX = Math.abs(e.pageX - 50 - )
        let dTime = curTime - prevTime; // delta time in milliseconds

        if(holding && Math.abs(((curX - prevMouseX) / (dTime/1000))) > Math.abs(Vx)) {
            Vx = (curX - prevMouseX) / (dTime/1000);
        }

        if(holding && Math.abs(((curY - prevMouseY) / (dTime/1000))) > Math.abs(Vy)) {
            Vy = (curY - prevMouseY) / (dTime/1000);
        }

        // Vx = (curX - prevMouseX) / (dTime/1000);
        // Vy = (curY - prevMouseY) / (dTime/1000);


        // xMax = Math.max(xMax, Vx);
        // yMax = Math.max(yMax, Vy);
        // console.log("Max:" + xMax + " " + yMax);
        // console.log(Vx + ' ' + Vy);
        
        prevTime = dTime;
        prevMouseX = e.pageX-50;
        prevMouseY = e.pageY-50;

        console.log(thrown);

    })
});

function setIgnore() {
    ignore = true;
}
function setUnignore() {
    ignore = false;
}