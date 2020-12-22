
function setup() {
    createCanvas(editorWidth(), editorHeight());
    cursor('grab');
}

function draw() {
    background(153);
    line(0, 0, width, height);
}

function windowResized() {
    resizeCanvas(editorWidth(), editorHeight());
}

function editorWidth() {
    return innerWidth;

}
function editorHeight() {
    return innerHeight - $(".navbar").height();
}