import { useState, useEffect } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"  
import { useSelector } from "react-redux";

export const RegisterForm = ({ setIsOpenUserModal , modo, usuarioSeleccionado}) => {

     const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [ showPassword, setShowPassword ] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const [ registerForm, setRegisterForm ] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password:"",
        repeatPassword: "",
        telefono: ""
    })

    const [ errors, setErrors ] = useState({
        nombre: false,
        apellido: false,
        email: false,
        password:false,
        repeatPassword: false,
        telefono: false
    })

    const handleChange = (e) =>{
        const { name, value } = e.target
        setRegisterForm({...registerForm, [name]: value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try {
            const formData = new FormData()
            formData.append("nombre", registerForm.nombre)
            formData.append("apellido", registerForm.apellido)
            formData.append("email", registerForm.email)
            formData.append("password", registerForm.password)
            formData.append("telefono", registerForm.telefono)

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const url = "http://localhost:3000"
            const path = modo == "modificar" ? "api/v1/admin/update-user" : "api/v1/auth" 

            const requestOptions = {
                method: modo == "modificar" ? "PUT" : "POST",
                body: formData,
                headers: myHeaders
            }

            const response = await fetch(`${url}/${path}`, requestOptions)
            const data = await response.json()
            
            if(data.code === 201){
                enqueueSnackbar(data.message, { variant: "success"})
                navigate("/")
            }else if(data.code === 200){
                enqueueSnackbar(data.message, { variant: "success"})
                setIsOpenUserModal(false)
            }
            else{
                enqueueSnackbar("Hubo un error, intente nuevamente más tarde", { variant: "error"})
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const getUserData = async() =>{
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);

                const requestOptions = {
                method: "GET",
                headers: myHeaders,
                };

                const url = `http://localhost:3000/api/v1/admin/get-user/${usuarioSeleccionado}`
                const response = await fetch(url, requestOptions)
                const data = await response.json()
                console.log(data);
                const usuario = data.data

                
                

                setRegisterForm({
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    password: usuario.password,
                    telefono: usuario.telefono
                })
                

            } catch (error) {
                console.log(error);
            }
        }
        if(modo === "modificar"){
            getUserData()
        }else{
            return
        }
    }, [modo])


  return (
    <>
        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
            <div className="flex justify-center items-center space-x-4">
            <FaUserAstronaut />
                <input
                    type="text"
                    name="nombre"
                    placeholder="Ingresa tu nombre"
                    value={registerForm.nombre}
                    onChange={handleChange}
                    className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                />
            </div>
            <span className={`ms-9 text-red-600 font-semibold ${errors.nombre ? "block" : "hidden"}`}>
                El nombre debe contener mínimo 2 caracteres
            </span>

            <div className="flex justify-center items-center space-x-4">
            <FaUserAstronaut />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Ingresa tu Apellido"
                    value={registerForm.apellido}
                    onChange={handleChange}
                    className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                />
            </div>
            <span className={`ms-9 text-red-600 font-semibold ${errors.nombre ? "block" : "hidden"}`}>
                El nombre debe contener mínimo 2 caracteres
            </span>

            <div className="flex justify-center items-center space-x-4">
                <MdEmail />
                <input
                    type="email"
                    name="email"
                    placeholder="Ingresa tu Email"
                    value={registerForm.email}
                    onChange={handleChange}
                    className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                />
            </div>
            <span className={`ms-9 text-red-600 font-semibold ${errors.nombre ? "block" : "hidden"}`}>
                El nombre debe contener mínimo 2 caracteres
            </span>

            {modo !== "modificar" &&(
            <div className="flex justify-center items-center space-x-4">
                {showPassword ? <FaEye onClick={() => setShowPassword(!showPassword)} /> 
                : 
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />}
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Ingresa tu Password"
                    value={registerForm.password}
                    onChange={handleChange}
                    className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                />
            </div>)}
            <span className={`ms-9 text-red-600 font-semibold ${errors.nombre ? "block" : "hidden"}`}>
                El nombre debe contener mínimo 2 caracteres
            </span>

            {modo !== "modificar" &&(
                <div className="flex justify-center items-center space-x-4">
                {showPassword ? <FaEye onClick={() => setShowPassword(!showPassword)} /> 
                : 
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />}  
                <input
                    type={showPassword ? "text" : "password"}
                    name="repeatPassword"
                    placeholder="Repite tu Password"
                    value={registerForm.repeatPassword}
                    onChange={handleChange}
                    className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                />
            </div>
            )}
            <span className={`ms-9 text-red-600 font-semibold ${errors.nombre ? "block" : "hidden"}`}>
                El nombre debe contener mínimo 2 caracteres
            </span>

            <div className="flex justify-center items-center space-x-4">
                <MdOutlinePhoneIphone />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Ingresa tu Teléfono"
                    value={registerForm.telefono}
                    onChange={handleChange}
                    className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                />
            </div>
            <span className={`ms-9 text-red-600 font-semibold ${errors.nombre ? "block" : "hidden"}`}>
                El nombre debe contener mínimo 2 caracteres
            </span>

            <div className="flex justify-center w-full gap-x-2">
                
                { (modo == "crear" || modo == "modificar") && (
                    <button type="submit"
                        className="px-4 py-2 rounded-lg font-semibold text-slate-200 bg-red-600 hover:bg-red-800 transform hover:scale-110 ease-in-out"
                        onClick={() =>setIsOpenUserModal(false)}
                        >
                    Cancelar
                </button>
                ) } 

                <button type="submit"
                className="px-4 py-2 rounded-lg font-semibold text-slate-200 bg-blue-600 hover:bg-blue-900 transform hover:scale-110 ease-in-out"
                >
                    {modo === "modificar" ? "Modificar" : "Registrarme"}
                </button>
            </div>
        
        </form>
    </>
  )
}