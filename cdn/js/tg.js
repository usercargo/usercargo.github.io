
var amountValue = $s("#amount_value"), wheelResultTable = $s("#team_result_table"),
        screenDiv = $s("#screen_div");
amountValue.innerText = previousPointValue.toLocaleString();









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


var bottomMenu = $s(".bottom div", 0, 1), selectedBottomMenu = "big_img";
bottomMenu.forEach(i => {
    i.onclick = (a) => {
        let e = $s("img", i);
        if (e.classList.contains(selectedBottomMenu)) {
//            alert("tekrari");
            return false;
        }
        bottomMenu.forEach(d => {
            removeAllClassesFromElems($s("img", d), selectedBottomMenu);
//            $s("img", d).classList.remove(selectedBottomMenu);
        });
        addAllClassesToElems(e, selectedBottomMenu);
        e.style.transform = "scale(1.1)";
        setTimeout(() => {
            e.style.transform = "scale(1)";
        }, 500);
//        console.log(a);
    }
});




//wheel
let wheel, wheelImages, screenShotCanvas, wheelSelectedItem, wrapper = $s(".wrapper"), bottom = $s(".bottom"), screenShotTaken = false;//, wheelSelectedLastTime;
async function initWheel() {
    wheelSelectedItem = null;
    wheelShowFinished = false;
    screenShotTaken = false;
    clearInterval(clockInterval);

    if (!wheelShowFlag) {
        setwheelPropObject(bigJson.base_wheel_max_value, bigJson.base_wheel_min_value, bigJson.wheel_coefficient, bigJson.wheel_option_quantity);
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
        let spinInterval;
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
        wheel.init({...wheelProp,
//        rotation: wheel.rotation, // Preserve value.
        });
        spinInterval = setInterval(() => {
            wheel.spin(2000);
        }, 5000);

        var selectWheelLock = 5, wheelGuard = $s('#wheel_guard>div'), selectWheelInterval;
        setTimeout(q => {


            selectWheelInterval = setInterval(() => {

                if (selectWheelLock <= 0) {
                    wheelGuard.innerText = '';
                    clearInterval(selectWheelInterval);
                    function getSelectedWheel() {
                        wheelSelectedItem = wheelProp.items[wheel.getCurrentIndex()];
                        console.log("hooora wheel selected : ", wheelSelectedItem);
                        localStorage.setItem(LS_VAR.PREVIOUS_POINT, previousPointValue + wheelSelectedItem.value);
                        $s("#wheel_main h2").innerText = "WOW! you win " + wheelSelectedItem.value.toLocaleString();

                        updateNumber(amountValue, previousPointValue, wheelSelectedItem.value, undefined, "afterWheelSelected");

                        clearInterval(spinInterval);
                        wheel.stop();
                        wheelGuard.removeEventListener("mousedown", getSelectedWheel);
                        playFireWorks("celebration");

                        // *** sound effect of clapping

                        wrapper.style.height = "auto";
                        bottom.style.position = "static";

                        setTimeout(() => {

                            html2canvas(wrapper).then(canvas => {
                                wrapper.style.height = "100%";
                                bottom.style.position = "fixed";

                                showElems([screenDiv]);
                                $s("#screen_scroe_img").src = canvas.toDataURL();
                                $s("#screen_scroe_value").innerText = wheelSelectedItem.value.toLocaleString();
                                $s("#screen_name").innerText = myName;
                                let d = new Date();
                                $s("#screen_time").innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " (" + d.getHours() + ":" + d.getMinutes() + "')";
                                $s("#screen_total_point").innerText = (wheelSelectedItem.value + previousPointValue).toLocaleString();

                                $s("#screen_invite_link").innerText = inviteLink;
                                createQrCode($s("#invite_qr"), inviteLink, "white");
                                //$s("#").innerText= ;

                                html2canvas(screenDiv).then(canvas2 => {
                                    screenShotCanvas = canvas2;
                                    $s("#screen_shot img").src = canvas2.toDataURL();
                                    hideElems([screenDiv]);

                                    toast.success("HOOOORAAA you win " + wheelSelectedItem.value + " and will be added to your points");
                                    screenShotTaken = true;
//                                afterWheelSelected();
                                });
                            });

                        }, 1000);

                        localStorage.setItem(LS_VAR.WHEEL_LAST_TIME_PLAYED, new Date().getTime());
                        wheelLastTimePlayedValue = new Date(Number(localStorage.getItem(LS_VAR.WHEEL_LAST_TIME_PLAYED)) || 0);


                    }
                    wheelGuard.addEventListener("mousedown", getSelectedWheel);
                } else {
                    wheelGuard.innerText = selectWheelLock--;
                }
            }, 1000);

        }, 5000);


        setTimeout(() => {
            wheel.refresh();
        }, 300);
    } else {
        wheelPlayState = WHEEL_PLAY_STATE.NOTHING;
        toast.warning("you are not allowed to play at this time");
    }
}
;
$s("#screen_shot").onclick = () => {
    if (screenShotTaken) {
        downloadImageByDate($s("#screen_shot img").src);
    } else {
        toast.info("you not played yet!");
    }
};
//};

