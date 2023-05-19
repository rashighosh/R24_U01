
//find dfMessenger declared in html file
const dfMessenger = document.querySelector('df-messenger');

//listen for response
dfMessenger.addEventListener('df-response-received', function (event) {
    // set session id to send to qualtrics later
    sessionID = dfMessenger.getAttribute("session-id");

    console.log(sessionID);
    console.log("received");
    console.log(event);

    //displayName is the name you give in Dialog flow to the intent, name is the intent id dialogflow assigns
    var intentName 

    if (event.detail.response.queryResult.fulfillmentMessages[1]) {
        intentName = event.detail.response.queryResult.fulfillmentMessages[1].payload.intentName;
    } 

    //make video link
    intentName = intentName.replaceAll(" ", "_");
    intentName = intentName.replaceAll("/", "_");
    console.log(intentName);
    //change this to point to the folder where your videos are, if not in the videos folder
    var video_folder = "https://research-studies-with-alex.s3.amazonaws.com/Videos/Alex/";
    var videoURL = video_folder + intentName + ".mp4";
    changeVid(videoURL);
});

function switchIdle() {
    /* Switch between a preloaded idle video and the newly loaded video to remove white flash*/
    var em = document.getElementById("myVideo");
    var temp = window.getComputedStyle(em).getPropertyValue("opacity");

    if (temp == "1") {
        document.getElementById("idleVideo").style.opacity = "1";
        document.getElementById("myVideo").style.opacity = "0";
    }

    if (temp == "0") {
        document.getElementById("myVideo").style.opacity = "1";
        document.getElementById("idleVideo").style.opacity = "0";
    }
}

//Add Parameter to Change Video Based on Intent Name
function changeVid(URL) {
    var vid = document.getElementById("myVideo");
    vid.src = URL;
    vid.load();
    vid.play();
    document.getElementById("myVideo").style.opacity = "1";
    document.getElementById("idleVideo").style.opacity = "0";
}

function redirectPage() {
    // REPLACE QUALTRICS SURVEY URL HERE
    // window.location.href = "/R24-ALEX/clinicaltrials.html"
    window.location.href = "/clinicaltrials.html"
}

