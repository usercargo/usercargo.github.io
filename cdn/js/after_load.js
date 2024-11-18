let tgUser = window.Telegram.WebApp.initDataUnsafe.user;
if(tgUser){
    $s("#my_pic").src=tgUser.photo_url;
    $s("#my_name").innerText=tgUser.first_name+" "+tgUser.last_name;
}