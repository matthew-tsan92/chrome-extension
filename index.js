let array = []
const inputText = document.getElementById("input-text")
const inputBtn = document.getElementById("button-input")
const list = document.getElementById("list")
const tabBtn = document.getElementById("button-tab")
const deleteBtn = document.getElementById("button-delete")
const arrayFromLocalStorage = JSON.parse(localStorage.getItem("array"))

if (arrayFromLocalStorage) {
    array = arrayFromLocalStorage
    render(array)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        array.push(tabs[0].url)
        localStorage.setItem("array", JSON.stringify(array) )
        render(array)
    })
})

function render(text) {
    let listItems = ""
    for (let i = 0; i < text.length; i++) {
        listItems += 
        `
            <li>
                <a target='_blank' href='${text[i]}'>
                    ${text[i]}
                </a>
            </li>
        `
    }
    list.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    array = []
    render(array)
})

inputBtn.addEventListener("click", function() {
    array.push(inputText.value)
    inputText.value = ""
    localStorage.setItem("array", JSON.stringify(array) )
    render(array)
})