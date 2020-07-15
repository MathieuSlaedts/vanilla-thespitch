import "bulma";
import "./assets/style.scss";
//import "./assets/qrcode.min.js";
import "regenerator-runtime/runtime";
import axios from "axios";
import QRCode from "qrcode";

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

const isBetween = (n, a, b) => {
    return (n - a) * (n - b) <= 0;
};

/*
 *
 *
 *
 * accueil
 *
 *
 *
 */
const ecrans = document.querySelectorAll(".ecran");
const ecranAccueil = document.querySelector("#ecran-accueil");
const ecranProfil = document.querySelector("#ecran-profil");
const ecranFin = document.querySelector("#ecran-fin");
const ecranConfidentialite = document.querySelector("#ecran-confidentialite");

const retour = document.querySelectorAll(".retour");
const boutonSinscrire = document.querySelectorAll(".bouton-sinscrire a");
const retourIdentification = document.querySelector(".retour-identification");

ecranAccueil.addEventListener("click", (ev) => accueilHandler(ev));
retour.forEach((el) => {
    el.addEventListener("click", (ev) => retourHandler(ev));
});
boutonSinscrire.forEach((el) => {
    el.addEventListener("click", (ev) => boutonSinscrireHandler(ev));
});
retourIdentification.addEventListener("click", (ev) =>
    retourIdentificationHandler(ev)
);

const accueilHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;

    const target = ev.target.dataset.target;
    document.querySelector(target).classList.remove("is-hidden");
};

const retourHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;

    ecrans.forEach((element) => {
        if (!element.classList.contains("is-hidden") &&
            element.id !== "ecran-accueil"
        ) {
            element.classList.add("is-hidden");
        }
    });
    resetValues();
};

const boutonSinscrireHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;
    inscriptionEcran.classList.remove("is-hidden");

    const video = document.querySelector("video");
    const screenshotButton = document.querySelector("#screenshot-button");
    const img = document.querySelector("#screenshot-img");
    const canvas = document.createElement("canvas");

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
    });

    screenshotButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        img.src = canvas.toDataURL("image/webp");
        img.classList.remove("is-hidden");
        //console.log(canvas.toDataURL("image/webp"));
    });
};

const retourIdentificationHandler = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "A") return;
    inscriptionEcran.classList.add("is-hidden");
    IdentificationEcran.querySelector(".message").innerHTML = "";
    resetValues();
};

/*
 *
 *
 *
 *
 */
const requeteFirebase = "https://ingrwf-08.firebaseio.com/visiteurs";
const requeteWordpress = "http://mathieu.go.yo.fr/wp-json/wp/v2/";

const requeteVisiteurs = requeteFirebase + ".json";
const requeteFormations = requeteWordpress + "formations";
const requetePersonnels = requeteWordpress + "membres_personnel";

const requeteUnVisiteur = (idVisiteur) => {
    return (
        "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + "/visites.json"
    );
};

const requeteUneDateTerminee = (idVisiteur, idVisite) => {
    return (
        requeteFirebase +
        "/" +
        idVisiteur +
        "/visites/" +
        idVisite +
        "/terminee.json"
    );
};

/*
 *
 *
 * Identification
 *
 *
 */

const IdentificationEcran = document.querySelector("#ecran-identification");
const identificationForm = IdentificationEcran.querySelector("#identification");
const identificationInput = document.querySelector("#visite-visiteur");
const identificationMessage = IdentificationEcran.querySelector(".message");
identificationForm.addEventListener("click", (ev) => identification(ev));

const identification = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;

    const idVisiteur = identificationForm.querySelector("#id-visiteur").value;
    if (idVisiteur === "") {
        identificationMessage.innerHTML = "<p>Vous devez entrer un identifant</p>";
        return;
    }

    const requeteIdentification = async() => {
        try {
            const response = await axios.get(requeteVisiteurs);
            if (response.data[idVisiteur]) {
                identificationInput.value = idVisiteur;
                console.log(idVisiteur);

                entrerEcran.classList.remove("is-hidden");
            } else {
                identificationMessage.innerHTML =
                    "<p>Cet identifiant n'est pas correct</p>";
            }
        } catch (err) {
            console.error(err);
        }
    };
    requeteIdentification();
};

