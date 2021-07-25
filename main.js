Webcam.set({
    width: 400,
    height: 300,
    image_format: "png",
    png_quality: 110
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='snapshot_result' src=" + data_uri + ">"
    })
}

console.log("ml5.version" + ml5.version)

classefier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/mCVak3mSc/model.json", model_loded)

function model_loded() {
    console.log("model_loded")
}
prediction1 = ""
prediction2 = ""

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction1
    speak_data_2 = "and the second prediction is " + prediction2
    var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utter_this)
}

function check() {
    img = document.getElementById("snapshot_result");
    classefier.classify(img, got_results)
}

function got_results(error, result) {
    if (error) {
        console.error(error)
    } else {
        console.log(result)
        prediction1 = result[0].label
        prediction2 = result[1].label
        document.getElementById("result_emotion_name").innerHTML = prediction1
        document.getElementById("result_emotion_name2").innerHTML = prediction2
        speak()
        if (prediction1 == "thumps up") {
            document.getElementById("result_emoji").innerHTML = "&#128077;"
        }
        if (prediction1 == "peace") {
            document.getElementById("result_emoji").innerHTML = "&#9996;"
        }

        if (prediction1 == "super") {
            document.getElementById("result_emoji").innerHTML = "&#128076;"
        }



        if (prediction2 == "thumps up") {
            document.getElementById("result_emoji2").innerHTML = "&#128077;"
        }

        if (prediction2 == "peace") {
            document.getElementById("result_emoji2").innerHTML = "&#9996;"
        }

        if (prediction2 == "super") {
            document.getElementById("result_emoji2").innerHTML = "&#128076;"
        }

    }
}