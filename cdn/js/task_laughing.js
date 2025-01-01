
// var laughCounter = 1, laughInterval,  laughImg = $s("#laugh_bt img"),
//     laughAudio = new Audio();
// var afterLaughingFlag = true;

// function startRecordClicked() {
//     if (!laughingLockFlag) {
//         laughingLockFlag = true;
//         console.log("ontouchstart");
//         startRecording("afterRecord", "laughingAudioPermission");
//     } 
//     // else {
//     //     let t = getDateDiffrence(lastLaughingTimeValue, new Date() * 1, { m: true, s: true });
//     //     toast.info("please wait " + (59 - t.m) + "m: " + (60 - t.s) + "s for next time");
//     // }
// }
// function laughingAudioPermission() {
//     toast.success("start to laughing now!");
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
//             toast.success("please wait for result!");
//             decodeFile(arrayBuffer, "getMoodResultOfLaughing");
//             laughAudio.play();
//         };
//         fileReader.readAsArrayBuffer(blob);
//     }
// }

// // // laughBt.ontouchstart = startRecordClicked;
// // //laughBt.ontouchend = stopRecordClicked;
// // laughBt.onmousedown = startRecordClicked;
// // //laughBt.onmouseup = stopRecordClicked;

// var laughResultModal = $s("#laugh_result_modal"),
//     dunotColor = { 25: { percent: .25, color: "#ffce56" }, 50: { percent: .50, color: "#ff6384" }, 75: { percent: .75, color: "#36a2eb" }, 85: { percent: .85, color: "#4caf50" } };

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


// setTimeout(()=>{
//     startRecordClicked();
// },7000);

// function successLaughing(jsonData) {
//     bigJson.totalPoint = jsonData.totalPoint;
//     toast.success("Your laughing point is saved and your total point is " + bigJson.totalPoint);
// }