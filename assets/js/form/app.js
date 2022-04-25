const form = document.getElementById("signUpForm")
const studentsData = localStorage.students??"[]"
const students = JSON.parse(studentsData)

form.addEventListener("submit", event => {
  event.preventDefault()
})

if(location.search.length > 0){
  const urlParams = new URLSearchParams(location.search)

  const id = urlParams.get("id")

  const student = students.filter(item => item.id == id)

  form.name.value = student[0].name
  form.phone.value = student[0].phone
}

function handleSubmit(){
  const name = form.name.value
  const phone = form.phone.value
  const xp = form.xp.value == "true"

  if(phone.length < 11){
    alert("Número inválido");
    return;
  }

  if(location.search.length > 0){
    const urlParams = new URLSearchParams(location.search)
    const id = Number(urlParams.get("id"))
    const key = students.findIndex((item) => item.id == id)

    students[key] = {
      id, name, phone, xp
    }

    localStorage.students = JSON.stringify(students)

    const uri = location.href.replace(/form/, "index")
    location = uri.replace(/\?id\=[0-9]+/, "")
    return;
  }

  const id = Math.floor(students.length+1 * (Math.random()*100))

  const newStudent = {
    id:id, name, phone, xp
  }

  localStorage.students = JSON.stringify([...students, newStudent])

  location = location.href.replace(/form/, "index")
}

