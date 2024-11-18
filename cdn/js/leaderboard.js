let leaderBoardDiv = $s("#leader_board_div");
if (bigJson.area) {
    fetch("cdn/area/" + bigJson.area + ".json")
            .then(a => {
                return a.json();
            })
            .then(b => {
                $s("#leaderboard_area p").innerText = b.area_name;
                if (b.list.length > 0) {
                    let c = 1;
                    b.list.forEach(a => {
                        leaderBoardDiv.insertAdjacentHTML('beforeend', '<div class="leader_person"><p># ' + c++ + '</p><div><span>' + a.name + '</span><div><img src="cdn/img/bonus.png"><span>' + Number(a.amount).toLocaleString() + '</span></div></div></div>');
                    });
                } else {

                }
            });
} else {
    $s("#leaderboard_area").classList.add(hidden);
    leaderBoardDiv.insertAdjacentHTML('beforeend', '<div id="leaderboard_not_joined"><h3 id="no_invite_yet">Oh! you have not joined to your city leaderboard yet! <br>go to task section and set your location and see your city leaderboard and yes get <img src="cdn/img/coin.svg"> ' + locationGiftValue + ' , you must be know someone in your city leaderboard</h3></div><br><div class="img_head"><span>first go to task menu</span><br><img src="cdn/img/2048.svg"><br><span>then done location task</span><br><img src="cdn/img/2048.svg"></div>');
    toast.info("you don't set location yet, please go to task section and set location ;)");
}