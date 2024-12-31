// setGlobalWheelAlarm(true);

var amountValue = $s("#amount_value"), wheelResultTable = $s("#team_result_table"),
    screenDiv = $s("#screen_div"), mileStoneTime = $s("#milestome_time"), mileStoneProgress = $s("#milestone_progress>div"),
    progressInterval;

amountValue.innerText = bigJson.totalPoint.toLocaleString();
if (systemJson.wheelPrizeDate > 99 && systemJson.wheelPrizeDate < new Date().getUTCTime()) {
    // it's linke to telegram channel for voting
    $s("#milestone>div").innerHTML = "<a class='rainbow_anim' data-text='It's vote time. Click here' href='" + STATIC_VARIABLE.WHEEL_VOTE_TG_CHANNEL + "'>It's vote time. Click here</a>";
} else if (systemJson.wheelPrizeDate > 99) {
    progressInterval = setInterval(() => {
        let utc = new Date().getUTCTime();
        let d = getDateDifferenceByDay(systemJson.wheelPrizeDate, utc);
        let p = (systemJson.wheelPrizeDate - utc) / STATIC_VARIABLE.ONE_WEEK * 100;
        mileStoneTime.innerText = d + " left until voting time";
        // console.log(p);
        mileStoneProgress.style.width = 100 - p + "%";

    }, 1000);
} else if (bigJson.totalPoint < STATIC_VARIABLE.USER_POINT_MILESTONE) {
    let p = Math.ceil((bigJson.totalPoint / STATIC_VARIABLE.USER_POINT_MILESTONE) * 100);
    mileStoneTime.innerText = 100 - p + "% left to get 1 billion points for a 10X chance!";
    mileStoneProgress.style.width = p + "%";
} else {
    // mileStoneTime.innerText = Math.ceil(100 - systemJson.total1BUser) + "% of users do not have 1 billion points yet!";
    mileStoneTime.innerText ="network power : "+ Math.ceil(100 - systemJson.total1BUser) + "%";
    mileStoneProgress.style.width = systemJson.total1BUser + "%";
}

function setSelectedHour(hour) {
    if (hour > 12) {
        hour = hour - 12;
    }
    //    console.log(hour);
    $s(".clock-num", 0, 1).forEach(a => {
        a.classList.remove("selected_clock");
    });
    document.querySelector('.clock-num[clock-num-text="' + hour + '"]').classList.add("selected_clock");
}



//wheel
var wheel, wheelImages, wheelSelectedItem, wrapper = $s(".wrapper"), bottom = $s(".bottom"),
    screenShotTaken = false, spinInterval, selectWheelInterval, wheelTimeout1, wheelTimeout2, wheelTimeout3,
    selectWheelLock = 5, wheelGuard = $s('#wheel_guard>div');

