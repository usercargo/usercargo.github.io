var isInTest = window.location.host.includes("123.abc");




var tgUser = window.Telegram.WebApp.initDataUnsafe;
if (tgUser&&tgUser.user) {
    $s("#my_pic").src = tgUser.user.photo_url;
    $s("#my_name").innerText = tgUser.user.first_name + " " + tgUser.user.last_name;
}
var inviteLink = "https://t.me/" + tmaBotName + "?startapp=" + tgUser.user.id,
tgChannel = "https://t.me/happytoys2";

console.log("window.Telegram.WebApp.initDataUnsafe.auth_date", window.Telegram.WebApp.initDataUnsafe.auth_date, "current time : ", new Date().getTime());


var tinyOp = {};

var tonConnectUI;

const serverBaseUrl = isInTest?"https://123.abc:7070":"https://static.notrex.ir:2053";
const staticServerBaseUrl = isInTest?"https://123.abc:444/static/":"https://static.notrex.ir:2096"

var bigJson = {
    // my_name: "Kasra Hamediani kia",
    // username: "kasr98ra",
    // user_tg_id: 4321321321,
    totalPoint: 1900000000,
    isFunVoiceAllowed: true,
    numberLimitType: 1,
    funVoiceNumber: 0,//11
    funVoiceLikedStatistics: [30, 48, 432],//[liked,disliked,heard]
    lastFunVoiceNumber: 1,
    walletNonBounceableAddr: "0QAAnBlgEneNamuKLyWPY5KD3rJBhwoFxafH3kPIyWRZMouf",
    areaId: "-994916816", //null,  null when not setted
    baseWheelMaxValue: 50, baseWheelMinValue: 1, wheelCoefficient: 100000, wheelOptionQuantity: 16,
    myInviteGift: 50000000,
    //  friend_invite_gift: 50000000,
    recentFriends: [// [] for no friends
        { name: "mozhgan elmifard", time: 1730506708925 },
        { name: "mehdi rahmati", time: 1730226708925 },
        { name: "KIOKIO mta", time: 1730126708925 },
        //{name: "ALioo9", time: 1730026708925}
    ],
    previousNumbers: [73821484, 64352455, 45256234],
    currentNumbers: [
        // { n: 35718358, p: 1, v: [] },
        // { n: 67453294, p: 1, v: [] },
        { n: 57384345, p: 1, v: [3] },
        // {n: 57384345, p: 1},
        // { n: 95773524, p: 1, v: [7] }
    ],
};

const TASK_STATE = Object.freeze({
    NOT_IMPORTANT: -1,
    OPEN: 1,
    DONE: 10
});
const FRIEND_TASK_LEVEL = Object.freeze({
    NUMBER_0_9: 2,
    WHEEL_2X: 7
});
const TASK_TYPE = Object.freeze({
    ONCE: 1,
    INTERVAL: 10
});
const LS_VAR = Object.freeze({
    WHEEL_LAST_TIME_PLAYED: "a1",
    PREVIOUS_POINT: "a2",
    WHEEL_CLOCK_ALARM: "a3",
    LAST_LAUGHING_TIME: "a4",
    LAST_YOUTUBE_CONTENT_LINK: "a5",
    LISTENED_VOICES: "a6",
    VOTED_FUN_VOICES: "a7",
    WHEEL_LAST_SCORE_IMAGE: "a8",
    TOWER_GAME_QTY: "a9",
    TOWER_GAME_LAST_TIME_PLAYING: "a10",
    BIGJSON: "a11",
    LAST_TOWER_GAME_TIME: "a12",
});
const STATIC_VARIABLE = Object.freeze({
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
    ONE_WEEK: 24 * 60 * 60 * 1000 * 7,
    MAX_CURRENT_TICKET: 5,
    MAX_FUN_VOICE_FETCH: 10,
    FUN_LIKE_POINT: 1000,
    BASE_FUN_VOICE_POINT: 1000,
    MAX_FUN_VOICE_POINT: 100000000,
    USER_POINT_MILESTONE: 1000000000,
    VOID_NUMBER_REQUIRED_POINT: 1000000000,
    TOWER_BASE_SCORE: 1000,
    WHEEL_VOTE_TG_CHANNEL: tgChannel,//"https://t.me/wheelvotebot",
    TOWER_GANE_ENOUGH_PLAY_QTY: 5,
    // MIN_FUN_VOICE_LIKE_DISLIKE_TO_SAVE:50
    MIN_FUN_VOICE_LIKE_DISLIKE_TO_SAVE: 1
});