/*
 *
 *
 * Inscription
 *
 *
 */
const inscriptionEcran = document.querySelector("#ecran-inscription");
const inscriptionForm = document.querySelector("#inscription");
inscriptionForm.addEventListener("click", (ev) => inscription(ev));

const inscription = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;

    const nouveauVisiteur = {
        nom: inscriptionForm.querySelector("#inscription-nom").value,
        prenom: inscriptionForm.querySelector("#inscription-prenom").value,
        email: inscriptionForm.querySelector("#inscription-email").value,
        photo: document.querySelector("#screenshot-img").src,
    };
    const requeteInscription = async() => {
        try {
            const response = await axios.post(requeteVisiteurs, nouveauVisiteur);
            if (response.data) {
                const idVisiteur = response.data.name;
                const idVisiteurInput = document.querySelector("#visite-visiteur");
                idVisiteurInput.value = idVisiteur;
                console.log(idVisiteur);

                entrerEcran.classList.remove("is-hidden");
            } else {
                // Aucune donnee
            }
        } catch (err) {
            console.error(err);
        }
    };
    requeteInscription();
};

/*
 *
 *
 * Forumulaire Options de visites
 *
 *
 */
const visiteObjet = document.querySelector("#visite-objet");
const visiteFormation = document.querySelector("#visite-formation");
const visiteFormationContainer = visiteFormation.closest(".field");
const visitePersonnel = document.querySelector("#visite-personnel");
const visitePersonnelContainer = visitePersonnel.closest(".field");
const visiteVisiteur = document.querySelector("#visite-visiteur");
visiteObjet.addEventListener("change", (ev) => objetDeLaVisite(ev));

const objetDeLaVisite = (ev) => {
    ev.preventDefault();

    /* Formation */
    if (ev.target.value === "formation") {
        const requeteFormationsS = async() => {
            try {
                const response = await axios.get(requeteFormations);
                if (response.data) {
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
                } else {
                    // Aucune donnee
                    entrerForm.innerHTML =
                        "<p>Il n'y a aucune formation en ce moment</p>";
                }
            } catch (err) {
                console.error(err);
            }
        };
        requeteFormationsS();
        axios.get(requeteFormations).then((response) => {});
    }

    /* Personnel */
    if (ev.target.value === "personnel") {
        const requetePersonnelS = async() => {
            try {
                const response = await axios.get(requetePersonnels);
                if (response.data) {
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
                } else {
                    // Aucune donnee
                    entrerForm.innerHTML = "<p>Il n'y a aucun membre du personnel</p>";
                }
            } catch (err) {
                console.error(err);
            }
        };
        requetePersonnelS();
        axios.get(requetePersonnels).then((response) => {});
    }
};

/*
 *
 * Entrer
 *
 */
const entrerEcran = document.querySelector("#ecran-entrer");
const entrerForm = document.querySelector("#entrer");
const entrerMessage = entrerEcran.querySelector(".message");
entrerForm.addEventListener("click", (ev) => entrer(ev));

