const URL_GLOBAL = 'https://josemariaarguedas.iestpsanjuan.edu.pe';

const categoryModal = 32;
const sizeModal = 4;

const categorySlider = 24;
const sizeSlider = 4;

const categoryNews = 29;
const sizeNews = 2;

const categoryCommunicated = 29;
const sizeCommunicated = 3;
// const searchText = document.getElementById('txt-buscar'); //borrar
const contentNews = document.getElementById('news-group');
const contentCommunicated = document.getElementById('communicated-group');
const buttonSearch = document.getElementById('send-search');
const slider = document.getElementById('slider-section');
const modal = document.getElementById('modal-section');


document.addEventListener('DOMContentLoaded', () => {
    // paintModal(); -> no se esta usando
    paintSlider();
    paintNews();
    paintCommunicated();
    // pintarModal();
    // pintarNews(); ->borrar
    // pintarSlider();

    //search   
    // buttonSearch.addEventListener('click', ()=>{
    //     search(searchText.value);
    // });
});
// borrar ya no hay buscador
function search(text = '') {
    if (text.trim() !== '') {
        window.open(`https://josemariaarguedas.iestpsanjuan.edu.pe/index.php?s=${text}`);
        //window.location.href = `https://ww2.institutoaucara.edu.pe/index.php?s=${text}`;
    }
}

function paintModal(){
    getCategories(categoryModal, sizeModal).then(data =>{
        const promises = data.map(category =>{
            const div = document.createElement('div');
            return getMedia(category).then(data => {
                div.classList.add('carousel-item', 'active');
                div.innerHTML = `
                <img src="${data.source_url}" class="d-block w-100" alt="">
                `;
                modal.appendChild(div);
            });
        });
        return Promise.all(promises);
    }).then(()=>{
        if (modal.hasChildNodes){
            $(document).ready(function (){
                $("#mostrarmodal").modal("show");
            })
        }
    }).catch(error =>{
        console.error(error);
    });
}

function paintSlider(){
    let firstItem = true;
    getCategories(categorySlider, sizeSlider).then(data =>{
        const promises = data.map(category=>{
            const div = document.createElement('div');
            return getMedia(category).then(data =>{
                if(firstItem){
                    div.classList.add('active');
                    firstItem = false;
                }
                div.classList.add('carousel-item');
                div.innerHTML = `
                <img src="${data.source_url}" class="d-block w-100" alt="">
                <div class="container">
                    <div class="hero-content">
                        <h2 class="fade-in-right-2">${category.title.rendered}</h2>		
                    </div>
                </div>
                `;
                slider.appendChild(div);
            });
        });
        return Promise.all(promises);
    }).catch(error =>{
        console.error(error);
    })
}

function paintNews() {
    getCategories(categoryNews, sizeNews).then(data => {
        const promises = data.map(category => {
            return getMedia(category).then(data => {
                const div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = `
                <div class="card">
                    <img class="card-img-top mb-20" src="${data.media_details ? data.media_details.sizes.medium.source_url : '/assets/images/sin_imagen.png'}" alt="${category.name}" width="263" height="194">
                    <div class="card-body">
                        <h4 class="card-title fw-bold mb-15">${category.title.rendered}</h4>
                        <div class="card-calendar mb-15">
                            <i class='bx bx-calendar'></i>
                            <span class="card-date">${dateToString(data.date)}</span>
                        </div>
                        <p class="card-text mb-20">Estudiantes en las clases semipresenciales del Programa de Estudio: Producción Agropecuaria IV; realizan sus Prácticas Cálculo de fertilización por planta</p>
                    </div>
                    <div class="card-footer">
                        <a href="${category.link}"><span class="fw-bold">Leer más</span></a>
                    </div>
                </div>
                `;
                contentNews.appendChild(div);
            });
        });
        return Promise.all(promises);
    }).catch(error => {
        console.error(error);
    });
}

function paintCommunicated(){
    getCategories(categoryCommunicated, sizeCommunicated).then(data =>{
        const promises = data.map(category =>{
            return getMedia(category).then(data =>{
                const div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = `
                <div class="card">
                    <img class="card-img-top mb-20" src="${data.media_details ? data.media_details.sizes.medium.source_url : '/assets/images/sin_imagen.png'}" alt="${category.name}">
                    <a class="card-body" href="${category.link}">
                        <h4 class="card-title fw-bold mb-15">${category.title.rendered}</h4>
                        <div class="card-calendar mb-15">
                            <i class='bx bx-calendar'></i>
                            <span class="card-date">${dateToString(data.date)}</span>
                        </div>
                    </a>
                </div>
                `;
                contentCommunicated.appendChild(div);
            });
        });
        return Promise.all(promises);
    }).catch(error =>{
        console.error(error);
    })
}

function dateToString(date){
    const event = new Date(date);
    return event.toLocaleDateString('es-PE',{hour: '2-digit', minute:'2-digit'});
}

//request
async function getCategories(category, size) {
    try{
        const categories = await fetch(`${URL_GLOBAL}/wp-json/wp/v2/posts?per_page=${size}&categories=${category}&offset=0`)
        if(!categories.ok){
            console.log("No se encontró la data")
            return;
        }
        const data = await categories.json();
        return data;
    }catch(error){
        console.error(error)
    }
}
async function getMedia(category) {
    try{
        const media = await fetch(`${URL_GLOBAL}/wp-json/wp/v2/media/${category.featured_media}`)
        if(!media.ok){
            console.log("No se encontró la data");
            return;
        }
        const data = await media.json();
        return data;
    } catch(error){
        console.error(e);
    }
}
