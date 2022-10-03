const workRequest = new Request("jobs.json");
const container = document.getElementById("viewbox-container")
const base_work_container = document.getElementById("work-container")
const parent = document.getElementsByClassName('viewbox')[0];
let json_data = []

const jobtype = document.currentScript.getAttribute("jobtype")

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
            front_pic.style.objectFit = 'contain'
            json_data = response
            load_page(jobtype)

        })
    })
    .catch(error => {
        console.error(error);
});

const close_buttons = document.querySelectorAll('.content-close');

for (let i=0;i<close_buttons.length;i++) {
    close_buttons[i].addEventListener("click", () => {
        parent.style.display = 'none'
    })
    console.log("Running")
    
}

function load_page(type) {
    document.getElementById('work-container').innerHTML = ' '
    let wanted_jobs = json_data.reduce((result, entry) => {
        if (entry.type === type) {
            document.getElementById('work-container').appendChild(create_job(entry))
            
        }
        return result
    }, [])

}

function create_job(entry) {
    let new_job = document.createElement('div')
    new_job.className = 'work-container-job'
    new_job.style.backgroundImage = `url(${entry.images[0]})`
    new_job.style.backgroundSize = 'cover'
    new_job.style.backgroundPosition = 'center'
    
    new_job.addEventListener('click', () => {
        // Remove event listeners (Jank)
        const lef_arrow = document.querySelector('.content-left-arrow')
        const rig_arrow = document.querySelector('.content-right-arrow')
        lef_arrow.replaceWith(lef_arrow.cloneNode(true))
        rig_arrow.replaceWith(rig_arrow.cloneNode(true))
        const left_arrow = document.querySelector('.content-left-arrow')
        const right_arrow = document.querySelector('.content-right-arrow')

        // Set Title and Text
        let content_title = document.querySelector('.content-title')
        let content_text = document.querySelector('.content-text')
        content_title.innerHTML = entry.title
        content_text.innerHTML = entry.description


        parent.style.display = 'flex'
        let current_image_index = 0
        const img_container = parent.querySelectorAll('img')
        console.log("entry:", entry.images)

        if (entry.images.length > 0) {
            img_container[0].src = `${entry.images[current_image_index]}`
            /* content-left-arrow, content-right-arrow */
            console.log(left_arrow, right_arrow)

            left_arrow.addEventListener('click', () => {
                current_image_index -= 1
                //console.log(`Current image index: ${current_image_index}`)
                console.log(entry.images.length)
                if (current_image_index < 0) {
                    // If you pass over to -1 index value, add the length of the array to index value before setting source
                    current_image_index += entry.images.length
                }
                img_container[0].src = `${entry.images[current_image_index]}`

            })
            right_arrow.addEventListener('click', () => {
                current_image_index += 1
                //console.log(`Current image index: ${current_image_index}`)
                if (current_image_index >= entry.images.length) {
                    // If you pass over to -1 index value, add the length of the array to index value before setting source
                    current_image_index -= entry.images.length
                }
                img_container[0].src = `${entry.images[current_image_index]}`

            })

        }
        else {
            img_container[0].src = './img/unavailable.png'
            right_arrow.addEventListener('click', () => {
                console.log('No Pictures.')
            })
            left_arrow.addEventListener('click', () => {
                console.log('No Pictures.')
            })
        }
    })
    let new_hover_element = document.createElement('div')
    new_hover_element.className = 'work-container-job-color'
    new_hover_element.appendChild(new_job)
    return new_hover_element
}
