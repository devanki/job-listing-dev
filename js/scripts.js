let filterBtnArray = document.getElementsByClassName('js-tools__item');
let filtersList = document.querySelector('.filters');
let filterArray = document.getElementsByClassName('js-filters__item');


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
    btn.addEventListener('click', addFilterHandler);
});

Array.from(filterArray).forEach((btn) => {
    btn.addEventListener('click', removeFilterHandler);
});

