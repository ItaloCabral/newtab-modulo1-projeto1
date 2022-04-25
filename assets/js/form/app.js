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

function handlePhoneChange(e){
  e.preventDefault()
  const inputValue = e.target.value
  if(inputValue.length == 0){
    e.target.value += "(";
  }
  if(inputValue.length == 3){
    e.target.value += ")";
  }

  if(inputValue.length == 9){
    e.target.value += "-";
  }

  if(/[0-9]/g.test(e.key) && e.target.value.length < 14){
    e.target.value += e.key;
  }
}

function handleSubmit(){
  const name = form.name.value
  const phone = form.phone.value
  const xp = form.xp.value == "true"

  if(phone.length !== 14){
    alert("Número inválido");
    return;
  }

  if(/^[0-9-()]*$/.test(phone) == false){
    alert("Apenas números no campo \"Telefone\"")
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