async function initWheel() {
    wheelSelectedItem = null;
    wheelShowFinished = false;
    screenShotTaken = false;
    clearInterval(clockInterval);

    if (!wheelShowFlag) {
        setwheelPropObject(bigJson.baseWheelMaxValue, bigJson.baseWheelMinValue, bigJson.wheelCoefficient, bigJson.wheelOptionQuantity);
        wheelShowFlag = true;
        hideElems(wheelRestWrapper);
        stopAlarm();
        showElems("#wheel_main");

        // *** sound effect of wheel rotation
        if (wheel) {
            wheel.remove();
            wheel = null;
        }
        wheel = new Wheel($s('.wheel_wrapper'));
        wheelImages = [];

        // Convert image urls into actual images:
        if (wheelProp.image && typeof wheelProp.image === "string") {
            let img = new Image();
            img.src = wheelProp.image;
            wheelImages.push(img);
            wheelProp.image = img;
        }
        if (wheelProp.overlayImage && typeof wheelProp.overlayImage === "string") {
            let img = new Image();
            img.src = wheelProp.overlayImage;
            wheelImages.push(img);
            wheelProp.overlayImage = img;
        }

        await loadImages(wheelImages);
        $s('.wheel_wrapper').style.visibility = 'visible';
        wheel.init({
            ...wheelProp,
            //        rotation: wheel.rotation, // Preserve value.
        });
        spinInterval = setInterval(() => {
            wheel.spin(2000);
        }, 4000);

        wrapper.scrollTop = 0;
        showElems("#number_guard");
        selectWheelLock = 5
        wheelTimeout1 = setTimeout(q => {

            selectWheelInterval = setInterval(() => {

                if (selectWheelLock <= 0) {
                    wheelGuard.innerText = '';
                    clearInterval(selectWheelInterval);
                    function getSelectedWheel() {
                        wheelSelectedItem = wheelProp.items[wheel.getCurrentIndex()];
                        let wheelWinMsg =" You win ";
                        
                        clearInterval(spinInterval);
                        wheel.stop();
                        wheelGuard.removeEventListener("mousedown", getSelectedWheel);
                        let clap = "1";
                        if (wheelSelectedItem.value > 2400000) {
                            clap = "3";
                            wheelWinMsg="WOW! "+wheelWinMsg;
                        } else if (wheelSelectedItem.value > 999999) {
                            clap = "2"
                            wheelWinMsg="Good! "+wheelWinMsg;
                        }else{
                            wheelWinMsg="Not Bad! "+wheelWinMsg;
                        }
                        playFireWorks("celebration", "cdn/sound/clap" + clap + ".mp3");

                        $s("#wheel_main h2").innerText = wheelWinMsg + wheelSelectedItem.value.toLocaleString();
                        
                        wrapper.style.height = "auto";
                        // wrapper.classList.add("wrapper_canvase_background");
                        // bottom.style.position = "static";
                        // $s(".current_ticket").style.visibility="hidden";


                        wheelTimeout2 = setTimeout(() => {

                            // html2canvas(wrapper).then(canvas => {
                            html2canvas($s(".main")).then(canvas => {
                                wrapper.style.height = "100%";

                                showElems([screenDiv]);
                                $s("#screen_scroe_img").src = canvas.toDataURL("image/jpeg");
                                $s("#screen_scroe_value").innerText = wheelSelectedItem.value.toLocaleString();
                                $s("#screen_name").innerText = $s("#my_name").innerText;
                                let d = new Date();
                                $s("#screen_time").innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " (" + d.getHours() + ":" + d.getMinutes() + "')";
                                $s("#screen_total_point").innerText = (wheelSelectedItem.value + bigJson.totalPoint).toLocaleString();

                                $s("#screen_invite_link").innerText = inviteLink;
                                createQrCode($s("#invite_qr_by_score"), inviteLink, "white");
                                
                                html2canvas(screenDiv).then(canvas2 => {
                                    let canvasData = canvas2.toDataURL("image/jpeg", .8);
                                    $s("#screen_shot img").src = canvasData
                                    localStorage.setItem(LS_VAR.WHEEL_LAST_SCORE_IMAGE, canvasData);
                                    hideElems([screenDiv]);
                                    toast.success("Congratulations! You have won " + wheelSelectedItem.value + " points. They will be added to your total points. Please wait while we save it.");
                                    screenShotTaken = true;
                                    afterWheelSelected();
                                    // showElems(".current_ticket");
                                    // $s(".current_ticket").style.visibility="visible";
                                    // $s(".current_ticket").style.filter="none";
                                    hideElems("#number_guard");

                                });
                            });
                        }, 1000);

                        wheelLastTimePlayedValue = new Date() * 1;
                        localStorage.setItem(LS_VAR.WHEEL_LAST_TIME_PLAYED, wheelLastTimePlayedValue);

                    }
                    wheelGuard.addEventListener("mousedown", getSelectedWheel);
                } else {
                    wheelGuard.innerText = selectWheelLock--;
                }
            }, 1000);
        }, 5000);

        wheelTimeout3 = setTimeout(() => {
            wheel.refresh();
        }, 300);

    } else {
        wheelPlayState = WHEEL_PLAY_STATE.NOTHING;
        toast.warning("You are not allowed to play at this time.");
    }
}

