// bj_screen
function choosetag(){
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
        //해당 체크박스 취소 코드 짜야함
        
    }

    // 출력
    document.getElementById('result').innerText = result;
    alert(result); //체크된 값 들어가있음

}



function addList() {
    const game_name = document.getElementById('game_title').value;

    const li = document.createElement("li");

    li.setAttribute('id', game_name);

    const textNode = document.createTextNode(game_name);
    li.appendChild(textNode);

    document.getElementById("game_list").appendChild(li)
}

const SDK = window.AFREECA.ext;
const extensionSDK = SDK();
function init() {
    // do something
}

extensionSDK.handleInitialization((userInfo, broadInfo, playerInfo) => {
    init();
});