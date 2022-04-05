
var canvas = new fabric.Canvas('c', {
    backgroundColor: "lightgrey",
    width: 1200,

    height: 550


});
console.log("ted", canvas);
// canvas.on("mouse:wheel", function (opt) {
//     var delta = opt.e.deltaY;
//     var zoom = canvas.getZoom();
//     zoom *= 0.999 ** delta;
//     if (zoom > 20) zoom = 20;
//     if (zoom < 1) zoom = 1;
//     canvas.setZoom(zoom);
//     opt.e.preventDefault();
//     opt.e.stopPropagation();
// });



canvas.on('mouse:wheel', function (opt) {


    let zoomLevel = canvas.getZoom();


    console.log("center of canvas", canvas);

    // console.log('zoom Level: ', (zoomLevel * 100).toFixed(0), '%');
    zoomLevel += opt.e.deltaY * -0.01;
    // zoom *= 0.999 ** delta;
    // Restrict scale

    zoomLevel = Math.min(Math.max(1, zoomLevel), 20);
    console.log(opt.e.deltaY, zoomLevel);

    if (zoomLevel <= 1.5 && opt.e.deltaY >= 0) {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);


    }
    // if (zoomLevel > 20) zoom = 20;
    // console.log(zoomLevel);

    canvas.zoomToPoint(
        new fabric.Point(opt.e.offsetX, opt.e.offsetY),
        zoomLevel,
    );
    // canvas.getActiveObject().top = coords.y;
    // canvas.getActiveObject().left = coords.x;
    // console.log("uhj", coords.x, canvas.getActiveObject().left)

    // canvas.getActiveObject().left = coords.x;
    // canvas.setZoom(zoomLevel);


    opt.e.preventDefault();
    opt.e.stopPropagation();
    // canvas.renderAll();

})
function objectAddedListener(ev) {
    let targetX = (ev.target.aCoords.bl.x + ev.target.aCoords.br.x) / 2;
    let targetY = (ev.target.aCoords.tl.y + ev.target.aCoords.bl.y) / 2;
    console.log(targetX, targetY);
    coords = {
        x: targetX,
        y: targetY,
    };
}

function objectMovedListener(ev) {
    let targetX = (ev.target.aCoords.bl.x + ev.target.aCoords.br.x) / 2;
    let targetY = (ev.target.aCoords.tl.y + ev.target.aCoords.bl.y) / 2;
    console.log(targetX, targetY);
    console.log("cvpc", ev);
    coords = {
        x: targetX,
        y: targetY,
    };
}

canvas.on("object:added", objectAddedListener);
canvas.on("object:modified", objectMovedListener);




document.getElementById('filereader').onchange = function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        console.log('fdsf');
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
            // start fabricJS stuff

            var image = new fabric.Image(imgObj);
            image.set({
                left: 20,
                top: 100,
                padding: 10,

            });
            /* image.scale(getRandomNum(0.1, 0.25)).setCoords(0,0);  */
            image.scale(0.4).setCoords();
            canvas.add(image);

            // end fabricJS stuff
        }
    }
    reader.readAsDataURL(e.target.files[0]);
}


function deleteobj() {
    canvas.remove(canvas.getActiveObject());

} 