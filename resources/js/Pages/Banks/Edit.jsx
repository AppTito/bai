import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Edit(props) {
    const { category } = usePage().props;

    // const { data, setData, errors, put } = useForm({
    //     category: category.category || "",
    //     indicator: category.indicator || "",
    //     code: category.code || "",
    // });

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     put(route("categories.update", category.id));
    // }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Editar categoría" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("banks.index")}
                                >
                                    Regresar
                                </Link>
                            </div>
                            <form name="createForm" >
                            {/* PONER EL ONSUBMIT */}
                            {/* onSubmit={handleSubmit} */}
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Address</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-md"
                                            label="Address"
                                            name="address"
                                            // value={data.category}
                                            // onChange={(event) =>
                                            //     setData("category", event.target.value)}
                                        />
                                        {/* <span className="text-red-600">
                                            {errors.code}
                                        </span> */}

                                        <label className="">Ruc</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-md"
                                            label="Ruc"
                                            name="ruc"
                                            // value={data.indicator}
                                            // onChange={(event) =>
                                            //     setData("indicator", event.target.value)}
                                        />
                                        {/* <span className="text-red-600">
                                            {errors.code}
                                        </span> */}
                                        <label className="">Email</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-md"
                                            label="Email"
                                            name="email"
                                            // value={data.indicator}
                                            // onChange={(event) =>
                                            //     setData("indicator", event.target.value)}
                                        />
                                        {/* <span className="text-red-600">
                                            {errors.code}
                                        </span> */}
                                        <label className="">Phone</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-md"
                                            label="Phone"
                                            name="phone"
                                            // value={data.indicator}
                                            // onChange={(event) =>
                                            //     setData("indicator", event.target.value)}
                                        />
                                        {/* <span className="text-red-600">
                                            {errors.code}
                                        </span> */}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
