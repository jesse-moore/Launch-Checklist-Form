window.addEventListener('load', () => {
    document.querySelector('form').addEventListener('submit', handleSubmit)
    initializeMissionData()
})

async function initializeMissionData() {
    const planetData = await fetchMissionData()
    if (!planetData) return
    const planet = selectRandomElement(planetData)
    buildMissionDataHTML(planet)
}

function selectRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

async function fetchMissionData() {
    try {
        const response = await fetch('./planets.json')
        return await response.json()
    } catch (error) {
        console.error('Error retrieving planet data')
    }
}

function buildMissionDataHTML(planet) {
    const missionDataHTML = `<h2>Mission Destination</h2>
	<ol>
	   <li>Name: ${planet.name}</li>
	   <li>Diameter: ${planet.diameter}</li>
	   <li>Star: ${planet.star}</li>
	   <li>Distance from Earth: ${planet.distance}</li>
	   <li>Number of Moons: ${planet.moons}</li>
	</ol>
	<img src="${planet.image}">`
    document.querySelector('#missionTarget').innerHTML = missionDataHTML
}

function handleSubmit(e) {
    e.preventDefault()
    try {
        const formData = parseInput(e.target)
        validateInput(formData)
        checkShuttleReadiness(formData)
    } catch (error) {
        if (error === 'blankField') {
            window.alert('All fields are required!')
        } else if (error === 'invalidField') {
            window.alert('Make sure to enter valid information for each field!')
        } else {
            console.error(error)
        }
    }
}

function parseInput(inputElements) {
    const {
        pilotName,
        copilotName,
        fuelLevel,
        cargoMass,
    } = inputElements.elements
    return {
        pilotName: pilotName.value,
        copilotName: copilotName.value,
        fuelLevel: fuelLevel.value,
        cargoMass: cargoMass.value,
    }
}

function validateInput(formData) {
    const { pilotName, copilotName, fuelLevel, cargoMass } = formData
    validate.input(pilotName).hasValue().isString()
    validate.input(copilotName).hasValue().isString()
    validate.input(fuelLevel).hasValue().isNumber()
    validate.input(cargoMass).hasValue().isNumber()
}

function checkShuttleReadiness({ fuelLevel, cargoMass }) {
    const fuelReady = Number(fuelLevel) >= 10000
    const cargoReady = Number(cargoMass) <= 10000
    const fuelStatusElement = document.querySelector('#fuelStatus')
    const cargoStatusElement = document.querySelector('#cargoStatus')
    const launchStatus = document.querySelector('#launchStatus')

    if (fuelReady) {
        fuelStatusElement.innerText = 'Fuel level high enough for launch'
        fuelStatusElement.style.color = 'unset'
    } else {
        fuelStatusElement.innerText = 'Fuel level too low for launch'
        fuelStatusElement.style.color = 'red'
    }

    if (cargoReady) {
        cargoStatusElement.innerText = 'Cargo mass low enough for launch'
        cargoStatusElement.style.color = 'unset'
    } else {
        cargoStatusElement.innerText = 'Cargo mass too high for launch'
        cargoStatusElement.style.color = 'red'
    }

    if (fuelReady && cargoReady) {
        launchStatus.innerText = 'Shuttle is ready for launch'
        launchStatus.style.color = 'green'
        document.querySelector('#faultyItems').style.visibility = 'hidden'
    } else {
        launchStatus.innerText = 'Shuttle not ready for launch'
        launchStatus.style.color = 'red'
        document.querySelector('#faultyItems').style.visibility = 'visible'
    }
}

const validate = {
    input: function (value) {
        this.value = value
        return this
    },
    hasValue: function () {
        if (String(this.value).length > 0) {
            return this
        }
        throw 'blankField'
    },
    isString: function () {
        if (typeof this.value === 'string' && isNaN(Number(this.value))) {
            return this
        }
        throw 'invalidField'
    },
    isNumber: function () {
        const numberValue = Number(this.value)
        if (!isNaN(numberValue)) {
            return this
        }
        throw 'invalidField'
    },
}
