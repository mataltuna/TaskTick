let loginBtn = document.getElementById("btnLogin")
let form = document.getElementById("loginForm")
let isLoggedIn = false
let conJSON = async function() {
    try {
    let response = await fetch("./../db/data.json");
    let data = await response.json();  // Esperar a que la conversión a JSON se complete
    return data;
    } catch(err) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Algo salió mal! No pudimos conectar con la base de datos",
        })
    }
}
let login = function() {
    try {
        form.addEventListener('submit', async function(event){
            event.preventDefault()
            const datos = await conJSON()
            let userMail = document.getElementById('usMail').value
            let userPass = document.getElementById('usPass').value
            const userFind = datos.find(u => u.email == userMail && u.passw == userPass)
            if (userFind) {
                localStorage.setItem('isLoggedIn', 'true');
                Swal.fire({
                    title: "Inicio de Sesion exitoso!",
                    text: "Disfruta de las posibilidades",
                    icon: "success"
                })
                setTimeout(() => {
                    window.location.href = "./../index.html"
                }, 2000);
            } else {
                Swal.fire({
                    title: "Ups...",
                    text: "El correo o la contraseña son incorrectos",
                    icon: "error"
                })
            }
        })
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups...",
            text: "Algo salió mal al verificar el inicio de sesion!",
        })
    }
}
if(loginBtn){
    loginBtn.addEventListener('click', login())
}