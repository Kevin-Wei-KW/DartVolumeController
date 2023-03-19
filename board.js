function draw() {
  const canvas = document.getElementById("canvas");

  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#FFFFFF"

  ctx.beginPath();
  ctx.arc(250, 250, 180, 0, Math.PI * 2, true); // Outer circle
  ctx.stroke(); 
}

var mouseDown = false;

$(document).mousedown(function() {
  mouseDown = true;
  $('#dart').css({
    visibility: 'visible',
  })
});

$(document).mouseup(function() {
  mouseDown = false;
  $('#dart').css({
    visibility: 'hidden',
  })
});

$(document).ready(function() {
  $(document).on('mousemove', function(e) {
    $('#dart').css({
      left: e.pageX,
      top: e.pageY
    });
  })
});