
const SDK = window.AFREECA.ext;
const extensionSDK = SDK();

var listen_data;
//sdk를 초기화하고 bj가 보낸 데이터를 수신
extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    extensionSDK.broadcast.listen(function(action, message) {
        listen_data = message;
        reload_game_list(listen_data);
        console.log(listen_data);
    });
});
function reload_game_list(listen_data){

    const gameList = document.getElementById("gameinfo_list");
    console.log(gameList);

    if(gameList != null)
    {
        gameList.remove();   
    }
    
    for(let i = 0; i<listen_data.length; i++)
    {
        const timestamp = new Date().getTime();
        const rdiobuttonId = "Game_Check_" + timestamp;

        const radiobutton = document.createElement('input');
        radiobutton.className = "tgl tgl-skewed";
        radiobutton.name = "switch";
        radiobutton.type = "radio";
        radiobutton.checked = listen_data[i].check;
        radiobutton.id = rdiobuttonId;
        radiobutton.disabled = true;

        const togglelabel = document.createElement("label");
        togglelabel.className = "tgl-btn";
        togglelabel.setAttribute('data-tg-off', "OFF");
        togglelabel.setAttribute('data-tg-on', "ON");
        togglelabel.setAttribute('for', rdiobuttonId);

        const li = document.createElement("li");
        li.id="gameinfo_list";

        const img = document.createElement('img');
        img.setAttribute('id', 'img');

        img.src='pic/2b2b2b.png';
        img.alt='임시이미지다';
        
        /*const tag = document.createTextNode(listen_data[i].tag);
        const name = document.createTextNode(listen_data[i].name);
        //const check = listen_data[i].check;
        console.log(tag, name, check);*/

        /*if(check == true)
        {
            onoffNode.checked = true;
        }
        else
        {
            onoffNode.checked = false;
        }*/
        const tagNode = document.createElement('span');
        tagNode.setAttribute('id', 'add_tag');

        tagNode.appendChild(document.createTextNode(listen_data[i].tag));

        const textNode = document.createElement('span');
        textNode.setAttribute('id', 'add_gamename')
        textNode.appendChild(document.createTextNode(listen_data[i].name)); // 게임명 값 설정

        li.appendChild(img);
        li.appendChild(textNode);
        li.appendChild(radiobutton);
        li.appendChild(togglelabel);
        li.appendChild(tagNode);

        document.getElementById("what_game_list").appendChild(li);
    }
}

function testList(){

    const timestamp = new Date().getTime();
        const rdiobuttonId = "Game_Check_" + timestamp;

        const radiobutton = document.createElement('input');
        radiobutton.className = "tgl tgl-skewed";
        radiobutton.name = "switch";
        radiobutton.type = "radio";
        radiobutton.checked = false;
        radiobutton.id = rdiobuttonId;
        radiobutton.disabled = true;

        const togglelabel = document.createElement("label");
        togglelabel.className = "tgl-btn";
        togglelabel.setAttribute('data-tg-off', "OFF");
        togglelabel.setAttribute('data-tg-on', "ON");
        togglelabel.setAttribute('for', rdiobuttonId);
        // togglelabel.disabled = true;

        const li = document.createElement("li");
        li.id="gameinfo_list";

        const img = document.createElement('img');
        img.setAttribute('id', 'img');

        img.src='pic/2b2b2b.png';
        img.alt='임시이미지다';

        const tagNode = document.createElement('span');
        tagNode.setAttribute('id', 'add_tag');

        tagNode.appendChild(document.createTextNode("#가족 #액션"));

        const textNode = document.createElement('span');
        textNode.setAttribute('id', 'add_gamename')
        textNode.appendChild(document.createTextNode("게임이름테스트다")); // 게임명 값 설정

        li.appendChild(img);
        li.appendChild(textNode);
        li.appendChild(radiobutton);
        li.appendChild(togglelabel);
        li.appendChild(tagNode);

        document.getElementById("what_game_list").appendChild(li);
}