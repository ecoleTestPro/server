import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';

interface CreateAppointmentPageProps {
    businessHours?: any;
    appointmentTypes?: any;
}

const CreateAppointmentPage: React.FC<CreateAppointmentPageProps> = ({ 
    businessHours, 
    appointmentTypes 
}) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Prendre un rendez-vous
                </h2>
            }
        >
            <Head title="Prendre un rendez-vous" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <AppointmentCalendar />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateAppointmentPage;