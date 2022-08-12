
const submitBtn = document.getElementById("submit-btn")
let colors = []
//listen for click, grab hex value info from color picker
//grab scheme mode from dropdown option, pass to fetch API
submitBtn.addEventListener("click", function(){
    const colorPicker = document.getElementById("color-picker").value
    const hexCode = (colorPicker).slice(1,7)
    const schemeMode = document.getElementById("mode").value

    fetchURL = `https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${schemeMode}`

    fetch(fetchURL)
        .then (response => response.json())
        .then (data => {
            colors = data.colors
            renderColors()
            })
})

function renderColors(data){
    let html = ""
    for (let i=0; i < colors.length; i++) {
            html+=`
            <div class="color-swatch">
                <div class="color-img">
                    <img src="${colors[i].image.bare}">
                </div>
                <div class="color-text">
                    <p>
                    <button class= "popup" title="Click to Copy Hex Code" onclick="copyToClipboard('${colors[i].hex.value}')">
                    ${colors[i].hex.value} <span class="popuptext" id="${colors[i].hex.value}">Copied to Clipboard!</span>
                    </button>
                    <br> ${colors[i].name.value}
                    </p>
                </div>
            </div>`
        }
    document.getElementById("color-scheme").innerHTML = html
}

function copyToClipboard(hexCode) {
    navigator.clipboard.writeText(hexCode)
    var popup = document.getElementById(hexCode)
    popup.classList.toggle("show")

}
