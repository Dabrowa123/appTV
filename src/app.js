
import { mapListToDOMElements, createDOMElem } from './dominteractions.js';
import { getShowsByTypeKey } from './requests.js';

class TvMaze {
    constructor() {
        this.viewElems = {};
        this.showNameButtons = {};
        this.selectedName = "harry";
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
        this.fetchAndDisplayShows();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName);

        // console.log(document.querySelectorAll('[id]')); //nodelist
        // console.log(listOfIds);
        // console.log(listOfShowNames);
        
        this.viewElems = mapListToDOMElements(listOfIds, 'id');
        this.showNameButtons = mapListToDOMElements(listOfShowNames, 'data-show-name');
        // console.log(this.viewElems);
        // console.log(this.showNameButtons);
        // console.log(Object.keys(this.showNameButtons));
    }

    setupListeners = () => {
        Object.keys(this.showNameButtons).forEach(showName => {
            this.showNameButtons[showName].addEventListener('click', this.setCurrentNameFilter)
        });
    }

    setCurrentNameFilter = () => {
        this.selectedName = event.target.dataset.showName;
        this.fetchAndDisplayShows();
    }

    fetchAndDisplayShows = () => {
        getShowsByTypeKey(this.selectedName).then(shows => this.renderCards(shows));
    }
    
    renderCards = shows => {
        for (const {show} of shows) {
            this.createShowCard(show);
        }
    }

    createShowCard = show => {
        const divCard = createDOMElem('div', 'card');
        const img = createDOMElem('img', 'card-img-top', null, show.image.medium);
        const divCardBody = createDOMElem('div', 'card-body');
        const h5 = createDOMElem('h5', 'card-title', show.name);
        const p = createDOMElem('p', 'card-text', show.summary);
        const btn = createDOMElem('button', 'btn btn-primary', 'Show details');

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(btn);

        this.viewElems.showsWrapper.appendChild(divCard);
    }

}

document.addEventListener('DOMContentLoaded', new TvMaze());