import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm, usePage} from '@inertiajs/react';

export default function Edit ( props ){
    const { user, roles , userRole } = usePage().props
    const [passwordChanged, setPasswordChanged] = useState(false);

    const { data, setData, errors, put } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        password_confirmation:  "",
        roles: userRole[0] || [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("users.update", user.id));
    }

    const handlePasswordChange = (event) => {
        setData("password", event.target.value);
        setPasswordChanged(true);
    };

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            <Head title="Edit User"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("users.index")}>
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Nombre</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Name" name="name"
                                               value={data.name}
                                               onChange={(event) =>
                                                   setData("name", event.target.value)
                                               }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-md" label="Email" name="email"
                                            value={data.email}
                                            onChange={(event) =>
                                                setData("email", event.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Password</label>
                                        <input type="password" className="w-full px-4 py-2 rounded-md" label="Password"
                                               name="password" value={passwordChanged ? data.password : "******"}
                                               onChange={handlePasswordChange}
                                        />
                                        <span className="text-red-600">
                                            {errors.password}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Confirm Password</label>
                                        <input type="password" className="w-full px-4 py-2 rounded-md" label="Confirm Password"
                                           name="password_confirmation" value={passwordChanged ? data.password_confirmation : ""}
                                            onChange={(event) =>
                                                setData("password_confirmation", event.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.password_confirmation}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Roles</label>
                                        <select className="w-full px-4 py-2 rounded-md"
                                            label="Roles" name="roles" value={data.roles}
                                            onChange={(event) =>
                                                setData("roles", Array.from(event.target.selectedOptions, (option) => option.value))
                                            }
                                        >
                                            {roles.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-red-600">{errors.roles}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded">
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

