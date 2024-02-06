// Obtener el contenedor de los productos
const productsContainer = document.getElementById("products-container");

// Obtener el elemento para mostrar el número de productos
const numProductsElement = document.getElementById("num-products");

// Obtener el select de filtrar por categoría
const categorySelect = document.getElementById("category");
closeLightbox()
// Obtener el campo de texto para buscar por título
const searchInput = document.getElementById("search-input");
let productsData;
// Obtener los datos de los productos desde el archivo JSON
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    productsData = data;
    // Filtrar por categoría y título
    const filterProducts = (category, title) => {
      productsContainer.innerHTML = ""; // Limpiar el contenedor de productos

      // Mostrar todos los productos si no se selecciona ninguna categoría y no se ingresa un título
      if (category === "" && title === "") {
        data.forEach((product) => {
          createProductCard(product);
        });

      } else {
        // Filtrar por categoría
        let filteredProducts = data;


        
        if (category !== "") {
          filteredProducts = filteredProducts.filter((product) =>
            product.category.includes(category)
          );
        }
        
        // Filtrar por título
        if (title !== "") {
          filteredProducts = filteredProducts.filter((product) =>
            product.title.toLowerCase().includes(title.toLowerCase())
          );
        }

        filteredProducts.forEach((product) => {
          createProductCard(product);
        });
      }

      // Mostrar el número de productos
      numProductsElement.textContent = `Articulos Mostrados: ${productsContainer.children.length}`;
      setupLightbox();
    };

    // Función para crear una tarjeta de producto
    const createProductCard = (product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.dataset.id = product.id; // Establecer el valor del atributo "data-id" con el valor del id del producto

      const image = document.createElement("img");
      image.src = product.images[0];
      image.alt = product.title;
      card.appendChild(image);
    
      const thumbnailContainer = document.createElement("div");
      thumbnailContainer.classList.add("thumbnail-container"); // Agrega una clase CSS si deseas estilarlo
      card.appendChild(thumbnailContainer);
      let additionalImages = 0;
      let isButtonAdded = false;

      product.thumbnail.forEach((thumbnailUrl, index) => {
        
          
        if (index !== 0 && thumbnailUrl.length <= 4) { // Ignorar la primera imagen del thumbnail
          const thumbnailImage = document.createElement("img");
          thumbnailImage.src = thumbnailUrl;
          thumbnailContainer.appendChild(thumbnailImage);
        }
        else if (thumbnailUrl.length >= 5) {
          if (index !== 0 && index !== 0 && index <= 3) { // Ignorar la primera imagen del thumbnail
            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = thumbnailUrl;
            thumbnailContainer.appendChild(thumbnailImage);
          }
          else if (index !== 0 && !isButtonAdded) {
            const thumbnailButton = document.createElement("button");
            const thumbnailRestantes = product.thumbnail.length - 4;
            thumbnailButton.textContent = thumbnailRestantes + "+";
            thumbnailButton.classList.add("thumbnail-button"); // Agrega la clase CSS deseada
            thumbnailContainer.appendChild(thumbnailButton);
            isButtonAdded = true; // Cambia el estado de la variable para indicar que el botón ya ha sido agregado
          }
        }
      });

    
      const title = document.createElement("h2");
      title.textContent = product.title;
      card.appendChild(title);
    
      const button = document.createElement("button");
      button.classList.add("whatsapp-button");
      button.addEventListener("click", () => {
        const message = encodeURIComponent(`Quiero más información del modelo: ${product.title}`);
        const url = `https://wa.me/13213287507?text=${message}`;
        window.open(url);
      });
      button.innerHTML = '<i class="fab fa-whatsapp"></i> Consultar por modelo';
      card.appendChild(button);
    
      productsContainer.appendChild(card);
    };

    // Cargar todos los productos al cargar la página por primera vez
    filterProducts("", "");

    // // Evento para filtrar los productos al seleccionar una categoría
    // categorySelect.addEventListener("change", (event) => {
    //   const title = searchInput.value;
    //   filterProducts(event.target.value, title);
      
    // });

// Seleccionar la list
    // Seleccionar la lista
const listaCategory = document.getElementById("category2");
const logo = document.querySelector("#logo");
const inputElement = document.querySelector('#search-input');
let categoria = ""

logo.addEventListener('click', () => {
  inputElement.value = '';
  filterProducts("", "");
});

