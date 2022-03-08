noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 550);
    video.position(90, 220)
    
    canvas = createCanvas(550, 550);
    canvas.position(650,200);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + "Nose Y = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        
        console.log("Left Wrist X = " + leftWristX + " Right Wrist X = 0 " + rightWristX + " Difference = " + difference);
    }
}

function modelLoaded(){
    console.log('POSENET IS INITIALIZED!');
}


function draw() {
    background('#ADD8E6');
    fill('#F90093');
    stroke('#F90093');
    square(noseX, noseY, difference);
    document.getElementById("square_sides").innerHTML = "Width And Height Of The Sqaure Will Be = " + difference + "px";
}