let filterBtnArray = document.getElementsByClassName('js-tools__item');
let filtersList = document.querySelector('.filters');
let filterArray = document.getElementsByClassName('js-filters__item');


function addFilterHandler(e) { 
    e.preventDefault();
    let filterElement = e.target.getAttribute('data-filter');
    let filterElementTitle = e.target.textContent; 
    // console.log(e.target);
    let newFilterElement = document.createElement('div');

    newFilterElement.classList.add('js-filters__item','filters__item')
    newFilterElement.setAttribute('data-filter', filterElement);
    newFilterElement.textContent = filterElementTitle;
    filtersList.appendChild(newFilterElement);
};

function removeFilterHandler(el) {
    let element = el.target;
    console.log(element);
    element.remove();
}

Array.from(filterBtnArray).forEach((btn) => {
    btn.addEventListener('click', addFilterHandler);
});

Array.from(filterArray).forEach((btn) => {
    btn.addEventListener('click', removeFilterHandler);
});

