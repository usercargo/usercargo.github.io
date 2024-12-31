var newChanceNumberArr = new Set();


if (inputNumberList.length < 10) {
    $s(".number_has_limit").classList.remove(hidden);
    $s(".number_has_limit span").innerText = inputNumberList;
}
document.body.addEventListener('click', function (event) {
    //    console.log(event.target);
    if (event.target.classList.contains('num_click')) {
        setNumberToFlowNumber(event.target, inputNumberList);
    }
});
updateNumber($s("#total_prize_title"), 0, 2500000, 237);
function setNumberToFlowNumber(elem, inputNumberList) {
    let e = elem.closest(".flow_num"), c = inputNumberList.indexOf(e.querySelector(".num_value").innerText), isPlue = elem.classList.contains("num_plus");
    console.log("c:", c, e.querySelector(".num_value").innerText);
    e.querySelector(".num_value").innerText = isPlue && c < inputNumberList.length - 1 ? inputNumberList[++c] : (!isPlue && c > 0 ? inputNumberList[--c] : inputNumberList[c]);
}
var randomFlowNumberTimeout;
function setRandomFlowNumber(parentElem, inputNumberList) {
    let c = 100, lastNumber = inputNumberList[Math.floor(Math.random() * inputNumberList.length)], currentNumber;
    parentElem.querySelectorAll(".num_value").forEach(a => {
        randomFlowNumberTimeout = setTimeout(() => {
            do {
                currentNumber = inputNumberList[Math.floor(Math.random() * inputNumberList.length)];
            } while (currentNumber === lastNumber)
            lastNumber = currentNumber;
            a.innerText = lastNumber;
        }, c += 100);
    })
}
setRandomFlowNumber($s("#new_ticket"), inputNumberList);
function getFlowNumberValue(parentElem) {
    let val = "";
    $s(parentElem + " .num_value", 0, 1).forEach(q => {
        val += q.innerText.trim();
    });
    return val;
}

var elts = {
    text1: document.querySelector(".text_shadow_anim_text1"),
    text2: document.querySelector(".text_shadow_anim_text2")
}, elms = {
    span1: elts.text1.querySelector("span"),
    span2: elts.text2.querySelector("span"),
    img1: elts.text1.querySelector("img"),
    img2: elts.text2.querySelector("img")
};

var texts = [
    ["cdn/img/share_on_social_media.svg", "1- share your art on social media"],
    ["cdn/img/vote_invitation.svg", "2- give votes"],
    ["cdn/img/win_prize.svg", "3- win <b class='fg_lime'>$1,000,000</b> prize</span>"]
];

var morphTime = 2;
var cooldownTime = 5;

var firstIndex = texts.length - 1;
var textShadowAnimTime = new Date();
var morph = 0;
var cooldown = cooldownTime;

elms.span1.innerHTML = texts[firstIndex % texts.length][1];
elms.span2.innerHTML = texts[(firstIndex + 1) % texts.length][1];
elms.img1.src = texts[firstIndex % texts.length][0];
elms.img2.src = texts[(firstIndex + 1) % texts.length][0];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elms.span1.innerHTML = texts[firstIndex % texts.length][1];
    elms.span2.innerHTML = texts[(firstIndex + 1) % texts.length][1];
    elms.img1.src = texts[firstIndex % texts.length][0];    
    elms.img2.src = texts[(firstIndex + 1) % texts.length][0];
    // setTimeout(() => {
        // elms.img2.src = texts[(firstIndex + 1) % texts.length][0];
    // }, 1500);
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - textShadowAnimTime) / 1000;
    textShadowAnimTime = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            firstIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();

//end text shadow anim
//
//
//text writing

