const titleElement = document.querySelector('title');
const programsNavList = document.getElementById('programas');
const programsNavMobList = document.getElementById('programas_mobile_nav');
const infoDirector = document.getElementById('about_director');
const descriptionAboutUs = document.getElementById('about_us_description');
const programsContent = document.getElementById('study_programs_groups');
const linkLibrary = document.getElementById('virtual_link_library')

const backgroundFooter = document.getElementById('background_image_footer');
const backgroundStatistics = document.getElementById('background_image_statistics');
const logo = document.getElementById('logo');
const logoUnnamed = document.getElementById('logo_unnamed');

const textFooterInstitute = document.getElementById('text_instituto_footer');
const copyrightInstitute = document.getElementById('copyright_instituto');
const addressText = document.getElementById('address_text');
const locationText = document.getElementById('location_text');
const openingHours = document.getElementById('opening_hours_text');
const phoneNumberFooter = document.getElementById('phone_number_footer');

const countStudent = document.getElementById('count_students');
const countGraduate = document.getElementById('count_graduates');
const countProgram = document.getElementById('count_programs');
const countYearCreation = document.getElementById('count_years_creation');

const linkFacebookFooter = document.getElementById('link_facebook_footer');
const linkEmailFooter = document.getElementById('link_email_footer');

document.addEventListener('DOMContentLoaded', () => {
    renderInfo();
});

async function renderInfo(){
    try{
        const response = await fetch("/assets/config/data.json")
        if (!response.ok){
            console.log("error en la ruta, no se econtro")
            return;
        }
        const data = await response.json();
        renderProgramsNav(data);
        renderProgramsNavMob(data);
        renderAboutUs(data);
        renderVirtualLink(data);
        renderPrograms(data);
        renderImage(data);
        renderTextInstute(data);
        renderStatistics(data);
        renderFooterInfo(data);
        renderSocialNetwork(data);
    }catch(error){
        console.error(error)
    }
}
function renderProgramsNav(data){
    const listPrograms = data["programas"];
    listPrograms.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="${element.url}">${element.nombre}</a>`;    
        programsNavList.appendChild(li);
    });
}
function renderProgramsNavMob(data){
    const listPrograms = data["programas"];
    listPrograms.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="${element.url}">${element.nombre}</a>`;    
        programsNavMobList.appendChild(li);
    });
}

function renderPrograms(data){
    const listPrograms = data["programas"];
    listPrograms.forEach(element =>{
        let div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <img class="card-img-top mb-20" src="${element["imagen"]}" alt="${element["nombre"]}">
            <div class="card-body">
                <h3 class="card-title fw-bold mb-20">${element["nombre"]}</h3>
                <p class="card-text mb-20">${element["descripción"]}</p>
            </div>
            <div class="card-footer">
                <a href="${element["url"]}">
                    <i class='bx bxs-show'></i>
                    <span class="ml-10 fw-bold">Ver programa</span>
                </a>
            </div>
        `;
        programsContent.appendChild(div);
    })
}
function renderAboutUs(data){
    infoDirector.innerHTML = `
        <img src="${data["sobre_nosotros"]["director_imagen"]}" alt="${data["sobre_nosotros"]["director_nombre"]}" class="about-director-img">
        <p class="about-director-information" >${data["sobre_nosotros"]["director_nombre"]}<span class="about-director-information-charge">Director del IESTP</span></p>`;
}
function renderImage(data){
    backgroundStatistics.style.backgroundImage = `url(${data["imágenes"]["imagen_estadistica"]})`;
    backgroundFooter.style.backgroundImage = `url(${data["imágenes"]["imagen_pie_pagina"]})`;
    logo.src = data["imágenes"]["logo"];
    logoUnnamed.src = data["imágenes"]["logo_sin_nombre"];
}
function renderTextInstute(data){
    var textInstitute = data["informacion"]["nombre"];
    titleElement.textContent = `IESTP ${textInstitute.toUpperCase()}`
    copyrightInstitute.innerHTML = textInstitute;
    textFooterInstitute.innerHTML = textInstitute;
}
function renderStatistics(data){
    countStudent.innerHTML = data["estadisticas"]["cantidad_estudiantes"];
    countGraduate.innerHTML = data["estadisticas"]["cantidad_titulados"];
    countProgram.innerHTML = data["estadisticas"]["cantidad_programas"];
    countYearCreation.innerHTML = data["estadisticas"]["cantidad_años_creación"];
}
function renderFooterInfo(data){
    addressText.innerHTML = data["informacion"]["dirección"];
    locationText.innerHTML = data["informacion"]["ubicación"];
    openingHours.innerHTML = data["informacion"]["horarios_de_atención"];
    phoneNumberFooter.innerHTML = data["informacion"]["teléfono"];
}
function renderSocialNetwork (data){
    linkFacebookFooter.src = data["enlaces_redes"]["facebook"];
    linkEmailFooter.src = data["enlaces_redes"]["email"];
}
function renderVirtualLink(data){
    linkLibrary.href = data["informacion"]["biblioteca"];
}