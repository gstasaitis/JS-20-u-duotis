const API_URL = "https://open-long-puck.glitch.me/"
const form = document.getElementById("form")
const carInput = document.getElementById("car")
const modelInput = document.getElementById("model")
const main = document.getElementById("main")

function createTableRow(brand, model) {
    const newRow = document.createElement("tr")

    const brandCell = document.createElement("td")
    brandCell.textContent = brand
    newRow.appendChild(brandCell)

    const modelCell = document.createElement("td")
    modelCell.textContent = model
    newRow.appendChild(modelCell)

    return newRow


}fetch(API_URL, {
    method: "GET"
    })
    .then((resp) => resp.json())
    .then((data) => {

    const table = document.createElement("table")
    const headerRow = document.createElement("tr")
    const brandHeader = document.createElement("th")
    brandHeader.textContent = "BRAND"
    headerRow.appendChild(brandHeader)

    const modelHeader = document.createElement("th")
    modelHeader.textContent = "MODEL"
    headerRow.appendChild(modelHeader)

    table.appendChild(headerRow)

    data.forEach((item) => {
    const carBrand = item.brand
    const carModel = item.model

    const newRow = createTableRow(carBrand, carModel)

    table.appendChild(newRow)
    })

    main.appendChild(table)

})

const message = document.getElementById("message")

    // Fetch data with POST method
    const submitData = (e) => {
        e.preventDefault()


        if(!carInput.value || !modelInput.value){
            message.textContent = "Brand and model fields are required!"
            message.style.color = "lightcoral"
            message.style.textShadow = "1px 1px 6px red"
            return 

        }else{
            message.style.color = "greenyellow"
            message.style.textShadow = "1px 1px 6px #37FF8B"
            message.textContent = "Car Added!"
        }
    
        const newCar =  {
            brand: carInput.value,
            model: modelInput.value
        }
    
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCar)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
    
            // Clear input
            carInput.value = ""
            modelInput.value = ""
        })
    }
    
    // Submit data with post request
    form.addEventListener("submit", submitData)
