var inviteTextSimple = `
🎮 Join Me in Happy to being happy! 😍👍
    
Happy is for laughing, playing together, try your $1,000,000💵 chance and getting luxury expriences.
    
I've been enjoying Happy and thought you might like it too. Join me and let's earn extra rewards together. 
       
You will get:
    
 🎯50,000,000 point just for open this app. 
    
Let's Go 😜
`,
inviteTextEncoded = encodeURIComponent(inviteTextSimple),inviteLinkEncoded = encodeURIComponent(inviteLink);

$s("#invite_telegram").onclick = () => {
    window.Telegram.WebApp.openTelegramLink('https://t.me/share/url?url='+inviteLinkEncoded+'&text='+inviteTextEncoded);
};

$s("#invite_copy").onclick = () => {
    navigator.clipboard.writeText(inviteLink+inviteTextSimple+inviteLink);
    toast.success("the link is copied and ready to be sent to your friends");
};

createQrCode($s("#invite_qr_for_friends"), inviteLink, "white");

var recentFriendDiv = $s("#recent_friend");
if (bigJson.recentFriends.length > 0) {
    let time = new Date().getUTCTime();
    bigJson.recentFriends.forEach(a => {
        recentFriendDiv.insertAdjacentHTML('beforeend', '<div class="friend_person"><img src="'+getTgPicProfileAddressById(a.tgPicId,1)+'"><div><span>' + a.name + '</span><div><small>' + getDateDifferenceByDay(time, a.time) + ' ago</small></div></div></div>');
    });
} else {
    recentFriendDiv.insertAdjacentHTML('beforeend', '<h3 id="no_invite_yet">Oh! You don\'t have any friends yet. Invite someone and get ' + inviteThankyouGiftValue + ' as a gift, and give ' + inviteGiftValue + ' to your friend. Nice deal! :)</h3>');
}

$s("#my_invite_gift").innerText = bigJson.myInviteGift.toLocaleString();
$s("#friend_invite_gift").innerText = bigJson.myInviteGift.toLocaleString();

function destroyAction() {

}