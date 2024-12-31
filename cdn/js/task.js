


function taskClick(name) {
    switch (name) {
        case 'location':
            getLocation(setLocationTask, setErrorLocation);
            break;
        case 'tower':
            playTowerGame()
            break;
        case 'tgchannel':
            window.Telegram.WebApp.openTelegramLink(tgChannel);
            break;

        default:

            break;
    }
}



function playTowerGame() {
    let lastTowerTime = Number(localStorage.getItem(LS_VAR.TOWER_GAME_LAST_TIME_PLAYING));
    if (!towerGameLockFlag) {
        if (new Date() * 1 - lastTowerTime > STATIC_VARIABLE.ONE_HOUR) {
            if (!localStorage.getItem(LS_VAR.TOWER_GAME_QTY)) {
                localStorage.setItem(LS_VAR.TOWER_GAME_QTY, "[]");
            }
            localStorage.setItem(LS_VAR.BIGJSON, JSON.stringify(bigJson));
            window.location.replace("cdn/game/tower/index.html");
        } else {
            let t = getDateDiffrence(lastTowerTime, new Date() * 1, { m: true, s: true });
            toast.info("please wait " + (59 - t.m) + "m: " + (60 - t.s) + "s for next play time");
        }
    } else {
        toast.warning("Your previous score is being sent!");
    }
}
// sample code 
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
                province = y.province || y.state || "-1";
                area = y.county || y.city || y.town || y.municipality || "-1";

                if (province === "-1" && area !== "-1") {
                    province = area;
                } else if (province !== "-1" && area === "-1") {
                    area = province;
                } else if (province === "-1" && area === "-1") {
                    province = country;
                    area = country;
                }

                console.log("latitude : ", latitude, "longitude : ", longitude, "country : ", country, "province : ", province, "area : ", area);

                sendPostData("/addlocation", { latitude: latitude, longitude: longitude, area: area, province: province, country: country });

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

var laughBt = $s("#laugh_bt"), laughingRunLock = false;
laughBt.onclick = () => {
    if (laughingRunLock) {
        toast.warning("please wait :)");
    } else {
        laughingRunLock = true;
        toast.info("please wait for a while!");
        setJsTempo(pages.laughing_lib);
    }
}


var laughingResultTimeout;

// var laughingLockFlag = false, laughCounter = 1, laughInterval, laughBt = $s("#laugh_bt"), laughText = $s("#laugh_bt span"), laughImg = $s("#laugh_bt img"),
//     laughAudio = new Audio();
// var laughBetweenInterval, afterLaughingFlag = true;

// function startRecordClicked() {
//     if (!laughingLockFlag) {
//         laughingLockFlag = true;
//         console.log("ontouchstart");
//         startRecording("afterRecord", "laughingAudioPermission");
//     } else {
//         let t = getDateDiffrence(lastLaughingTimeValue, new Date() * 1, { m: true, s: true });
//         toast.info("please wait " + (59 - t.m) + "m: " + (60 - t.s) + "s for next time");
//     }
// }
// function laughingAudioPermission() {
//     laughCounter = 1;
//     laughInterval = setInterval(() => {
//         laughText.innerText = laughCounter++ + "s";
//         laughImg.src = "cdn/img/" + (laughCounter % 2 != 0 ? "record_off.svg" : "record_on.svg");
//         if (laughCounter >= laughingDuration) {
//             stopRecordClicked();
//         }
//     }, 1000);
// }
// function stopRecordClicked() {
//     console.log("ontouchend");
//     laughImg.src = "cdn/img/record_off.svg";
//     stopRecording();
//     clearInterval(laughInterval);

// }
// function afterRecord(blob) {
//     if (afterLaughingFlag) {
//         let fileReader = new FileReader(), arrayBuffer;
//         fileReader.onloadend = () => {
//             arrayBuffer = fileReader.result;
//             laughAudio.src = window.URL.createObjectURL(blob);
//             console.log(blob, fileReader, arrayBuffer);
//             decodeFile(arrayBuffer, "getMoodResultOfLaughing");
//             laughAudio.play();
//         };
//         fileReader.readAsArrayBuffer(blob);
//     }
// }