$s("#screen_shot").onclick = () => {
    if (screenShotTaken) {
        downloadImageByDate($s("#screen_shot img").src);
    } else {
        toast.info("You have not played yet!");
    }
};

var wheelLastScore = localStorage.getItem(LS_VAR.WHEEL_LAST_SCORE_IMAGE);
if (wheelLastScore) {
    screenShotTaken = true;
    $s("#screen_shot img").src = wheelLastScore;
}



function setwheelPropObject(baseMaxValue, baseMinValue, coefficient, quantity) {
    //    500,000
    //    5000,000
    wheelProp.items = [];
    var arr = new Set(), w, m = baseMaxValue * coefficient;// [baseMaxValue * coefficient, baseMinValue * coefficient];
    arr.add(m);
    arr.add(baseMinValue * coefficient);
    m *= .75;
    for (let r = 0; arr.size < quantity; r++) {
        w = getRandomNumberInclude(baseMinValue, baseMaxValue) * coefficient;
        if (w < m) {
            arr.add(w);
        }
    }
    arr = Array.from(arr);
    shuffleArray(arr);
    arr.forEach(e => {
        wheelProp.items.push({ label: e.toLocaleString(), value: e });
    });
}
 

// //countdown timer
// 
// function countDownTimer(targetTime, serverTime, finishCallBackName, dayElem, hourElem, minElem, secElem, decaSecElem, progressElem) {
//     const second = 1000,
//         minute = second * 60,
//         hour = minute * 60,
//         day = hour * 24;
// 
//     //I'm adding this section so I don't have to keep updating this pen every year :-)
//     //remove this if you don't need it
//     let differenceDate = (new Date() * 1) - serverTime;
//     //            ,today = new Date((new Date() * 1) - differenceDate);
//     targetTime += differenceDate;
//     let sTime = 0, percent = 0, sTimeStr;
//     const countDown = new Date(targetTime).getTime(),
//         firstDistance = countDown - new Date() * 1,
//         ms = setInterval(function () {
//             sTimeStr = sTime++ + "";
//             if (sTimeStr.length === 1) {
//                 sTimeStr = "0" + sTimeStr;
//             }
//             setAllElemInnerText(decaSecElem, sTimeStr);
//             if (sTime > 99) {
//                 sTime = 0;
//             }
//         }, 10),
//         x = setInterval(function () {
//             const now = new Date().getTime(),
//                 distance = countDown - now;
//             percent = 100 - (distance * 100 / firstDistance);
// 
//             //                progressElem.forEach(i => {
//             //                    i.style.width = percent + '%';
//             //                });
//             //                if (percent >= 100) {
//             //                    percent = 100;
//             //                }
//             //                console.log("percent:", percent);
//             progressElem.style = `--progress: ${percent}%`;
// 
//             if (distance < 1000) {
//                 clearInterval(x);
//                 clearInterval(ms);
//                 progressElem.style = `--progress:100%`;
//                 setAllElemInnerText(decaSecElem, 0);
//                 if (finishCallBackName) {
//                     window[finishCallBackName]();
//                 }
//                 //                    return;
//             }
// 
//             let dayStr = Math.floor(distance / (day)) + "",
//                 hourStr = Math.floor((distance % (day)) / (hour)) + "",
//                 minStr = Math.floor((distance % (hour)) / (minute)) + "",
//                 secStr = Math.floor((distance % (minute)) / second) + "";
//             if (dayStr.length === 1) {
//                 dayStr = "0" + dayStr;
//             }
//             if (hourStr.length === 1) {
//                 hourStr = "0" + hourStr;
//             }
//             if (minStr.length === 1) {
//                 minStr = "0" + minStr;
//             }
//             if (secStr.length === 1) {
//                 secStr = "0" + secStr;
//             }
//             setAllElemInnerText(dayElem, dayStr),
//                 setAllElemInnerText(hourElem, hourStr),
//                 setAllElemInnerText(minElem, minStr),
//                 setAllElemInnerText(secElem, secStr);
//         }, 1000);
// }
// // countDownTimer(new Date() * 1 + 1000 * 30, new Date() * 1, null, $s(".timer_val.day", 0, 1), $s(".timer_val.hour", 0, 1), $s(".timer_val.min", 0, 1), $s(".timer_val.sec", 0, 1), $s(".timer_val.tenth small", 0, 1), $s(".timer_progress_bar"));
// //end countdown timer




