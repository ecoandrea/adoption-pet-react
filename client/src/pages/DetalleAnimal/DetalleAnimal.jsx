import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

export const DetalleAnimal = () => {

    const { id } = useParams()
    const [animal, setAnimal] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const { usuario, token } = useSelector((state) => state.auth)
    
    const handleClick = async () => {
  try {
    if (!usuario?.id) {
      enqueueSnackbar("Debes iniciar sesión para adoptar un animal", { variant: "warning" });
      return;
    }

    const body = JSON.stringify({
      id_usuario: usuario.id,
      id_animal: Number(id),
    });

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      body,
      headers: myHeaders,
    };

    const url = `http://localhost:3000/api/v1/adopciones/solicitar-adopcion`;

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    console.log("Respuesta del servidor:", data);

    if (data.code === 201) {
      enqueueSnackbar(data.message, { variant: "success" });
    } else if (data.code === 400) {
      enqueueSnackbar(data.message, { variant: "warning" });
    } else {
      enqueueSnackbar(data.message, { variant: "error" });
    }
  } catch (error) {
    console.error("Error en solicitud de adopción:", error);
    enqueueSnackbar("Ocurrió un error al enviar la solicitud", { variant: "error" });
  }
};


    useEffect(() => {
        const getAnimalDataById = async () => {
            try {
                const url = `http://localhost:3000/api/v1/animales/get-animal/${id}`
                const response = await fetch(url)
                const data = await response.json()
                setAnimal(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAnimalDataById()

    }, [])



    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl mt-4 shadow-lg overflow-hidden border border-gray-200">
            {animal && (
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Imagen */}
                    <img
                        src={animal.imagen}
                         alt={`Foto de ${animal.nombre}`}
                        className="w-full h-96 object-cover"
                    />

                    {/* Información */}
                    <div className="p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {animal.nombre}
                            </h2>
                            <p className="text-md text-gray-500 italic mb-4">
                                {animal.especie} - {animal.raza}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>Edad:</strong> {animal.edad}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>Estado:</strong> {animal.estado}
                            </p>
                            <p className="text-sm text-gray-700 mt-4">
                                {animal.descripcion}
                            </p>
                        </div>

                        {
                            animal.estado === "Adoptado" ? null : (
                                <button
                                    className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                    onClick={handleClick}
                                >
                                    Adoptar
                                </button>
                            )
                        }
                    </div>
                </div>
            )
            }
        </div>
    );
}; 