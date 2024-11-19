function taskClick(name) {
    switch (name) {
        case 'location':
            getLocation(setLocationTask, setErrorLocation);
            break;

        default:

            break;
    }
}

// var position = {coords: {latitude: 45.838302, longitude: 15.225881}};
// setLocationTask(position);
function setLocationTask(position) {
//    var position = {coords: {latitude: -26.099122, longitude: 31.730768}};

    let latitude = position.coords.latitude, longitude = position.coords.longitude, country, province, area;
    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + latitude + "&lon=" + longitude + "&accept-language=en")
            .then(x => x.json())
            .then(y => {
                console.log(y);
                if (y && y.address) {
                    y = y.address;
                    country = y.country;
                    province = y.province || y.state || "null>49";
                    area = y.county || y.city || y.town || y.municipality || "null>74";

                    console.log("latitude : ", latitude, "longitude : ", longitude, "country : ", country, "province : ", province, "area : ", area);
                } else {
                    toast.danger("this area is not correct!");
                }
            });
}
function setErrorLocation(msg) {
    switch (msg.code) {
        case 1:
            toast.warning("Permission Denied, the acquisition of the geolocation information failed because the page didn't have the permission to do it.");
            break;
        case 2:
            toast.warning("Position Unavailable, the acquisition of the geolocation failed because one or several internal sources of position returned an internal error.");
            break;
        case 3:
            toast.warning("Timeout!, geolocation information was not obtained in the allowed time.");
            break;
    }
}


//import {decodeFile} from "../../cdn/mood/main.js";

let laughingLockFlag = false, laughCounter = 1, laughInterval, laughBt = $s("#laugh_bt"), laughText = $s("#laugh_bt span"), laughImg = $s("#laugh_bt img"),
        laughAudio = new Audio();
let laughBetweenInterval;

function startRecordClicked() {
    if (!laughingLockFlag) {
        laughingLockFlag = true;
        console.log("ontouchstart");
        laughCounter = 1;
        laughInterval = setInterval(() => {
            laughText.innerText = laughCounter++ + "s";
            laughImg.src = "cdn/img/" + (laughCounter % 2 != 0 ? "record_off.svg" : "record_on.svg");
            if (laughCounter >= laughingDuration) {
                stopRecordClicked();
            }
        }, 1000);
        startRecording("afterRecord");
    } else {
        toast.info("please wait by timer!");
    }
}
function stopRecordClicked() {
    console.log("ontouchend");
    laughImg.src = "cdn/img/record_off.svg";
    stopRecording();
    clearInterval(laughInterval);

}
function afterRecord(blob) {
    let fileReader = new FileReader(), arrayBuffer;
    fileReader.onloadend = () => {
        arrayBuffer = fileReader.result;
        laughAudio.src = window.URL.createObjectURL(blob);
        ;
        console.log(blob, fileReader, arrayBuffer);
        decodeFile(arrayBuffer, "getMoodResultOfLaughing");
        laughAudio.play();
    };
    fileReader.readAsArrayBuffer(blob);
}

laughBt.ontouchstart = startRecordClicked;
//laughBt.ontouchend = stopRecordClicked;
laughBt.onmousedown = startRecordClicked;
//laughBt.onmouseup = stopRecordClicked;

let laughResultModal = $s("#laugh_result_modal"),
        dunotColor = {25: {percent: .25, color: "#ffce56"}, 50: {percent: .50, color: "#ff6384"}, 75: {percent: .75, color: "#36a2eb"}, 85: {percent: .85, color: "#4caf50"}};

