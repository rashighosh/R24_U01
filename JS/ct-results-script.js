var clinicalTrials = JSON.parse(localStorage.getItem("clinicalTrials"))
var sponsoredTrials = JSON.parse(localStorage.getItem("sponsoredTrials"))
const city = localStorage.getItem("city")
console.log(clinicalTrials)
console.log(sponsoredTrials)

clinicalTrials.map(study => {
    let pos = study.LocationCity.indexOf("Gainesville")
    console.log(study.LocationCity.indexOf("Gainesville"))
    console.log(study.LocationFacility[pos])
})

document.getElementById("sponsoredTrials").innerHTML = sponsoredTrials.map((study, index) => 
    `<div class="card">
      <h2>Study Title: ${study.BriefTitle}</h2>
      <p>Summary: ${study.DetailedDescriptionGPT}</p>
      <p>Condition: ${study.Condition}</p>
      <p>Intervention Type: ${study.InterventionType}</p>
      <p>Location City: ${study.LocationCity}</p>
      <p>Location Facility: ${study.LocationFacility}</p>
      <p>Contact Name: ${study.CentralContactName}</p>
      <p>Contact Email: ${study.CentralContactEmail}</p>
      <p>Status: ${study.OverallStatus}</p>
      <p>Age: ${study.MininumAge} - ${study.MaximumAge}</p>
      <p>Healthy Volunteer? ${study.HealthyVolunteers}</p>
    </div>`
).join('')

document.getElementById("clinicalTrials").innerHTML = clinicalTrials.map((study, index) => 
    `<div class="card">
      <h2>Study Title: ${study.BriefTitle}</h2>
      <p>Summary: ${study.BriefSummary}</p>
      <p>Condition: ${study.Condition}</p>
      <p>Intervention Type: ${study.InterventionType}</p>
      <p>Location City: ${city}</p>
      <p>Location Facility: ${study.LocationFacility[study.LocationCity.indexOf(city)]}</p>
      <p>Contact Name: ${study.CentralContactName}</p>
      <p>Contact Email: ${study.CentralContactEmail}</p>
      <p>Status: ${study.OverallStatus}</p>
      <p>Age: ${study.MininumAge} - ${study.MaximumAge}</p>
      <p>Healthy Volunteer? ${study.HealthyVolunteers}</p>
    </div>`
).join('')