//start wheel rest 
var wheelRestWrapper = $s(".wheel_rest_wrapper", 0, 1);

var WHEEL_PLAY_STATE = Object.freeze({
    ALONE: { name: "alone", state: 1 },
    BOOS: { name: "boos", state: 2 },
    TEAM: { name: "team", state: 3 },
    NOTHING: { name: "nothing", state: -1 }
});

var boosQrGenerated, wheelPlayState, clockInterval, aesKey, boosTgUserId;

function setReminedTimeOfWheel() {
    clearInterval(clockInterval);
    let t = new Date(), lastHour = t.getHours();
    $s("#alarm_clock").style = "--time-hour:" + t.getHours() + ";--time-minute:" + t.getMinutes() + ";--time-second:" + t.getSeconds() + ";--speed:1s;";
    setSelectedHour(t.getHours() + 1);
    clockInterval = setInterval(() => {
        t = new Date();
        if (t.getHours() !== lastHour) {
            setSelectedHour(t.getHours() + 1);
        }
        $s("#last_time_wheel").innerText = t.getHours() + ":10";
    }, 60000);
}

setReminedTimeOfWheel();

var clockAlarmBt = $s(".clock_alarm"), clockAlarmFlag = localStorage.getItem(LS_VAR.WHEEL_CLOCK_ALARM),clockAlarmFlag= clockAlarmFlag===null||clockAlarmFlag==="true";
if (clockAlarmFlag) {
    clockAlarmBt.classList.add("clock_alarm_actived");
}
function setClockAlarm() {
    if (clockAlarmFlag) {
        clockAlarmFlag = false;
        stopAlarm();
        clockAlarmBt.classList.remove("clock_alarm_actived");
        toast.info("alarm is off");
    } else {
        clockAlarmFlag = true;
        clockAlarmBt.classList.add("clock_alarm_actived");
        toast.success("The alarm is on and will be activated next time for the chance wheel.");
    }
    localStorage.setItem(LS_VAR.WHEEL_CLOCK_ALARM, clockAlarmFlag);
}
clockAlarmBt.onclick = setClockAlarm;
// clockAlarmBt.ontouchstart = setClockAlarm;


//end wheel rest


//start wheel team play

var videoStream, lastScoreResult = 0, lastMoreScoreId, wheelTeamIds = [];
function scanQrCode(elem, callBack) {
    lastScoreResult = 0;
    lastMoreScoreId = 0;
    wheelTeamIds = [];
    var video = document.createElement("video");
    var canvasElement = document.getElementById(elem);
    var canvas = canvasElement.getContext("2d");
    var scanFlag = true;

    function drawLine(begin, end, color) {
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            // Success: Access the camera stream
            //            const videoElement = document.getElementById("myVideo");
            videoStream = stream;
            video.srcObject = stream;
            video.play();
            if (scanFlag) {
                requestAnimationFrame(tick);
            }
        }).catch(function (error) {
            // Error: Handle permission denial or other errors
            //            console.error("Error accessing camera:", error);
            toast.warning("Access to the camera is denied. Please grant permission.");
        });
    } else {
        toast.danger("In this browser, using the camera is not supported.");
        //        console.error("getUserMedia not supported in this browser");
    }
    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
            if (code) {
                drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

                console.log("code.data:", code.data);
                if (wheelPlayState === WHEEL_PLAY_STATE.TEAM) {
                    let flag = qrScannedAsTeamPlayer(code.data);
                    if (flag) {
                        scanFlag = false;
                        cancelVideoTrack(videoStream);
                    }
                } else if (wheelPlayState === WHEEL_PLAY_STATE.BOOS) {
                    try {
                        if (code.data) {
                            let json = JSON.parse(code.data);
                            if (json && json.r) {
                                let f = true;
                                wheelTeamResultArr.forEach(q => {
                                    if (q.id === json.id) {
                                        f = false;
                                    }
                                });
                                if (f) {
                                    wheelTeamResultArr.push(json);
                                    wheelTeamIds.push(json.id);
                                    wheelResultTable.innerHTML = "";
                                    wheelTeamResultArr.forEach(i => {
                                        if (lastScoreResult < i.r) {
                                            lastScoreResult = i.r;
                                            lastMoreScoreId = i.id;
                                        }
                                        // console.log("i:", i, "lastScoreResult", lastScoreResult, "i.r:", i.r);
                                        putInWheelResultTable(i);
                                    });
                                    removeAllClassesFromElems($s("tr", wheelResultTable), "selected");
                                    addAllClassesToElems($s("#id" + lastMoreScoreId), "selected");
                                    toast.success("The result for " + json.name + " has been received and is shown in the table.");
                                } else {
                                    toast.success("Scanned before, proceed to the next person or send results to the server.");
                                }
                            }
                        }
                    } catch (e) {
                        toast.warning("Wrong QR code! Maybe you are not in this team.");
                        console.error(e);
                    }
                }
            }
        }
        if (scanFlag) {
            requestAnimationFrame(tick);
        }
    }
}

function putInWheelResultTable(json) {
    wheelResultTable.insertAdjacentHTML('beforeend', "<tr id='id" + json.id + "'><td>" + json.name + "</td><td>" + json.r + "</td></tr>");
}

function cancelVideoTrack() {
    setTimeout(() => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
        }
    }, 5000);
}
function qrScannedAsTeamPlayer(qrCode) {
    try {
        qrCode = JSON.parse(qrCode);
        aesKey = qrCode.aesKey;
        boosTgUserId = qrCode.boosTgUserId;
        // console.log("qrScannedAsTeamPlayer qrCode:", qrCode, "aesKey:", aesKey, "boosTgUserId:", boosTgUserId);
        if (aesKey && boosTgUserId) {
            toast.info("OK, you are a team player. After choosing your score on the wheel, report the result to the team leader.");
            hideElems(wheelRestWrapper);
            stopAlarm();
            initWheel();
            return true;
        }
    } catch (e) {
        toast.warning("QR code is not valid!");
        console.error(e);
    }
    return false;
}



//end wheel team play




//start wheel management


var wheelTeamResultArr = [];

hideElems(wheelRestWrapper);
stopAlarm();

$s("#start_wheel_alone").onclick = () => {
    wheelPlayState = WHEEL_PLAY_STATE.ALONE;
    initWheel();
}

