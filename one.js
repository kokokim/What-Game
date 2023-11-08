const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
function init() {
    // do something
}

    extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    init();
});

function addList() {
    const game_name = document.getElementById('game_title').value;

    const li = document.createElement("li");

    li.setAttribute('id', game_name);

    const textNode = document.createTextNode(game_name);
    li.appendChild(textNode);
    document.getElementById("game_list").appendChild(li)
}