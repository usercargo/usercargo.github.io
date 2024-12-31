var leaderBoardDiv = $s("#leader_board_div");
if (bigJson.areaId) {
    fetch(staticServerBaseUrl+"leaderboard/" + bigJson.areaId + ".json")
            .then(a => {
                return a.json();
            }).then(b => {
                $s("#leaderboard_area p").innerText = b.areaName;
                if (b.list.length > 0) {
                    let c = 1;
                    b.list.forEach(a => {
                        leaderBoardDiv.insertAdjacentHTML('beforeend', '<div class="leader_person"><p># ' + c++ + '</p><div><div id="leaderboard_name"><img src="'+getTgPicProfileAddressById(a.picId)+'"><span>' + a.name + '</span></div><div><span>' + Number(a.point).toLocaleString() + '</span></div></div></div>');
                    });
                } else {

                }
            }).catch(e=>{
                console.error(e);
            });
} else {
    $s("#leaderboard_area").classList.add(hidden);
    leaderBoardDiv.insertAdjacentHTML('beforeend', '<div id="leaderboard_not_joined"><h3 id="no_invite_yet">Oh! you have not set the location task yet! <br>go to task section and set your location and see your city leaderboard and yes get ' + locationGiftValue + ' points too, you must be know someone in your city leaderboard</h3></div><br><div class="img_head"><span>first go to task menu</span><br><img src="cdn/img/task2.svg"><br><span>then set location</span><br><img src="cdn/img/location2.svg"></div>');
    toast.info("you don't set location yet, please go to task section and set location and come back here ;)");
}
function destroyAction() {
 
}