function getMoodResultOfLaughing(predications) {
//    predications.danceability
//    predications.mood_aggressive
//    predications.mood_happy
//    predications.mood_relaxed
//    predications.mood_sad

    predications.mood_sad = 1 - predications.mood_sad;

    let laughingPowerColor, laughingQualityColor;
    if (predications.mood_happy < dunotColor[25].percent) {
        laughingPowerColor = dunotColor[25].color;
    } else if (predications.mood_happy < dunotColor[50].percent) {
        laughingPowerColor = dunotColor[50].color;
    } else if (predications.mood_happy < dunotColor[75].percent) {
        laughingPowerColor = dunotColor[75].color;
    } else {//if (predications.mood_happy < dunotColor[85].percent) 
        laughingPowerColor = dunotColor[85].color;
    }

    if (predications.mood_sad < dunotColor[25].percent) {
        laughingQualityColor = dunotColor[25].color;
    } else if (predications.mood_sad < dunotColor[50].percent) {
        laughingQualityColor = dunotColor[50].color;
    } else if (predications.mood_sad < dunotColor[75].percent) {
        laughingQualityColor = dunotColor[75].color;
    } else {// if (predications.mood_sad < dunotColor[85].percent) 
        laughingQualityColor = dunotColor[85].color;
    }


//    $s("#laughing_power p").innerText = "laughing power : %" + Math.floor(predications.mood_happy * 100);
//    $s("#laughing_quality p").innerText = "laughing quality : %" + Math.floor(predications.mood_sad * 100);

    let totalResult = predications.mood_sad + predications.mood_happy, totalImg, totalTxt, prize = totalResult * laughingPrizeValue;
    if (prize > laughingPrizeValue) {
        prize = laughingPrizeValue;
    } else if (prize < minimumLaughingPrize) {
        prize = 0;
    }
    console.log("result", totalResult);
    if (totalResult < dunotColor[25].percent) {
        totalTxt = "hey buddy take care of yourself";
        totalImg = "cdn/img/emoji_grimace.svg";
    } else if (totalResult < dunotColor[50].percent) {
        totalTxt = "Not bad, watch more funny films and meet funny friends";
        totalImg = "cdn/img/emoji_happy.svg";
    } else if (totalResult < dunotColor[75].percent) {
        totalTxt = "congratulations you are happy";
        totalImg = "cdn/img/laughing_emoji.svg";
    } else {//if (totalResult < dunotColor[85].percent) 
        totalTxt = "WOW! you are in happiness";
        totalImg = "cdn/img/smiley_kiss.svg";
    }
//    $s("#laugh_result_modal h1 img").src = totalImg;
//    $s("#laugh_result_modal h1 span").innerHTML = totalTxt + "<br><br>* YOU WIN : <b>" + Math.floor(prize) + "</b> *";
    lastLaughingTimeValue = new Date() * 1;
    localStorage.setItem(LS_VAR.LAST_LAUGHING_TIME, lastLaughingTimeValue);
    setLaughTimer();

    new WinBox({
//        title: null,
        modal: true,
        width: "99%",
        height: "99%",
        x: "center",
        y: "center",
        html: '<div id="laugh_result_modal">' +
                '<h2>Laughing Fun Result!</h2>' +
                '<div>' +
                '<div id="laughing_power">' +
                '<p>' + "laughing power : %" + Math.floor(predications.mood_happy * 100) + '</p>' +
                '<div class="volume_bar"></div>' +
                '</div>' +
                '<div id="laughing_quality">' +
                '<p>' + "laughing quality : %" + Math.floor(predications.mood_sad * 100) + '</p>' +
                '<div class="volume_bar"></div>' +
                '</div>' +
                '</div>' +
                '<div class="play_laugh_div"><span>Listen : </span><img id="play_laugh_bt" src="cdn/img/play2.svg"></div>' +
                '<h1><span>' + totalTxt + "<br><img src=\"" + totalImg + "\"><br><p class='fg_orange'>* YOU WIN : <b class='fg_aqua'>" + Math.floor(prize) + "</b> *</p>" + '</span></h1>' +
                '</div>'
    });

    setTimeout(a => {
        drawDonutChart($s("#laughing_power div"), [
            {value: predications.mood_happy, color: laughingPowerColor},
            {value: 1 - predications.mood_happy, color: "#fff"}
        ]);

        drawDonutChart($s("#laughing_quality div"), [
            {value: predications.mood_sad, color: laughingQualityColor},
            {value: 1 - predications.mood_sad, color: "#fff"}
        ]);
        $s("#play_laugh_bt").onclick = () => {
            laughAudio.play();
        };
    }, 1000);

}

