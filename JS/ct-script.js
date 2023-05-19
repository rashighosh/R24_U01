var form = document.getElementById("myForm");

function handleForm(event) {
    event.preventDefault()
    let UserAge = document.getElementById("Age").value
    let LocationState = document.getElementById("LocationState").value
    let LocationCity = document.getElementById("LocationCity").value
    let Gender = document.getElementById("myForm").elements["Gender"].value
    let Race = document.getElementById("myForm").elements["Race"].value
    let Ethnicity = document.getElementById("myForm").elements["Ethnicity"].value
    let Condition = document.getElementById("Condition").value
    let HealthyVolunteer = document.getElementById("myForm").elements["HealthyVolunteer"].value

    console.log("Age: " + UserAge)
    console.log("LocationState: " + LocationState)
    console.log("LocationCity: " + LocationCity)
    console.log("Gender: " + Gender)
    console.log("Race: " + Race)
    console.log("Ethnicity: " + Ethnicity)
    console.log("Condition: " + Condition)
    console.log("HealthyVolunteer: " + HealthyVolunteer)

    let expression = `${Condition} AND SEARCH[Location](AREA[LocationState] ${LocationState} AND AREA[LocationCity] ${LocationCity} AND AREA[LocationStatus] Recruiting) AND AREA[Gender] ${Gender} AND AREA[HealthyVolunteers] ${HealthyVolunteer}`
    console.log("API URL IS " + expression)
    const clinicalTrialsUrl = `https://clinicaltrials.gov/api/query/study_fields?expr=${expression}&fields=BriefTitle%2COverallStatus%2CBriefSummary%2CCondition%2CStudyType%2CMaximumAge%2CMinimumAge%2CGender%2CInterventionType%2CHealthyVolunteers%2CCentralContactEMail%2CCentralContactName%2CLocationCity%2CLocationFacility&min_rnk=1&max_rnk=&fmt=json`;
    const sponsoredTrialsUrl = `https://vpf2content.s3.amazonaws.com/Uploads/R24Files/sponsoredtrials.csv`

    // fetch results from clinicaltrials.gov
    console.log("AB TO CALL CT API")
    fetch(clinicalTrialsUrl).then(function (response) {
        return response.json();
        }).then(function (data) {
            console.log(data);
            let studies = data.StudyFieldsResponse.StudyFields
            let filtered = studies.filter(study => {
                console.log(UserAge)
                let minNum = study.MinimumAge[0] ? parseInt(study.MinimumAge[0].replace(/[^0-9]/g, '')) : 0;
                let maxNum = study.MaximumAge[0] ? parseInt(study.MaximumAge[0].replace(/[^0-9]/g, '')) : 150;
                console.log(minNum)
                return (UserAge >= minNum && UserAge <= maxNum)
            })
            console.log("FILTERED STUDIES")
            console.log(filtered)
            localStorage.setItem("city", LocationCity);
            localStorage.setItem("clinicalTrials", JSON.stringify(filtered));
            // window.location.href = "/R24-ALEX/studies.html"
            // window.location.href = "/studies.html"
             // fetch sponsored trials
            console.log("AB TO GET SPONSORED TRIALS")
            const response = fetch(sponsoredTrialsUrl)
                .then(response => response.text())
                .then(v => Papa.parse(v, {header: true}))
                .catch(err => console.log(err))
            response.then(data => {
                console.log("GOT CSV RESPONSE")
                console.log(data)
                localStorage.setItem("sponsoredTrials", JSON.stringify(data.data));
                window.location.href = "/studies.html"
            })
        }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });

   
}

form.addEventListener('submit', handleForm)