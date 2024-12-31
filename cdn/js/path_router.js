var head = $s("head"), middleDiv = $s(".middle"), tempoJs = $s("#tempo_js"), currentTemplate = "";
var pages = {
    home: {
        css: ["cdn/css/hand_clock.css", "cdn/css/home.css"],
        html: [["home.html", [[".middle", ".middle"]]]],
        js: ["cdn/js/fireworks.js"/*,"cdn/js/gibberish-aes-1.0.0.min.js"*/, "cdn/js/html2canvas.min.js", "cdn/js/constants.js", "cdn/js/spin-wheel-esm.js", "cdn/js/util.js", "cdn/js/qrious.min.js", "cdn/js/html5-qrcode.min.js", "cdn/js/jsQR.js"/*, "cdn/js/winbox.bundle.min.js"*/, "cdn/js/home.js", ""]
    },
    numbers: {
        css: ["cdn/css/numbers.css"],
        html: [["numbers.html", [[".middle", ".middle"]]]],
        js: ["cdn/js/numbers.js"]
    },
    friends: {
        css: ["cdn/css/friends.css"],
        html: [["friends.html", [[".middle", ".middle"]]]],
        js: ["cdn/js/qrious.min.js", "cdn/js/friends.js"]
    },
    leaderboard: {
        css: ["cdn/css/leaderboard.css"],
        html: [["leaderboard.html", [[".middle", ".middle"]]]],
        js: ["cdn/js/leaderboard.js"]
    },
    task: {
        css: ["cdn/css/task.css","cdn/css/ton.css"],
        html: [["task.html", [[".middle", ".middle"]]]],
        js: [/*"cdn/js/tonconnect-sdk.min.js", "cdn/js/tonconnect-ui.min.js", "cdn/js/donut_chart.js", "cdn/js/winbox.bundle.min.js", "cdn/js/audio_recorder.js", "cdn/mood/essentia-wasm.web.js", "cdn/mood/essentia.js-core.js", ["cdn/mood/main.js", "module", "async", "defer"],*/ "cdn/js/task.js"]
    },
    voice: {
        css: ["cdn/css/voice.css"],
        html: [["voice.html", [[".middle", ".middle"]]]],
        js: ["cdn/js/audio_recorder.js", "cdn/js/voice.js"]
    },
    laughing_lib:{
        css: [],
        html: [],
        js: ["cdn/js/donut_chart.js","cdn/js/audio_recorder.js", "cdn/mood/essentia-wasm.web.js", "cdn/mood/essentia.js-core.js", ["cdn/mood/main.js", "module", "async", "defer"], "cdn/js/task_laughing.js"]
    
    },
    ton_lib:{
        css: [],
        html: [],
        js: ["cdn/js/tonconnect-sdk.min.js", "cdn/js/tonconnect-ui.min.js", "cdn/js/task_ton.js"]
    
    },
    temp: {
        css: [""],
        html: [[".html", [[".middle", ".middle"]]]],
        js: [""]
    }
}

// var testDoc;

function clearTemplate() {
    resetChildAction();
    middleDiv.innerHTML = "";
    removeAllHtml(".tempo_css");
    tempoJs.innerHTML = "";
}
function setJsTempo(page) {
    if (page.js && page.js.length > 0) {
        for (var f = 0; f < page.js.length; f++) {
            var s = document.createElement("script");
            let js = page.js[f];
            if (typeof js === "string") {
                s.src = page.js[f];
            } else {
                s.src = page.js[f][0];
                if (page.js[f][1] === "module") {
                    s.type = "module";
                }
                for (let r = 2; r < page.js[f].length; r++) {
                    s.setAttribute(page.js[f][r], true);
                }

            }


            // $("head").append(s);
            tempoJs.appendChild(s);
            // tempoJs.insertAdjacentHTML('beforeend', '<script src="' + page.js[f] + '"></script>');
        }
    }
}
function setTemplate(name) {
    if (name !== currentTemplate) {
        currentTemplate = name;
        var page = pages[name];
        console.log("page", page);
        if (page) {

            clearTemplate();

            if (page.css && page.css.length > 0) {
                for (var f = 0; f < page.css.length; f++) {
                    head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" type="text/css" href="' + page.css[f] + '" class="tempo_css"/>');
                }
            }

            if (page.html && page.html.length > 0) {
                var elem;
                page.html.forEach(e => {
                    console.log("foreach e:", e);
                    fetch(e[0])
                        .then(b => { return b.text() })
                        .then(b => {
                            const parser = new DOMParser()

                            // Parse the text
                            const doc = parser.parseFromString(b, "text/html")

                            // You can now even select part of that html as you would in the regular DOM
                            // Example:
                            // const docArticle = doc.querySelector('article').innerHTML

                            // console.log("doc: ", doc)
                            // testDoc = doc;
                            // console.log("then b:", b);
                            // elem = document.createElement("html");
                            // elem.innerHTML = b;
                            e[1].forEach(d => {
                                console.log("d:", d);
                                document.querySelector(d[1]).innerHTML = doc.querySelector(d[0]).innerHTML;
                            });
                            setJsTempo(page);
                        }).catch(err => {
                            toast.danger("can not to get data, please check your internet connection");
                        });
                });
            } else {
                setJsTempo(page);
            }
        }
    }
}
function resetChildAction() {
    console.log("resetChildAction called");
    if (typeof destroyAction === "function") {
        destroyAction();
    }
    // hideBodyScrollBar();
}

