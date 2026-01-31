import * as global from "../../js/global.js";

// Pintamos Bienvenida de usuario
if (localStorage.getItem('username')) {
    let username = localStorage.getItem('username');
    $(".username").html(username);
}

//Variables principales
let data = new Object(); //Creación de objeto data
data.accion = "leftMenu";

//LLAMAMOS funcion peticion(data) de Global
global.peticion(data).then(function (res) {
    //Pintamos LEFT MENU

    //Vistas
    let bloqueSeccionMain = res.bloqueSeccionMain;
    let bloqueBtnLogOut = res.bloqueBtnLogOut;
    // let bloqueSubSeccionMain = res.bloqueSubSeccionMain;
    // let bloqueSubSeccionLiMain = res.bloqueSubSeccionLiMain;

    //Datos
    let secciones = res.secciones;
    //Declaramos variables necesarias
    let templateSecciones = "";
    let cadBloqueSeccionMain = "";
    let seccion = "";
    let nombreSeccion = "";
    let iconSeccion = "";
    let countSeccion = 0;
    let classSeccion = "";

    //Empezamos recorrido de secciones para PINTADO 
    Object.keys(secciones).forEach(k => {
        countSeccion++; //Incrementamos contador
        //Cuando sea el 1° elemento de la sección agregamos clase Activa
        classSeccion = (countSeccion === 1 ? 'active bg-gradient-primary' : 'bg-gradient-secondary');
        // console.log(secciones[k]);
        // console.log(secciones[k].seccion);
        seccion = secciones[k].seccion; //Guardamos Seccion
        nombreSeccion = secciones[k].nombre; //Guardamos label de seccion
        iconSeccion = secciones[k].iconSeccion //Guardamos icon Seccion
        cadBloqueSeccionMain += bloqueSeccionMain
            .replace(/\[idSeccion]/g, secciones[k].idSeccion)
            .replace(/\[seccion]/g, seccion)
            .replace(/\[labelSeccion]/g, nombreSeccion)
            .replace(/\[iconSeccion]/g, iconSeccion)
            .replace(/\[classSeccion]/g, classSeccion);

        templateSecciones += cadBloqueSeccionMain;
        cadBloqueSeccionMain = ""; //Una vez agregado a template, Vaciamos bloque de Seccion
    });

    templateSecciones += bloqueBtnLogOut;
    $("#bloqueSecciones").html(templateSecciones); //Agregamos a Contenedor de Secciones y BTN LOG OUT

    //Funcionalidad LOGOUT/Cerrar sesión
    $("#btnLogOut").click(function () {
        localStorage.removeItem("username");
        // localStorage.removeItem('admin');
        //Redirigimos a Login y eliminamos cache
        location.replace('../../login/vista/login.html');
    });

    //FUNCIONALIDAD DE PINTADO DE CONTENIDO DE -> SECCION ACTIVA EN LEFT MENU

    // Funcionalidad SectionMain de global que regresa sección que esta activa desde el Inicio
    let activeSection = global.sectionMain();

    if (activeSection) { //Si seccion Activa es diferente de False ...
        //Agregamos nombre de sección Activa a encabezado
        $('#sectionActive').html(activeSection);
        $('#titleSection').html(activeSection);

        //Convertimos a minusculas nombre de Sección Activa
        const scriptSectionActive = activeSection.toLowerCase();

        //PASAMOS SECCIÓN ACTIVA COMO PARAMETRO PARA LLAMAR RESPECTIVO SCRIPT DE LA SECCION... y posteriormente pintar seccion activa
        global.cargarScript('module', `../../${scriptSectionActive}/js/${scriptSectionActive}.js`, function () {
            return;
        });
    }

    //Funcionalidad clickActiveSection que regresa la Sección a la que se dio click para Activarla y posteriormente pintar seccion activa
    global.clickActiveSection();

}).catch(function (error) {
    console.log(error);
});

