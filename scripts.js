var sideBarFlag = true;
var isPcSize = window.matchMedia("(min-width: 800px)").matches;
var navBarSize = 33;
var lastId = "";
var ratio = 1.2;
const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
 sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
   aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
     sunt in culpa qui officia deserunt mollit anim id est laborum.`;

createHeaderFooter();

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

    document.getElementById("content").innerHTML = '';
    
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
  let promiseRes = getUserListJson();

  promiseRes.then((result) =>
    result.data.map((user)=>
    document.getElementById("content").innerHTML += ` 
                  <div class="card-body"">
                    <img onclick="openModal(${user.id})" src="${
                      user.avatar
                    }" class="img_item" alt="...">
                      <div class="valise_contenu_card">
                        <div class="contenu_card">
                          <h6>${user.first_name} ${user.last_name}</h6>
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
                                <h6>${user.first_name} ${user.last_name}</h6>
                                <p href="mailto:${user.email}" class="descr_article">Mail: ${user.email}</p>
                                <p class="descr_article">${lorem}</p>
                              </div>
                            </div>
                        </div>
                      </div>  
                  </div>`
  )
  );
  }


async function getUserCreate(){
  const response = await fetch("https://reqres.in/api/users", {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: `{
    "name": "dorian",
    "job": "dev"
}`,
  });

  response.json().then(data => {
    console.log(JSON.stringify(data));
  });

  
}

async function getUser(id){
  const response = await fetch('https://reqres.in/api/users/' + id);
  const usersJson= await response.json();
}

function createHeaderFooter(){
  document.getElementById('root').innerHTML =
  `<div id="leftNavbar" class="sidebar">
  <div class="navBarChoix">
      <p class="toHover" id="userList" onclick="loadContent(this.id); if(!isPcSize){openCloseNav();}">Liste des utilisateurs</p>
      <div class="navbar-list-divider"></div>
      <p class="toHover" id="userCreate" onclick="loadContent(this.id); if(!isPcSize){openCloseNav();}">Créer utilisateur</p>
      <div class="navbar-list-divider"></div>
  </div>
</div>

<div id="main">
  <div id="topBar">
      <div class="entete">
          <span id="nom">UserTech Solutions</span>
      </div>
      <button class="openbtn" id="navBtn" onclick="openCloseNav()">☰</button>
  </div>

  <div id="content">
  </div>

  <footer>
      <h5>Pages</h5>
      <div>
          <p class="toHover" id="userList2" onclick="loadContent(this.id)">Liste des utilisateurs</p>
          <p class="toHover" id="userCreate2" onclick="loadContent(this.id)">Créer utilisateur</p>
      </div>
  </footer>

</div>`;
}

// When the user clicks on the button, open the modal
function openModal(id) {
  document.getElementById("myModal" + id).style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal(id) {
  document.getElementById("myModal" + id).style.display = "none";
}
