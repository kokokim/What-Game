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
        result += el.value + ' ';
        count++;
    });
    if(count>3){
        alert("3개 이상 체크됨");
        obj.checked=false;
        result=result.pop();
        
    }

    // 출력
    // document.getElementById('result').innerText = result;
    alert(result); //체크된 값 들어가있음
    tag_result=result;
    tag_arr.push(result);
}

function addList() {
    const game_name = document.getElementById('game_title').value; //게임명
    gamename_arr.push(game_name);
    const onoffNode = document.createElement('input');
    onoffNode.type = 'checkbox';
    onoffNode.id = 'game_check';
    onoffNode.onclick = onoff_check;


    const li = document.createElement("li");

    li.setAttribute('tag', tag_result);
    li.setAttribute('id', game_name);
    li.setAttribute('check', onoffNode);
    

    const tagNode = document.createTextNode(tag_result);
    const textNode = document.createTextNode(game_name);

    li.appendChild(tagNode);
    li.appendChild(textNode);
    li.appendChild(onoffNode);

    document.getElementById("tag_list").appendChild(li);
    document.getElementById("game_list").appendChild(li);
    document.getElementById("game_onoff").appendChild(li);

    //체크박스 모두 체크 취소 및 text값 안의 입력값 삭제
    const checkboxes=document.getElementsByName('tag');
    checkboxes.forEach((checkbox)=>{
        checkbox.checked=false;
    })
    document.getElementById('game_title').value = '';
    tag_result = '';
}

function saveData(){
    //save버튼 클릭시 user_screen에 표시
    alert(tag_arr);
    alert(gamename_arr);

    localStorage.setItem("tag", tag_arr);
    localStorage.setItem("gamename", gamename_arr);

    //이코드는 bj 페이지에서 user 페이지로 이동하면서 새로고침해줌... bj페이지를 냅두면서 user 페이지를 새로고침해야함...
    // window.location.href="user_screen.html";



}

function onoff_check(){
    alert("성공?")
}

const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
function init() {
    // do something
}


extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    init();
});