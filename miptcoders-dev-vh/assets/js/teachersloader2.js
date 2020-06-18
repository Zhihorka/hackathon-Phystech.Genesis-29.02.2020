var CreatedPool = [];

var DepartmentList = [
    { id: "1" , name: "Биофизика" }
];

var TeacherList = [
    {
      id: "1" ,
      name: "В.С. Волков",
      last_name: "H",
      patronymic: "L"
    }

];

let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
   if (xhr.readyState == 4) {
        document.getElementById('SelectDepartment').innerHTML = '';
        renderDepartmentsOptions(JSON.parse(xhr.responseText));
        reloadTeachers();
   }
}
xhr.open('POST', './ajax/get_departments.php', true);
xhr.send();

function renderDepartmentsOptions(array) {
  DepartmentList = array;
  array.forEach(function(el, index) {
    let departmentSelect = document.getElementById('SelectDepartment');
    let option = document.createElement('option');
    option.innerHTML = el.name;
    option.value = el.id;
    departmentSelect.appendChild(option);
  })
}

document.getElementById('SelectDepartment').onchange = function() {
  reloadTeachers();
}

function reloadTeachers() {
  xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
          document.getElementById('SelectTeacher').innerHTML = '';
          if (xhr.responseText != '') {
            renderTeachersOptions(JSON.parse(xhr.responseText));
          }
     }
  }
  xhr.open('POST', './ajax/get_teachers.php?department=' + document.getElementById('SelectDepartment').value, true);
  xhr.send();
}

function renderTeachersOptions(array) {
  TeacherList = array;
  array.forEach(function(el, index) {
    let teachersSelect = document.getElementById('SelectTeacher');
    let option = document.createElement('option');
    option.innerHTML = el.name + ' ' + el.last_name + ' ' + el.patronymic;
    option.value = el.id;
    teachersSelect.appendChild(option);
  })
}




function getDepartmentText(DepartmentID, DepartmentList){
    for(var i=0; i<DepartmentList.length; i++) {
        if (DepartmentList[i].id == DepartmentID){
            return DepartmentList[i].name;
        }
     }
}

function getTeacherText(TeacherID, TeacherList){
    for(var i=0; i<TeacherList.length; i++) {
        if (TeacherList[i].id == TeacherID){
            return TeacherList[i].name + ' ' + TeacherList[i].last_name + ' ' + TeacherList[i].patronymic;
        }
     }
}


function PreventRepeat(NumberOfAddon){
    for (var i = 0; i < CreatedPool.length; ++i) {
       if (val1 == CreatedPool[i].department && val2 == CreatedPool[i].name ){
        return true;
    }
}
}

function render() {
    document.getElementById('PoolContainer').innerHTML = '';
    for (var i = 0; i < CreatedPool.length; ++i) {
        var img = document.createElement("img");
        img.src = "./assets/img/prep.jpg";

        let tmp = document.createElement('div');
        document.getElementById('PoolContainer').appendChild(tmp);

        tmp.className = 'tempclass';
        tmp.appendChild(img);
        var div = document.createElement("div");
        var button = document.createElement("button");


        tmp.appendChild(div);

        var text = document.createTextNode("Удалить");
        button.className='DeleteButton';
       img.className='ProfilePicture';
        button.appendChild(text);
        tmp.appendChild(button);
        button.setAttribute('num', i)
        button.onclick = function() {
          CreatedPool.splice(parseInt(this.getAttribute('num')),1);
          render();
        }
        div.innerHTML += CreatedPool[i].text1 + '<br>';
        div.innerHTML += CreatedPool[i].text2;
    }


}

function CreateNew(){
    val1 = document.getElementById("SelectDepartment").value;
    val2 = document.getElementById("SelectTeacher").value;
    if (PreventRepeat(val1, val2)) return;
    CreatedPool.push({
        department  : val1,
        name : val2,
        text1 : getDepartmentText(val1, DepartmentList),
        text2 : getTeacherText(val2, TeacherList)
    });
    render()
}
