const form = document.getElementById("signUpForm")

form.addEventListener("submit", event => {
  event.preventDefault()
})

function handleSubmit(){
  const name = form.name.value
  const phone = form.phone.value
  const xp = form.xp.value == "true"

  const studentsData = localStorage.students??"[]"

  const students = JSON.parse(studentsData)

  const id = Math.floor(students.length+1 * (Math.random()*100))

  const newStudent = {
    id:id, name, phone, xp
  }

  localStorage.students = JSON.stringify([...students, newStudent])

  form.name.value = ""
  form.phone.value = ""
}

