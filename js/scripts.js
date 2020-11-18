const body = document.querySelector('body');
const toolsBtnArray = document.getElementsByClassName('js-tools__item');
const filtersContainer = document.querySelector('.filters');
const jobItemsContainer = document.querySelector('.jobItems');
let visibleJobItems = document.querySelectorAll('.jobItems.visible');
let filterArray = [];
let jobListItems;
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
            <div class="jobItem visible">
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
        console.log('Filters on top: ');
        console.log(filterArray);

        // fitering on jobList 
        filterJobList(filterElement, filterArray);

    } else {
        console.log('filter already exists');
    }
};



function filterJobList(filter, filterArray) {
    let jobListItemsTools = [];
    let elementsWithClickedFilter = document.querySelectorAll( '.jobItem [data-filter="' + filter + '"]');
    jobListItems = document.querySelectorAll('.jobItem.visible');

    // console.log(jobListItems);
    jobListItems.forEach(function(job) {
        let classList = job.classList;
        if ( classList.contains('visible') ) {
            classList.remove("visible");  
        }
        classList.add("hidden");
    });

    for ( let i = 0; i < elementsWithClickedFilter.length; i++ ) {
        let parent = elementsWithClickedFilter[i].closest('.jobItem');
        parent.classList.remove('hidden');
        parent.classList.add('visible');

        jobListItems = document.querySelectorAll('.jobItem.visible');
    }   
    console.log(jobListItems);
        // console.log(parentTools);
        // for ( let i = 0; i < parentTools.length; i++ ) {
        //     let parentToolsItem = parentTools[i].dataset.filter;
        //     jobItemToolsArray.push(parentToolsItem);
        // }
    for ( let i = 0; i < jobListItems.length; i++ ) {
        let tools = jobListItems[i].querySelectorAll('.tools__item');
        let toolsArr = [];
        
        for ( let i = 0; i < tools.length; i++ ) {
            let tool = tools[i].dataset.filter;
            toolsArr = toolsArr.push(tool);
            console.log(toolsArr);
        }
        // console.log(toolsArr);
        // jobListItemsTools = 
        if ( filterArray.every(elem => jobListItems.indexOf(elem) > -1) ) {
            if ( parentClassList.contains('hidden') ) {
                parentClassList.remove('hidden');  
            }
            parentClassList.add('visible');
        }
    }

    jobItemToolsArrayUniQue = [... new Set(jobItemToolsArray)];
}

function getAllFiltersFromJobList() {
    jobListItemsFilters = document.querySelectorAll('.tools__item');
    
    for ( let i = 0; i < jobListItemsFilters.length; i++ ) {
        let filter = jobListItemsFilters[i].dataset.filter;
        allFilters.push(filter);
    }
    allFilters = [... new Set(allFilters)];
    console.log('All filters: ');
    console.log(allFilters);
}

// let visiblejobListItemsFilters = [];
// let allVisibleFilters = [];

// function getAllVisibleFiltersFromJobList() {
//     visibleJobListItemsFilters = visibleJobItems.querySelectorAll('.tools__item');
    
//     for ( let i = 0; i < visibleJobListItemsFilters.length; i++ ) {
//         let filter = visibleJobListItemsFilters[i].dataset.filter;
//         allVisibleFilters.push(filter);
//     }
//     allVisibleFilters = [... new Set(allVisibleFilters)];
//     console.log('All filters from visible job items: ' + allVisibleFilters);
// }


function removeFilterHandler(el) {
    let element = el.target;
    let filter = element.dataset.filter;
    filterArray = filterArray.filter( (value) => { return value != filter; } );
    console.log('Filtest on to after remove item:');
    console.log(filterArray);
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



