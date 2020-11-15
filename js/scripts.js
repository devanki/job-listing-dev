const body = document.querySelector('body');
const toolsBtnArray = document.getElementsByClassName('js-tools__item');
const filtersParentHtml = document.querySelector('.filters');
let filterArray = [];

async function getJobs() {
    let url = './data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderJobList() {
    let container = document.querySelector('.jobItems');
    let jobs = await getJobs();
    let html = '';
    jobs.forEach(job => {
        let htmlJobItem = `
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
        html += htmlJobItem;
        
    });
    container.innerHTML = html;
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

function addFilterHandler(e) { 
    e.preventDefault();
    const filterElement = e.target.getAttribute('data-filter');
    const filterElementTitle = e.target.textContent; 
    let newFilterElement = document.createElement('div');

    if ( !filterArray.includes(filterElement) ) {
        filterArray.push(filterElement);
        console.log(filterArray);
        newFilterElement.classList.add('js-filters__item','filters__item');
        newFilterElement.setAttribute('data-filter', filterElement);
        newFilterElement.textContent = filterElementTitle;
        filtersParentHtml.appendChild(newFilterElement);
    } else {
        console.log('filter already exist');
    }
};

function removeFilterHandler(el) {
    let element = el.target;
    let filter = element.dataset.filter;
    filterArray = filterArray.filter( (value) => { return value != filter;} );
    console.log(filterArray);
    element.remove();
}

renderJobList();

document.addEventListener('click', function(e){
    const elem = e.target;
    if(elem && elem.dataset.filter && elem.classList.contains('tools__item')) {
        addFilterHandler(e);
    }
});

document.addEventListener('click', function(e){
    const elem = e.target;
    if(elem && elem.dataset.filter && elem.classList.contains('filters__item')) {
        removeFilterHandler(e);
    }
});



