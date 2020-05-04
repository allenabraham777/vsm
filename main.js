let step = 0
let prdoName = ""
let matCount = 1
let infCount = 1
let informationProcess = []
let materialProcess = []
let warehouseTime = []
let supplierInterval = 0;

function init() {
  document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("form-button").click();
    }
  });
  step1()
}

function updateStep() {
  switch (step) {
    
    case 1: step2()
            break

    case 2: step3()
            break
    case 3: step4()
            break
    case 4: step5()
            break
    case 5: step6()
            break
    default: alert("No more steps")
  }
}

function informationUp() {
  infCount ++
  document.getElementById("information-remove").disabled = false
  var inp = document.createElement('input')
  var div = document.createElement('div')
  div.innerHTML = `<br><br><label for="information-${infCount}">Enter the process - ${infCount}</label><br>`
  div.appendChild(inp)
  inp.setAttribute("type", `text`)
  inp.setAttribute("id", `information-${infCount}`)
  inp.setAttribute("name", `information-${infCount}`)
  document.getElementById("information-wrapper").appendChild(div)
}

function informationDown() {
  if(infCount > 1) {
    infCount--
    document.getElementById("information-wrapper").lastChild.remove()
  }
  if(infCount === 1) {
    document.getElementById("information-remove").disabled = true
  }
}

function materialUp() {
  matCount ++
  document.getElementById("material-remove").disabled = false
  var inp = []
  var inpnames = ["name", "ct", "co", "uptime", "shift"]
  var inpplaceholders = ["Name", "Cycle Time", "Change Over Time", "Uptime", "Shifts"]

  for (var j = 0; j < inpnames.length; j++) {
    inp.push(document.createElement('input'))
    inp[j].setAttribute("type", `text`)
    inp[j].setAttribute("id", `material-${matCount}-${inpnames[j]}`)
    inp[j].setAttribute("name", `material-${matCount}-${inpnames[j]}`)
    inp[j].setAttribute("placeholder", inpplaceholders[j])
  }
  // <div id="material-1">
  //   <label>Enter the process - 1</label>
  //   <br>
  //   <input type="text" name="material-1-name" id="material-1-name" placeholder="Name">
  //   <br>
  //   <input type="text" name="material-1-ct" id="material-1-ct" placeholder="Cycle Time">
  //   <br>
  //   <input type="text" name="material-1-co" id="material-1-co" placeholder="Change Over time">
  //   <br>
  //   <input type="text" name="material-1-uptime" id="material-1-uptime" placeholder="Uptime">
  //   <br>
  //   <input type="text" name="material-1-shift" id="material-1-shift" placeholder="Shifts">
  // </div>
  var div = document.createElement('div')
  div.setAttribute("id", `material-${matCount}`)
  div.setAttribute("class", "material-container")
  div.innerHTML = `<br><br><br><br><label>Warehouse time before process -  ${matCount}</label><br><input type="text" name="warehouse- ${matCount}" id="warehouse-${matCount}" placeholder="Time in Warehouse"><br><br><label>Enter the process - ${matCount}</label><br>`
  for (var k = 0; k < inp.length; k++) {
    div.appendChild(inp[k])
  }
  document.getElementById("material-wrapper").appendChild(div)
}

function materialDown() {
  if(matCount > 1) {
    matCount--
    document.getElementById("material-wrapper").lastChild.remove()
  }
  if(matCount === 1) {
    document.getElementById("information-remove").disabled = true
  }
}

function checkError(fields) {
  if(!checkEmpty(fields)) {
    document.getElementById("form-warning").innerHTML = '<span style="color:red">All forms are mandatory</span>'
    return 0
  } else {
    document.getElementById("form-warning").innerText = ''
    return 1
  }
}

function checkEmpty(fields){

  flag = true

  fields.forEach(field => {
    console.log(document.getElementById(field).value)
    if(document.getElementById(field).value.length === 0) {
      console.log("enter")
      flag = false
    }
  })
 
  return flag
}

function step1() {
  document.querySelector("#form-container").innerHTML = '<label for="process-name">Enter the production name*</label><br><input type="text" id="production-name" required>'
  document.querySelector("#form-button").innerText = 'Next'
  step=1
}

function step2(){
  if(checkError(["production-name"])) {
    prdoName = document.getElementById("production-name").value
    document.getElementById("form-heading").innerText = prdoName
    document.getElementById("form-sub-heading").innerText = 'Information Flow'
    step ++
    document.querySelector("#form-container").innerHTML = '<div id="information-flow"><div class="button-container"><button onclick="informationUp()" id="information-add">+</button><span class="button-spacer"></span><button onclick="informationDown()" id="information-remove">-</button></div><div id="information-wrapper"><div><label for="information-1">Enter the process - 1</label><br><input type="text" name="information-1" id="information-1"></div></div><br></div>'
    document.getElementById("information-remove").disabled = true
  }
}

