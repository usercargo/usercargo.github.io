
$s("#invite_telegram").onclick = () => {
    window.open("https://t.me/share?text=Hey friend I invite you to get 25,000,000 in XOXcoin and win big prizes&url=" + inviteLink, "_blank");
};

$s("#invite_copy").onclick = () => {
    navigator.clipboard.writeText("https://t.me/share?text=Hey friend I invite you to get 25,000,000 in XOXcoin and win big prizes&url=" + inviteLink, "_blank");
    toast.success("link is copied and ready to send it to your friends");
};

createQrCode($s("#invite_qr"), inviteLink, "white");

    
    
    let recentFriendDiv = $s("#recent_friend");
if (bigJson.recent_friends.length > 0) {
    let time = new Date().getUTCTime();
    bigJson.recent_friends.forEach(a => {
        recentFriendDiv.insertAdjacentHTML('beforeend', '<div class="friend_person"><img src="cdn/img/wheel.png"><div><span>' + a.name + '</span><div><small>' + getDateDifferenceByDay(time, a.time) + ' ago</small></div></div></div>');
    });
} else {
    recentFriendDiv.insertAdjacentHTML('beforeend', '<h3 id="no_invite_yet">Oh! you have not any friend yet, invite someone & get <img src="cdn/img/coin.svg"> ' + inviteThankyouGiftValue + ' as thank you gift & give <img src="cdn/img/coin.svg"> ' + inviteGiftValue + ' to your friend, nice deal :)</h3>');
}

$s("#my_invite_gift").innerText=bigJson.my_invite_gift.toLocaleString();
$s("#friend_invite_gift").innerText=bigJson.friend_invite_gift.toLocaleString();