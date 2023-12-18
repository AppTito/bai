import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from 'react-modal';
import '../../../css/modal.css';

export default function ModalCreate(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { data, setData, errors, post, processing, wasSuccessful } = useForm({
        name: '',
        // ...otros campos
    });

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route('organizations.store'));
    }

    return (
        <AuthenticatedLayout user={props.auth.user} errors={props.errors}>
            {/* ... */}
            <div className="flex items-center justify-between mb-6">
                <Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none" href={route("organizations.index")}> Back
                </Link>
                <button className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none" onClick={openModal}>
                    Create Organization
                </button>
            </div>

            {/* ... */}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h2>Create Organization</h2>
                <button onClick={closeModal}>Close</button>
                <form onSubmit={handleSubmit}>
                    {/* ... */}
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}