//consoleText(['create your handcraft / achievement / art', 'share on the social medias with your lucky numbers', 'give votes', 'win $1,000,000 prize'], 'text_writing', ['tomato', 'magenta', 'lightblue']);
//
//function consoleText(words, id, colors) {
//    if (colors === undefined)
//        colors = ['#fff'];
//    var visible = true;
//    var con = document.getElementById('console');
//    var letterCount = 1;
//    var x = 1;
//    var waiting = false;
//    var target = document.getElementById(id)
//    target.setAttribute('style', 'color:' + colors[0])
//    window.setInterval(function () {
//
//        if (letterCount === 0 && waiting === false) {
//            waiting = true;
//            target.innerHTML = words[0].substring(0, letterCount)
//            window.setTimeout(function () {
//                var usedColor = colors.shift();
//                colors.push(usedColor);
//                var usedWord = words.shift();
//                words.push(usedWord);
//                x = 1;
//                target.setAttribute('style', 'color:' + colors[0])
//                letterCount += x;
//                waiting = false;
//            }, 1000)
//        } else if (letterCount === words[0].length + 1 && waiting === false) {
//            
////            waiting = true;
//            window.setTimeout(function () {
//                letterCount=0;
////                x = -1;
////                letterCount += x;
////                waiting = false;
//            }, 1000)
//        } else if (waiting === false) {
//            target.innerHTML = words[0].substring(0, letterCount)
//            letterCount += x;
//        }
////    }, 120)
//}, 40)
//    window.setInterval(function () {
//        if (visible === true) {
//            con.className = 'console-underscore text_writing_hidden'
//            visible = false;
//
//        } else {
//            con.className = 'console-underscore'
//
//            visible = true;
//        }
//    }, 100)
//}
//
//end text writing

var prizeResultInterval;
function setVotedNumber() {

    if (systemJson.votedNumbers && systemJson.votedNumbers.length > 0) {
        let c = 0;
        systemJson.votedNumbers.forEach(q => {

            $s(".winner_statistics .num" + c + " .winner_num").innerText = q.n;
            // $s(".winner_statistics .num" + c + " .winner_qty").innerText = "X " + q.w;
            $s(".winner_statistics .num" + c + " .winner_qty").innerText =  q.w;
            $s(".most_voted_number.num" + c).innerText = q.n;
            c++;
        });

        if (bigJson.previousNumbers && bigJson.previousNumbers.length) {
            c = 0;
            bigJson.previousNumbers.forEach(q => {
                $s("#my_selected_number_div").insertAdjacentHTML('beforeend', '<p class="my_selected_number num' + c + '"  data-num="' + c + '">' + q + '</p>');
                c++;
            });
        }

        if (bigJson.previousNumbers && bigJson.previousNumbers.length > 0) {

            showElems("#with_choosed_number_statistics");

            let d = 0, z = 0, winnerNum, myNum, mostVotedNumber = $s(".most_voted_number", 0, 1), mySelectedNumber = $s(".my_selected_number", 0, 1);
            let wNum, mNum, rNum, prizeLevel = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];

            setWinnerAndTicketData(d, z);
            z = bigJson.previousNumbers.length > 1 ? z + 1 : 0;

            prizeResultInterval = setInterval(() => {
                setWinnerAndTicketData(d, z);
                z++;
                if (z >= bigJson.previousNumbers.length) {
                    d++;
                    if (d >= systemJson.votedNumbers.length) {
                        d = 0;
                    }
                    z = 0;
                }
            }, 3000);

            function setWinnerAndTicketData(d, z, isClicked) {
                winnerNum = systemJson.votedNumbers[d].n ; 
                myNum = bigJson.previousNumbers[z] + "";

                for (let y = 0; y < 8; y++) {

                    wNum = winnerNum.charAt(y) || "", mNum = myNum.charAt(y);

                    $s(".winresult_grid .wnum" + y).innerText = wNum==="x"?"":wNum;
                    $s(".winresult_grid .mnum" + y).innerText = mNum;

                    if (wNum === "x") {
                        rNum = "";
                    } else if (wNum === mNum) {
                        rNum = "&#x2705;";
                    } else if (mNum < wNum) {
                        rNum = (mNum - wNum);
                    } else {
                        rNum = "+" + (mNum - wNum);
                    }

                    $s(".winresult_grid .rnum" + y).innerHTML = rNum;

                }



                removeAllClassesFromElems(mostVotedNumber, "choosed");
                $s(".most_voted_number.num" + d).classList.add("choosed");
                removeAllClassesFromElems(mySelectedNumber, "choosed");
                $s(".my_selected_number.num" + z).classList.add("choosed");
                $s(".winresult_grid .total_winner").innerText = systemJson.votedNumbers[d].w.toLocaleString();
                $s(".winresult_grid .prize span").innerText = "$ " + systemJson.votedNumbers[d].a.toLocaleString();
                $s(".winresult_grid .prize img").src = "cdn/img/" + (d + 1) + "rd_medal.svg";
                $s(".winresult_grid .detail").innerText = prizeLevel[d] + " winners";

            }

            $s(".voted_num").addEventListener("click", function (e) {
                console.log("click, d:", d, " z:", z);
                if (e.target.className.includes("most_voted_number")) {

                    clearInterval(prizeResultInterval);
                    d = Number(e.target.dataset.num);
                    console.log("most_voted_number , e.target.dataset:", e.target.dataset, " num(d):", d, " z:", z);
                    setWinnerAndTicketData(d, z);
                } else if (e.target.className.includes("my_selected_number")) {

                    clearInterval(prizeResultInterval);
                    z = Number(e.target.dataset.num);
                    console.log("my_selected_number , e.target.dataset:", e.target.dataset, " d:", d, " num(z):", z);
                    setWinnerAndTicketData(d, z);
                }

            });
        } else {
            showElems("#without_choosed_number_statistics");
        }
    }
}
setVotedNumber();