$s("#start_wheel_boos").onclick = () => {
    if (!wheelShowFlag) {
        wheelTeamResultArr = [];
        wheelResultTable.innerHTML = "";
        wheelShowFinished = false;
        hideElems(wheelRestWrapper);
        stopAlarm();
        wheelPlayState = WHEEL_PLAY_STATE.BOOS;
        showElems("#wheel_boos_main");
        aesKey = getRandomString(10);
        boosTgUserId = tgUser.user.id;
        boosQrGenerated = JSON.stringify({ boosTgUserId: boosTgUserId, aesKey: aesKey });
        createQrCode($s("#wheel_boos_qr"), boosQrGenerated);
    } else {
        toast.warning("You are not allowed to play at this time.");
    }
}
$s("#start_wheel_team").onclick = () => {
    if (!wheelShowFlag) {
        wheelShowFinished = false;
        hideElems(wheelRestWrapper);
        stopAlarm();
        wheelPlayState = WHEEL_PLAY_STATE.TEAM;
        showElems("#wheel_team_main");
        //open qr scanner
        scanQrCode("wheel_team_qr_scanner", null);
    } else {
        toast.warning("You are not allowed to play at this time.");
    }
};
$s("#check_team_result").onclick = () => {
    wheelShowFinished = true;
    hideElems(wheelRestWrapper);
    stopAlarm();
    showElems("#wheel_rest_main");
    sendPostData("/teamwheel", { boosTgUserId: boosTgUserId, aesKey: aesKey });
};
$s("#boos_qr_scan_finish").onclick = () => {
    scanFlag = false;
    hideElems(wheelRestWrapper);
    showElems("#wheel_rest_main");
    cancelVideoTrack(videoStream);
    sendPostData("/booswheel", { aesKey: aesKey, maxPoint: lastScoreResult, team: JSON.stringify(wheelTeamIds) });
};
$s("#start_wheel_after_boos").onclick = () => {
    initWheel();
};
$s("#cancel_team").onclick = () => {
    hideElems(wheelRestWrapper);
    cancelVideoTrack(videoStream);
    showElems("#wheel_play_main");
    startAlarm();
};
$s("#cancel_leader").onclick = () => {
    hideElems(wheelRestWrapper);
    cancelVideoTrack(videoStream);
    showElems("#wheel_play_main");
    startAlarm();
};
function startAlarm() {
    if (clockAlarmFlag) { 
        ringingAudio.play().catch(error => {
            console.error('Playback failed:', error);
        });
    }
}
function stopAlarm() {
    ringingAudio.pause();
}
var afterWheelTimeout1, afterWheelTimeout2, afterWheelTimeout3, afterWheelTimeout4;
function afterWheelSelected() {
    if (wheelPlayState === WHEEL_PLAY_STATE.ALONE) {
        sendPostData("/singlewheel", { point: wheelSelectedItem.value });
        afterWheelTimeout1 = setTimeout(() => {
            hideElems(wheelRestWrapper);
            showElems("#wheel_rest_main");
            wheelShowFinished = true;
            stopFireWorks();
            setReminedTimeOfWheel();
        }, 2000);
    } else if (wheelPlayState === WHEEL_PLAY_STATE.TEAM) {
        let qr = { id: tgUser.user.id, r: wheelSelectedItem.value, name: tgUser.user.first_name + " " + tgUser.user.last_name };
        afterWheelTimeout2 = setTimeout(() => {
            hideElems(wheelRestWrapper);
            showElems("#wheel_team_reault");
            qr = JSON.stringify(qr);
            createQrCode($s("#wheel_team_qr_result"), qr);
            stopFireWorks();
            setReminedTimeOfWheel();
        }, 2000);
    } else if (wheelPlayState === WHEEL_PLAY_STATE.BOOS) {
        let qr = { id: tgUser.user.id, r: wheelSelectedItem.value, name: tgUser.user.first_name + " " + tgUser.user.last_name };
        wheelTeamResultArr.push(qr);
        afterWheelTimeout3 = setTimeout(() => {
            hideElems(wheelRestWrapper);
            showElems("#wheel_boos_result");
            putInWheelResultTable(qr, true);
            addAllClassesToElems($s("#id" + qr.id), "selected");
            stopFireWorks();
            setReminedTimeOfWheel();
            scanQrCode("wheel_boos_qr_scanner", null);
        }, 2000);
    }

    let remainingTime = ((endWheelMinuet - new Date().getMinutes()) * 1000 * 60) + 500;

    afterWheelTimeout4 = setTimeout(() => {
        wheelShowFlag = false;
        hideElems(wheelRestWrapper);
        showElems("#wheel_rest_main");
    }, remainingTime);
    stopAlarm();
}


//end wheel management