// // laughBt.ontouchstart = startRecordClicked;
// //laughBt.ontouchend = stopRecordClicked;
// laughBt.onmousedown = startRecordClicked;
// //laughBt.onmouseup = stopRecordClicked;

// var laughResultModal = $s("#laugh_result_modal"),
//     dunotColor = { 25: { percent: .25, color: "#ffce56" }, 50: { percent: .50, color: "#ff6384" }, 75: { percent: .75, color: "#36a2eb" }, 85: { percent: .85, color: "#4caf50" } };
// var laughingResultTimeout;
// function getMoodResultOfLaughing(predications) {
//     if (afterLaughingFlag) {
//         //    predications.danceability
//         //    predications.mood_aggressive
//         //    predications.mood_happy
//         //    predications.mood_relaxed
//         //    predications.mood_sad

//         predications.mood_sad = 1 - predications.mood_sad;

//         let laughingPowerColor, laughingQualityColor;
//         if (predications.mood_happy < dunotColor[25].percent) {
//             laughingPowerColor = dunotColor[25].color;
//         } else if (predications.mood_happy < dunotColor[50].percent) {
//             laughingPowerColor = dunotColor[50].color;
//         } else if (predications.mood_happy < dunotColor[75].percent) {
//             laughingPowerColor = dunotColor[75].color;
//         } else {//if (predications.mood_happy < dunotColor[85].percent) 
//             laughingPowerColor = dunotColor[85].color;
//         }

//         if (predications.mood_sad < dunotColor[25].percent) {
//             laughingQualityColor = dunotColor[25].color;
//         } else if (predications.mood_sad < dunotColor[50].percent) {
//             laughingQualityColor = dunotColor[50].color;
//         } else if (predications.mood_sad < dunotColor[75].percent) {
//             laughingQualityColor = dunotColor[75].color;
//         } else {// if (predications.mood_sad < dunotColor[85].percent) 
//             laughingQualityColor = dunotColor[85].color;
//         }


//         //    $s("#laughing_power p").innerText = "laughing power : %" + Math.floor(predications.mood_happy * 100);
//         //    $s("#laughing_quality p").innerText = "laughing quality : %" + Math.floor(predications.mood_sad * 100);

//         let totalResult = predications.mood_sad + predications.mood_happy, totalImg, totalTxt, prize = totalResult * laughingPrizeValue;
//         if (prize > laughingPrizeValue) {
//             prize = laughingPrizeValue;
//         } else if (prize < minimumLaughingPrize) {
//             prize = 0;
//         }

//         prize = Math.floor(prize);

//         console.log("result", totalResult);
//         if (totalResult < dunotColor[25].percent) {
//             totalTxt = "Hey buddy, take care of yourself.";
//             totalImg = "cdn/img/emoji_grimace.svg";
//         } else if (totalResult < dunotColor[50].percent) {
//             totalTxt = "Not bad, Watch more funny films and meet funny friends.";
//             totalImg = "cdn/img/emoji_happy.svg";
//         } else if (totalResult < dunotColor[75].percent) {
//             totalTxt = "Congratulations, you are happy";
//             totalImg = "cdn/img/laughing_emoji.svg";
//         } else {//if (totalResult < dunotColor[85].percent) 
//             totalTxt = "WOW! You are the happiest!";
//             totalImg = "cdn/img/smiley_kiss.svg";
//         }
//         //    $s("#laugh_result_modal h1 img").src = totalImg;
//         //    $s("#laugh_result_modal h1 span").innerHTML = totalTxt + "<br><br>* YOU WIN : <b>" + Math.floor(prize) + "</b> *";
//         lastLaughingTimeValue = new Date() * 1;
//         localStorage.setItem(LS_VAR.LAST_LAUGHING_TIME, lastLaughingTimeValue);
//         setLaughTimer();

//         if (prize > 0) {
//             sendPostData("/laughing", { point: prize });
//         }

