var CreatedPool = [];

var DepartmentList = [
    { id: "1" , department: "Биофизика" },
    { id: "2", department: "Дискретная математика"},
    { id: "3" , department: "Компьютерная лингвистика"}
];

var TeacherList = [
    { id: "1" , name: "В.С. Волков" },
    { id: "2" , name: "Д.А. Свинцов" },
    { id: "3" , name: "Б.П. Горшунов" },
    { id: "4" , name: "В.И. Рыжий" },
    { id: "5" , name: "А.А. Голубов" },
    { id: "6" , name: "П.Б. Гинзбург" },
    { id: "7" , name: "К.В. Аркадьевич" },
    { id: "8" , name: "Ч.А. Юрьевич" },

];

function getDepartmentText(DepartmentID, DepartmentList){
    for(var i=0; i<DepartmentList.length; i++) {
        if (DepartmentList[i].id == DepartmentID){
            return DepartmentList[i].department;
        }
     }
}

function getTeacherText(TeacherID, TeacherList){
    for(var i=0; i<TeacherList.length; i++) {
        if (TeacherList[i].id == TeacherID){
            return TeacherList[i].name;
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
        div.innerHTML += getDepartmentText(CreatedPool[i].department, DepartmentList);
        div.innerHTML += ' ' + getTeacherText(CreatedPool[i].name, TeacherList);
    }




}

for (var i = 0; i < DepartmentList.length; i++) {
    var select = document.getElementById("SelectDepartment");
    var option = document.createElement("option");
    option.innerHTML = DepartmentList[i].department;
    option.value = DepartmentList[i].id;
    select.appendChild(option);
}

for (var i = 0; i < TeacherList.length; i++) {
    var select = document.getElementById("SelectTeacher");
    var option = document.createElement("option");
    option.innerHTML = TeacherList[i].name;
    option.value = TeacherList[i].id;
    select.appendChild(option);
}

function CreateNew(){
    val1 = document.getElementById("SelectDepartment").value;
    val2 = document.getElementById("SelectTeacher").value;
    if (PreventRepeat(val1, val2)) return;
    CreatedPool.push({
        department  : val1,
        name : val2
    });
    render()
}
