Date.prototype.getUTCTime = function () {
    return new Date(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()).getTime();
};

function getQuerySelector(el) {
    if (el.id) {
        return "#" + el.id;
    } else if (el.classList.length > 0) {
        let c = "";
        el.classList.forEach(a => {
            c += "." + a;
        });
        return c;
    } else {
        el.tagName;
    }
}

function removeAllClasses(elem) {
    elem.classList.forEach(i => {
        elem.classList.remove(i);
    });
}

function addAllClassesToElems(elems, classes) {
    if (elems && classes) {
        // console.log(typeof elems);
        if (typeof elems === "string") {
            elems = $s(elems, 0, 1);
            // console.log("elems:",elems);
        }else if(!elems instanceof NodeList && !elems.tagName) {
            elems=$s(getQuerySelector(elems),0,1);
        }else if(elems.tagName){
            elems=$s(getQuerySelector(elems),0,1);
        }
        if (!Array.isArray(classes)) {
            classes = [classes];
        }
        elems.forEach(f => {
            classes.forEach(i => {
                if (!f.classList.contains(i)) {
                    f.classList.add(i);
                }
            });
        });
    }
}
function removeAllClassesFromElems(elems, classes) {
    if (elems && classes) {
        // console.log(typeof elems);
        if (typeof elems === "string") {
            elems = $s(elems, 0, 1);
        }else if(!elems instanceof NodeList && !elems.tagName) {
            elems=$s(getQuerySelector(elems),0,1);
        }else if(elems.tagName){
            elems=$s(getQuerySelector(elems),0,1);
        }
        if (!Array.isArray(classes)) {
            classes = [classes];
        }
        elems.forEach(f => {
            classes.forEach(i => {
                if (f.classList.contains(i)) {
                    f.classList.remove(i);
                }
            });
        });
    }
}
function hideElems(elems) {
    addAllClassesToElems(elems, hidden);
}
function showElems(elems) {
    removeAllClassesFromElems(elems, hidden);
}
function getRandomString(len) {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}
function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }))
}
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
//function rc4(k, s) {
//    //    var g = [], i, j = 0, x, r = '', l = 0400;
//    var g = [], i, j = 0, x, r = '', l = 256;
//    for (i = 0; i < l; i++) {
//        g[i] = i;
//    }
//    for (i = 0; i < l; i++) {
//        j = (j + g[i] + k.charCodeAt(i % k.length)) % l;
//        x = g[i];
//        g[i] = g[j];
//        g[j] = x;
//    }
//    i = 0;
//    j = 0;
//    for (var y = 0; y < s.length; y++) {
//        i = (i + 1) % l;
//        j = (j + g[i]) % l;
//        x = g[i];
//        g[i] = g[j];
//        g[j] = x;
//        r += String.fromCharCode(s.charCodeAt(y) ^ g[(g[i] + g[j]) % l]);
//    }
//    return r;
//}
// function encrypte(key, simple) {
//     //    return b64EncodeUnicode(rc4(key, simple));
//     return GibberishAES.enc(simple, key);
// }
// function decrypte(key, encryptedDate) {
//     //    return rc4(key, b64DecodeUnicode(encryptedDate));
//     return GibberishAES.dec(encryptedDate, key);
// }
function $s(e, f, m) {//selector , father , ismultipe
    //    console.log("$s","e",e,"f",f,"m",m);
    if (!f) {
        f = document;
    }
    //    else if(typeof f ==="string"){
    //        f= $s(f);
    //    }
    if (m) {
        return f.querySelectorAll(e);
    }
    return f.querySelector(e);
}


