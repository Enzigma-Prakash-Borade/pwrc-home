/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
let componentName = '';
let sfdcBaseURL;
let dataSet = [];
let url = '';
let iterator = [];
let options = '';
let collection = ['Welcome','PWR Buttons', 'PWR Field Set', 'PWR Guided Path', 'PWR List View', 'PWR Navigation', 'PWR Progress Bar','PWR Ratings','PWR Related List'];

fetch("./assets/Pwrc Component Json/Welcome.json")
  .then(response => {
    return response.json();
  })
  .then(jsondata => {
    iterator = [];
    iterator.length = 0;
    iterator.splice(0, iterator.length);
    let obj = jsondata;
    //set the introduction on load
    document.getElementById("introduction").innerHTML = obj.introduction;
    //set the youtube link
    document.getElementById("youtubeLink").href = obj.youtube_link;
    //set the document link
    document.getElementById("componentDocumentation").href = obj.document_link;
    //set the values in the datatable
    for (const [key, value] of Object.entries(obj.data)) {
      let data = [];
      data.push(key);
      data.push(value);
      dataSet.push(data);
    }
    $('#datatable').DataTable(
      {
        data: dataSet,
        columns: [
          { title: "Property" },
          { title: "Description" }
        ]
      });

    //set the images for the carousel
    iterator = obj.images;
    for (var i = 0; i < iterator.length; i++) {
       $('<div class="item"><img id="' + i + '" src="' + iterator[i] + '"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
      $('<li data-target="#myCarousel" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators');
    }
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    
    // set the options to the datalist
    for (var i = 0; i < collection.length; i++) {
        options += '<option value="' + collection[i] + '" />';
        document.getElementById("components").innerHTML += collection[i] + "<br>"+"<br>"+"<br>"; 
    }
    document.getElementById('lstComponents').innerHTML = options;

    let currentURL = window.location.href; 
    console.log('currentURL=>' + currentURL);
    let designer = document.getElementById("designer");
    let designerlabel = document.getElementById("designerlabel");
    if (currentURL.includes("force.com")) {
      designer.style.display = "block";
      designerlabel.style.display = "block";
    } else {
      designer.style.display = "none";
      designerlabel.style.display = "none";
      
    }
  });

  function createSfdcBaseDesignerURL()
  {
    sfdcBaseURL = window.location.origin+"/lightning/n/pwr__Designer";
    console.log('sfdcBaseURL==>' + sfdcBaseURL);
    return sfdcBaseURL;
  }

function handleClickTest(ctrl) {
  var TextInsideLi = document.getElementById('components').innerHTML; //ctrl.getElementsByTagName('p')[0].innerHTML;
  console.log('components==>' + TextInsideLi);
  console.log('ctrl==>' + ctrl);
}
  
function handleOnLoad() {
    var showSidebar = document.getElementById("showSidebar");
    var collapsedSidebar = document.getElementById("collapsedSidebar");
    var PinSidebar = document.getElementById("PinSidebar");
    var PinnedSidebar = document.getElementById("PinnedSidebar");
    collapsedSidebar.style.display = "none";
    showSidebar.style.display = "block";
    PinSidebar.style.display = "block";
    PinnedSidebar.style.display = "none";
}

function handleComponentChange() {
  let componentName = document.getElementById("componentName").value;
  handleIntroductionAndData(componentName);
}

// function myfunction(ctrl) {

//   var TextInsideLi = document.getElementById('components').innerHTML; //ctrl.getElementsByTagName('p')[0].innerHTML;
//   console.log('components==>' + TextInsideLi);
//   console.log('ctrl==>' + ctrl);
// }


function handleIntroductionAndData(componentName) {
  if (componentName == '' || componentName == 'Welcome') {
    url = "./assets/Pwrc Component Json/Welcome.json";
    setData(url);
  } else {
    url = "./assets/Pwrc Component Json/" + componentName + ".json";
    setData(url);
  }
}

function setData(url) {
  dataSet.length = 0;
  iterator = [];
  iterator.length = 0;
  iterator.splice(0, iterator.length);
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(jsondata => {
      let obj = jsondata;
      //set the introduction 
      document.getElementById("introduction").innerHTML = obj.introduction;

      //set the values in the datatable
      for (const [key, value] of Object.entries(obj.data)) {
        let data = [];
        data.push(key);
        data.push(value);
        dataSet.push(data);
      }
      $('#datatable').dataTable().fnClearTable();
      $('#datatable').dataTable().fnAddData(dataSet);

      //set the images for the carousel
      iterator = obj.images;
      for (var i = 0; i < iterator.length; i++) {
        $(`#${i}`).replaceWith('<img id="' + i + '" src="' + iterator[i] + '"></img>');
        $('<li data-target="#myCarousel" data-slide-to="' + i + '"></li>').replaceWith('.carousel-indicators');
      }
    });
}

function handleCollapsedSidebar() {
  var showSidebar = document.getElementById("showSidebar");
  var collapsedSidebar = document.getElementById("collapsedSidebar");
  var PinnedSidebar = document.getElementById("PinnedSidebar");
  if (PinnedSidebar.style.display === "none") {
    collapsedSidebar.style.display = "block";
    showSidebar.style.display = "none";
    var styles = {
      width: "91%"
    };
    $("#mainSection").css(styles);
  }
}

function handlePinSidebar(){
  var showSidebar = document.getElementById("showSidebar");
  var collapsedSidebar = document.getElementById("collapsedSidebar");
  var PinSidebar = document.getElementById("PinSidebar");
  var PinnedSidebar = document.getElementById("PinnedSidebar");
  collapsedSidebar.style.display = "none";
  showSidebar.style.display = "block";
  PinSidebar.style.display = "none";
  PinnedSidebar.style.display = "block";
}

function handlePinnedSidebar(){
  var showSidebar = document.getElementById("showSidebar");
  var collapsedSidebar = document.getElementById("collapsedSidebar");
  var PinSidebar = document.getElementById("PinSidebar");
  var PinnedSidebar = document.getElementById("PinnedSidebar");
  collapsedSidebar.style.display = "none";
  showSidebar.style.display = "block";
  PinSidebar.style.display = "block";
  PinnedSidebar.style.display = "none";
}



