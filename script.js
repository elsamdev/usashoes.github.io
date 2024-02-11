// Obtener el contenedor de los productos
const productsContainer = document.getElementById("products-container");

// Obtener el elemento para mostrar el número de productos
const numProductsElement = document.getElementById("num-products");

// Obtener el select de filtrar por categoría
closeLightbox();
// Obtener el campo de texto para buscar por título
const searchInput = document.getElementById("search-input");
let timeoutId = null;

// Obtener el campo de texto para buscar por título

let productsData;
let categoria = "";
const listaCategory = document.getElementById("category2");

const logo = document.querySelector("#logo");
const inputElement = document.querySelector("#search-input");
let currentPage = 1;
const itemsPerPage = 40;
let filteredProducts = [];




// Obtener los datos de los productos desde el archivo JSON
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    productsData = data;
    filteredProducts = data;
    // Filtrar por categoría y título
    const filterProducts = (category, title) => {
      currentPage = 1;
      productsContainer.innerHTML = ""; // Limpiar el contenedor de productos

      // Mostrar todos los productos si no se selecciona ninguna categoría y no se ingresa un título
      if (category === "" && title === "") {
        filteredProducts = data;
      } else {
        // Filtrar por categoría
        if (category !== "") {
          filteredProducts = data.filter((product) =>
            product.category.includes(category)
          );
        } else {
          filteredProducts = data;
        }

        // Filtrar por título
        if (title !== "") {
          filteredProducts = filteredProducts.filter((product) =>
            product.title.toLowerCase().includes(title.toLowerCase())
          );
        }
      }

      showProducts();
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

      const tagContainer = document.createElement("div");
      tagContainer.classList.add("tag-container");
      card.appendChild(tagContainer);
      
      product.category.forEach((category) => {
        const tag = document.createElement("span");
        if (category == "niños1to7"){
          tag.textContent = "NIÑOS 1 A 7";
        } else {
          tag.textContent = category.toUpperCase();;
        }
        
        tag.classList.add("product-tag");
        tagContainer.appendChild(tag);
      
        tag.addEventListener("click", () => {
          // Remover clase CSS de todos los tags
          const tags = tagContainer.querySelectorAll(".product-tag");
          setCategoryFocus(category);
          tags.forEach((tag) => {
            tag.classList.remove("active");
          });
      
          // Agregar clase CSS al tag clickeado
          tag.classList.add("active");
      
          filterProducts(category, "");
        });
      });

      const thumbnailContainer = document.createElement("div");
      thumbnailContainer.classList.add("thumbnail-container"); // Agrega una clase CSS si deseas estilarlo
      card.appendChild(thumbnailContainer);
      let additionalImages = 0;
      let isButtonAdded = false;

      product.thumbnail.forEach((thumbnailUrl, index) => {
        if (index !== 0 && thumbnailUrl.length <= 4) {
          // Ignorar la primera imagen del thumbnail
          const thumbnailImage = document.createElement("img");
          thumbnailImage.src = thumbnailUrl;
          thumbnailImage.alt = product.title;
          thumbnailContainer.appendChild(thumbnailImage);
        } else if (thumbnailUrl.length >= 5) {
          if (index !== 0 && index !== 0 && index <= 3) {
            // Ignorar la primera imagen del thumbnail
            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = thumbnailUrl;
            thumbnailImage.alt = product.title;
            thumbnailContainer.appendChild(thumbnailImage);
          } else if (index !== 0 && !isButtonAdded) {
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
        const message = encodeURIComponent(
          `Quiero más información del modelo: ${product.title}`
        );
        const url = `https://wa.me/13213287507?text=${message}`;
        window.open(url);
      });


      button.innerHTML = '<i class="fab fa-whatsapp"></i> Consultar por modelo';
      card.appendChild(button);

      productsContainer.appendChild(card);
    };

    // Función para mostrar los productos en la página actual
    const showProducts = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentProducts = filteredProducts.slice(startIndex, endIndex);
      currentProducts.forEach((product) => {
        createProductCard(product);
      });

      // Mostrar el número deproductos
      numProductsElement.textContent = `Articulos Mostrados: ${filteredProducts.length}`;



      setupLightbox();
    };

    // Cargar todos los productos al cargar la página por primera vez
    filterProducts("", "");

    // Evento para filtrar los productos al hacer clic en el logotipo
    logo.addEventListener("click", () => {
      inputElement.value = "";
      setInitialFocus();
      filterProducts("", "");
    });

    // Evento para filtrar los productos al seleccionar una categoría
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

        if (categoriaSeleccionada == "Hombre") {
          categoria = "hombre";
        } else if (categoriaSeleccionada == "Mujer") {
          categoria = "mujer";
        } else if (categoriaSeleccionada == "Niños 1 a 7") {
          categoria = "niños1to7";
        }  else if (categoriaSeleccionada == "Fútbol") {
          categoria = "futbol";
        } else if (categoriaSeleccionada == "Baseball") {
          categoria = "baseball";
        } else {
          categoria = "";
        }
        console.log(categoria);

        const title = searchInput.value;
        filterProducts(categoria, title);
      }
    });

    // Obtener el campo de texto para buscar por título
