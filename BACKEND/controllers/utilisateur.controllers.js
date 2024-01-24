const {v4: uuidv4} = require("uuid");
const {ACCESS_TOKEN_SECRET} = require("../config.js");

const jwt = require('jsonwebtoken');
const db = require("../models");
const util = require("util");
const Utilisateur = db.utilisateur;
const Op = db.Sequelize.Op;

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '1800s'});
}

exports.login = (req, res) => {
    const utilisateur = {
        login: req.body.login,
        password: req.body.password
    };


    const loginRegex = /^[a-zA-Z0-9]+$/;
    if (!loginRegex.test(utilisateur.login)) {
        return res.status(400).send({
            message: "Le login ne doit contenir que des caractères alphanumériques"
        });
    }

    const passwordRegex = /^[A-Za-z\d@$!%*#?&]+$/;
    if (!passwordRegex.test(utilisateur.password)) {
        return res.status(400).send({
            message: "Le mot de passe contient des caractères illégaux"
        });
    }


    Utilisateur.findOne({ where: { login: utilisateur.login } })
        .then(data => {

                if (data.password === utilisateur.password) {
                    const user = {
                        id: data.id,
                        nom: data.nom,
                        prenom: data.prenom,
                        email: data.email,
                    };

                    let accessToken = generateAccessToken(user);
                    res.setHeader('Authorization', `Bearer ${accessToken}`);
                    user.token = accessToken;

                    console.log (accessToken);

                    res.send(user);
                }
                else{
                    res.status(401).send({
                        message: "Mot de passe incorrect"
                    });
                }
            }
        )
        .catch(err => {
            res.status(500).send({
                message: "Nom d'utilisateur ne figure pas dans la base"
            });
        });
};

exports.accountcreation = (req, res) => {
    const utilisateur = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        codepostal: req.body.codepostal,
        ville: req.body.ville,
        sexe: req.body.sexe,
        telephone: req.body.telephone,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password
    };

    const nomRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if(!nomRegex.test(utilisateur.nom)){
        return res.status(400).send({
            message: "Le nom de famille contient des caractères illégaux"
        });
    }

    const prenomRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if(!prenomRegex.test(utilisateur.prenom)){
        return res.status(400).send({
            message: "Le prénom contient des caractères illégaux"
        });
    }

    const adresseRegex = /^[A-Za-z0-9\s.-]+$/;
    if(!adresseRegex.test(utilisateur.adresse)){
        return res.status(400).send({
            message: "L'adresse contient des caractères illégaux"
        });
    }

    const postalRegex = /^\d{5}$/;
    if(!postalRegex.test(utilisateur.codepostal)){
        return res.status(400).send({
            message: "Le code postal contient des caractères illégaux"
        });
    }

    const villeRegex = /^[a-zA-Z\u0080-\u024F]+(?:. |-| |')*[a-zA-Z\u0080-\u024F]*$/;
    if(!villeRegex.test(utilisateur.ville)){
        return res.status(400).send({
            message: "La ville contient des caractères illégaux"
        });
    }

    const sexeRegex = /^[MFO]$/;
    if(!sexeRegex.test(utilisateur.sexe)){
        return res.status(400).send({
            message: "Le sexe contient des caractères illégaux"
        });
    }

    const telephoneRegex = /^0\d{9}$/;
    if(!telephoneRegex.test(utilisateur.telephone)){
        return res.status(400).send({
            message: "Le téléphone contient des caractères illégaux ou ne commence pas par 0"
        });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(utilisateur.email)) {
        return res.status(400).send({
            message: "L'e-mail contient des caractères illégaux"
        });
    }

    const loginRegex = /^[a-zA-Z0-9]+$/;
    if (!loginRegex.test(utilisateur.login)) {
        return res.status(400).send({
            message: "Le login ne doit contenir que des caractères alphanumériques"
        });
    }

    const passwordRegex = /^[A-Za-z\d@$!%*#?&]+$/;
    if (!passwordRegex.test(utilisateur.password)) {
        return res.status(400).send({
            message: "Le mot de passe contient des caractères illégaux"
        });
    }

    Utilisateur.findOne({ where: { login: utilisateur.login } })
        .then(data => {
            if (data) {
                res.status(401).send({
                    message: "Nom d'utilisateur déjà utilisé!"
                });
            }
            else{
                Utilisateur.create(utilisateur)
                    .then(data => {
                        const user = {
                            nom: data.nom,
                            prenom: data.prenom,
                            adresse: data.adresse,
                            codepostal: data.codepostal,
                            ville: data.ville,
                            sexe: data.sexe,
                            telephone: data.telephone,
                            email: data.email,
                            login: data.login,
                            password: data.password
                        };

                        let accessToken = generateAccessToken(user);
                        res.setHeader('Authorization', `Bearer ${accessToken}`);
                        user.token = accessToken;

                        console.log (accessToken);
                        res.send(user);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
                        });
                    });
            }
        })
        .catch(err => {
                res.status(500).send({
                    message: "Nom d'utilisateur déjà utilisé!"
                });
            }
        );
};
