function addList() {
    const game_name = document.getElementById('game_title').value;

    const li = document.createElement("li");

    li.setAttribute('id', game_name);

    const textNode = document.createTextNode(game_name);
    li.appendChild(textNode);
    const buttonNode = document.cre
    li.appendChild()
    document.getElementById("game_list").appendChild(li)
}