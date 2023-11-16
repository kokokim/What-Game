// bj_screen
var tag_arr=[];
var gamename_arr=[];


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
        // alert(check_text.value);

        //css상 네모박스와 checkbox 연결
        if(tag_check_box.checked){
            tag_check_box.checked=false;
            
            alert("체크안됨");
            //체크하고 다시 체크했을때 해당 value값을 배열에서 빼야함
            const indexToRemove=tag_arr.indexOf(tag_check_box.value);
            if(indexToRemove!==-1){
                tag_arr.splice(indexToRemove, 1);
            }
            count--;
        }
        else{
            if(count<3){
                tag_check_box.checked=true;
                alert("체크됨");
                tag_arr.push(tag_check_box.value);
                count++;
            }
            else{
                alert("3개 이상 체크됨. 더이상 체크 불가");
                item.classList.remove("checked");
            }
        }
        alert(tag_arr);

        updateButtonText();
    });
})



function addList() {
    const game_name = document.getElementById('game_title').value; //게임명
    const onoffNode = document.createElement('input');
    onoffNode.name = "switch";
    onoffNode.type = 'radio';
    onoffNode.id = 'Game_Check';

    const li = document.createElement("li");

    li.setAttribute('tag', tag_arr);
    li.setAttribute('id', game_name);
    
    const tagNode = document.createTextNode(tag_arr);
    const textNode = document.createTextNode(game_name);

    li.appendChild(tagNode);
    li.appendChild(textNode);
    li.appendChild(onoffNode);

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
        btnText.innerText=`${count} Selected`;
    }
    else{
        btnText.innerText="Select Tags"
    }
}




const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
function saveData(){

    const alldiv = document.getElementById('list');
    const content = alldiv.getElementsByTagName('li');
    var send_list = [];
    //태그와 게임이름 체크상태를 send_list에 객체로 생성하고 보냄
    for(let i=0; i < content.length; i++)
    {
        console.log("반복문 돔");
        send_list.push({
            tag: content[i].getAttribute('tag'),
            name: content[i].getAttribute('id'),
            check: content[i].firstElementChild.checked
        })
    }
    console.log("반복문끝");
    extensionSDK.broadcast.send('game_list', send_list);
    }
extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    console.log(send_list);
    saveData();
    //이게 실행해서 아프리카sdk사용을 위한 초기화가 진행되고 saveData가 실행됨
});

