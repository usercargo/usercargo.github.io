var currentFunRecordState, funRecordVoiceBt = $s("#voice_record_bt"), funRecordText = $s("#voice_record_bt span"), funRecordFlag = false,
    funRecordImg = $s("#voice_record_bt img"), funVoiceRecordInterval, funRecordCounter = 1, funRecordAudio = new Audio();
// var testarrayBuffer, testblob, testurl;
var funVoiceB64;

var votedFunVoices = JSON.parse(localStorage.getItem(LS_VAR.VOTED_FUN_VOICES) || "{}"),
    listenedVoices = new Set(JSON.parse(localStorage.getItem(LS_VAR.LISTENED_VOICES) || "[]"));

var funPlayerVoice = new Audio(), currentVoicePlayed;

var voiceWrapperDiv = $s("#voice_wrapper");
if (bigJson.areaId) {

    function setFunRecordState(newState) {
        if (newState) {
            currentFunRecordState = newState;
        }
        switch (currentFunRecordState) {
            case FUN_RECORD_STATE.RECORD:
                // funRecordText.innerText = "";
                hideElems($s(".funny_record", 0, 1));
                showElems("#voice_record_bt");
                break;
            case FUN_RECORD_STATE.PLAY:
                hideElems($s(".funny_record", 0, 1));
                showElems("#voice_play_bt");
                showElems("#voice_remove_bt");
                showElems("#voice_publish_bt");
                break;
            case FUN_RECORD_STATE.PUBLISH:
                hideElems($s(".funny_record", 0, 1));
                showElems("#voice_play_bt");
                // console.log("cdn/voice/" + bigJson.areaId + "/" + bigJson.funVoiceNumber + ".webm");
                funRecordAudio.src = staticServerBaseUrl+"voice/" + bigJson.areaId + "/" + bigJson.funVoiceNumber + ".webm";
                break;
        }
    }

    function initFunVoice() {
        if (bigJson.isFunVoiceAllowed) {

            setFunRecordState(bigJson.funVoiceNumber ? FUN_RECORD_STATE.PUBLISH : FUN_RECORD_STATE.RECORD);

            if (bigJson.funVoiceNumber && bigJson.funVoiceLikedStatistics) {
                $s("#voice_liked_vote").innerText = bigJson.funVoiceLikedStatistics[0].toLocaleString();
                $s("#voice_disliked_vote").innerText = bigJson.funVoiceLikedStatistics[1].toLocaleString();
                $s("#voice_heard_qty").innerText = bigJson.funVoiceLikedStatistics[2].toLocaleString();
                let p = STATIC_VARIABLE.BASE_FUN_VOICE_POINT * (bigJson.funVoiceLikedStatistics[0] - bigJson.funVoiceLikedStatistics[1]);
                p = (p < 0 ? 0 : (p > STATIC_VARIABLE.MAX_FUN_VOICE_POINT ? STATIC_VARIABLE.MAX_FUN_VOICE_POINT : p)).toLocaleString();
                $s("#voice_point").innerText = p;
                showElems("#fun_voice_statistics");
            }
        }
    }
    initFunVoice();
    function startFunRecordClicked() {
        if (!funRecordFlag) {
            funRecordFlag = true;
            // funRecordCounter = 1;
            // funVoiceRecordInterval = setInterval(() => {
            //     funRecordText.innerText = funRecordCounter++ + "s";
            //     funRecordImg.src = "cdn/img/" + (funRecordCounter % 2 !== 0 ? "record_off.svg" : "record_on.svg");
            //     if (funRecordCounter >= funVoiceDuration) {
            //         stopFunRecordClicked();
            //     }
            // }, 1000);
            startRecording("afterFunRecord", "funVoiceAudioPermission");
        } else {
            stopFunRecordClicked();
        }
    }
    function funVoiceAudioPermission() {
        funRecordCounter = 1;
        funVoiceRecordInterval = setInterval(() => {
            funRecordText.innerText = funRecordCounter++ + "s";
            funRecordImg.src = "cdn/img/" + (funRecordCounter % 2 !== 0 ? "record_off.svg" : "record_on.svg");
            if (funRecordCounter >= funVoiceDuration) {
                stopFunRecordClicked();
            }
        }, 1000);
    }
    function stopFunRecordClicked() {
        console.log("ontouchend");
        funRecordFlag = false;
        setFunRecordState(FUN_RECORD_STATE.PLAY);
        funRecordImg.src = "cdn/img/record_off.svg";
        stopRecording();
        clearInterval(funVoiceRecordInterval);
    }
    // $s("#voice_play_bt").ontouchstart = () => {
    //     funRecordAudio.play();
    // };
    // $s("#voice_play_bt").onmousedown = () => {
    //     funRecordAudio.play();
    // };
    $s("#voice_play_bt").onclick = () => {
        funRecordAudio.play();
    };
    $s("#voice_remove_bt").onclick = () => {
        funRecordAudio.pause();
        funRecordAudio.srcObject = null;
        funRecordAudio.src = "";
        funRecordAudio = new Audio();
        setFunRecordState(FUN_RECORD_STATE.RECORD);
    };
    $s("#voice_publish_bt").onclick = () => {
        if (funVoiceB64) {
            // funVoiceB64= btoa(funVoiceB64);
            // funVoiceB64 = b64EncodeUnicode(funVoiceB64);
            hideElems("#voice_publish_bt");
            hideElems("#voice_remove_bt");
            hideElems($s(".funny_record", 0, 1));
            sendPostData("/addvoice", { voice: funVoiceB64 });
        }
    }

    function afterFunRecord(blob) {

        let fileReader = new FileReader(), arrayBuffer;
        fileReader.onloadend = async () => {
            arrayBuffer = await fileReader.result;
            funRecordAudio.src = window.URL.createObjectURL(blob);
            // console.log(blob, fileReader, arrayBuffer);
            funRecordAudio.play();
        };
        fileReader.readAsArrayBuffer(blob);

        
        let fileReaderB64 = new FileReader();
        fileReaderB64.onloadend = async () => {
            funVoiceB64 = await fileReaderB64.result;
        };
        fileReaderB64.readAsDataURL(blob);
    }

    
    // funRecordVoiceBt.ontouchstart = startFunRecordClicked;
    // funRecordVoiceBt.onmousedown = startFunRecordClicked;
    funRecordVoiceBt.onclick = startFunRecordClicked;

    function getNewFunVoiceList() {
        let newArr = new Set(), num;
        do {
            num = getRandomNumberInclude(1, bigJson.lastFunVoiceNumber);
            if (!listenedVoices.has(num)) {
                newArr.add(num);
            }
        } while (newArr.size < STATIC_VARIABLE.MAX_FUN_VOICE_FETCH && listenedVoices.size + newArr.size < bigJson.lastFunVoiceNumber);
        let voiceWrapper = $s("#voice_wrapper");
        if (newArr.size < 1) {
            voiceWrapper.innerHTML = "<h2>WOW! you listen all " + bigJson.lastFunVoiceNumber + " funny voices ;) for new voices please wait to record by other users</h2>";
        } else {
            newArr.forEach(a => {
                voiceWrapper.insertAdjacentHTML('beforeend', `
                        <div class="voice_div" data-num="${a}">
                            <div>
                                <h2 class="voice_num">${a}</h2>
                                <div class="voice_play bt1" onclick="tinyOp.playFunVoice(${a})"><img src="cdn/img/play3.svg"></div>
                            </div>
                            <div class="like_dislike_div">
                                <div class="voice_dislike bt1" onclick="tinyOp.disLikeFunVoice(${a})"><img src="cdn/img/dislike.svg"></div>
                                <div class="voice_like bt1" onclick="tinyOp.likeFunVoice(${a})"><img src="cdn/img/like.svg"></div>
                            </div>
                        </div>`);
                //<div>
                //    <div class="voice_dislike bt1" onclick="tinyOp.disLikeFunVoice(${a})"><img src="cdn/img/dislike.svg"></div>
                //    <span class="bt1" onclick="tinyOp.likeFunVoice(${a})">+1000</span>
                //</div>
            });
        }
    }

    tinyOp.playFunVoice = (a) => {
        currentVoicePlayed = a;
        // listenedVoices.add(a);
        // localStorage.setItem(LS_VAR.LISTENED_VOICES, JSON.stringify(Array.from(listenedVoices)));
        funPlayerVoice.pause();
        funPlayerVoice.src = staticServerBaseUrl+"voice/" + bigJson.areaId + "/" + a + ".webm";
        funPlayerVoice.play();
    };
    funPlayerVoice.onended = (a) => {
        console.log("funPlayerVoice.onended  a:", a, "currentVoicePlayed:", currentVoicePlayed);
        listenedVoices.add(currentVoicePlayed);
        // localStorage.setItem(LS_VAR.LISTENED_VOICES, JSON.stringify(Array.from(listenedVoices)));
        votedFunVoices[currentVoicePlayed] = 0;
        updateVoiceVote();
        showElems(".voice_div[data-num='" + currentVoicePlayed + "'] .like_dislike_div");
    };
    //tinyOp.likeFunVoice = (elem, a) => {
    //    elem.innerText = "+" + (Number(elem.innerText) + STATIC_VARIABLE.FUN_LIKE_POINT);
    //};
    tinyOp.likeFunVoice = (a) => {
        if (votedFunVoices[a] !== undefined) {

            let v = $s(".voice_div[data-num='" + a + "']");
            v.classList.remove("voice_disliked");
            if (v.classList.contains("voice_liked")) {
                votedFunVoices[a] = 0;
                v.classList.remove("voice_liked");
            } else {
                votedFunVoices[a] = 1;
                v.classList.add("voice_liked");
            }
            updateVoiceVote();
        } else {
            toast.danger("please first listen it! how do you could to like/dislike a voice before you listen it!?");
        }
    };
    tinyOp.disLikeFunVoice = (a) => {
        if (votedFunVoices[a] !== undefined) {
            let v = $s(".voice_div[data-num='" + a + "']");
            v.classList.remove("voice_liked");
            if (v.classList.contains("voice_disliked")) {
                votedFunVoices[a] = 0;
                v.classList.remove("voice_disliked");
            } else {
                votedFunVoices[a] = -1;
                v.classList.add("voice_disliked");
            }
            updateVoiceVote();
        } else {
            toast.danger("please first listen it! how do you want to like/dislike a voice before you listen it!?");
        }
    };
    function updateVoiceVote() {
        localStorage.setItem(LS_VAR.VOTED_FUN_VOICES, JSON.stringify(votedFunVoices));
        localStorage.setItem(LS_VAR.LISTENED_VOICES, JSON.stringify(Array.from(listenedVoices)));
    }
    if (bigJson.lastFunVoiceNumber > 0 && bigJson.areaId != 0) {
        getNewFunVoiceList();
    }
    if (Object.keys(votedFunVoices).length >= STATIC_VARIABLE.MIN_FUN_VOICE_LIKE_DISLIKE_TO_SAVE) {
        let heard = [], liked = [], disliked = [];
        Object.keys(votedFunVoices).forEach(q => {
            let a = votedFunVoices[q];
            if(a==0){
                heard.push(q);
            }else if (a == 1) {
                liked.push(q);
            } else if (a == -1) {
                disliked.push(q);
            }
        });
        votedFunVoices = {};
        updateVoiceVote();
        sendPostData("/addlikevoice", { heard: JSON.stringify(heard), liked:  JSON.stringify(liked), disliked:  JSON.stringify(disliked) });
    }

} else {
    voiceWrapperDiv.insertAdjacentHTML('beforeend', '<div id="leaderboard_not_joined"><h3 id="no_invite_yet">Oh! you have not set the location task yet! <br>go to task section and set your location and see your city leaderboard and yes get ' + locationGiftValue + ' points too, you must be know someone in your city leaderboard</h3></div><br><div class="img_head"><span>first go to task menu</span><br><img src="cdn/img/task2.svg"><br><span>then set location</span><br><img src="cdn/img/location2.svg"></div>');
    toast.info("you don't set location yet, please go to task section and set location and come back here ;)");
}

function addNewFunVoice(jsonData) {
    bigJson.funVoiceNumber = jsonData.funVoiceNumber;
    initFunVoice();
}
function addLikeDislikeFunVoice(jsonData) {
    console.log(jsonData.msg);
}

function destroyAction() {
    if (funRecordFlag) {
        stopRecording();
    }
    funRecordAudio.pause();
    funRecordAudio.srcObject = null;
    funRecordAudio.src = "";
    funPlayerVoice.pause();
    clearInterval(funVoiceRecordInterval);
}