document.body.addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.classList.contains('num_click')) {
        setNumberToFlowNumber(event.target);
    }
});
function setNumberToFlowNumber(elem) {
    let e = elem.closest(".flow_num"), c = Number(e.querySelector(".num_value").innerText), isPlue = elem.classList.contains("num_plus");
    e.querySelector(".num_value").innerText = isPlue && c < 9 ? ++c : (!isPlue && c > 0 ? --c : c);
}
function setRandomFlowNumber(parentElem) {
    parentElem.querySelectorAll(".num_value").forEach(a => {
        a.innerText = Math.floor(Math.random() * 10);
    })
}



setRandomFlowNumber($s("#new_ticket"));