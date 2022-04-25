const studentsTable = document.querySelector("table#studentsTable")

const studentsData = localStorage.students??"[]"

let students = JSON.parse(studentsData)

if(!students || students.length < 1){
  document.querySelector("h2.message").style.display = "block"
}else{
  students.forEach(student => {

    studentsTable.tBodies[0].innerHTML += `
      <tr class="${student.xp ? "green" : "red"}">
        <td>${student.name}</td>
        <td>${student.phone}</td>
        <td>${student.xp ? "Sim" : "Não"}</td>
        <td>
          <button class="btn btn-secondary" onclick="handleChange(${student.id})">Editar</button>
          <button class="btn btn-danger" onclick="handleExclude(${student.id})">Excluir</button>
        </td>
      </tr>
    `
  })
}

function handleChange(id){
  let uri = location.href.replace(/index/, "form")
  uri += `?id=${id}`
  location = uri
}

function handleExclude(id){
  students = students.filter(item => item.id != id)
  localStorage.students = JSON.stringify(students)
  location.reload()
}