function setTaskInit() {
    if (!bigJson.area) {
        showElems("#location");
    }
    if (!bigJson.wallet_addr) {
        showElems("#wallet");
    }
    if (bigJson.recent_friends.length < 2) {
        showElems("#num09");
    } else if (bigJson.recent_friends.length < 7) {
        showElems("#wheel2x");
    }
    setLaughTimer();


}
function setLaughTimer() {
    var d = new Date() * 1;
    if (lastLaughingTimeValue + laughingBetweenTime < d) {
        laughText.innerText = "start";
        laughingLockFlag = false;
    } else {
        laughingLockFlag = true;
        let diff;
        laughBetweenInterval = setInterval(() => {
//            console.log("DDDDDDDDDDDDDDDDDDDDD");
            diff = getDateDiffrence(new Date() * 1, lastLaughingTimeValue + laughingBetweenTime, {m: true, s: true});
            laughText.innerText = diff.m + "m : " + diff.s + "s left";
            if (diff.m == 0 && diff.s < 2) {
                initMoodAnalyse();
                clearInterval(laughBetweenInterval);
                laughingLockFlag = false;
                laughText.innerText = "start";
            }
        }, 1000);
    }
}
setTaskInit();

$s("#youtube_content_bt").onclick = () => {

    if (lastYoutubeContentLinkValue + ONE_WEEK < (new Date() * 1)) {
        //*** send to server

        //*** after to submit I must be update time
        lastYoutubeContentLinkValue = new Date() * 1;
        localStorage.getItem(LS_VAR.LAST_YOUTUBE_CONTENT_LINK, lastYoutubeContentLinkValue);

    } else {
        toast.info("every link will be submit per week");
    }

};


//var vb=new VenoBox({
//    selector: '.my-custom-links',
//});
//vb.open();
//new WinBox({
//    title: "Custom Position / Size",
//    modal:true,
//    x: "center",
//    y: "center",
//    width: "50%",
//    height: "50%"
//});



let tonConnectBt = $s("#ton_con_bt");


const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://usercargo.github.io/tonconnect-manifest.json',
//    buttonRootId: 'ton_con_bt'
    buttonRootId: null
});
tonConnectUI.uiOptions = {
    twaReturnUrl: 'https://t.me/calinowenbot'
};
tonConnectUI.connectionRestored.then(restored => {
//    if (restored) {
        console.log("setWalletBt >  tonConnectUI.connected:", tonConnectUI.connected);
        if (restored&&tonConnectUI.connected && bigJson.wallet_bounceable_addr) {
            tonConnectBt.innerHTML = getWalletSmallAddress(bigJson.wallet_bounceable_addr) + "<br>change";
        } else {
            tonConnectBt.innerHTML = "connect<br>wallet";
        }



        tonConnectBt.onclick = () => {
            disconnectWallet();
            connectToWallet().catch(error => {
                console.error("Error connecting to wallet:", error);
            });
        };

//    } else {
//        console.log('Connection was not restored.');
//    }
});

//tonConnectUI.uiOptions = {
//    uiPreferences: {
//        theme: THEME.DARK
//    }
//};

async function connectToWallet() {
    const connectedWallet = await tonConnectUI.connectWallet();
    // Do something with connectedWallet if needed
//*** remove testnet address in production 
    let hexRawWalletAddress = connectedWallet.account.address, bounceableWalletAddress, bounceableWalletTestAddress;
    if (hexRawWalletAddress.length > 5 && hexRawWalletAddress.startsWith("0:")) {
        bounceableWalletAddress = TON_CONNECT_UI.toUserFriendlyAddress(hexRawWalletAddress);
        bounceableWalletTestAddress = TON_CONNECT_UI.toUserFriendlyAddress(hexRawWalletAddress, true);
        //*** send to server address 
    }

    console.log("hexRawWalletAddress:", hexRawWalletAddress, "bounceableWalletAddress:", bounceableWalletAddress, "bounceableWalletTestAddress:", bounceableWalletTestAddress);
    console.log(connectedWallet);

}

async function disconnectWallet() {
    if (tonConnectUI.connected) {
        await tonConnectUI.disconnect().catch(error => {
            console.error(error);
        });
    }
}

// Call the function

//tonConnectUI.getWallets();
