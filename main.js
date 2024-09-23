class Pixel {
    constructor(x, y, w, h) {
        var pix = document.createElement("div");

        pix.style.position = "absolute";
        pix.style.width = w + "px";
        pix.style.height = h + "px";
        pix.style.marginLeft = x + "px";
        pix.style.marginTop = y + "px";

        pix.style.borderRadius = "100%";
        pix.style.backgroundColor = "#ffffff";
        // pix.style.background = "linear-gradient(25deg, #ff00ff, #ff0000)";

        document.body.appendChild(pix);

        var t = 0;

        var rb = 0;
        var gv = 1;

        var forcaBola = 1;
        var gravidadeBola = 10;
        var forcaGravidade = 1;

        function update() {
            pix.style.marginLeft = x + "px";
            pix.style.marginTop = y + "px";

            if(!isGravity) {
                t += 0.0150;
                x += (Math.cos(t)) * 2.25;
                y += (Math.sin(t)) * 1.25;
            }else {
                rb += gv;

                y += gravidadeBola / forcaBola - forcaGravidade;
                
                if(y >= window.innerHeight - 50)
                {
                    gravidadeBola -= 10;
                    forcaBola += 0.25;
                    forcaGravidade -= 1;
                }
                else 
                {
                    gravidadeBola += 0.25;
                }

                if(forcaGravidade <= 0) {
                    forcaGravidade = 0;
                }
            }
        }

        setInterval(update, 1000.00 / 120.00);

        setTimeout(() => {pix.remove();}, 15000);
    }
}

var isPressed = false;
var isGravity = false;
var gravityCounter = 0;

function draw(x, y) {
    new Pixel(x, y, 10, 10);
}

addEventListener("mousedown", function(e) {isPressed = true;});
addEventListener("mouseup", function(e) {isPressed = false;});

addEventListener("mousemove", function(e) {
    if(isPressed) {
        draw(e.x, e.y);
    }
});

addEventListener("keydown", function(e) {
    if(e.key != "Enter") {
        this.window.location.reload();
    }else{
        gravityCounter ++;
        if(gravityCounter == 1) {
            isGravity = true;
        }else if(gravityCounter > 1) {
            isGravity = false;
            gravityCounter = 0;
        }
    }
})