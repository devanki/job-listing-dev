const filterBtnArray = document.getElementsByClassName('js-tools__item');
const filtersList = document.querySelector('.filters');
const filterArray = document.getElementsByClassName('js-filters__item');
const body = document.querySelector('body');

async function getJobs() {
    let url = './data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function languages(languages) {
    return `
        ${languages.map(language => `<a class="tools__item js-tools__item" data-languages="${language}" data-filter="${language}">${language}</a>`).join("")}
  `;
}

function tools(tools) {
    return `
        ${tools.map(tool => `<a class="tools__item js-tools__item" data-tools="${tool}" data-filter="${tool}">${tool}</a>`).join("")}
  `;
}

async function renderJobList() {
    let jobs = await getJobs();
    let html = '';
    jobs.forEach(job => {
    let htmlSegment = `
                    <div class="jobItem">
                        <a href="" class="jobItem__image">
                        <img src="${job.logo}" alt="${job.name}">
                        </a>
                        <div class="jobItem__info">
                        <div class="jobItem__infoRow jobItem__infoRow--company">
                            <strong>${job.company}</strong>
                            ${job.new ? `<span class="infoButton">New!</span>` : '' }
                            ${job.featured ? `<span class="infoButton infoButton--featured">Featured</span>` : '' }
                        </div>
                        <div class="jobItem__infoRow jobItem__infoRow--title">${job.position}</div>
                        <div class="jobItem__infoRow jobItem__infoRow--info">
                            <span class="jobItem__tag" data-when="${job.postedAt}">${job.postedAt}</span>
                            <span class="jobItem__tag" data-contract="${job.contract}">${job.contract}</span>
                            <span class="jobItem__tag" data-location="${job.location}">${job.location}</span>
                        </div>
                        </div>
                        <div class="jobItem__tools tools">
                        <a class="tools__item js-tools__item" data-role="${job.role}" data-filter="${job.role}">${job.role}</a>
                        <a class="tools__item js-tools__item" data-level="${job.level}" data-filter="${job.level}">${job.level}</a>
                        ${job.languages ? languages(job.languages) : ""}
                        ${job.tools ? tools(job.tools) : ""}
                        </div>
                    </div>`;
        html += htmlSegment;
        
    });

    let container = document.querySelector('.jobItems');
    container.innerHTML = html;
}

renderJobList();



function addFilterHandler(e) { 

    e.preventDefault();
    const filterElement = e.target.getAttribute('data-filter');
    const filterElementTitle = e.target.textContent; 
    let newFilterElement = document.createElement('div');

    newFilterElement.classList.add('js-filters__item','filters__item');
    newFilterElement.setAttribute('data-filter', filterElement);
    newFilterElement.textContent = filterElementTitle;
    filtersList.appendChild(newFilterElement);
    newFilterElement.onclick = removeFilterHandler;


    // function HideShowItems(element, index, array) {
    // }
    // visible = [12, 5, 8, 130, 44].filter(HideShowItems);


};


function removeFilterHandler(el) {
    let element = el.target;
    element.remove();
}

function checkIfExist() {
     //check if filter already exist
     const filters = document.querySelectorAll('.js-filters__item');
     // console.log(filters);
     
     // [...filters].forEach( (filter) => {
     //     if ( filter.getAttribute('data-filter') === filterElement) {
     //         console.log('filter already exist');
     //         console.log( filter.getAttribute('data-filter'));
     //     } else {
     //         console.log('add new filter');
     //         
     //     }
     // });
 
    //  if ( [...filters].filter(element =>  element.dataset.filter == filterElement)) {
    //      console.log(filterElement);
    //  } else {
    //      console.log('add new filter');
    //  }
}


Array.from(filterBtnArray).forEach((btn) => {
    body.addEventListener('click', btn, addFilterHandler);
});

Array.from(filterArray).forEach((btn) => {
    body.addEventListener('click', btn, removeFilterHandler);
});