function setCurrentNumber() {
    if (bigJson.currentNumbers && bigJson.currentNumbers.length > 0) {
        showElems("#current_number_div");
        $s("#my_buyed_tickets").innerHTML = "";
        bigJson.currentNumbers.forEach(q => {
            $s("#my_buyed_tickets").insertAdjacentHTML('beforeend', '<div class="' + (q.p == 1 ? 'new_ticket' : 'new_ticket half_ticket') + '"><span>' + q.n + '</span></div>');
        });
    }
    showHideAddNumber();
}
setCurrentNumber();


function showHideAddNumber(fromBt) {
    if (bigJson.currentNumbers.length + newChanceNumberArr.size >= STATIC_VARIABLE.MAX_CURRENT_TICKET) {
        hideElems($s("#current_my_ticket"));
        if (fromBt) {
            toast.success("Congratulations! You have filled in 5 lucky numbers.");
        }
    }
}
$s("#add_new_number_bt").onclick = () => {
    let numVal = getFlowNumberValue("#new_ticket"), flag = false;
    bigJson.currentNumbers.forEach(a => {
        if (a.n === numVal) {
            flag = true;
        }
    });
    if (!flag&&!newChanceNumberArr.has(numVal)) {
        showElems("#current_number_div");
        newChanceNumberArr.add(numVal);
        showHideAddNumber(true);
        showElems("#send_numbers");
        $s("#my_buyed_tickets").insertAdjacentHTML('beforeend', '<div class="new_ticket not_paid_ticket"><span>' + numVal + '</span></div>');
    } else {
        toast.warning("You currently have this number!");
    }
};
$s("#send_numbers").onclick = () => {
    hideElems("#send_numbers");
    sendPostData("/addnumber", { numbers: JSON.stringify(Array.from(newChanceNumberArr)) });
}
function addNewNumbersToBigJson(jsonData) {
    bigJson.currentNumbers = jsonData.currentNumbers;
    // newChanceNumberArr = [];
    newChanceNumberArr.clear();
    toast.success("Your numbers is saved");
    $s("#my_buyed_tickets").innerHTML = "";
    setCurrentNumber();
}
function destroyAction() {
    clearTimeout(randomFlowNumberTimeout);
    clearInterval(prizeResultInterval);
}