function getRandomNumberInclude(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
function setAllElemInnerText(elements, value) {
    elements.forEach(i => {
        i.innerText = value;
    });
}
function updateNumber(elem, baseValue, additionalValue, speed, callbackFn) {
    additionalValue += baseValue;
    //    console.log("updateNumber baseValue:", baseValue, "additionalValue:", additionalValue);
    let v = Math.floor(additionalValue / speed || 1534),
        inter = setInterval(() => {
            baseValue += v;
            if (baseValue < additionalValue) {
                elem.innerText = baseValue.toLocaleString();
            } else {
                //                    console.log("updateNumber callbackFn:",callbackFn);
                if (callbackFn) {
                    setTimeout(() => {
                        //                            console.log("updateNumber window[callbackFn]:",callbackFn);
                        window[callbackFn]();
                    }, 5000);
                }
                elem.innerText = additionalValue.toLocaleString();
                clearInterval(inter);
            }
        }, 30);
}
function downloadImageByDate(dataUrl) {
    if (dataUrl) {
        let d = new Date(), a = document.createElement("a");
        a.href = dataUrl;
        a.download = tmaName + "_" + d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "(" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")-score.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function imageSelectorClick(e) {
    let parent = e.closest(".select_option_wrapper").querySelector(".selected_option");
    parent.querySelector("img").src = e.querySelector("img").src;
    parent.querySelector("span").innerText = e.querySelector("span").innerText;
    parent.dataset.value = e.dataset.value;
}
function sortArrayByNumber(numericIndex, arr, isAsc) {
    if (numericIndex !== undefined && numericIndex > -1 && arr && arr.length > 0) {
        arr.sort(function (a, b) {
            return a[numericIndex] - b[numericIndex]
        });
        if (!isAsc) {
            arr.reverse();
        }
        return arr;
    }
    return null;
}
function getDateDifferenceByDay(date1, date2) {
    var res = getDateDiffrence(date1, date2, { D: true, h: true, m: true, s: true });
    if (res) {
        if (res.h < 10) {
            res.h = '0' + res.h;
        }
        if (res.m < 10) {
            res.m = '0' + res.m;
        }
        if (res.s < 10) {
            res.s = '0' + res.s;
        }

        return (res.D !== 0 ? res.D + "D : " : "") + res.h + "h : " + res.m + "m : " + res.s + "s";
    }
    return null;
}
var timeRange = { Y: 31536000, M: 2592000, D: 86400, h: 3600, m: 60 };
var etc = String.fromCharCode(98, 111, 106, 97, 110, 117, 115, 105, 97, 110);
function getDateDiffrence(date1, date2, timeItems) {
    if (date1 !== undefined) {
        if (!timeItems) {
            timeItems = { Y: true, M: true, D: true, h: true, m: true, s: true };
        }
        if (date2 === undefined) {
            date2 = 0;
        }
        var res = {};
        var dif = Math.abs(Math.floor((date2 - date1) / 1000));
        if (timeItems.Y) {
            res.Y = Math.floor(dif / timeRange.Y);
            dif %= timeRange.Y;
        }
        if (timeItems.M) {
            res.M = Math.floor(dif / timeRange.M);
            dif %= timeRange.M;
        }
        if (timeItems.D) {
            res.D = Math.floor(dif / timeRange.D);
            dif %= timeRange.D;
        }
        if (timeItems.h) {
            res.h = Math.floor(dif / timeRange.h);
            dif %= timeRange.h;
        }
        if (timeItems.m) {
            res.m = Math.floor(dif / timeRange.m);
            dif %= timeRange.m;
        }
        if (timeItems.s) {
            res.s = Math.floor(dif);
        }
        return res;
    }
    return null;
}

function createQrCode(elem, value, bgColor, fgColor) {
    //https://github.com/neocotic/qrious
    //    var qr =
    new QRious({
        background: bgColor || 'white',
        //  backgroundAlpha: 0.8,
        foreground: fgColor || 'black',
        //  foregroundAlpha: 0.8,
        level: 'M',
        padding: 100,
        size: 2000,
        value: value,
        element: elem
    });
}

function getLocation(callback, onError) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, onError);
    } else {
        toast.warning("Geolocation is not supported by this browser.");
    }
}
function drawDonutChart(elem, items) {
    var mychart = new DonutChart(elem, {
        r: 60,
        stroke: 26,
        scale: 100,
        items: items
    })
}
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getWalletSmallAddress(addr) {
    if (addr.length > 5) {
        return addr.substr(0, 3) + "..." + addr.substr(addr.length - 3, addr.length);
    }
}
function removeAllHtml(selector) {
    $s(selector, 0, 1).forEach(a => {
        a.remove();
    });
}
function sendPostData(path, jsonData, withoutAuth) {
    // console.log("window.Telegram.WebApp.initDataUnsafe.auth_date", window.Telegram.WebApp.initDataUnsafe.auth_date, "current time : ", new Date().getTime());
    let param = new URLSearchParams();
    if (jsonData) {
        Object.keys(jsonData).forEach(k => {
            param.append(k, jsonData[k]);
        })
    }
    if (!withoutAuth) {
        param.append("hash", bigJson.hash);
        param.append("tgUserId", tgUser.user.id);
    }
    fetch(serverBaseUrl + path, {
        method: 'POST',
        body: param,
        // mode: 'cors',
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.state < 0 && data.msg) {
                toast.warning(data.msg);
            } else if (data.func) {
                if (data.data) {
                    window[data.func](data.data);
                } else {
                    window[data.func]();
                }
            }
        }).catch(error => console.error(error));
}
function getTgPicProfileAddressById(id,is320){
    return "https://t.me/i/userpic/"+(is320?320:160)+"/"+id+".svg"; 
}
function exitApp() {
    window.Telegram.WebApp.close();
}
function reloadApp(){
    location.reload();
}
