
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
   if (xhr.readyState == 4) {
        document.getElementById('department-select').innerHTML = '';
        renderDepartmentsOptions(JSON.parse(xhr.responseText));
        reloadTeachers();
   }
}
xhr.open('POST', './ajax/get_departments.php', true);
xhr.send();

function renderDepartmentsOptions(array) {
  array.forEach(function(el, index) {
    let departmentSelect = document.getElementById('department-select');
    let option = document.createElement('option');
    option.innerHTML = el.name;
    option.value = el.id;
    departmentSelect.appendChild(option);
  })
}

document.getElementById('department-select').onchange = function() {
  reloadTeachers();
}

function reloadTeachers() {
  xhr.onreadystatechange = function() {
     if (xhr.readyState == 4) {
          document.getElementById('teachers-select').innerHTML = '';
          if (xhr.responseText != '') {
            renderTeachersOptions(JSON.parse(xhr.responseText));
          }
     }
  }
  xhr.open('POST', './ajax/get_teachers.php?department=' + document.getElementById('department-select').value, true);
  xhr.send();
}
function renderTeachersOptions(array) {
  array.forEach(function(el, index) {
    let teachersSelect = document.getElementById('teachers-select');
    let option = document.createElement('option');
    option.innerHTML = el.name + ' ' + el.last_name + ' ' + el.patronymic;
    option.value = el.id;
    teachersSelect.appendChild(option);
  })
}
