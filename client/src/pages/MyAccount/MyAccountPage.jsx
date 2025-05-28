import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { UserDetails } from "../Admin/UserAdminPanel/components/UserDetails";
import { MyAccountTable } from "./components/MyAccountTable";

export const MyAccountPage = () => {
    const { usuario, token } = useSelector((state) => state.auth);
    const id = usuario?.id;
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        if (!id) return; // Evita fetch si el id no está cargado aún

        const getSolicitudes = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);

                const response = await fetch(
                    `http://localhost:3000/api/v1/adopciones/ver-solicitudes/${id}`,
                    {
                        method: "GET",
                        headers: myHeaders,
                    }
                );

                const data = await response.json();
                setSolicitudes(data.data);
            } catch (error) {
                console.error("Error al obtener solicitudes:", error);
            }
        };

        getSolicitudes();
    }, [id, token]);

    return (
        <>
            <UserDetails />
            <MyAccountTable solicitudes={solicitudes} />
        </>
    );
};