//baseValue = total value that will be devided
//division = how many number will be have
//coefficient = zaribi az adad
//equality = 0 == all division are equal together , 1 == division numbers are near together , 3 == division number are so far together
//function getSortedRandomnumber(baseValue, division, coefficient, equality) {
//    if (baseValue > 0 && baseValue % division === 0 && )

//}


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
        wheelProp.items.push({label: e.toLocaleString(), value: e});
    });
}
//console.log(getChanceNumberArray(5, 50, 1, 30));


//countdown timer

function countDownTimer(targetTime, serverTime, finishCallBackName, dayElem, hourElem, minElem, secElem, decaSecElem, progressElem) {
    const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let differenceDate = (new Date() * 1) - serverTime;
//            ,today = new Date((new Date() * 1) - differenceDate);
    targetTime += differenceDate;
    let   sTime = 0, percent = 0, sTimeStr;
    const countDown = new Date(targetTime).getTime(),
            firstDistance = countDown - new Date() * 1,
            ms = setInterval(function () {
                sTimeStr = sTime++ + "";
                if (sTimeStr.length === 1) {
                    sTimeStr = "0" + sTimeStr;
                }
                setAllElemInnerText(decaSecElem, sTimeStr);
                if (sTime > 99) {
                    sTime = 0;
                }
            }, 10),
            x = setInterval(function () {
                const now = new Date().getTime(),
                        distance = countDown - now;
                percent = 100 - (distance * 100 / firstDistance);

//                progressElem.forEach(i => {
//                    i.style.width = percent + '%';
//                });
//                if (percent >= 100) {
//                    percent = 100;
//                }
//                console.log("percent:", percent);
                progressElem.style = `--progress: ${percent}%`;

                if (distance < 1000) {
                    clearInterval(x);
                    clearInterval(ms);
                    progressElem.style = `--progress:100%`;
                    setAllElemInnerText(decaSecElem, 0);
                    if (finishCallBackName) {
                        window[finishCallBackName]();
                    }
//                    return;
                }

                let dayStr = Math.floor(distance / (day)) + "",
                        hourStr = Math.floor((distance % (day)) / (hour)) + "",
                        minStr = Math.floor((distance % (hour)) / (minute)) + "",
                        secStr = Math.floor((distance % (minute)) / second) + "";
                if (dayStr.length === 1) {
                    dayStr = "0" + dayStr;
                }
                if (hourStr.length === 1) {
                    hourStr = "0" + hourStr;
                }
                if (minStr.length === 1) {
                    minStr = "0" + minStr;
                }
                if (secStr.length === 1) {
                    secStr = "0" + secStr;
                }
                setAllElemInnerText(dayElem, dayStr),
                        setAllElemInnerText(hourElem, hourStr),
                        setAllElemInnerText(minElem, minStr),
                        setAllElemInnerText(secElem, secStr);
            }, 1000);
}
countDownTimer(new Date() * 1 + 1000 * 30, new Date() * 1, null, $s(".timer_val.day", 0, 1), $s(".timer_val.hour", 0, 1), $s(".timer_val.min", 0, 1), $s(".timer_val.sec", 0, 1), $s(".timer_val.tenth small", 0, 1), $s(".timer_progress_bar"));
//end countdown timer
//
//
//
//start wheel rest 
let wheelRestWrapper = $s(".wheel_rest_wrapper", 0, 1), //reminedWheelTime = $s("#next_wheel_time"),// nextWheelHour = $s("#next_wheel_hour"),
        ringingAudio = new Audio("cdn/sound/dreamland_ringtone.mp3");

