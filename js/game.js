// bj_screen
let tag_result=''; //태그 데이터

var tag_arr=[];
var gamename_arr=[];

function choosetag(obj){
    tag_result='';
    var count=0;
    // 선택된 목록 가져오기
    const query = 'input[name="tag"]:checked';
    const selectedEls = document.querySelectorAll(query);


    // 선택된 목록에서 value 찾기
    let result = '';
    selectedEls.forEach((el) => {
        result += el.value + '';
        count++;
    });
    if(count>3){
        alert("3개 이상 체크됨");
        obj.checked=false;
        result=result.pop();
        
    }

    // 출력
    // document.getElementById('result').innerText = result;
    // alert(result); //체크된 값 들어가있음
    tag_result=result;
    tag_arr.push(result);
}

function addList() {
    const game_name = document.getElementById('game_title').value; //게임명
    const onoffNode = document.createElement('input');
    onoffNode.name = "switch";
    onoffNode.type = 'radio';
    onoffNode.id = 'Game_Check';
    
    const li = document.createElement("li");

    li.setAttribute('tag', tag_result);
    li.setAttribute('id', game_name);
    
    const tagNode = document.createTextNode(tag_result);
    const textNode = document.createTextNode(game_name);

    li.appendChild(tagNode);
    li.appendChild(textNode);
    li.appendChild(onoffNode);

    document.getElementById("game_list").appendChild(li);

    //체크박스 모두 체크 취소 및 text값 안의 입력값 삭제
    const checkboxes=document.getElementsByName('tag');
    checkboxes.forEach((checkbox)=>{
        checkbox.checked=false;
    })
    document.getElementById('game_title').value = '';
    tag_result = '';
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

