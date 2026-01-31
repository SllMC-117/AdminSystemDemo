import * as global from "../../js/global.js";
//Variables principales
let data = new Object(); //Creación de objeto data para petición
//Esenciales para validar FORMS
let form;
let rules;
let msgs;
let formValid;

//Funcionalidad -> VALIDAR LOGIN
$(".btnLogin").click(function () {
    //Valores del frm
    form = 'frmLogin';
    rules = {
        txtNombreUsuario: "required",
        txtToken: "required"
    }
    msgs = {
        txtNombreUsuario: "*Favor de llenar el campo requerido.",
        txtToken: "*Favor de llenar el campo requerido."
    }

    //Mandamos llamar función del Global Validation form... que nos devuelve valor booleano TRUE/FALSE dependiendo si Form es valido
    formValid = global.validationForm(form, rules, msgs);
    if (formValid) {
        //Envío de objeto
        data.accion = "validarLogin";
        data.user = $("#txtNombreUsuario").val();
        data.token = $("#txtToken").val();

        //Pasamos parámetro Obj data para que se envíe a PETICION
        validarLogin(data);
        //Reseteamos todos los valores del form
        $(`#${form}`).trigger("reset");
    }
});

//Función para validar Login
function validarLogin(data) {
    global.peticion(data).then(function (res) {
        console.log('Respuesta de validar Login ', res);
        //Si Error FALSE
        if (!res.error) {
            //Agregamos datos de nuestro interés al Local Storage
            localStorage.setItem('username', res.userName);
            // localStorage.setItem('ad', res.rolAd);

            //Redirigimos a inicio
            setTimeout(() => {
                location.replace('../../inicio/vista/main.html');
            }, 2000);
        } else { //Error TRUE
            //Reseteamos todos los valores del form
            $(`#${form}`).trigger("reset");
        }

        //Llamamos Funcion Alert de Global para mostrar avisos dependiendo Error
        global.alert(res);
    }).catch(function (error) {
        console.log(error); //Controlamos errores de peticion
    });
}