const searchInput = document.getElementById("search-input");
let timeoutId = null;

// Función para realizar la búsqueda al escribir en el campo de texto
const handleSearch = () => {
  const title = searchInput.value;
  filterProducts(categoria, title);
};

// Evento para realizar la búsqueda al escribir en el campo de texto
searchInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(handleSearch, 500);
});


let isLoading = false; // Variable para controlar si ya se está cargando más productos

// Función para cargar más productos al hacer scroll
const loadMoreProducts = () => {


  const getTotalPages = () => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  };
  const totalPages = getTotalPages();
  // Función para mostrar la página actual y el total de páginas
 
  
  if (currentPage <= totalPages){
   
  

  const windowBottom = window.innerHeight + window.pageYOffset;
  const containerBottom = productsContainer.offsetTop + productsContainer.offsetHeight;

  // Verifica si ya se está cargando más productos o si se ha llegado al final de la página
  if (!isLoading && windowBottom >= containerBottom) {
    // Verifica si ya se han cargado todos los productos disponibles
    if (filteredProducts.length === 0) {
      window.removeEventListener("scroll", loadMoreProducts); // Remueve el evento de scroll una vez que se llega al final de la página
      
      return; // No realiza ninguna acción adicional si no hay más productos disponibles
    }

    isLoading = true; // Establece isLoading como verdadero para evitar cargar más productos mientras se está cargando

    currentPage++;
    showProducts();

    console.log(currentPage , " ", totalPages)


    
    // Agrega la animación de carga solo si no está presente
    if (!document.querySelector(".loading-overlay")) {
      const loadingOverlay = document.createElement("div");
      loadingOverlay.classList.add("loading-overlay");

      const loadingSpinner = document.createElement("div");
      loadingSpinner.classList.add("loading-spinner");

      const loadingText = document.createElement("div");
      loadingText.classList.add("loading-text");
      loadingText.textContent = "Cargando más productos...";

      loadingOverlay.appendChild(loadingSpinner);
      loadingOverlay.appendChild(loadingText);
      document.body.appendChild(loadingOverlay);
    }

    // Oculta el evento de carga después de un tiempo
    setTimeout(() => {
      isLoading = false; // Establece isLoading como falso una vez que se ha completado la carga
      const loadingOverlay = document.querySelector(".loading-overlay");
      if (loadingOverlay) {
        loadingOverlay.remove();
      }
    }, 2000);
  }
}

};

// Evento para cargar más productos al hacer scroll
window.addEventListener("scroll", loadMoreProducts);
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


// Función para establecer el enfoque inicial
const setInitialFocus = () => {
  const firstCategory = listaCategory.firstElementChild.firstElementChild;
  firstCategory.classList.add("focused");

  const categories = listaCategory.querySelectorAll("a");
  categories.forEach((category) => {
    if (category !== firstCategory) {
      category.classList.remove("focused");
    }
  });
};

// Función para manejar el cambio de enfoque en las categorías
const handleCategoryFocus = (event) => {
  const categories = listaCategory.querySelectorAll("a");
  categories.forEach((category) => {
    category.classList.remove("focused");
  });

  event.target.classList.add("focused");
};

// Función para restablecer el estado inicial
const resetCategoryFocus = () => {
  setInitialFocus();

  const categories = listaCategory.querySelectorAll("a");
  categories.forEach((category) => {
    category.addEventListener("click", handleCategoryFocus);
  });
};

// Establecer el enfoque inicial
setInitialFocus();

// Agregar el evento click a los elementos de la lista de categorías
const categories = listaCategory.querySelectorAll("a");
categories.forEach((category) => {
  category.addEventListener("click", handleCategoryFocus);
});


const setCategoryFocus = (category) => {
  const categories = document.querySelectorAll("#category2 li a");
  console.log(category)
  categories.forEach((categoryElement) => {
    categoryElement.classList.remove("focused");
    if (categoryElement.getAttribute("value") === category) {
      categoryElement.classList.add("focused");
    }
  });
};

    // Ocultar el preload después de que haya pasado un mínimo de 2 segundos
    const preloadDiv = document.querySelector('.preload');
    const logoImg = preloadDiv.querySelector('img');

    const hidePreload = () => {
      preloadDiv.style.display = 'none';
    };

    // Ocultar el preload después de que haya pasado un mínimo de 2 segundos
    const minimumDuration = 2000; // 2 segundos en milisegundos
    const startTime = new Date().getTime(); // Tiempo actual en milisegundos

    window.addEventListener('load', () => {
      const currentTime = new Date().getTime(); // Tiempo actual al terminar de cargar la página
      const elapsedTime = currentTime - startTime; // Tiempo transcurrido desde que se inició la carga de la página

      const remainingTime = Math.max(0, minimumDuration - elapsedTime); // Tiempo restante para cumplir el mínimo

      setTimeout(() => {
        hidePreload();
      }, remainingTime);
    });