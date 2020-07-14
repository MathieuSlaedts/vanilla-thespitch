import 'bulma';
import axios from 'axios';
import './assets/style.scss';
console.log('hello world');

const afficherVisiteur = () => {
  const urlPost = 'https://ingrwf-08.firebaseio.com/visiteurs.json';

  axios.get(urlPost)
    .then((response) => {
      // console.log(response.data);
    });
}; afficherVisiteur();

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
}; afficherDate();

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