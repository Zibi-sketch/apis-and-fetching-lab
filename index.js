// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
//Step 1: Fetch Alerts for a State from the API

const searchButton = document.getElementById("fetch-alerts");
const inputField = document.getElementById("state-input");

searchButton.addEventListener('click', (e) => {
    let state = inputField.value;
    fetchWeatherAlerts(state);
    inputField.value = "";
})

function fetchWeatherAlerts(state) {
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("State Not Found!");
            }
        })

        .then(function (response) {
            displayAlerts(response)
            const errorContainer = document.getElementById("error-message");
            errorContainer.textContent = "";
            errorContainer.classList.add("hidden"); 
        })

        .catch(errorObject => {

            const alertDisplay = document.getElementById("alerts-display");
            if (alertDisplay) alertDisplay.innerHTML = "";

            const errorContainer = document.getElementById("error-message");

            if (errorContainer) {
                errorContainer.classList.remove("hidden");
                errorContainer.innerHTML = "";
                let errorMessage = document.createElement("p");

                errorMessage.textContent = `Oops! Something went wrong: ${errorObject.message}`;

                errorContainer.appendChild(errorMessage);
            }

            console.error("Error:", errorObject.message);
        });
}


//Step 2: Display the Alerts on the Page

function displayAlerts(data) {
    const alertDisplay = document.getElementById("alerts-display");
    alertDisplay.innerHTML = "";

    //Displaying the summary message:
    const alerts = data.features.length;
    let summary = `Weather Alerts: ${alerts}`;

    let sumMessage = document.createElement("p");
    sumMessage.textContent = summary;
    alertDisplay.appendChild(sumMessage);

    //Displaying a list of alert headlines:
    let list = document.createElement("ul");

    data.features.forEach((line) => {
        let headLine = document.createElement("li");
        headLine.textContent = line.properties.headline;

        list.appendChild(headLine);
        alertDisplay.appendChild(list);
    });
}


