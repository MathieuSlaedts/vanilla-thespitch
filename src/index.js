import "bulma";
import "./assets/style.scss";
import axios from "axios";

const formatDate = (myDate) => {
    const myDay = ("0" + myDate.getDate()).slice(-2);
    const myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
    return myDate.getFullYear() + "" + myMonth + "" + myDay;
};

const myToday = () => {
    const myDate = new Date();
    return formatDate(myDate);
};

const myTodayMinus15 = () => {
    const myDate = new Date();
    myDate.setDate(myDate.getDate() - 15);
    return formatDate(myDate);
};



function isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0;
}
// console.log(myTodayMinus15());

/*
 *
 *
 *
 * accueil
 *
 *
 *
 */

const ecranAccueil = document.querySelector("#ecran-accueil");
const ecranIdentification = document.querySelector("#ecran-identification");
const ecranInscription = document.querySelector("#ecran-inscription");
const ecranEntrer = document.querySelector("#ecran-entrer");
const ecranSortir = document.querySelector("#ecran-sortir");
const ecranProfil = document.querySelector("#ecran-profil");
const ecranFin = document.querySelector("#ecran-fin");
const ecranConfidentialite = document.querySelector("#ecran-confidentialite");

const ecrans = document.querySelectorAll(".ecran");
const retour = document.querySelectorAll(".retour");
const boutonSinscrire = document.querySelectorAll(".bouton-sinscrire a");
const retourIdentification = document.querySelector(".retour-identification");

ecranAccueil.addEventListener('click', ev => accueilHandler(ev));
retour.forEach(el => { el.addEventListener('click', ev => retourHandler(ev)) });
boutonSinscrire.forEach(el => { el.addEventListener('click', ev => boutonSinscrireHandler(ev)) });
retourIdentification.addEventListener('click', ev => retourIdentificationHandler(ev));


const accueilHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;

    const target = ev.target.dataset.target;
    document.querySelector(target).classList.remove("is-hidden");

};

const retourHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;

    ecrans.forEach(element => {
        if (!element.classList.contains("is-hidden") && element.id !== 'ecran-accueil') {
            element.classList.add("is-hidden");
        };
    });
};

const boutonSinscrireHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;
    ecranInscription.classList.remove("is-hidden");
};

const retourIdentificationHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;
    ecranInscription.classList.add("is-hidden");
    ecranIdentification.querySelector(".message").innerHTML = '';
};




/*
 *
 *
 *
 * 
 */
