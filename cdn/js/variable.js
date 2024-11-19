var bigJson = {
    my_name: "Kasra Hamediani kia",
    username:"kasr98ra",
    user_tg_id: 4321321321,
    wallet_bounceable_addr :"0QAAnBlgEneNamuKLyWPY5KD3rJBhwoFxafH3kPIyWRZMouf",
    area: null,//"gfh3dj32hjh4j3", //  null when not setted
    base_wheel_max_value: 50, base_wheel_min_value: 1, wheel_coefficient: 100000, wheel_option_quantity: 16,
    my_invite_gift:50000000,friend_invite_gift:50000000,
    recent_friends: [// [] for no friends
        {name: "mozhgan elmifard", time: 1730506708925},
//        {name: "mehdi rahmati", time: 1730226708925},
//        {name: "KIOKIO mta", time: 1730126708925},
//        {name: "ALioo9", time: 1730026708925}
    ],
    previous_numbers: [73821484, 64352455, 43256234],
    current_number: [
        {n: 35718358, p: .5},
        {n: 67453294, p: 1},
        {n: 57384345, p: .5},
        {n: 95773524, p: 1}
    ],
//    task: [
////        {name: "laughing", parent: null, type: "interval", interval_duration: "3600", state: -1},
////        {name: "wallet", parent: null, type: "once", interval_duration: 0, state: 1},
////        {name: "num09", parent: null, type: "once", interval_duration: 0, state: 1},
////        {name: "wheel2x", parent: "num09", type: "once", interval_duration: 0, state: 1},
////        {name: "youtubecontent", parent: null, type: "interval", interval_duration: "604800", state: -1}
//        {name: "location", type: 1, interval_duration: "3600", state: 1},
//        {name: "laughing", type: 10, interval_duration: "3600", state: -1},
//        {name: "wallet", type: 1, interval_duration: 0, state: 1},
//        {name: "num09", type: 1, interval_duration: 0, state: 1},
////        {name: "wheel2x", type: "once", interval_duration: 0, state: 1},
//        {name: "youtubecontent", type: 10, interval_duration: "604800", state: -1}
//    ]




};

const TASK_STATE = Object.freeze({
    NOT_IMPORTANT: -1,
    OPEN: 1,
    DONE: 10
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
    LAST_YOUTUBE_CONTENT_LINK: "a5"
});
const MAX_CURRENT_TICKET = 5, ONE_DAY = 24 * 60 * 60 * 1000, ONE_WEEK = ONE_DAY * 7;

var systemJson = {
    voted_numbers: [{n: 83247696, w: 1, a: 1000000}, {n: 7832457, w: 4, a: 500000}, {n: 758435, w: 12, a: 250000}, {n: 57843, w: 54, a: 250000}, {n: 8753, w: 483, a: 250000}, {n: 487, w: 4332, a: 250000}, {n: 45, w: 43746, a: 250000}]
};

var laughingPrizeValue = 1000000, laughingDuration = 10, laughingBetweenTime = 1000 * 6 * 1, minimumLaughingPrize = 10000, startWheelMinuet = 0, endWheelMinuet = 59;

var tmaName = "topnft.top", tmaBotName = "topnftbot", userTgId = bigJson.user_tg_id, inviteGiftValue = Number("25000000").toLocaleString(),
        inviteThankyouGiftValue = Number("25000000").toLocaleString(), locationGiftValue = Number("50000000").toLocaleString(),
        lastLaughingTimeValue = Number(localStorage.getItem(LS_VAR.LAST_LAUGHING_TIME)) || 0,
        lastYoutubeContentLinkValue = Number(localStorage.getItem(LS_VAR.LAST_YOUTUBE_CONTENT_LINK)) || 0,
        previousPointValue = Number(localStorage.getItem(LS_VAR.PREVIOUS_POINT) || 0),
        wheelLastTimePlayedValue = new Date(Number(localStorage.getItem(LS_VAR.WHEEL_LAST_TIME_PLAYED)) || 0), myName = bigJson.my_name;
var inviteLink = "https://t.me/" + tmaBotName + "/" + userTgId;

if (!localStorage.getItem(LS_VAR.WHEEL_LAST_TIME_PLAYED)) {
    localStorage.setItem(LS_VAR.WHEEL_LAST_TIME_PLAYED, 0);
}









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
    image: './cdn/img/wheel/example-0-image.svg',
    overlayImage: './cdn/img/wheel/example-2-overlay.svg',
    items: [
//      {
//        label: 'Action',value:1000
//      },
    ]
};
