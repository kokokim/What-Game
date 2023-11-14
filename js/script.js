
const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});


items.forEach(item => {
    var count=0;
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        if(item.querySelector('input').checked){
            item.querySelector('input').checked=false;
        }
        else{
            item.querySelector('input').checked=true;
        }
        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");

            if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} Selected`;
            }else{
                btnText.innerText = "Select Language";
            }
    });
})