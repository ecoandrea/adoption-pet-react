import React from "react";

export const UserDetails = () => {
    return (
        <>
            <div className="flex justify-center mt-5">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg border p-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={`https://robohash.org/AndreaHenriquez`}
                            alt="Avatar del usuario"
                            className="w-20 h-20 rounded-full object-cover border"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Andrea Henríquez
                            </h2>
                            <p className="text-sm text-gray-600">Rol: Admin</p>
                            <p className="text-sm text-gray-500">
                                Email: ecoandrea@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
