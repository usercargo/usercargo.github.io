
var bottomMenu = $s(".bottom div", 0, 1), selectedBottomMenu = "big_img";
bottomMenu.forEach(i => {
    i.onclick = (a) => {
        let e = $s("img", i);
        if (e.classList.contains(selectedBottomMenu)) {
            return false;
        }
        bottomMenu.forEach(d => {
            $s("img", d).classList.remove(selectedBottomMenu);
        });
        e.classList.add(selectedBottomMenu);
        e.style.transform = "scale(1.1)";
        setTimeout(() => {
            e.style.transform = "scale(1)";
        }, 500);
        if (i.dataset.page) {
            setTemplate(i.dataset.page);
        }
    }
});

var targetUrlParams = new URLSearchParams(window.location.search);
var targetTemplateParam = targetUrlParams.get('target');

if (targetTemplateParam) {
    bigJson = JSON.parse(localStorage.getItem(LS_VAR.BIGJSON));
    showElems(".bottom");
    showElems(".header");
    $s('.bottom div[data-page="' + targetTemplateParam + '"]').click();
    window.history.replaceState({}, document.title, "/" + "index4.html");
} else {
    var introDiv = $s("#intro_content"), middleBlur = $s("#middle_blur"), introVideo = $s("#intro_video"), middleContent = $s("#middle_content"), introLoadFlag = true;
    console.log("log 0 introLoadFlag:", introLoadFlag);
    introVideo.oncanplaythrough = w => {
        if (introLoadFlag) {
            if (tgUser) {
                let formData = {};
                let photoTgId = tgUser.user.photo_url;
                photoTgId = photoTgId.substring(photoTgId.lastIndexOf("/") + 1, photoTgId.lastIndexOf("."))
                formData.initData = window.Telegram.WebApp.initData;
                formData.tgPicId = photoTgId;
                formData.username = tgUser.user.username || null;
                formData.firstName = tgUser.user.first_name || null;
                formData.lastName = tgUser.user.last_name || null;
                formData.inviterTgUserId = tgUser.start_param || 0;
                sendPostData("/logauth", formData);
            }
        }
    }
}

function startGame(jsonData) {
    console.log("startGame bigJsonData", jsonData.bigJson, "isNewUser", jsonData.isNewUser,"hash",jsonData.hash);
    if (jsonData.isNewUser) {
        localStorage.clear();
    }

    bigJson = jsonData.bigJson;
    bigJson.hash = jsonData.hash;

    setInputNumberLimit();
    introLoadFlag = false;
    middleContent.style.cssText = "animation: bg_white 8s linear 5s;"
    console.log("log 1");
    setTimeout(() => {
        console.log("log 2");
        introVideo.remove();
        showElems("#loading_logo");
        $s("#middle_content").style.cssText = "background:url(../cdn/img/bg1_blured.jpg) no-repeat;background-size:cover;color:#fff;";
        console.log("log 3");

        // setTimeout(() => {
        //     console.log("log 4");
        //     showElems(".bottom");
        //     showElems(".header");
        //     $s('.bottom div[data-page="home"]').click();
        // }, isInTest?1000:7000);
    },isInTest?1000:11000);
}


var ringingAudio = new Audio("cdn/sound/dreamland_ringtone.mp3"), wheelAlarmGlobalTimeOut, wheelShowFinished = true,wheelShowFlag = false;
ringingAudio.loop = true;

function isTimeInWheelTime() {
    let min = new Date().getMinutes();
    return min >= startWheelMinuet && min < endWheelMinuet;
}

function setWheelManage(time) {
    wheelManageTimeout1 = setTimeout(() => {
        if (wheelShowFinished) {
            hideElems(wheelRestWrapper);
            stopAlarm();
            if (isTimeInWheelTime()) {
                let t = new Date();
                if (!wheelShowFlag && t.getTime() - wheelLastTimePlayedValue.getTime() > (endWheelMinuet - wheelLastTimePlayedValue.getMinutes()) * 60 * 1000) {
                    showElems("#wheel_play_main");
                    let el = $s("#last_time_wheel");
                    if(el){
                        el.innerText = t.getHours()  + ":10";
                    }
                    startAlarm();
                } else {
                    showElems("#wheel_rest_main");
                }
            } else {
                showElems("#wheel_rest_main");
            }
        }
        setWheelManage(5000);
    }, time);
}

// function setGlobalWheelAlarm(isStoped) {
//     let t = new Date(wheelLastTimePlayedValue);
//     t = ((59 - t.getMinutes()) * 60) + (59 - t.getSeconds()) * 1000;
//     console.log("setGlobalWheelAlarm: t:", t);
//     ringingAudio.pause();
//     clearTimeout(wheelAlarmGlobalTimeOut);
//     if (!isStoped) {
//         wheelAlarmGlobalTimeOut = setTimeout(() => {
//             ringingAudio.play();
//         }, t);
//     }
// }
Telegram.WebApp.BackButton.hide();
Telegram.WebApp.enableClosingConfirmation();
Telegram.WebApp.disableVerticalSwipes();
Telegram.WebApp.expand();
// Telegram.WebApp.requestFullscreen();
Telegram.WebApp.ready();

// startGame({ bigJson: bigJson, hash: "4324343245fewfew" });