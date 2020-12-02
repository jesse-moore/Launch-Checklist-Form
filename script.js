// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener('load', () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        try {
            const formData = parseInput(e.target)
            validateInput(formData)
        } catch (error) {
            if (error === 'blankField') {
                window.alert('All fields are required!')
            } else if (error === 'invalidField') {
                window.alert(
                    'Make sure to enter valid information for each field!'
                )
            }
        }
    })
})

function parseInput(inputElements) {
    const formData = {}
    for (const index in inputElements) {
        if (inputElements.hasOwnProperty(index)) {
            const { value, name } = inputElements[index]
            if (name) {
                formData[name] = value
            }
        }
    }
    return formData
}

function validateInput(formData) {
    const { pilotName, copilotName, fuelLevel, cargoMass } = formData

    if (!pilotName || !copilotName || !fuelLevel || !cargoMass) {
        throw 'blankField'
    }

    if (
        !isString(pilotName) ||
        !isString(copilotName) ||
        !isNumber(fuelLevel) ||
        !isNumber(cargoMass)
    ) {
        throw 'invalidField'
    }
}

function isString(string) {
    if (typeof string === 'string' && isNaN(Number(string))) {
        return true
    }
    return false
}

function isNumber(number) {
    if (!isNaN(Number(number))) {
        return true
    }
    return false
}