const WHEEL_PLAY_STATE = {
    ALONE: {name: "alone", state: 1},
    BOOS: {name: "boos", state: 2},
    TEAM: {name: "team", state: 3},
    NOTHING: {name: "nothing", state: -1}
};
var basePass = "new Date().getTime()", boosRandomStr = /* *** **/ "Gtiwpd7Whv8rZGwmeJUd", boosQrGenerated, wheelPlayState, clockInterval;

ringingAudio.loop = true;
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
////        nextWheelHour.innerText = (t.getHours() + 1) + ":00";
//        let min = t.getMinutes();
//        let sec = 60 - t.getSeconds();
//        if (sec < 10) {
//            sec = "0" + sec;
//        }
//        if (isTimeInWheelTime()) {
//        show wheel
//            if ($s("#wheel_rest_alarm_checkbox").checked) {

//            }
        $s("#last_time_wheel").innerText = t.getHours() + ":10";
//        } else {
//            let s = (60 - min) + ":" + sec;
//            reminedWheelTime.innerText = s;
//        }
    }, 60000);
}
setReminedTimeOfWheel();

let clockAlarmBt = $s(".clock_alarm"), clockAlarmFlag = localStorage.getItem(LS_VAR.WHEEL_CLOCK_ALARM) === 'true' || false;
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
        toast.success("alarm is ON and will be signing in next time chance wheel");
    }
    localStorage.setItem(LS_VAR.WHEEL_CLOCK_ALARM, clockAlarmFlag);
}
clockAlarmBt.onclick = setClockAlarm;
clockAlarmBt.ontouchstart = setClockAlarm;


//end wheel rest
//
//
//start wheel team play


var wheelPlayPrivateKey, wheelPlayPublicKey;
function wheelRsaDecrypt(msg) {
//    return supporterCrypt.decrypt(msg);
    return msg;
}
function wheelRsaEncrypt(msg) {
//    return supporterCrypt.encrypt(msg);
    return msg;
}



//createQrCode($s("#wheel_boos_qr"), "When someone scans that QR or just goes to the link you copied, A feature called Scroll to text fragment allows the text fragment to be detected when they load the webpage, and will scroll your selected text into view and be highlighted in yellow");

