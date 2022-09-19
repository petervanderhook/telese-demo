const workRequest = new Request("jobs.json");

fetch(workRequest)
    .then(response => {
        if (!response.ok) {
            console.error("Didn't get the json.");
            return;
        }

        console.log(response);
    })
    .catch(error => {
        console.error(error);
});