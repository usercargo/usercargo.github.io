
// var tonConnectBt = $s("#ton_con_bt");
walletInitTimeout = setTimeout(s => {
    if (!customElements.get("tc-root")) {
        // var tonConnectUI=null;
        // if(!tonConnectUI){
        tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://usercargo.github.io/cdn/ton_fest.json',
            //    buttonRootId: 'ton_con_bt'
            buttonRootId: null
        });
    }

    tonConnectUI.uiOptions = {
        twaReturnUrl: 'https://t.me/calinowenbot'
    };
    tonConnectUI.connectionRestored.then(restored => {
        afterWalletRestor(true);

        // tonConnectBt.onclick = () => {
            // disconnectWallet();
            // connectToWallet().catch(error => {
            //     console.error("Error connecting to wallet:", error);
            // });
        // };
        window.initTmaTonWallet();
        tonConnectRunLock = false;

    });
    window.afterWalletRestor = function (restored) {
        // console.log("setWalletBt >  tonConnectUI.connected:", tonConnectUI.connected);
        if (restored && tonConnectUI.connected && bigJson.walletNonBounceableAddr) {
            tonConnectBt.innerHTML = getWalletSmallAddress(bigJson.walletNonBounceableAddr) + "<br>change";
        } else {
            tonConnectBt.innerHTML = "connect<br>wallet";
        }
    }

    //tonConnectUI.uiOptions = {
    //    uiPreferences: {
    //        theme: THEME.DARK
    //    }
    //};

    async function connectToWallet() {
        var connectedWallet = await tonConnectUI.connectWallet();
        // Do something with connectedWallet if needed
        //*** remove testnet address in production 
        let hexRawWalletAddress = connectedWallet.account.address, nonBounceableWalletAddress, nonBounceableWalletTestAddress;
        if (hexRawWalletAddress.length > 5 && hexRawWalletAddress.startsWith("0:")) {
            nonBounceableWalletAddress = TON_CONNECT_UI.toUserFriendlyAddress(hexRawWalletAddress);
            nonBounceableWalletTestAddress = TON_CONNECT_UI.toUserFriendlyAddress(hexRawWalletAddress, 0);//0 in not test net

            sendPostData("/addwallet", { rawHex: hexRawWalletAddress, nonBounceable: nonBounceableWalletTestAddress });

        }

        console.log("hexRawWalletAddress:", hexRawWalletAddress, "bounceableWalletAddress:", nonBounceableWalletAddress, "bounceableWalletTestAddress:", nonBounceableWalletTestAddress);
        console.log(connectedWallet);

    }

    async function disconnectWallet() {
        console.log("disconnectWallet");
        if (tonConnectUI.connected) {
            await tonConnectUI.disconnect().then(() => {
                afterWalletRestor(true);
            }).catch(error => {
                console.error(error);
            });
        }
    }
    window.initTmaTonWallet = ()=>{
        disconnectWallet();
            connectToWallet().catch(error => {
                console.error("Error connecting to wallet:", error);
            });
    }
}, 4000);

// }

function addNewWallet(jsonData) {

    bigJson.walletNonBounceableAddr = jsonData.nonBounceableWalletAddr;
    bigJson.totalPoint = jsonData.totalPoint;
    if (jsonData.isNew) {
        toast.success("Your wallet address is saved and your total point is " + bigJson.totalPoint);
    } else {
        toast.success("Your wallet is changed");
    }
    window.afterWalletRestor(true);
    setTaskInit();
}