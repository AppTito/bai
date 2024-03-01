import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {

    function getClassName(active) {
        if(active) {
            return "mr-1 mb-1 px-4 py-3 text-sm text-gray-950 leading-4 border rounded hover:bg-white focus:border-primary " +
                "focus:text-primary bg-green-500 ext-primary";
        } else{
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary " +
                "focus:text-primary";
        }
    }

    return (
        links && links.length > 3 && (
            <div className="mb-4">
                <div className="flex flex-wrap mt-8 justify-center" >
                    {links.map((link, key) => (
                        link.url === null ?
                            (<div key={key} dangerouslySetInnerHTML={{ __html: link.label }}
                                  className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                />) :
                            (<Link key={key} className={getClassName(link.active)} href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                            />)
                    ))}
                </div>
            </div>
        )
    );
}
