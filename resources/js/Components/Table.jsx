// components/Table.js
import React from "react";
import { Link } from "@inertiajs/react";

const Table = ({ columns, data, actions = [] }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-green-700 text-warmGray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className={`px-6 py-3 text-white text-left text-xs font-medium text-warmGray-50 uppercase tracking-wider ${
                column.className || ""
              }`}
            >
              {column.label}
            </th>
          ))}
          {actions.length > 0 && (
            <th
              scope="col"
              className="px-6 py-3 text-white text-center text-xs font-medium text-warmGray-50 uppercase tracking-wider"
            >
              Acciones
            </th>
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                  column.contentClassName || ""
                }`}
              >
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
            {actions.length > 0 && (
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center space-x-2">
                {actions.map((action, index) => (
                  <React.Fragment key={index}>
                    {action.render ? (
                      action.render(row)
                    ) : (
                      <Link
                        tabIndex="1"
                        className={`px-4 py-2 text-sm text-white bg-${action.color || "sky-800"} rounded mr-2`}
                        href={action.route(row.id)}
                      >
                        {action.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