const requeteVisiteurs = "https://ingrwf-08.firebaseio.com/visiteurs.json";
const requeteUnVisiteur = idVisiteur => {
    return "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + "/visites.json";
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
const identificationForm = document.querySelector("#identification");
identificationForm.addEventListener("click", (ev) => identification(ev));

const identification = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;

    const idVisiteur = identificationForm.querySelector("#id-visiteur").value;
    if (idVisiteur === "") return;

    axios.get(requeteVisiteurs).then((response) => {
        if (response.data[idVisiteur]) {
            const idVisiteurInput = document.querySelector("#visite-idVisiteur");
            const idVisiteurInputTest = document.querySelector(
                "#visite-idVisiteur-test"
            );
            idVisiteurInput.value = idVisiteur;
            idVisiteurInputTest.textContent = idVisiteur;

            ecranEntrer.classList.remove("is-hidden");
        } else {
            ecranIdentification.querySelector(".message").innerHTML = "<p>Cet identifiant n'est pas correct</p>";
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
const inscriptionForm = document.querySelector("#inscription");
inscriptionForm.addEventListener("click", (ev) => inscription(ev));

const inscription = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;

    const visiteurNom = inscriptionForm.querySelector("#inscription-nom").value;
    const visiteurPrenom = inscriptionForm.querySelector("#inscription-prenom")
        .value;
    const visiteurEmail = inscriptionForm.querySelector("#inscription-email")
        .value;

    const urlPost = "https://ingrwf-08.firebaseio.com/visiteurs.json";
    const nouveauVisiteur = {
        nom: visiteurNom,
        prenom: visiteurPrenom,
        email: visiteurEmail,
        photo: "hello.jpg",
    };
    axios.post(urlPost, nouveauVisiteur).then((response) => {
        console.log(response.data.name);
        const idVisiteurInput = document.querySelector("#visite-idVisiteur");
        const idVisiteurInputTest = document.querySelector(
            "#visite-idVisiteur-test"
        );
        idVisiteurInput.value = response.data.name;
        idVisiteurInputTest.textContent = response.data.name;
        ecranEntrer.classList.remove("is-hidden");
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
const entrerForm = document.querySelector("#entrer");
const visiteObjet = document.querySelector("#visite-objet");
const visiteFormation = document.querySelector("#visite-formation");
const visiteFormationContainer = visiteFormation.closest(".field");
const visitePersonnel = document.querySelector("#visite-personnel");
const visitePersonnelContainer = visitePersonnel.closest(".field");
const visiteVisiteur = document.querySelector("#visite-idVisiteur");
entrerForm.addEventListener("click", (ev) => entrer(ev));
visiteObjet.addEventListener("change", (ev) => objetDeLaVisite(ev));

const objetDeLaVisite = (ev) => {
    ev.preventDefault();

    /*
     *
     * Formation
     *
     */
    if (ev.target.value === "formation") {
        const urlPost = "https://mathieu.go.yo.fr/wp-json/wp/v2/formations";

        axios.get(urlPost).then((response) => {
            response.data.forEach((el) => {
                const formationID = el.id;
                const formationTitle = el.title.rendered;
                const formationLocal = el.acf.local;
                const formationDebut = el.acf.formations_date_de_debut
                    .split("/")
                    .reverse()
                    .join("");
                const formationFin = el.acf.formations_date_de_fin
                    .split("/")
                    .reverse()
                    .join("");

                if (isBetween(myToday(), formationDebut, formationFin) !== false) {
                    visiteFormation.innerHTML +=
                        '<option value="' +
                        formationID +
                        '" data-local="' +
                        formationLocal +
                        '">' +
                        formationTitle +
                        "</option>";
                }
            });

            visiteFormationContainer.classList.remove("is-hidden");
            if (!visitePersonnelContainer.classList.contains("is-hidden")) {
                visitePersonnelContainer.classList.add("is-hidden");
            }
        });
    }

    /*
     *
     * Personnel
     *
     */
    if (ev.target.value === "personnel") {
        const urlPost = "http://mathieu.go.yo.fr/wp-json/wp/v2/membres_personnel";

        axios.get(urlPost).then((response) => {
            response.data.forEach((el) => {
                const personnelID = el.id;
                const personnelTitle = el.title.rendered;
                const personnelLocal = el.acf.local;
                visitePersonnel.innerHTML +=
                    '<option value="' +
                    personnelID +
                    '" data-local="' +
                    personnelLocal +
                    '">' +
                    personnelTitle +
                    "</option>";
            });

            visitePersonnelContainer.classList.remove("is-hidden");
            if (!visiteFormationContainer.classList.contains("is-hidden")) {
                visiteFormationContainer.classList.add("is-hidden");
            }
        });
    }
};

/*
 *
 * Entrer
 *
 */

const entrer = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;
    if (visiteObjet.value !== "formation" && visiteObjet.value !== "personnel") return;

    let idVisite = "";
    let urlVisite = "";
    if (visiteObjet.value === "formation") {
        idVisite = visiteFormation.value;
        urlVisite = "http://mathieu.go.yo.fr/wp-json/wp/v2/formations/" + idVisite;
        console.log(ev);
    } else if (visiteObjet.value === "personnel") {
        idVisite = visitePersonnel.value;
        urlVisite = "http://mathieu.go.yo.fr/wp-json/wp/v2/membres_personnel/" + idVisite;
    }
    const idVisiteur = visiteVisiteur.value;

    const urlPost =
        "https://ingrwf-08.firebaseio.com/visiteurs/" +
        idVisiteur +
        "/visites.json";
    const nouvelleDate = {
        date: myToday(),
        objet: visiteObjet.value,
        id: idVisite,
        terminee: false,
    };
    axios.post(urlPost, nouvelleDate).then((response) => {

        const requeteVisiteur = "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + ".json";
        axios.all([
            axios.get(requeteVisiteur),
            axios.get(urlVisite)
        ]).then((response) => {
            const visiteur = response[0].data;
            const visite = response[1].data;

            let content = "<h1>Bonjour " + visiteur.prenom + ", bonne visite</h1>";
            content += "<p>Nom:  " + visiteur.nom + "</p>";
            content += "<p>Prénom:  " + visiteur.prenom + "</p>";
            content += "<p>Identifiant: " + idVisiteur + "</p>";
            content += "<br />";
            if (visite.type === "membres_personnel") {
                content += "<p>Vous venez rendre visite à: " + visite.title.rendered + "</p>";
            }
            if (visite.type === "formations") {
                content += "<p>Vous venez ici pour la formation: " + visite.title.rendered + "</p>";
            }
            content += "<p>Veuillez vous rendre au Local: " + visite.acf.local + "</p>";

            ecranProfil.querySelector(".profil-datas").innerHTML = content;
            ecranProfil.classList.remove('is-hidden');
        });

    });
};

/*
 *
 * sortie
 *
 */

const sortirForm = document.querySelector("#sortir");
sortirForm.addEventListener("click", (ev) => terminerVisite(ev));

const terminerVisite = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;

    const idVisiteur = sortirForm.querySelector("#sortir-id-visiteur").value;
    if (idVisiteur === "") return;
    const urlPost = requeteUnVisiteur(idVisiteur);
    axios.get(urlPost).then((response) => {
        const visites = response.data;

        if (visites === null) {
            ecranSortir.querySelector('.message').innerHTML = "<p>Cet identifiant n'est pas correct</p>";
        }

        for (const visite in visites) {
            console.log("no");
            const urlPost = "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + "/visites/" + visite + "/terminee.json";
            axios.put(urlPost, true).then((response) => {

                ecranFin.classList.remove('is-hidden');
                setTimeout(window.location.reload.bind(window.location), 3000);

            });
        }
    });
};

/*
 *
 * Outdated
 *
 */
sortirForm.addEventListener("click", (ev) => supprimerDatePerimee(ev));

const supprimerDatePerimee = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;

    // const idVisiteur = sortirForm.querySelector("#sortir-id-visiteur");

    const urlPost = "https://ingrwf-08.firebaseio.com/visiteurs.json";

    axios.get(urlPost).then((response) => {
        const visiteurs = response.data;
        for (const visiteur in visiteurs) {
            // console.log(visiteurs[visiteur], visiteur);
            const visites = visiteurs[visiteur].visites;
            if (visites) {
                const deadline = myTodayMinus15();
                // console.log(visites);
                for (const visite in visites) {
                    //console.log(visites[visite].date);
                    const visiteDate = visites[visite].date;
                    if (visiteDate < deadline) {
                        console.log(
                            "supprimer cette date: ",
                            "id du visiteur: " + visiteur,
                            "id de la visite: " + visite,
                            "date de la visite: " + visiteDate,
                            "date de la d'ajd: " + deadline
                        );
                        const urlPost =
                            "https://ingrwf-08.firebaseio.com/visiteurs/" +
                            visiteur +
                            "/visites/" +
                            visite +
                            ".json";

                        axios.delete(urlPost).then((response) => {
                            // console.log(response.data);
                        });
                    }
                }
            }
        }
    });
};