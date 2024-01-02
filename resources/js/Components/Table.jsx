import {Link} from "@inertiajs/react";
import {usePermissions} from "@/hooks/usePermissions.js";

export default function Table({ items, columns, labels , primary, actions, per ,property }) {
    const { hasPermission, hasRole } = usePermissions()

    return (
        <>
            {(hasRole('super-admin') || hasPermission(`${per}-create`)) && (actions[0]) && (
                <div className="flex items-center justify-between mb-6">
                    <Link className="px-6 py-2 text-white bg-emerald-600 rounded-md focus:outline-none"
                          href={route(actions[0])} >
                        Crear {primary}
                    </Link>
                </div>
            )}
            <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-primary uppercase bg-itemSA">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">{primary}</th>
                        {labels.map((labels) =>
                            <th key={labels} scope="col" className="px-6 py-3 ">{labels}</th>
                        )}
                        {(hasRole('super-admin') || hasPermission(`${per}-edit`) ||
                            hasPermission(`${per}-delete`)) && (
                            <th scope="col" className="px-6 py-3 text-center">Acciones</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {items.data.map((item) =>
                        <tr key={item.id} className="bg-white border-b ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                #{item.id}
                            </th>
                            {columns.map((column) =>
                                <td key={column} className="px-6 py-4 ">
                                    {Array.isArray(item[column]) ? (
                                        item[column].map((obj, index) => (
                                            <span key={index}
                                                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {obj[property]}
                                            </span>
                                        ))
                                    ) : typeof item[column] === 'object' && item[column] !== null ? (
                                        <span>{item[column][property]}</span>
                                        ) : (
                                        item[column] !== null ? item[column] : ''
                                        )}
                                </td>
                            )}
                            {(hasRole('super-admin') || hasPermission(`${per}-edit`) ||
                                hasPermission(`${per}-delete`)) && (actions[1] || actions[2]) && (
                                <td className="px-6 py-4 text-center flex flex-row justify-center">
                                    {(hasRole('super-admin') || hasPermission(`${per}-edit`)) &&
                                        (actions[1]) && (
                                            <Link tabIndex="1"
                                                  className="px-4 py-2 text-sm text-white bg-sky-800 rounded mr-2"
                                                  href={route(actions[1], item.id)}>Editar</Link>
                                        )}
                                    {(hasRole('super-admin') || hasPermission(`${per}-delete`)) &&
                                        (actions[2]) && (
                                            <button onClick={actions[2]} id={item.id} tabIndex="-1" type="button"
                                                    className="mx-1 px-4 py-2 text-sm text-white bg-rose-500 rounded mr-2 ">
                                                Eliminar
                                            </button>
                                        )}
                                </td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
