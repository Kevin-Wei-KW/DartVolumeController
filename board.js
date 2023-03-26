function startGame() {
    $("#top").remove();
}

window.onresize = function(){ location.reload(); }

// TBD: delete when finished
var graphOffsets = document.getElementById("canvas").getBoundingClientRect();
var boxOffsets = document.getElementById("box").getBoundingClientRect();

var centerX = graphOffsets.left + (graphOffsets.width/2);
var centerY = graphOffsets.top + (graphOffsets.height/2);

var dSize = 20;
var index = 1;

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

const TIME = 750; // always in flight for 1.25s
const g = 10; // acceleration of falling to ground
let Vx = 0; // variable x-direction velocity pointed horizontally on screen
let Vy = 0; // variable y-direction velocity pointed vertically on screen
let dartX= 0;
let dartY = 0;
let dartSize = 80;
// const Vz = 2; // z-direction velocity pointed into the screen, set at 2 m/s
                // (1.25 s for dart to hit the board)

let xMax = 0; // max speed achieved during throw
let yMax = 0;

var flight; // timeout variable for flight

function resetState() {
    Vx = 0;
    Vy = 0;
    dartX = 0;
    dartY = 0;
    xMax = 0;
    yMax = 0;
    dartSize = 80;

    ignore = false;
    thrown = false;
    holding = false;
    dropped = false;

    prevTime = new Date();

    clearTimeout(flight);
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

        // limit max speed
        if(Vx > 0) {
            Vx = Math.min(Vx, 5);
        } else {
            Vx = Math.max(Vx, -5);
        }

        if(Vy > 0) {
            Vy = Math.min(Vy, 5);
        } else {
            Vy = Math.max(Vy, -5);
        }

        // console.log('X' + ''+ Vx);
        // console.log('Y' + '' + Vy);

        dartX += Vx * 0.8;
        dartY += Vy * 0.8;
        Vy += g * 0.01;

        if(xMax !== 0 || yMax !== 0) {
            dartSize -= 0.8;
            dartX += 0.4;
            dartY += 0.6;
        } else {
            Vy += g*0.07;
        }

        if(!thrown) {
            calcPoints(dartX, dartY);
            resetState();
            clearInterval(flightInterval);
        }
    }, 10);
}

var ignore = false; // whether to ignore holding (mousedown) event
var thrown = false; // whether dart has been thrown
var holding = false; // whether dart is being held
var dropped = false; // whether dart was dropped instead of thrown

let curX = -1;
let curY = -1;
let prevMouseX = -1;
let prevMouseY = -1;
let prevTime;

// start holding dart
$(document).bind('touchstart mousedown', function(e) {
    e.preventDefault();

    if(!ignore && !thrown) {
        resetState();

        $('#dartHand').css({
            visibility: 'visible',
        })
        $('body').css('cursor', 'none');

        holding = true;
    }

    // console.log("Start");

});



// release dart
$(document).bind('touchend mouseup', function(e) {

    if(!thrown && !ignore) {
        $('#dartHand').css({
            visibility: 'hidden',
        })
        $('body').css('cursor', 'default');


        thrown = true;
        holding = false;

        dartX = curX;
        dartY = curY;
        simulateFlight();

        dropped = xMax === 0 && yMax === 0; // dart is dropped if not thrown
        if(dropped) {
            insult();
        }

        flight = window.setTimeout(() => thrown = false, dropped? 1500:TIME);
    }
    
    // console.log("End");

});

const OFFSET_X = 55;
const OFFSET_Y = 60;

$(document).ready(function() {
    $(document).on('mousemove', function(e) {
        curX = e.pageX - OFFSET_X; // minus to calibrate for cursor
        curY = e.pageY - OFFSET_Y;

        handleMove();
    })
    $(document).on('touchmove', function(e) {
        e.preventDefault();

        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

        curX = touch.pageX - OFFSET_X;
        curY = touch.pageY - OFFSET_Y;

        handleMove();
    })
});

function handleMove() {
    $('#dartHand').css({
        left: curX,
        top: curY,
    });

    // console.log(e.pageX + ' ' + e.pageY);

    
    if(holding) {
        
        let curTime = new Date();
        let dTime = curTime - prevTime; // delta time in milliseconds

        // const dX = Math.abs(e.pageX - 50 - )

        // if(holding) {
        //     if(Math.abs(((curX - prevMouseX) / (dTime))) > Math.abs(Vx)) {
        //         Vx = (curX - prevMouseX) / (dTime);
        //         xMax = Vx;
        //     }
    
        //     if(Math.abs(((curY - prevMouseY) / (dTime))) > Math.abs(Vy)) {
        //         Vy = (curY - prevMouseY) / (dTime);
        //         yMax = Vy;
        //     }
        // }

        Vx = (curX - prevMouseX) / (dTime);
        Vy = (curY - prevMouseY) / (dTime);
        xMax = Math.max(xMax, Vx);
        yMax = Math.max(yMax, Vy);


        // xMax = Math.max(xMax, Vx);
        // yMax = Math.max(yMax, Vy);
        // console.log("Max:" + xMax + " " + yMax);
        // console.log(Vx + ' ' + Vy);
        
        prevTime = curTime;
        prevMouseX = curX;
        prevMouseY = curY;

    }
}

function setIgnore() {
    ignore = true;
}
function setUnignore() {
    ignore = false;
}

function insult() {
    let insults = ['Really?', 'Wow', 'Why are you doing this to yourself'];

    let pick = Math.floor(Math.random() * 3);

    $('#insult').html(insults[pick]);
}