//         $s("#task_modal div").innerHTML = '<div id="laugh_result_modal">' +
//             '<h2>Laughing Fun Result!</h2>' +
//             '<div>' +
//             '<div id="laughing_power">' +
//             '<p>' + "laughing power : %" + Math.floor(predications.mood_happy * 100) + '</p>' +
//             '<div class="volume_bar"></div>' +
//             '</div>' +
//             '<div id="laughing_quality">' +
//             '<p>' + "laughing quality : %" + Math.floor(predications.mood_sad * 100) + '</p>' +
//             '<div class="volume_bar"></div>' +
//             '</div>' +
//             '</div>' +
//             '<div class="play_laugh_div"><span>Listen : </span><img id="play_laugh_bt" src="cdn/img/play3.svg"></div>' +
//             '<h1><span>' + totalTxt + "<br><img src=\"" + totalImg + "\"><br><p class='fg_orange'>* YOU WIN : <b class='fg_aqua'>" + prize + "</b> *</p>" + '</span></h1>' +
//             '<h3 class="screen_text_center">Now you can check which of your family and friends is happier than you!! 😂😎 <br>Invite them to join Happy</h3><br><br><br><br>' +
//             '</div>';

//         showElems("#task_modal");



//         laughingResultTimeout = setTimeout(a => {
//             drawDonutChart($s("#laughing_power div"), [
//                 { value: predications.mood_happy, color: laughingPowerColor },
//                 { value: 1 - predications.mood_happy, color: "#fff" }
//             ]);

//             drawDonutChart($s("#laughing_quality div"), [
//                 { value: predications.mood_sad, color: laughingQualityColor },
//                 { value: 1 - predications.mood_sad, color: "#fff" }
//             ]);
//             $s("#play_laugh_bt").onclick = () => {
//                 laughAudio.play();
//             };
//         }, 1000);
//     }
// }
$s("#task_modal_close").onclick = () => {
    $s("#task_modal div").innerHTML = "";
    hideElems("#task_modal");
}
function setTaskInit() {
    hideElems("#location");
    // hideElems("#wallet");
    hideElems("#num09");
    hideElems("#wheel2x");

    if (!bigJson.areaId) {
        showElems("#location");
    }
    if (bigJson.walletNonBounceableAddr) {
        $s("#wallet .task_prize p").innerText = "You got it before";
    }
    // if (!bigJson.walletNonBounceableAddr) {
    showElems("#wallet");
    // }
    if (bigJson.recentFriends.length < FRIEND_TASK_LEVEL.NUMBER_0_9) {
        showElems("#num09");
    } else if (bigJson.recentFriends.length < FRIEND_TASK_LEVEL.WHEEL_2X) {
        showElems("#wheel2x");
    }
    setLaughTimer();
    setTowerGameTimer();
}