var ticketInterval;
function setTicketInTicketList() {
    let e = $s(".current_ticket_list_parent"), v, c = 0;

    e.innerHTML = '';
    let currentTicketNumberParent = $s(".current_ticket_number_parent");

    for (var r = 1; r < 6; r++) {
        v = bigJson.currentNumbers[r - 1];
        e.insertAdjacentHTML('beforeend', "<p class='current_ticket_list num" + r + "'>" + (v ? v.n : "not choosed") + "</p>");
    }

    function setTicketNumber() {
        removeAllClassesFromElems($s(".current_ticket_list_parent p", 0, 1), "pointed_text");
        $s(".current_ticket_list_parent .num" + (c + 1)).classList.add("pointed_text");
        let o = bigJson.currentNumbers[c];
        if (o) {
            let n = o.n + "";
            currentTicketNumberParent.innerHTML = `
                        <span class="current_ticket_num num_1">${n.charAt(0)}</span>
                        <span class="current_ticket_num num_2">${n.charAt(1)}</span>
                        <span class="current_ticket_num num_3">${n.charAt(2)}</span>
                        <span class="current_ticket_num num_4">${n.charAt(3)}</span>
                        <span class="current_ticket_num num_5">${n.charAt(4)}</span>
                        <span class="current_ticket_num num_6">${n.charAt(5)}</span>
                        <span class="current_ticket_num num_7">${n.charAt(6)}</span>
                        <span class="current_ticket_num num_8">${n.charAt(7)}</span>`;
            if (o.v && o.v.length > 0) {
                o.v.forEach(a => {
                    currentTicketNumberParent.querySelector(".num_" + a).classList.add("void_number_select");
                });
            }
        } else {
            currentTicketNumberParent.innerHTML = `<span class="current_ticket_num num_1">not chosen yet!</span>`;
        }
        if (++c > 4) {
            c = 0;
        }
    }
    setTicketNumber();

    ticketInterval = setInterval(() => {
        setTicketNumber();
    }, 2000);
}
setTicketInTicketList();


// $s("#play_game").onclick = () => {
//     // new WinBox("Play for peace of mind", {
//     //     modal: true,
//     //     width: "100%",
//     //     height: "100%",
//     //     x: "center",
//     //     y: "center",
//     //     //        url: "./cdn/game/praticles/particle.html"
//     //     url: "cdn/game/tower/index.html"
//     // });
//     let lastTowerTime = Number(localStorage.getItem(LS_VAR.TOWER_GAME_LAST_TIME_PLAYING));
//     if (new Date() * 1 - lastTowerTime > STATIC_VARIABLE.ONE_HOUR) {
//         if (!localStorage.getItem(LS_VAR.TOWER_GAME_QTY)) {
//             localStorage.setItem(LS_VAR.TOWER_GAME_QTY, "[]");
//         }
//         localStorage.setItem(LS_VAR.BIGJSON, JSON.stringify(bigJson));
//         window.location.replace("cdn/game/tower/index.html");
//     } else {
//         let t = getDateDiffrence(lastTowerTime, new Date() * 1, { m: true, s: true });
//         toast.info("please wait " + (59 - t.m) + ":m " + (60 - t.s) + "s for next play time");
//     }
// };