var videoStream;
function scanQrCode(elem, callBack) {

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
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
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
            toast.warning("accessing to camera is denied please release permission");
        });
    } else {
        toast.danger("in this browser camera using is not supporter");
//        console.error("getUserMedia not supported in this browser");
    }
    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: "dontInvert"});
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
                            let json = JSON.parse(decrypte(boosRandomStr, code.data));
                            if (json && json.r) {
                                let f = true;
                                wheelTeamResultArr.forEach(q => {
                                    if (q.id === json.id) {
                                        f = false;
                                    }
                                });
                                if (f) {
                                    wheelTeamResultArr.push(json);

                                    wheelResultTable.innerHTML = "";
                                    let lastScoreResult = 0, lastMoreScoreId;
                                    wheelTeamResultArr.forEach(i => {
                                        if (lastScoreResult < i.r) {
                                            lastScoreResult = i.r;
                                            lastMoreScoreId = i.id;
                                        }
                                        console.log("i:", i, "lastScoreResult", lastScoreResult, "i.r:", i.r);
                                        putInWheelResultTable(i);
                                    });
                                    removeAllClassesFromElems($s("tr", wheelResultTable), "selected");
                                    addAllClassesToElems($s("#id" + lastMoreScoreId), "selected");
                                    toast.success("result of " + json.name + " is recieved and shown in table");
                                } else {
                                    toast.warning("oh this result is catched before and it's repeated!!");
                                }

                            }
                        }
                    } catch (e) {
                        toast.warning("wrong QR code! maybe you are not in this team");
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

function cancelVideoTrack(videoStream) {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
}
function qrScannedAsTeamPlayer(qrCode) {
    try {
        let qrDec = decrypte(basePass, qrCode);
        boosRandomStr = qrDec.substring(0, 20);
        let flag = Number(decrypte(boosRandomStr, qrDec.substr(20)));
        if (flag === 11) {
            toast.info("OK you are a team player, after choice you score in wheel get back result to team head");
            hideElems(wheelRestWrapper);
            stopAlarm();
//            initWheel(props[2]);
            initWheel();
            return true;
        } else {
            toast.warning("your code is not corrent please scan again");
        }
        console.log("qrScannedAsTeamPlayer qrDec:", qrDec, "boosRandomStr:", boosRandomStr, "flag:", flag);
//        boosQrGenerated = encrypte(basePass, boosRandomStr + encrypte(boosRandomStr, "11"));
    } catch (e) {
        toast.warning("QR code is not valid!");
        console.error(e);
    }
    return false;
}



//end wheel team play
//
//
//
//
//
//start wheel management

//var startMinuet = 0, endMinuet = 11;
var wheelShowFlag = false, wheelShowFinished = true, wheelTeamResultArr = [];

function isTimeInWheelTime() {
    let  min = new Date().getMinutes();
    return min >= startWheelMinuet && min < endWheelMinuet;
}
hideElems(wheelRestWrapper);
stopAlarm();

function setWheelManage(time) {
    setTimeout(() => {
        if (wheelShowFinished) {
            hideElems(wheelRestWrapper);
            stopAlarm();
            if (isTimeInWheelTime()) {
                if (!wheelShowFlag && new Date().getTime() - wheelLastTimePlayedValue.getTime() > (endWheelMinuet - wheelLastTimePlayedValue.getMinutes()) * 60 * 1000) {
                    showElems("#wheel_play_main");
                    clockAlarmFlag = true;
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

setWheelManage(1);







$s("#start_wheel_alone").onclick = () => {
    wheelPlayState = WHEEL_PLAY_STATE.ALONE;
//    initWheel(props[2]);
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
//        createQrCode($s("#wheel_boos_qr"));
        boosRandomStr = "Gtiwpd7Whv8rZGwmeJUd";// *** getRandomString(20);
        boosQrGenerated = encrypte(basePass, boosRandomStr + encrypte(boosRandomStr, "11"));
        //generate qr data
        createQrCode($s("#wheel_boos_qr"), boosQrGenerated);
    } else {
        toast.warning("you are not allowed to play at this time");
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
        toast.warning("you are not allowed to play at this time");
    }
};
$s("#check_team_result").onclick = () => {
    wheelShowFinished = true;
    hideElems(wheelRestWrapper);
    stopAlarm();
    showElems("#wheel_rest_main");
};
$s("#start_wheel_after_boos").onclick = () => {
//    initWheel(props[2]);
    initWheel();
};
$s("#boos_qr_scan_finish").onclick = () => {
    scanFlag = false;
    cancelVideoTrack(videoStream);

    // *** send data to server
};
$s("#cancel_team").onclick = () => {
    hideElems(wheelRestWrapper);
    cancelVideoTrack(videoStream);
    showElems("#wheel_play_main");
    startAlarm();
};
function startAlarm() {
    if (clockAlarmFlag) {
        ringingAudio.play().catch(error => {
            console.error('Playback failed:', error);
            // Display a message to the user or handle the error gracefully
        });
    }
}
function stopAlarm() {
    ringingAudio.pause();
}
function afterWheelSelected() {

    if (wheelPlayState === WHEEL_PLAY_STATE.ALONE) {


        setTimeout(() => {
            hideElems(wheelRestWrapper);
            showElems("#wheel_rest_main");
            wheelShowFinished = true;
            stopFireWorks();
            setReminedTimeOfWheel();
        }, 2000);

        // *** send to server
    } else if (wheelPlayState === WHEEL_PLAY_STATE.TEAM) {
        let qr = {id: 321321321, r: wheelSelectedItem.value, name: "امیرحسین میر قائدی نوری کرمانی"};
        setTimeout(() => {
            hideElems(wheelRestWrapper);
            showElems("#wheel_team_reault");
            qr = JSON.stringify(qr);
            qr = encrypte(boosRandomStr, qr);
            createQrCode($s("#wheel_team_qr_result"), qr);
            stopFireWorks();
            setReminedTimeOfWheel();
        }, 2000);

    } else if (wheelPlayState === WHEEL_PLAY_STATE.BOOS) {

        let qr = {id: 32574, r: wheelSelectedItem.value, name: myName};
        wheelTeamResultArr.push(qr);
        setTimeout(() => {
            hideElems(wheelRestWrapper);
            showElems("#wheel_boos_result");
            putInWheelResultTable(qr, true);
            addAllClassesToElems($s("#id" + qr.id), "selected");
            stopFireWorks();
            setReminedTimeOfWheel();

            //open qr scanner
            scanQrCode("wheel_boos_qr_scanner", null);

        }, 2000);

    }

    let remainingTime = ((endWheelMinuet - new Date().getMinutes()) * 1000 * 60) + 500;
//    console.log("remainingTime:", remainingTime);
    setTimeout(() => {
//        console.log("GGGGGGGGGGGGGGFFFF");
        wheelShowFlag = false;
        hideElems(wheelRestWrapper);
        showElems("#wheel_rest_main");
    }, remainingTime);
//    }

    stopAlarm();

}
//wheelLastTimePlayedValue=0;
//localStorage.setItem(LS_VAR.WHEEL_LAST_TIME_PLAYED, 0);


//end wheel management

function setTicketInTicketList() {
    let e = $s(".current_ticket_list_parent"), v, c = 0;
    ;
    e.innerHTML = '';

    for (var r = 1; r < 6; r++) {
        v = myTicket[r - 1];
        e.insertAdjacentHTML('beforeend', "<p class='current_ticket_list num" + r + "'>" + (v ? v.v : "not choosed") + "</p>");
    }

    function setTicketNumber() {
        removeAllClassesFromElems($s(".current_ticket_list_parent p", 0, 1), "pointed_text");
        $s(".current_ticket_list_parent .num" + (c + 1)).classList.add("pointed_text");
        for (var f = 0; f < 8; f++) {
            $s(".current_ticket_number_parent .num_" + (f + 1)).innerText = myTicket[c].v.charAt(f);
        }
        if (++c > 4) {
            c = 0;
        }
    }
    setTicketNumber();

    setInterval(() => {
        setTicketNumber();
    }, 2000);
}
setTicketInTicketList();


$s("#play_game").onclick = () => {
    new WinBox("Play for peace of mind", {
        modal: true,
        width: "100%",
        height: "100%",
        x: "center",
        y: "center",
        url: "./cdn/game/praticles/particle.html"
//    url: "cdn/game/praticles/particle.html"
    });
};
//234:555