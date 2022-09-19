const workRequest = new Request("jobs.json");
const container = document.getElementById("viewbox-container")
const parent = document.getElementsByClassName('viewbox')[0];
let json_data = []

fetch(workRequest)
    .then(response => {
        if (!response.ok) {
            console.error("Didn't get the json.");
            return;
        }

        return (response.json());
    })
    .then((response) => {
        const front_pic = new Image
        front_pic.src = response[0].images[0]
        container.querySelector('.viewbox-img').appendChild(front_pic)
        front_pic.addEventListener('load', () => {
            const width = front_pic.width
            const height = front_pic.height
            let view_height = document.defaultView.getComputedStyle(container).height;
            let view_width = document.defaultView.getComputedStyle(container).width;
            view_height = +view_height.replace('px', '')
            view_width = +view_width.replace('px', '')
            width_diff = width / view_width
            height_diff = height / view_height
            
            if (width > height) {
                if (width > view_width) {
                    front_pic.height = height * (view_width / width);
                    front_pic.width = view_width;
                }
            } else {
                if (height > view_height) {
                    front_pic.width = width * (view_height / height);
                    front_pic.height = view_height;
                }
            }

            json_data = response
            load_page("deck")

        })
        /*
        console.log(response[0].title)
        console.log(response[0].description)
        console.log(response[0].images)
        */
    })
    .catch(error => {
        console.error(error);
});

const close_buttons = document.querySelectorAll('.content-close');

for (let i=0;i<close_buttons.length;i++) {
    close_buttons[i].addEventListener("click", () => {
        parent.style.display = 'none'
    })
    
}

function load_page(type) {
    let wanted_jobs = json_data.reduce((result, entry) => {
        if (entry.type === type) {
            document.getElementById('work-container').appendChild(create_job(entry))
            
        }
        return result
    }, [])

    console.log(wanted_jobs)
}

function create_job(entry) {
    let new_job = document.createElement('div')
    new_job.className = 'work-container-job'
    new_job.style.backgroundImage = `url(${entry.images[0]})`
    new_job.style.backgroundSize = 'cover'
    new_job.style.backgroundPosition = 'center'
    console.log(entry.images[0])
    
    new_job.addEventListener('click', () => {
        parent.style.display = 'flex'
    })

    return new_job
}