var laughText = $s("#laugh_bt span"), laughingLockFlag = false;
function setLaughTimer() {
    var d = new Date() * 1;
    if (lastLaughingTimeValue + ON_HOUR_TIME < d) {
        laughText.innerText = "start";
        laughingLockFlag = false;
    } else {
        laughingLockFlag = true;
        let diff;
        laughBetweenInterval = setInterval(() => {
            //            console.log("DDDDDDDDDDDDDDDDDDDDD");
            diff = getDateDiffrence(new Date() * 1, lastLaughingTimeValue + ON_HOUR_TIME, { m: true, s: true });
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

var towerGameText = $s("#towergame_bt span"), towerGameBetweenInterval, towerGameLockFlag = false;;
function setTowerGameTimer() {
    var d = new Date() * 1;
    if (lastTowerGameTimeValue + ON_HOUR_TIME < d) {
        towerGameText.innerText = "play";
        towerGameLockFlag = false;
    } else {
        towerGameLockFlag = true;
        let diff;
        clearInterval(towerGameBetweenInterval);
        towerGameBetweenInterval = setInterval(() => {
            //            console.log("DDDDDDDDDDDDDDDDDDDDD");
            diff = getDateDiffrence(new Date() * 1, lastTowerGameTimeValue + ON_HOUR_TIME, { m: true, s: true });
            towerGameText.innerText = diff.m + "m : " + diff.s + "s left";
            if (diff.m == 0 && diff.s < 2) {
                clearInterval(towerGameBetweenInterval);
                towerGameLockFlag = false;
                towerGameText.innerText = "start";
            }
        }, 1000);
    }
}
setTaskInit();

$s("#youtube_content_bt").onclick = () => {

    if (lastYoutubeContentLinkValue + STATIC_VARIABLE.ONE_WEEK < (new Date() * 1)) {
        let link = $s("#youtube_link").value;
        console.log("youtube link", link, link.startsWith("https://wwww.youtube.com/watch?v="));
        if (link.startsWith("https://www.youtube.com/watch?v=")) {
            sendPostData("/addugc", { youtubeLink: link });
        } else {
            toast.warning("your link is not correct!");
        }
    } else {
        toast.info("Links are allowed to be submitted once per week.");
    }

};


$s("#bt_friend1").onclick = () => {
    $s('.bottom div[data-page="friends"]').click();
}

$s("#bt_friend2").onclick = () => {
    $s('.bottom div[data-page="friends"]').click();
}


var tonConnectBt = $s("#ton_con_bt");

if (bigJson.walletNonBounceableAddr) {
    tonConnectBt.innerHTML = getWalletSmallAddress(bigJson.walletNonBounceableAddr) + "<br>change";
} else {
    tonConnectBt.innerHTML = "connect<br>wallet";
}
var tonConnectRunLock = false;
tonConnectBt.onclick = () => {
    if (tonConnectRunLock) {
        toast.warning("please wait :)");
    } else {
        if (window.initTmaTonWallet) {
            window.initTmaTonWallet();
        } else {
            tonConnectRunLock = true;
            toast.info("please wait for a while!");
            setJsTempo(pages.ton_lib);
        }
    }
}
var walletInitTimeout;
// var walletInitTimeout = setTimeout(s => {
//     if (!customElements.get("tc-root")) {
//         // var tonConnectUI=null;
//         // if(!tonConnectUI){
//         tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
//             manifestUrl: 'https://usercargo.github.io/tonconnect-manifest.json',
//             //    buttonRootId: 'ton_con_bt'
//             buttonRootId: null
//         });
//     }

//     tonConnectUI.uiOptions = {
//         twaReturnUrl: 'https://t.me/calinowenbot'
//     };
//     tonConnectUI.connectionRestored.then(restored => {
//         afterWalletRestor(true);

//         tonConnectBt.onclick = () => {
//             disconnectWallet();
//             connectToWallet().catch(error => {
//                 console.error("Error connecting to wallet:", error);
//             });
//         };

//     });
//     window.afterWalletRestor = function (restored) {
//         // console.log("setWalletBt >  tonConnectUI.connected:", tonConnectUI.connected);
//         if (restored && tonConnectUI.connected && bigJson.walletNonBounceableAddr) {
//             tonConnectBt.innerHTML = getWalletSmallAddress(bigJson.walletNonBounceableAddr) + "<br>change";
//         } else {
//             tonConnectBt.innerHTML = "connect<br>wallet";
//         }
//     }

//     //tonConnectUI.uiOptions = {
//     //    uiPreferences: {
//     //        theme: THEME.DARK
//     //    }
//     //};

//     async function connectToWallet() {
//         var connectedWallet = await tonConnectUI.connectWallet();
//         // Do something with connectedWallet if needed
//         //*** remove testnet address in production 
//         let hexRawWalletAddress = connectedWallet.account.address, nonBounceableWalletAddress, nonBounceableWalletTestAddress;
//         if (hexRawWalletAddress.length > 5 && hexRawWalletAddress.startsWith("0:")) {
//             nonBounceableWalletAddress = TON_CONNECT_UI.toUserFriendlyAddress(hexRawWalletAddress);
//             nonBounceableWalletTestAddress = TON_CONNECT_UI.toUserFriendlyAddress(hexRawWalletAddress, 0);//0 in not test net

//             sendPostData("/addwallet", { rawHex: hexRawWalletAddress, nonBounceable: nonBounceableWalletTestAddress });

//         }

//         console.log("hexRawWalletAddress:", hexRawWalletAddress, "bounceableWalletAddress:", nonBounceableWalletAddress, "bounceableWalletTestAddress:", nonBounceableWalletTestAddress);
//         console.log(connectedWallet);

//     }

//     async function disconnectWallet() {
//         console.log("disconnectWallet");
//         if (tonConnectUI.connected) {
//             await tonConnectUI.disconnect().then(() => {
//                 afterWalletRestor(true);
//             }).catch(error => {
//                 console.error(error);
//             });
//         }
//     }
// }, 4000);

// // }


// function addNewWallet(jsonData) {

//     bigJson.walletNonBounceableAddr = jsonData.nonBounceableWalletAddr;
//     bigJson.totalPoint = jsonData.totalPoint;
//     if (jsonData.isNew) {
//         toast.success("Your wallet address is saved and your total point is " + bigJson.totalPoint);
//     } else {
//         toast.success("Your wallet is changed");
//     }
//     window.afterWalletRestor(true);
//     setTaskInit();
// }

function addNewUgcLink(jsonData) {
    lastYoutubeContentLinkValue = new Date() * 1;
    localStorage.getItem(LS_VAR.LAST_YOUTUBE_CONTENT_LINK, lastYoutubeContentLinkValue);
    $s("#youtube_link").value = "";
    toast.success("We got your link. Anytime you want to calculate points, just tell us in the future. Please don't send this link again!!");
}
function addNewLocation(jsonData) {
    bigJson.totalPoint = jsonData.totalPoint;
    bigJson.areaId = jsonData.areaId;
    toast.success("Your location is saved and your total point is " + bigJson.totalPoint + ", now you can to see locked sections");
    setTaskInit();
}
// function successLaughing(jsonData) {
//     bigJson.totalPoint = jsonData.totalPoint;
//     toast.success("Your laughing point is saved and your total point is " + bigJson.totalPoint);
// }

function successTowerGame(jsonData) {
    // updateNumber(amountValue, bigJson.totalPoint, jsonData.totalPoint - bigJson.totalPoint);
    towerGameLockFlag = false;
    localStorage.setItem(LS_VAR.TOWER_GAME_QTY, "[]");
    localStorage.setItem(LS_VAR.TOWER_GAME_LAST_TIME_PLAYING, new Date() * 1);
    lastTowerGameTimeValue = new Date() * 1;
    localStorage.setItem(LS_VAR.LAST_TOWER_GAME_TIME, lastTowerGameTimeValue);
    toast.success("Your Tower game score saved");
    bigJson.totalPoint = jsonData.totalPoint;
    setTowerGameTimer();
}


if (targetUrlParams && targetUrlParams.has("score")) {

    let s = STATIC_VARIABLE.TOWER_BASE_SCORE * Number(targetUrlParams.get("score"));

    let towerResultArr = JSON.parse(localStorage.getItem(LS_VAR.TOWER_GAME_QTY));

    towerResultArr.push(s);
    localStorage.setItem(LS_VAR.TOWER_GAME_QTY, JSON.stringify(towerResultArr));

    if (towerResultArr.length >= STATIC_VARIABLE.TOWER_GANE_ENOUGH_PLAY_QTY) {
        toast.success("Please wait to save your score");
        let point = 0;
        towerResultArr.forEach(p => {
            point += p;
        })
        sendPostData("/towergame", { point: point });
    } else {
        toast.success("WOW you win " + s + " points with your tower game score., You need to play" + (STATIC_VARIABLE.TOWER_GANE_ENOUGH_PLAY_QTY - towerResultArr.length) + " more times to save your " + STATIC_VARIABLE.TOWER_GANE_ENOUGH_PLAY_QTY + " scores");
    }
    targetUrlParams = null
}

var towerGameResultBeforePlay = JSON.parse(localStorage.getItem(LS_VAR.TOWER_GAME_QTY));
if (towerGameResultBeforePlay && towerGameResultBeforePlay.length >= 5) {
    towerGameLockFlag = true;
    let point = 0;
    towerGameResultBeforePlay.forEach(p => {
        point += p;
    })
    sendPostData("/towergame", { point: point });
}

function destroyAction() {
    afterLaughingFlag = false;

    // if(walletInitTimeout){
    clearTimeout(walletInitTimeout);
    // }
    if(laughingResultTimeout){
        if (laughingLockFlag) {
            stopRecording();
        }
    clearTimeout(laughingResultTimeout);
    clearInterval(laughInterval);
    clearInterval(laughBetweenInterval);
    }
    clearInterval(towerGameBetweenInterval)

}