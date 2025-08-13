import { throttle } from "lodash";

export const renderPredictions = (predictions, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const font="16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach((prediction) => {
        const [x,y,width,height] = prediction["bbox"]
        const isPerson = prediction.class === "person"; 

        ctx.strokeStyle = isPerson ? "red" : "blue";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);
        ctx.fillStyle = `rgba(255,0,0, ${isPerson ? 0.2 : 0})`
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = isPerson ? "red" : "blue";
        ctx.textWidth = ctx.measureText(prediction.class).width;
        ctx.textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, ctx.textWidth + 4, ctx.textHeight + 4);

        ctx.fillStyle = "white";
        ctx.fillText(prediction.class, x, y);

        if(isPerson){
            playAudio();
        }
    }); // Close forEach

}; // Close arrow function

const playAudio = throttle(() => {
    const audio = new Audio("/public_pols-aagyi-pols.mp3")
    audio.play();
}, 2000);