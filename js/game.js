// bj_screen
let tag_result=''; //태그 데이터
let game_result='';

function choosetag(){
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
        //해당 체크박스 취소 코드 짜야함 (안짜져요.. checked=false가 없어!!!!!)
        
        
    }

    // 출력
    document.getElementById('result').innerText = result;
    alert(result); //체크된 값 들어가있음
    tag_result=result;
}




function addList() {
    tag_result='';
    const game_name = document.getElementById('game_title').value; //게임명
    tag_result=game_name;
    
    const li = document.createElement("li");

    li.setAttribute('tag', tag_result);
    li.setAttribute('id', game_name);
    

    const tagNode = document.createTextNode(tag_result);
    const textNode = document.createTextNode(game_name);

    li.appendChild(tagNode);
    li.appendChild(textNode);

    document.getElementById("tag_list").appendChild(li)
    document.getElementById("game_list").appendChild(li)

    //체크박스 모두 체크 취소 및 text값 안의 입력값 삭제
    //체크박스 모두 체크 취소 좀 짜줘요!!!
    document.getElementById('game_title').value = '';

}

function saveData(){
    //save버튼 클릭시 user_screen에 표시
}

const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
function init() {
    // do something
}

extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    init();
});