var hidden = "hide";

const CUSTOM_INPUT_LIMIT = Object.freeze({
    NOTHING: { id: -1, range: [] },
    FIRST: { id: 1, range: ['0', '1', '2', '3', '4'] },
    LAST: { id: 2, range: ['5', '6', '7', '8', '9'] },
    ODD: { id: 3, range: ['1', '3', '5', '7', '9'] },
    EVEN: { id: 4, range: ['0', '2', '4', '6', '8'] },
    FULL: { id: 5, range: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] }
});

const FUN_RECORD_STATE = Object.freeze({
    RECORD: 1,
    PLAY: 2,
    PUBLISH: 3
});
var inputNumberList;

function setInputNumberLimit() {
    Object.keys(CUSTOM_INPUT_LIMIT).forEach(w => {
        if (CUSTOM_INPUT_LIMIT[w].id === bigJson.numberLimitType) {
            console.log("w", w, "CUSTOM_INPUT_LIMIT[w].id :", CUSTOM_INPUT_LIMIT[w].id);
            inputNumberList = CUSTOM_INPUT_LIMIT[w].range;
        }
    });
}
setInputNumberLimit();

var systemJson = {
    //    voted_numbers: [{n: 83247696, w: 1, a: 1000000}, {n: 7832457, w: 4, a: 500000}, {n: 758435, w: 12, a: 250000}, {n: 57843, w: 54, a: 250000}, {n: 8753, w: 483, a: 250000}, {n: 487, w: 4332, a: 250000}, {n: 45, w: 43746, a: 250000}]
    votedNumbers: [{ n: "83247696", w: 1, a: 1000000 }, { n: "75xxxxxx", w: 65834, a: 500000 }, { n: "xx87xxxx", w: 56845, a: 5000000 }, { n: "xxxx45xx", w: 43746, a: 500000 }],
    total1BUser: 36.95647,
    // wheelPrizeDate: 1732865714305,
};

var laughingPrizeValue = 1000000, laughingDuration = 30, ON_HOUR_TIME = 1000 * 60 * 60, minimumLaughingPrize = 10000, funVoiceDuration = 60;

var tmaName = "topnft.top", tmaBotName = "calinowenbot", inviteGiftValue = Number("25000000").toLocaleString(),
    inviteThankyouGiftValue = Number("25000000").toLocaleString(), locationGiftValue = Number("50000000").toLocaleString(),
    lastLaughingTimeValue = Number(localStorage.getItem(LS_VAR.LAST_LAUGHING_TIME)) || 0,
    lastTowerGameTimeValue = Number(localStorage.getItem(LS_VAR.LAST_TOWER_GAME_TIME)) || 0,
    lastYoutubeContentLinkValue = Number(localStorage.getItem(LS_VAR.LAST_YOUTUBE_CONTENT_LINK)) || 0,
    // previousPointValue = Number(localStorage.getItem(LS_VAR.PREVIOUS_POINT) || 0),
    startWheelMinuet = 0, endWheelMinuet = 59,
    wheelLastTimePlayedValue = new Date(Number(localStorage.getItem(LS_VAR.WHEEL_LAST_TIME_PLAYED)) || 0);//, myName = bigJson.my_name;


if (!localStorage.getItem(LS_VAR.WHEEL_LAST_TIME_PLAYED)) {
    localStorage.setItem(LS_VAR.WHEEL_LAST_TIME_PLAYED, 0);
}

// previousPointValue = 3598500000;







//$s("#myname").innerText = myName;



var wheelProp = {
    name: 'prize',
    radius: 0.88,
    itemLabelRadius: 0.92,
    itemLabelRadiusMax: 0.4,
    itemLabelRotation: 0,
    //    itemLabelAlign: AlignText.right,
    itemLabelAlign: 'right',
    itemLabelBaselineOffset: -0.13,
    //    itemLabelFont: 'Pragati Narrow',
    itemLabelFont: 'comicsans',
    itemBackgroundColors: ['#c7160c', '#fff'],
    itemLabelColors: ['#fff', '#000'],
    rotationSpeedMax: 2000,
    rotationResistance: -70,
    lineWidth: 0,
    // image: './cdn/img/wheel/example-0-image.svg',
    overlayImage: './cdn/img/wheel/example-2-overlay.svg',
    items: [
        //      {
        //        label: 'Action',value:1000
        //      },
    ]
};







