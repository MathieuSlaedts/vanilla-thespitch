import 'bulma';
//import './assets/style.scss';

import axios from 'axios';

// import { Identification } from './partiaux/identification/identification.js';
// const identification = new Identification();
// console.log(identification.hello());


const myToday = () => {
  const myDate = new Date();
  const myDay = ("0" + myDate.getDate()).slice(-2);
  const myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
  return myDate.getFullYear() + '' + myMonth + '' + myDay;
};





/*
*
*
*
* Identification
* -MC6dhG-do2hOxQyfH6O
*
*
*
*/
const identificationForm = document.querySelector('#identification');
identificationForm.addEventListener('click', (ev) => identification(ev));

const identification = ev => {
  ev.preventDefault();
  if (ev.target.tagName !== 'BUTTON') return;

  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs.json';
  const idVisiteur = identificationForm.querySelector('#id-visiteur').value;
  if (idVisiteur === "") return;

  axios.get(urlPost).then((response) => {

    if (response.data[idVisiteur]) {
      console.log(response.data[idVisiteur]);
      const idVisiteurInput = document.querySelector('#visite-visiteur');
      const idVisiteurInputTest = document.querySelector('#visite-visiteur-test');
      idVisiteurInput.value = idVisiteur;
      idVisiteurInputTest.textContent = idVisiteur;
    }
  });
};





/*
*
*
*
* Inscription
*
*
*
*/
const inscriptionForm = document.querySelector('#inscription');
inscriptionForm.addEventListener('click', (ev) => inscription(ev));

const inscription = ev => {
  ev.preventDefault();
  if (ev.target.tagName !== 'BUTTON') return;

  const visiteurNom = inscriptionForm.querySelector('#inscription-nom').value;
  const visiteurPrenom = inscriptionForm.querySelector('#inscription-prenom').value;
  const visiteurEmail = inscriptionForm.querySelector('#inscription-email').value;

  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs.json';
  const nouveauVisiteur = { "nom": visiteurNom, "prenom": visiteurPrenom, "email": visiteurEmail, "photo": "hello.jpg" };
  axios.post(urlPost, nouveauVisiteur).then((response) => {
    console.log(response.data.name);
    const idVisiteurInput = document.querySelector('#visite-visiteur');
    const idVisiteurInputTest = document.querySelector('#visite-visiteur-test');
    idVisiteurInput.value = response.data.name;
    idVisiteurInputTest.textContent = response.data.name;
  });
};





/*
*
*
*
* Entrer
*
*
*
*/
const entrerForm = document.querySelector('#entrer');
const visiteObjet = document.querySelector('#visite-objet');
const visiteFormation = document.querySelector('#visite-formation');
const visitePersonnel = document.querySelector('#visite-personnel');
const visiteVisiteur = document.querySelector('#visite-visiteur');
entrerForm.addEventListener('click', (ev) => entrer(ev));
visiteObjet.addEventListener('change', (ev) => objetDeLaVisite(ev));

const objetDeLaVisite = ev => {
  ev.preventDefault();

  /*
  *
  * Formation
  *
  */
  if (ev.target.value === "formation") {

    const urlPost = 'https://mathieu.go.yo.fr/wp-json/wp/v2/formations';
    const urlCF = 'http://mathieu.go.yo.fr/wp-json/acf/v3/formations/';

    axios.get(urlPost).then((response) => {

      response.data.forEach(el => {

        const formationID = el.id;
        const formationTitle = el.title.rendered;

        axios.get(urlCF + formationID).then((response) => {

          const formationLocal = response.data.acf.local;
          const formationDebut = response.data.acf.formations_date_de_debut.split('/').reverse().join('');
          const formationFin = response.data.acf.formations_date_de_fin.split('/').reverse().join('');
          const myDate = new Date();
          const myDay = ("0" + myDate.getDate()).slice(-2);
          const myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
          const today = myDate.getFullYear() + '' + myMonth + '' + myDay;

          if (isBetween(today, formationDebut, formationFin) !== false) {
            visiteFormation.innerHTML += '<option value="' + formationID + '" data-local="' + formationLocal + '">' + formationTitle + '</option>';
          }
        });
      });
    });
  }

  /*
  *
  * Personnel
  *
  */
  if (ev.target.value === "personnel") {

    const urlPost = 'http://mathieu.go.yo.fr/wp-json/wp/v2/membres_personnel';
    const urlCF = 'http://mathieu.go.yo.fr/wp-json/acf/v3/membres_personnel/';

    axios.get(urlPost).then((response) => {

      response.data.forEach(el => {

        const personnelID = el.id;
        const personnelTitle = el.title.rendered;

        axios.get(urlCF + personnelID).then((response) => {

          const personnelLocal = response.data.acf.local;
          visitePersonnel.innerHTML += '<option value="' + personnelID + '" data-local="' + personnelLocal + '">' + personnelTitle + '</option>';
        });
      });
    });
  }
};

function isBetween(n, a, b) {
  return (n - a) * (n - b) <= 0
}


/*
*
* Entrer
*
*/

const entrer = ev => {
  ev.preventDefault();
  if (ev.target.tagName !== 'BUTTON') return;
  if (visiteObjet.value !== 'formation' && visiteObjet.value !== 'personnel') return;
  if (visiteVisiteur.value === '') return;

  let visiteId = '';
  if (visiteObjet.value === 'formation') {
    visiteId = visiteFormation.value;
  }
  else if (visiteObjet.value === 'personnel') {
    visiteId = visitePersonnel.value;
  }

  const idVisiteur = visiteVisiteur.value;

  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs/' + idVisiteur + '/visites.json';
  const nouvelleDate = { "date": myToday(), "objet": visiteObjet.value, "id": visiteId, "terminee": false };
  axios.post(urlPost, nouvelleDate).then((response) => {

  });
};
















const afficherVisiteur = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs.json';

  axios.get(urlPost)
    .then((response) => {
      // console.log(response.data);
    });
}; // afficherVisiteur();

const afficherUnVisiteur = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs/-MC6dhG-do2hOxQyfH6O.json';

  axios.get(urlPost)
    .then((response) => {
      // console.log(response.data);
    });
}; // afficherUnVisiteur();

const inscrireVisiteur = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs.json';
  const nouveauVisiteur = { "nom": "John", "prenom": "Doe", "email": "j.doe@gmail.com", "photo": "hello.jpg" };

  axios.post(urlPost, nouveauVisiteur)
    .then((response) => {
      // console.log(response.data);
    });
}; // inscrireVisiteur();

const supprimerVisiteur = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs/-MCBCAeFG7ipRnnbAHQ-.json';

  axios.delete(urlPost)
    .then((response) => {
      // console.log(response.data);
    });
}; //supprimerVisiteur();

const afficherDate = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/-MC6dhG-do2hOxQyfH6O/visites.json';

  axios.get(urlPost)
    .then((response) => {
      console.log(response.data);
    });
}; // afficherDate();

const ajouterUneDate = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/-MC6dhG-do2hOxQyfH6O/visites.json';
  const nouvelleDate = { "date": "20200720", "id": "128", "terminee": false };

  axios.post(urlPost, nouvelleDate)
    .then((response) => {
      // console.log(response.data);
    });
}; //ajouterUneDate();

const supprimerLesDates = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/-MC6dhG-do2hOxQyfH6O/visites.json';
  const nouvelleDate = { "date": "20200720", "id": "128", "terminee": false };

  axios.delete(urlPost, supprimerLesDates)
    .then((response) => {
      // console.log(response.data);
    });
}; // supprimerLesDates();