listaCategory.addEventListener("click", (event) => {
  // Obtener el elemento "a" que se ha hecho clic
  const aSeleccionado = event.target;

  // Si se ha hecho clic en un "a"
  if (aSeleccionado.tagName === "A") {
    // Obtener el valor del "a"
    const valorSeleccionado = aSeleccionado.textContent;

    // Guardar el valor en una variable
    const categoriaSeleccionada = valorSeleccionado;
    
    // Mostrar la variable en la consola para confirmar
    console.log(categoriaSeleccionada);

    if (categoriaSeleccionada == "Para Hombre"){
       categoria = "hombre"
    } else  if (categoriaSeleccionada == "Para Mujer"){
      categoria = "mujer"
    }
    else  if (categoriaSeleccionada == "Niños 1 a 7"){
      categoria = "niños1to7"
    } else{
      categoria = ""
    } 
    console.log(categoria);

    const title = searchInput.value;
    filterProducts(categoria, title);
  }
});



    // Evento para filtrar los productos al escribir en el campo de búsqueda
    searchInput.addEventListener("input", (event) => {
      const category = categoria;
      const title = event.target.value;
      filterProducts(category, title);
      
    });
  });

  function setupLightbox() {
    const productCards = document.querySelectorAll('.product-card');
    const lightbox = document.getElementById('lightbox');
    // const carouselContainer =  document.getElementById('carouselContainer');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxButton = document.getElementById('lightbox-button');
    const closeButton = document.getElementById('close-button');
    
    const carouselContainer = document.getElementById('carousel-container');
    const carousel = document.getElementById('carousel');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const thumbnails = document.getElementById('thumbnails');
   
    productCards.forEach((card) => {
      const image = card.querySelector('.product-card img'); // Corregir la clase del selector
      const title = card.querySelector('h2');
      const button = card.querySelector('.whatsapp-button');
      const imagethumbnail = card.querySelectorAll('.thumbnail-container img');
      const thumbnailButton = card.querySelector('.thumbnail-button');

      let currentIndex = 0;


        //abrir al apretar imagen principal
      image.addEventListener('click', () => {
          currentIndex = 0
          openLightbox()
      });
      
      //abrir al apretar imagen thumbnail
      imagethumbnail.forEach((image, index) => {
        image.addEventListener('click', () => {
          currentIndex = index+1
              openLightbox()
          })
      });
      
      //abrir al apretar imagen boton +
      if (thumbnailButton) {
        thumbnailButton.addEventListener('click', () => {
          currentIndex = 3;
          openLightbox();
        });
      }

      function openLightbox(){
        const imageTitle = title.textContent;
        const productId = card.dataset.id;

        const images = productsData.filter(product => product.id === productId)[0].images;

  
          // Recorrer las imágenes del producto y crear elementos <img> en el carrusel y miniaturas
          images.forEach((image, index) => {
          const img = document.createElement('img');
          img.src = image;
          carousel.appendChild(img);

          const thumbnail = document.createElement('img');
          thumbnail.src = image;
          thumbnail.classList.add('thumbnail');
          thumbnail.addEventListener('click', () => {
            currentIndex = index;
            showCurrentImage();
          });
          thumbnails.appendChild(thumbnail);
        });


        
      

        // Función para mostrar la imagen actual en el carrusel
        const showCurrentImage = () => {
          // Obtener todas las imágenes en el carrusel y miniaturas
          const images = carousel.getElementsByTagName('img');
          const thumbs = thumbnails.getElementsByTagName('img');
          console.log(images.length)
          // Ocultar todas las imágenes y miniaturas
          for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
            thumbs[i].classList.remove('active');
          }

          // Mostrar la imagen actual y miniatura activa
          images[currentIndex].style.display = 'block';
          thumbs[currentIndex].classList.add('active');
        };

        // Mostrar la imagen actual
        showCurrentImage();

          const navigateNext = () => {
          currentIndex++;
          if (currentIndex >= images.length) {
            currentIndex = 0;
          }
          showCurrentImage();
        };

        // Función para navegar hacia atrás
        const navigatePrev = () => {
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = images.length - 1;
          }
          showCurrentImage();
        };

        // Agregar eventos de clic a las flechas de navegación
        carouselNext.addEventListener('click', navigateNext);
        carouselPrev.addEventListener('click', navigatePrev);

    //***************************** */

          
            // lightboxImage.src = imageUrl;
            lightboxTitle.textContent = imageTitle;
            lightboxButton.innerHTML = button.innerHTML;
          
            lightboxButton.addEventListener("click", () => {
              const message = encodeURIComponent(`Quiero más información del modelo: ${title.textContent}`);
              const url = `https://wa.me/13213287507?text=${message}`;
              window.open(url);
            });
            lightbox.style.display = 'flex';
      }







      
    });
  
    closeButton.addEventListener('click', () => {
      lightbox.style.display = 'none';
      closeLightbox()
    });
  }
  
  // Llamar a la función inicialmente
 // Seleccionar la lista

 function closeLightbox() {
  // Restablecer los valores a blanco
  const lightboxImage = document.getElementById('lightbox-image');
  lightboxImage.src = '';
  lightboxImage.alt = '';

  const lightboxTitle = document.getElementById('lightbox-title');
  lightboxTitle.textContent = '';
  const carouselContainer =  document.getElementById('carouselContainer');
  carouselContainer.innerHTML = '';

  const thumbnails =  document.getElementById('thumbnails');
  thumbnails.innerHTML = '';

  const carousel =  document.getElementById('carousel');
  carousel.innerHTML = '';
  // Cerrar el lightbox
  lightbox.style.display = 'none';
}