const express = require("express");
var admin = require('firebase-admin');
const res = require("express/lib/response");
const app = express();
const cors = require("cors");

var serviceAccount = require("./mineralsim-dc35a-firebase-adminsdk-8egtc-a950ac9634.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mineralsim-dc35a-default-rtdb.firebaseio.com"
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/Create", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nombre = req.body.nombre;
    const isAdmin = req.body.admin;
    const uidadmin = req.body.uidAdmin;
 
    if (email, password, nombre, (isAdmin!=null))
        admin
            .auth()
            .getUser(uidadmin)
            .then((userRecord) => {
             
                // The claims can be accessed on the user record.
                if (userRecord.customClaims['admin']) admin.auth().createUser({
                    email,
                    emailVerified: false,
                    password: password,
                    displayName: nombre,
                    disabled: false,
                }).then((user) => {
                   
                    
                    admin.auth().setCustomUserClaims(user.uid, { admin: isAdmin }).then().catch(() => console.log('error admin'))

                }).catch((error) => {
                    console.log('registro no exitoso')
                  
                })
            }).catch(() => console.log('El uid ingresado no es de administrador'));


})

app.post("/Read", (req, res) => {
    const uidadmin = req.body.uidAdmin;
    admin
        .auth()
        .getUser(uidadmin)
        .then((userRecord) => {
            // The claims can be accessed on the user record.
            if (userRecord.customClaims['admin'])
    admin.auth().listUsers().then((users) => res.json(users.users))
}).catch(() => console.log('El uid ingresado no es de administrador'));


})
app.post("/Prueba", (req, res) => {
   res.json({name: "camilo"})

})

app.post("/Update", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nombre = req.body.nombre;
    const isAdmin = req.body.admin;
    const uidUser= req.body.uidUser;
    const uidadmin = req.body.uidAdmin;
    admin
    .auth()
    .getUser(uidadmin)
    .then((userRecord) => {
        if (userRecord.customClaims['admin'])
admin.auth().updateUser(uidUser,{ email,
    emailVerified: false,
    password: password,
    displayName: nombre,
    disabled: false,
}).then((user) => {
    console.log('registro exitoso')
  
    admin.auth().setCustomUserClaims(user.uid, { admin: isAdmin }).then().catch(() => console.log('error admin'))

}).catch((error) => {
    console.log('registro no exitoso')
 
})}).catch(()=>console.log('no es admin'))
})
app.post("/Delete", (req, res) => {
    const uidUser= req.body.uidUser;
    const uidadmin = req.body.uidAdmin;
    admin
    .auth()
    .getUser(uidadmin)
    .then((userRecord) => {
        if (userRecord.customClaims['admin'])
    admin
    .auth()
    .deleteUser(uidUser)
    .then(() => {
     
    })
    .catch((error) => {
    
    });}).catch()
})
app.listen(3050, () => console.log('server started'))
