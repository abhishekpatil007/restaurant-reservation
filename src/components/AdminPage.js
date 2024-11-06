import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function AdminPage() {
    const [reservations, setReservations] = useState([]); // Ensure this line is correct

    // Fetch reservations from MySQL database
    const fetchReservations = () => {
        fetch('http://localhost:5000/api/reservations')
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched reservations:', data); // Debugging line
                setReservations(data);
            })
            .catch((error) => {
                console.error('Error fetching reservations:', error);
            });
    };

    useEffect(() => {
        fetchReservations();

        // Optional: Set up an interval to periodically check for updates
        const interval = setInterval(fetchReservations, 1000); // Check every 1 second

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-100 to-teal-300 flex items-center justify-center p-6">
            <motion.div
                className="bg-gradient-to-br from-white via-teal-50 to-teal-200 shadow-lg rounded-lg border border-gray-300 p-8 max-w-4xl w-full relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute inset-0 -z-10">
                    <div className="w-full h-full bg-[url('https://source.unsplash.com/1K6XxR6ZgAc')] bg-cover bg-center opacity-10"></div>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center relative z-10">Admin - Reservations</h2>

                <div className="relative z-10">
                    {reservations.length === 0 ? (
                        <p className="text-gray-700 text-center">No reservations yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {reservations.map((reservation) => (
                                <div key={reservation.id} className="bg-white shadow-md rounded-lg border border-gray-300 p-4 mb-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Reservation {reservation.id}</h3>
                                    <p className="text-gray-700">Name: {reservation.name}</p>
                                    <p className="text-gray-700">Table Number: {reservation.table_number}</p>
                                    <p className="text-gray-700">Phone: {reservation.phone}</p>
                                    <p className="text-gray-700">Guests: {reservation.guests}</p>
                                    <p className="text-gray-700">Location: {reservation.location}</p>
                                    <p className="text-gray-700">Member: {reservation.member}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default AdminPage;