var voidNumberParent = $s(".void_number_parent"), selectedVoidNumberList = {};
$s("#x10bt").onclick = a => {
    selectedVoidNumberList = {};
    if (bigJson.totalPoint < STATIC_VARIABLE.USER_POINT_MILESTONE) {
        toast.danger("To get a 10X chance, you need at least " + STATIC_VARIABLE.USER_POINT_MILESTONE + " pionts!");
    } else if (!bigJson.currentNumbers || bigJson.currentNumbers.length < 1) {
        toast.danger("You don't have any chance numbers yet. Please choose your lucky numbers.");
    } else {
        let voidNumberList = $s(".void_number_list");
        voidNumberList.innerHTML = "";
        bigJson.currentNumbers.forEach(o => {
            let a = o.n + "";
            voidNumberList.insertAdjacentHTML('beforeend', `
                        <div class="void_number_item" data-num="${a}">
                            <div>
                                <span class="void_number num_1" data-idx="1">${a.charAt(0)}</span>
                                <span class="void_number num_2" data-idx="2">${a.charAt(1)}</span>
                                <span class="void_number num_3" data-idx="3">${a.charAt(2)}</span>
                                <span class="void_number num_4" data-idx="4">${a.charAt(3)}</span>
                            </div>
                            <div>
                                <span class="void_number num_5" data-idx="5">${a.charAt(4)}</span>
                                <span class="void_number num_6" data-idx="6">${a.charAt(5)}</span>
                                <span class="void_number num_7" data-idx="7">${a.charAt(6)}</span>
                                <span class="void_number num_8" data-idx="8">${a.charAt(7)}</span>
                            </div>
                        </div>`);
            if (o.v && o.v.length > 0) {
                voidNumberList.querySelector(".void_number_item[data-num='" + a + "']").dataset.possible = true;
                o.v.forEach(q => {
                    voidNumberList.querySelector(".void_number_item[data-num='" + a + "'] .num_" + q).classList.add("void_number_select");
                });
            }
        });
        voidNumberList.querySelectorAll(".void_number").forEach((w, i) => {
            w.onclick = () => {
                if (w.closest(".void_number_item").dataset.candida) {
                    if (w.classList.contains("select_number")) {
                        let num = w.closest(".void_number_item").dataset.num;
                        delete selectedVoidNumberList[num];
                        w.classList.remove("select_number");
                        delete w.closest(".void_number_item").dataset.candida;
                    } else {
                        toast.danger("Every lucky number can have only one 10X chance option.");
                    }
                } else if (w.closest(".void_number_item").dataset.possible) {
                    toast.danger("This item has a 10X option. Please choose another one.");
                } else if (bigJson.totalPoint < ((Object.keys(selectedVoidNumberList).length + 1) * STATIC_VARIABLE.VOID_NUMBER_REQUIRED_POINT)) {
                    toast.danger("You don't have enough points to get a 10X chance anymore!");
                } else {
                    w.closest(".void_number_item").dataset.candida = true;
                    let num = w.closest(".void_number_item").dataset.num;
                    selectedVoidNumberList[num] = { v: w.innerText, i: w.dataset.idx };
                    w.classList.add("select_number");
                }
            }
        });
        showElems(".void_number_parent");
    }
}
$s("#cancel_void_number_bt").onclick = () => {
    hideElems($s(".void_number_parent"));
}
$s("#set_void_number_bt").onclick = () => {
    console.log(selectedVoidNumberList);
    if (Object.keys(selectedVoidNumberList).length > 0) {
        let voidNumbers = [];
        Object.keys(selectedVoidNumberList).forEach(q => {
            voidNumbers.push([q, selectedVoidNumberList[q].i, selectedVoidNumberList[q].v]);
        })
        sendPostData("/setnumbervoid", { voidNumbers: JSON.stringify(voidNumbers) });
    } else {
        toast.info("no number selected");
    }
    hideElems($s(".void_number_parent"));
}
$s("#app_info_bt").onclick = () => {
    showElems("#app_info_div");
}
$s("#app_info_div_close").onclick = () => {
    hideElems("#app_info_div");
}

setWheelManage(1);

function setNumberVoidSuccess(jsonData) {
    bigJson.currentNumbers = jsonData.currentNumbers;
    bigJson.totalPoint = jsonData.totalPoint;
    amountValue.innerText = bigJson.totalPoint.toLocaleString();
    toast.success("Changes to the number have been set successfully.");
}

function successWheelResult(jsonData) {
    updateNumber(amountValue, bigJson.totalPoint, jsonData.totalPoint - bigJson.totalPoint);
    bigJson.totalPoint = jsonData.totalPoint;
    if (jsonData.totalAccept) {
        toast.success("The accepted team result is " + jsonData.totalAccept + " people.");
    }
}

function destroyAction() {
    if (videoStream) {
        cancelVideoTrack(videoStream);
    }
    stopAlarm();
    clearInterval(progressInterval);
    clearInterval(spinInterval);
    clearInterval(selectWheelInterval);
    clearInterval(clockInterval);
    clearInterval(ticketInterval);
    clearTimeout(wheelTimeout1);
    clearTimeout(wheelTimeout2);
    clearTimeout(wheelTimeout3);
    clearTimeout(afterWheelTimeout1);
    clearTimeout(afterWheelTimeout2);
    clearTimeout(afterWheelTimeout3);

    // setGlobalWheelAlarm();
}