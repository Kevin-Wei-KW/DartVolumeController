function draw() {
  const canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#FFFFFF"

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

  ctx.globalAlpha = 0.2;

  ctx.font = "70px Arial";
  ctx.fillStyle = "white";

  ctx.fillText("1", 275, 140);
  ctx.fillText("2", 340, 190);
  ctx.fillText("3", 370, 275);
  ctx.fillText("4", 340, 355);
  ctx.fillText("5", 275, 410);
  ctx.fillText("6", 190, 410);
  ctx.fillText("7", 120, 355);
  ctx.fillText("8", 90, 275);
  ctx.fillText("9", 120, 190);
  ctx.fillText("0", 190, 140);


}

var mouseDown = false;

$(document).mousedown(function() {
  mouseDown = true;
  $('#dart').css({
    visibility: 'visible',
  })
  $('body').css('cursor', 'none');
});

$(document).mouseup(function() {
  mouseDown = false;
  $('#dart').css({
    visibility: 'hidden',
  })
  $('body').css('cursor', 'default');

});

$(document).ready(function() {
  $(document).on('mousemove', function(e) {
    $('#dart').css({
      left: e.pageX,
      top: e.pageY
    });
  })
});