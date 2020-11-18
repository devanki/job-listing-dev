const body = document.querySelector('body');
const toolsBtnArray = document.getElementsByClassName('js-tools__item');
const filtersContainer = document.querySelector('.filters');
const jobItemsContainer = document.querySelector('.jobItems');
let filterArray = [];
let jobListItems = document.querySelectorAll('.jobItem');
let jobListItemsFilters = [];
let jobItemToolsArray = [];
let allFilters = [];


async function getJobs() {
    let url = './data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderJobList(callback) {
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
    getAllFiltersFromJobList();
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

    if ( !filterArray.includes(filterElement) ) {
        let newFilterElement = document.createElement('div');
        newFilterElement.classList.add('js-filters__item','filters__item');
        newFilterElement.setAttribute('data-filter', filterElement);
        newFilterElement.textContent = filterElementTitle;
        filtersContainer.appendChild(newFilterElement);

        filterArray.push(filterElement);
        // console.log(filterArray);

        // fitering on jobList 
        filterOnJobList(filterElement, filterArray);

    } else {
        console.log('filter already exists');
    }
};

function filterOnJobList(filter, filterArray) {
    let elementsWithProperFilter = document.querySelectorAll( '.jobItem [data-filter="' + filter + '"]');

    jobListItems.forEach(function(job) {
        let classList = job.classList;
        if ( classList.contains('visible') ) {
            classList.remove("visible");  
        }
        classList.add("hidden");
    });
    
    for ( let i = 0; i < elementsWithProperFilter.length; i++ ) {
        let parent = elementsWithProperFilter[i].closest('.jobItem');
        let parentClassList = parent.classList;
        let parentTools = parent.getElementsByClassName('js-tools__item');
        
        // console.log(parentTools);
        for ( let i = 0; i < parentTools.length; i++ ) {
            let parentToolsItem = parentTools[i].dataset.filter;
            jobItemToolsArray.push(parentToolsItem);
        }
        if ( filterArray.every(elem => jobItemToolsArray.indexOf(elem) > -1) ) {
            if ( parentClassList.contains('hidden') ) {
                parentClassList.remove('hidden');  
            }
            parentClassList.add('visible');
        }
    }

    jobItemToolsArrayUniQue = [... new Set(jobItemToolsArray)];
    // console.log(jobItemToolsArrayUniQue);
}

function getAllFiltersFromJobList() {
    jobListItemsFilters = document.querySelectorAll('.tools__item');
    
    for ( let i = 0; i < jobListItemsFilters.length; i++ ) {
        let filter = jobListItemsFilters[i].dataset.filter;
        allFilters.push(filter);
    }
    allFilters = [... new Set(allFilters)];
    console.log('All filters: ' + allFilters);
}


// function filterOnJobList(filter, filterArray) {
    
//     let jobListItems = document.querySelectorAll('.jobItem');
//     let elementsWithProperFilter = document.querySelectorAll( '.jobItem [data-filter="' + filter + '"]');

//     jobListItems.forEach(function(job) {
//         let classList = job.classList;
//         if ( classList.contains('visible') ) {
//             classList.remove("visible");  
//         }
//         classList.add("hidden");
//     });
    
//     for ( let i = 0; i < elementsWithProperFilter.length; i++ ) {
//         let parent = elementsWithProperFilter[i].closest('.jobItem');
//         let parentClassList = parent.classList;
//         let parentTools = parent.getElementsByClassName('js-tools__item');
        
//         // console.log(parentTools);
//         for ( let i = 0; i < parentTools.length; i++ ) {
//             let parentToolsItem = parentTools[i].dataset.filter;
//             jobItemToolsArray.push(parentToolsItem);
//         }
//         if ( filterArray.every(elem => jobItemToolsArray.indexOf(elem) > -1) ) {
//             if ( parentClassList.contains('hidden') ) {
//                 parentClassList.remove('hidden');  
//             }
//             parentClassList.add('visible');
//         }
//     }
//     jobItemToolsArrayUniQue = [... new Set(jobItemToolsArray)];
//     console.log(jobItemToolsArrayUniQue);
// }

function removeFilterHandler(el) {
    let element = el.target;
    let filter = element.dataset.filter;
    filterArray = filterArray.filter( (value) => { return value != filter; } );
    // console.log(filterArray);
    element.remove();

    jobItemToolsArray = jobItemToolsArray.filter( (value) => { return value != filter; } );
    // console.log(jobItemToolsArray);
}

renderJobList();

document.addEventListener('click', function(e) {
    const elem = e.target;
    if(elem && elem.dataset.filter && elem.classList.contains('tools__item')) {
        addFilterHandler(e);
    }
});

document.addEventListener('click', function(e) {
    const elem = e.target;
    if( elem && elem.dataset.filter && elem.classList.contains('filters__item') ) {
        removeFilterHandler(e);
    }
});



