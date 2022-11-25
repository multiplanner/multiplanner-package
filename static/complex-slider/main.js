const mcbwidth = document.body.clientWidth;
const mcbheight = document.body.clientHeight;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const buttonWidth = mcbwidth / 5;
const xo = mcbwidth / 2 - buttonWidth / 2;
const yo = mcbheight / 2;

const setup = () => {
    canvas.width = mcbwidth;
    canvas.height = mcbheight;
    
    ctx.fillStyle = "rgb(100, 100, 100)";
    ctx.fillRect(mcbwidth / 2 - buttonWidth / 2, mcbheight / 2 - 2, buttonWidth, 4);
    
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.lineWidth = 5;
    
    ctx.font = Math.round(mcbwidth / 20) + "px Times New Roman";
    
    let mousedown = false;

    canvas.onmousedown = () => mousedown = true;

    canvas.onmouseup = () => mousedown = false;

    document.onmousemove = (event) => {
        if (!mousedown) return
        const x = event.offsetX;
        const y = event.offsetY;
        const snap = x > xo && x < xo + buttonWidth && y < yo + buttonWidth / 10 && y > yo - buttonWidth / 10;
        draw(x, snap ? yo : y, !snap);
    };

    draw(Math.round(xo + Math.random() * buttonWidth * 0.8 + buttonWidth * 0.1), yo);
}

const draw = (x, y, realy) => {
    drawbutton(x, y);
    drawtext(x, y, realy);
};

const drawbutton = (x, y) => {
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.clearRect(0, 0, mcbwidth, mcbheight);
    ctx.fillRect(xo, yo - 2, buttonWidth, 4);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgb(0,0,0)";
};

const drawtext = (x, y, realy) => {
    const a = (x / mcbwidth) * 500 - 200;
    const b = (-y / mcbheight) * 500 + 250;

    const addition = realy && b != 0 ? " + " + Math.round(b) + "i" : "%";
    ctx.fillText(Math.round(a) + addition, 0, Math.round(mcbwidth / 20));
};

setup();
