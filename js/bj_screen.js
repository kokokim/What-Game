// bj_screen

const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    extensionSDK.broadcast.listen((action, message, fromId) =>
    {   
        if(action == "게임확인")
        {
            extensionSDK.broadcast.whisper(fromId, "game_list", send_list);
        }
    });
    //이게 실행해서 아프리카sdk사용을 위한 초기화가 진행되고 saveData가 실행됨
});

var tag_arr=[];
var gamename_arr=[];
let licount=0;


//버튼 클릭시 메뉴바 열림
const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");
      
selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});

var count=0;

items.forEach(item => {
    item.addEventListener("click", () => {

        const tag_check_box=item.querySelector('input');
        item.classList.toggle("checked");

        //css상 네모박스와 checkbox 연결
        if(tag_check_box.checked){
            tag_check_box.checked=false;
            
            //체크하고 다시 체크했을때 해당 value값을 배열에서 빼야함
            const indexToRemove=tag_arr.indexOf("#"+tag_check_box.value+"   ");
            if(indexToRemove!==-1){
                tag_arr.splice(indexToRemove, 1);
            }
            count--;
        }
        else{
            if(count<4){
                tag_check_box.checked=true;
                tag_arr.push("#"+tag_check_box.value+"   ");
                count++;
            }
            else{
                item.classList.remove("checked");
            }
        }
        updateButtonText();
    });
})


function toggleTextbox(obj)
{
    const checkbox = obj.children;
    const game_title_box = document.getElementById('game_title');
    var count = 0;
    for(var i = 0; i< checkbox.length; i++)
    {
        if(checkbox[i].attributes.class.nodeValue == "item checked")
        {
            count++;
        }
    }
    game_title_box.disabled = count ? 0 : !0;
    if(game_title_box.disabled)
    {
        game_title_box.value = null;
    }
    else{
        game_title_box.focus();
    }
}

function delete_list(event){
    console.dir(event.target.parentNode);
    const li = event.target.parentNode;
    li.remove();
    licount--;
}

function check_false(event){
    const li = event.target.attributes.for.nodeValue;
    const radiobuttonfalse = document.getElementById(li);
    radiobuttonfalse.checked = false;
}

function addList() {
    const game_name = document.getElementById('game_title').value; //게임명

    const timestamp = new Date().getTime();
    const rdiobuttonId = "Game_Check_" + timestamp;
    //태그 없거나 게임 이름이 적혀있지 않는다면 다시 가서 입력
    if(licount<4){
        licount++;
    }
    else{
        const checkboxes=document.getElementsByName('tag');
        checkboxes.forEach((checkbox)=>{
            checkbox.checked=false;

            const item=checkbox.closest('.item');
            if(item){
                item.classList.remove("checked");
            }
        });
        selectBtn.classList.remove("open");
        count=0;
        updateButtonText();
        document.getElementById('game_title').value = '';
        tag_arr=[];
        return;
    }

    const radiobutton = document.createElement('input');
    radiobutton.className = "tgl tgl-skewed";
    radiobutton.name = "switch";
    radiobutton.type = "radio";
    radiobutton.id = rdiobuttonId;

    const togglelabel = document.createElement("label");
    togglelabel.className = "tgl-btn";
    togglelabel.setAttribute('data-tg-off', "OFF");
    togglelabel.setAttribute('data-tg-on', "ON");11
    togglelabel.setAttribute('for', rdiobuttonId);
    togglelabel.addEventListener("dblclick", (check_false));

    const li = document.createElement("li");
    li.id="gameinfo_list";
    const Delete_button = document.createElement('input');
    Delete_button.type = "button";
    Delete_button.value = "✕";
    Delete_button.id = "delete_list";
    Delete_button.addEventListener("click", (delete_list));

    const img = document.createElement('img');
    img.setAttribute('id', 'img');

    img.src='pic/aficon.gif';
    
    const tagNode=document.createElement('span');
    tagNode.setAttribute('id', 'add_tag');
    tagNode.appendChild(document.createTextNode(tag_arr.join(' ')));

    const textNode = document.createElement('span');
    textNode.setAttribute('id', 'add_gamename')
    textNode.appendChild(document.createTextNode(game_name)); // 게임명 값 설정

    li.appendChild(Delete_button);
    li.appendChild(img);
    li.appendChild(textNode);
    li.appendChild(radiobutton);
    li.appendChild(togglelabel);
    li.appendChild(tagNode);

    document.getElementById("what_game_list").appendChild(li);

    //체크박스 모두 체크 취소 및 text값 안의 입력값 삭제
    const checkboxes=document.getElementsByName('tag');
    checkboxes.forEach((checkbox)=>{
        checkbox.checked=false;

        const item=checkbox.closest('.item');
        if(item){
            item.classList.remove("checked");
        }
    });
    selectBtn.classList.remove("open");
    count=0;
    updateButtonText();
    document.getElementById('game_title').value = '';
    tag_arr=[];
}

function updateButtonText(){
    let btnText=document.querySelector(".btn-text");
    if(count>0){
        btnText.innerText=`${count}개 선택`;
    }
    else{
        btnText.innerText="태그를 선택하세요"
    }
}

function saveData(){

    const alldiv = document.getElementById('what_game_list');
    const content = alldiv.getElementsByTagName('li');

    var send_list = [];
    //태그와 게임이름 체크상태를 send_list에 객체로 생성하고 보냄
    for(let i=0; i < content.length; i++)
    {
        const list = content[i].childNodes;
        send_list.push({
            tag: list[5].innerText,
            name: list[2].innerText,
            check: list[3].checked
        });
    }
    extensionSDK.broadcast.send("game_list", send_list);
}
// extensionSDK.broadcast.listen((action, message, fromId) =>
// {
//     if(action == "출석체크")
//     {
//         extensionSDK.broadcast.whisper(fromId, game_list, send_list);
//     }
// });

