prediction = "";

Webcam.set( {
  width: 350 ,
  height: 300 , 
  image_format: "png" ,
  png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(params) {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'">';
    })
}

console.log("ml5 version: " , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/VQatL0BFs/model.json" , modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img , got_Result);
}

function got_Result(error , results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Super") {
            document.getElementById("update_gesture").innerHTML = "👌";
        }
        if (results[0].label == "Thumbs Up") {
            document.getElementById("update_gesture").innerHTML = "👍";
        }
        if (results[0].label == "Victory") {
            document.getElementById("update_gesture").innerHTML = "✌";
        }
    }
}