function step3(){
  let lst = []
  for (var i = 1; i <= infCount; i++) {
    lst.push(`information-${i}`)
  }
  console.log(lst);
  
  if(checkError(lst)) {
    for (var i = 1; i <= infCount; i++) {
      informationProcess.push(document.getElementById(`information-${i}`).value)
    }
    console.log(informationProcess);
    step ++
    document.querySelector("#form-container").innerHTML = '<label for="supplier-interval">Enter the supplier interval</label><br><input type="text" name="supplier-interval" id="supplier-interval">'
  }
}

// Data to be collected

// Inventory
// Cycle time (time taken to make one product)
// Change over time (from last good piece to next)
// Up-time (on-demand machine utilization)
// Number of operators
// Shifts worked
// Net available working time
// Scrap rate
// Pack size/pallet sizes
// Batch Size

function step4(){
  if(checkError(["supplier-interval"])) {
    supplierInterval = document.getElementById("supplier-interval").value
    step ++
    document.getElementById("form-sub-heading").innerText = 'Material Flow'

    document.querySelector("#form-container").innerHTML = '<div id="material-flow"><div class="button-container"><button onclick="materialUp()" id="material-add">+</button><span class="button-spacer"></span><button onclick="materialDown()" id="material-remove">-</button></div><div id="material-wrapper"><div id="material-1" class="material-container"><label>Warehouse time before process - 1</label><br><input type="text" name="warehouse-1" id="warehouse-1" placeholder="Time in Warehouse"><br><br><label>Enter the process - 1</label><br><input type="text" name="material-1-name" id="material-1-name" placeholder="Name"><input type="text" name="material-1-ct" id="material-1-ct" placeholder="Cycle Time"><input type="text" name="material-1-co" id="material-1-co" placeholder="Change Over time"><input type="text" name="material-1-uptime" id="material-1-uptime" placeholder="Uptime"><input type="text" name="material-1-shift" id="material-1-shift" placeholder="Shifts"></div></div></div>'
    
    document.getElementById("material-remove").disabled = true
  }
}

function step5(){
  var inpnames = ["name", "ct", "co", "uptime", "shift"]
  let lst = []
  for (var i = 1; i <= matCount; i++) {
    lst.push(`warehouse-${i}`)
    for (var j = 0; j< inpnames.length; j++)
      lst.push(`material-${i}-${inpnames[j]}`)
  }
  if(checkError(lst)) {
    var data = {}
    for (var k = 1; k <= matCount; k++) {
      data = {}
      data = {
        "name": document.getElementById(`material-${k}-name`).value,
        "ct": document.getElementById(`material-${k}-ct`).value,
        "co": document.getElementById(`material-${k}-co`).value,
        "uptime": document.getElementById(`material-${k}-uptime`).value,
        "shift": document.getElementById(`material-${k}-shift`).value
      }
      materialProcess.push(data)
      warehouseTime.push(document.getElementById(`warehouse-${k}`).value)
    }
    console.log(materialProcess)
    
    step ++

    document.querySelector("#form-container").innerHTML = `<label>Final Warehouse time</label><br><input type="text" name="warehouse-final" id="warehouse-final" placeholder="Time in Warehouse">`
    document.querySelector("#form-button").innerText = 'Finish'
  }
}

// let step = 0
// let prdoName = ""
// let matCount = 1
// let infCount = 1
// let informationProcess = []
// let materialProcess = []
// let supplierInterval = 0;
// Cycle time (time taken to make one product)
// Change over time (from last good piece to next)
// Up-time

function step6() {
  if(checkError(["warehouse-final"])) {
    var warehouseFinal = document.getElementById("warehouse-final").value
    warehouseTime.push(warehouseFinal)
    step ++
    console.log(warehouseTime)
    
    step7()
  }
}
function step7() {
  var displayData = '<div class="final-output">'
  displayData += `<h1 class="final-heading">${prdoName}</h1>`
  displayData += `<h2 class="final-sub-heading">Information Flow</h2>`
  displayData += `<div><ul class="final-info-flow">`

  informationProcess.forEach(element => {
    displayData += `<li>${element}</li>`
  });

  displayData += `</ul></div>`
  displayData += `<p class="final-supplier-time">Supplier Time : <span>${supplierInterval}</span></p>`

  displayData += `<h2 class="final-sub-heading">Material Flow</h2>`
  for (var i=0; i < materialProcess.length; i++) {
    displayData += `<h3 class="final-warehouse">Warehouse ${i} : ${warehouseTime[i]}</h3>`
    displayData += `<h4>Process ${i}</h4><ul class="process">`
    displayData += `<li><span>Name :</span> ${materialProcess[i]["name"]}<li>`
    displayData += `<li><span>Cycle Time :</span> ${materialProcess[i]["ct"]}<li>`
    displayData += `<li><span>Change Over Time :</span> ${materialProcess[i]["co"]}<li>`
    displayData += `<li><span>Uptime :</span> ${materialProcess[i]["uptime"]}<li>`
    displayData += `<li><span>Shifts :</span> ${materialProcess[i]["shift"]}<li></ul>`
  }
  displayData += `<h3 class="final-warehouse">Final warehouse : ${warehouseTime[warehouseTime.length - 1]}</h3>`
  displayData += '</div>'
  console.log(displayData)
  
  document.body.innerHTML = displayData
}