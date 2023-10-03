var sideBarFlag = true;
var isPcSize = window.matchMedia("(min-width: 800px)").matches;
var navBarSize = 33;
var lastId = "";
var ratio = 1.2;

if (isPcSize){ 
  document.getElementById("navBtn").style.visibility = "hidden"; 
  navBarSize = 15;
  openCloseNav();
  changeFontSize(document.body);
}

loadContentCloseNav('userList');

  function openCloseNav(){
    if(sideBarFlag){
      document.getElementById("leftNavbar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }else{
      document.getElementById("leftNavbar").style.width = navBarSize + "%";
      document.getElementById("main").style.marginLeft = navBarSize + "%";
    }
    sideBarFlag = !sideBarFlag;
  }

  function loadContent(id) {
    var partToLoad ='';
    
    // Gestion du changement de couleur des éléments  de la sidebar quand séléctionnés
    sidebarSelection(id);
    
    //Chargement html main
    switch (true) {
      case id.includes('userList'):
        partToLoad = getUserListHtml();
        break;
      case id.includes('userCreate'):
        partToLoad = getUserCreate();
        break;
    }

    //Ajustement taille police pour certaines pages
    // if(!id.includes('expPro') && !id.includes('formations')){
    //   ratio = 0.9;
    //   changeFontSize(document.getElementById("content"));
    // }
    lastId = id;
}

function loadContentCloseNav(id) {
  loadContent(id);
  openCloseNav();
}

function sidebarSelection(id){
  var bisMenu = id;
  if(id != lastId){
    if(id.includes('2')){
      bisMenu = bisMenu.substring(0, id.length - 1 );
    }else{
      bisMenu += '2';
    }

    document.getElementById(id).style.color = "white";
    document.getElementById(bisMenu).style.color = "white";
      
    if(document.getElementById(lastId)){
      var bisLastMenu = lastId;
      if(lastId.includes('2')){
        bisLastMenu = bisLastMenu.substring(0, lastId.length - 1 );
      }else{
        bisLastMenu += '2';
      }

      document.getElementById(lastId).style.color = "#999";
      document.getElementById(bisLastMenu).style.color = "#999";
    }
  }
}

function changeFontSize(element){
    var originalSize = element.getAttribute("data-orgFontSize");
    const currentSize = window.getComputedStyle(element, null).getPropertyValue('font-size');
    if (!originalSize) {
        originalSize = currentSize;
        element.setAttribute("data-orgFontSize", currentSize);
    }

    if (originalSize) {    
        const size = parseFloat(originalSize.replace("px",""));
        element.style.fontSize = (size * ratio)  + "px";
        for(var i=0; i < element.children.length; i++){
            changeFontSize(element.children[i]);
        }
    }
}

async function getUserListJson(){
  const response = await fetch('https://reqres.in/api/users?per_page=12');
  const usersJson= await response.json();

  return usersJson;
}

function getUserListHtml(){
  console.log('test');
  let promiseRes = getUserListJson();
  console.log(promiseRes);

  let htmlContent = "";

  promiseRes.then((result) =>
    result.data.map((user)=>
    document.getElementById("content").innerHTML += ` 
                  <div class="card-body" onclick="openModal(${user.id})">
                    <img  src="${
                      user.avatar
                    }" class="img_item" alt="...">
                      <div class="valise_contenu_card">
                        <div class="contenu_card">
                          <h5>${user.first_name}</h5>
                          <p class="descr_article">${user.last_name}</p>
                        </div>
                      </div>
                      
                      <div id="myModal${user.id}" class="modal">
                        <div class="modal-content">
                          <span class="close" onclick="closeModal(${user.id})">&times;</span>
                          <img  src="${
                            user.avatar
                          }" class="img_item" alt="...">
                            <div class="valise_contenu_card">
                              <div class="contenu_card">
                                <h5>${user.first_name}</h5>
                                <p class="descr_article">${user.last_name}</p>
                                <p class="descr_article">${user.email}</p>
                                <button id="${user.id}" onclick="checkUser(this.id)" class="btn btn-primary">Ajouter</button>
                              </div>
                            </div>
                        </div>
                      </div>  
                  </div>`
  )
  );
  }


function getUserCreate(){

}

function createHeaderFooter(){
  
}

// When the user clicks on the button, open the modal
function openModal(id) {
  document.getElementById("myModal" + id).style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal(id) {
  console.log("myModal" + id);
  console.log(document.getElementById("myModal" + id));
  document.getElementById("myModal" + id).style.display = "none";
}
