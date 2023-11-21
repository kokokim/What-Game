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
            
            // alert("체크안됨");
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
                tag_arr.push("#"+tag_check_box.value);
                count++;
            }
            else{
                alert("3개 이상 체크됨. 더이상 체크 불가");
                item.classList.remove("checked");
            }
        }
        // alert(tag_arr);

        updateButtonText();
    });
})

function delete_list(event){
    console.dir(event.target.parentNode);
    const li = event.target.parentNode;
    li.remove();
}

function check_false(event){
    const li = event.target.parentNode.firstElementChild;
    // console.log(li);
    li.checked = false;
    // console.log(li.checked);
}

function addList() {
    const game_name = document.getElementById('game_title').value; //게임명
    const onoffNode = document.createElement('input');
    // onoffNode.setAttribute('id', 'onoffbtn');
    onoffNode.name = "switch";
    onoffNode.type = 'radio';
    onoffNode.id = 'Game_Check';
    // onoffNode.ondblclick= check_false(this);
    onoffNode.addEventListener("dblclick", (check_false));

    const li = document.createElement("li");
    const img = document.createElement('img');
    img.setAttribute('id', 'img');

    img.src='data:image/jpeg;base64,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';
    img.alt='임시 이미지다';
    
    const tagNode=document.createElement('span');
    tagNode.setAttribute('id', 'add_tag');
    tagNode.appendChild(document.createTextNode(tag_arr.join(' ')));

    const textNode = document.createElement('span');
    textNode.setAttribute('id', 'add_gamename')
    textNode.appendChild(document.createTextNode(game_name)); // 게임명 값 설정


    li.appendChild(img);
    li.appendChild(textNode);
    li.appendChild(onoffNode);
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
        // console.log("반복문 돔");
        send_list.push({
            tag: content[i].getAttribute('tag'),
            name: content[i].getAttribute('id'),
            check: content[i].firstElementChild.checked
        })
    }
    // console.log("반복문끝");
    extensionSDK.broadcast.send('game_list', send_list);
    }
extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    console.log(send_list);
    saveData();
    //이게 실행해서 아프리카sdk사용을 위한 초기화가 진행되고 saveData가 실행됨
});