const entrer = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;
    if (visiteObjet.value !== "formation" && visiteObjet.value !== "personnel")
        return;

    let idVisite = "";
    let urlVisite = "";
    if (visiteObjet.value === "formation") {
        idVisite = visiteFormation.value;
        urlVisite = "http://mathieu.go.yo.fr/wp-json/wp/v2/formations/" + idVisite;
        console.log(ev);
    } else if (visiteObjet.value === "personnel") {
        idVisite = visitePersonnel.value;
        urlVisite =
            "http://mathieu.go.yo.fr/wp-json/wp/v2/membres_personnel/" + idVisite;
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
        const requeteVisiteur =
            "https://ingrwf-08.firebaseio.com/visiteurs/" + idVisiteur + ".json";
        axios
            .all([axios.get(requeteVisiteur), axios.get(urlVisite)])
            .then((response) => {
                const visiteur = response[0].data;
                const visite = response[1].data;

                let content = "<h1>Bonjour " + visiteur.prenom + ", bonne visite</h1>";
                content += "<div class='img-container'>";
                const generateQR = async(text) => {
                    try {
                        qrCode = await QRCode.toDataURL(text, {}, function(err, url) {
                            content += "<img src=" + url + " />";
                            //console.log(url);
                        });
                    } catch (err) {
                        //console.error(err);
                    }
                };
                generateQR(idVisiteur);

                content += "<img src=" + visiteur.photo + " />";

                content += "</div>";

                content += "<p>Nom:  " + visiteur.nom + "</p>";
                content += "<p>Prénom:  " + visiteur.prenom + "</p>";
                content += "<p>Identifiant: " + idVisiteur + "</p>";
                content += "<br />";
                if (visite.type === "membres_personnel") {
                    content +=
                        "<p>Vous venez rendre visite à: " + visite.title.rendered + "</p>";
                }
                if (visite.type === "formations") {
                    content +=
                        "<p>Vous venez ici pour la formation: " +
                        visite.title.rendered +
                        "</p>";
                }
                content +=
                    "<p>Veuillez vous rendre au Local: " + visite.acf.local + "</p>";

                ecranProfil.querySelector(".profil-datas").innerHTML = content;
                ecranProfil.classList.remove("is-hidden");
            });
    });
};

/*
 *
 * sortir
 * Last visite vas permettre de modifier uniquement la visite actuelle
 *
 */
const sortirEcran = document.querySelector("#ecran-sortir");
const sortirForm = document.querySelector("#sortir");
const sortirMessage = sortirEcran.querySelector(".message");
sortirForm.addEventListener("click", (ev) => terminerVisite(ev));

const terminerVisite = (ev) => {
    ev.preventDefault();
    if (ev.target.tagName !== "BUTTON") return;

    const idVisiteur = sortirForm.querySelector("#sortir-id-visiteur").value;
    if (idVisiteur === "") {
        identificationMessage.innerHTML = "<p>Vous devez entrer un identifant</p>";
        return;
    }

    const terminerDate = async(idVisiteur, idVisite) => {
        try {
            const response = await axios.put(
                requeteUneDateTerminee(idVisiteur, idVisite),
                true
            );
            if (response) {
                ecranFin.classList.remove("is-hidden");
                setTimeout(window.location.reload.bind(window.location), 3000);
            } else {
                sortirMessage.innerHTML = "<p>Cet identifiant n'est pas correct</p>";
            }
        } catch (err) {
            console.error(err);
        }
    };

    const requeteSortir = async() => {
        try {
            const response = await axios.get(requeteUnVisiteur(idVisiteur));
            if (response.data) {
                const visites = response.data;

                for (const visite in visites) {
                    terminerDate(idVisiteur, visite);
                }
            } else {
                sortirMessage.innerHTML = "<p>Cet identifiant n'est pas correct</p>";
            }
        } catch (err) {
            console.error(err);
        }
    };
    requeteSortir();
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

/*
 *
 * reset values
 *
 */

const resetValues = () => {
    identificationForm.reset();
    inscriptionForm.reset();
    entrerForm.reset();
    sortirForm.reset();
    const screenshotImg = document.querySelector("#screenshot-img");
    screenshotImg.removeAttribute("src");
    if (!screenshotImg.classList.contains("is-hidden")) {
        screenshotImg.classList.add("is-hidden");
    }
    if (!visiteFormationContainer.classList.contains("is-hidden")) {
        visiteFormationContainer.classList.add("is-hidden");
    }
    if (!visitePersonnelContainer.classList.contains("is-hidden")) {
        visitePersonnelContainer.classList.add("is-hidden");
    }
    console.log("YO");
};