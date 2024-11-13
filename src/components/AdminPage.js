import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function AdminPage() {
    const [reservations, setReservations] = useState([]);

    // Fetch reservations from MySQL database
    const fetchReservations = () => {
        fetch('http://13.127.42.139:5000/api/reservations')
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched reservations:', data);
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
        <div className="min-h-screen flex items-center justify-center p-6 relative">
            {/* Background Image Container */}
            <div
                className="absolute top-0 left-0 right-0 bottom-0"
                style={{
                    backgroundImage: `url('/backgroundImage.jpg')`, // Reference to the public folder
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(5px)', // Apply blur effect
                    zIndex: -1, // Send it behind other elements
                }}
            ></div>

            <motion.div
                className="bg-gradient-to-br from-white via-teal-50 to-teal-200 shadow-lg rounded-lg border border-gray-300 p-8 w-full relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: '90%', minHeight: reservations.length > 0 ? 'auto' : '600px' }}
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center relative z-10">Admin - Reservations</h2>
 
                <div className="relative z-10">
                    {reservations.length === 0 ? (
                        <p className="text-gray-700 text-center">No reservations yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300" style={{ fontSize: '1.5em', width: '1000px', margin: '0 auto' }}>
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 p-2">ID</th>
                                        <th className="border border-gray-300 p-2">Name</th>
                                        <th className="border border-gray-300 p-2">Table Number</th>
                                        <th className="border border-gray-300 p-2">Phone</th>
                                        <th className="border border-gray-300 p-2">Guests</th>
                                        <th className="border border-gray-300 p-2">Location</th>
                                        <th className="border border-gray-300 p-2">Member</th>
                                        <th className="border border-gray-300 p-2">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation) => (
                                        <tr key={reservation.id}>
                                            <td className="border border-gray-300 p-2">{reservation.id}</td>
                                            <td className="border border-gray-300 p-2">{reservation.name}</td>
                                            <td className="border border-gray-300 p-2">{reservation.table_number}</td>
                                            <td className="border border-gray-300 p-2">{reservation.phone}</td>
                                            <td className="border border-gray-300 p-2">{reservation.guests}</td>
                                            <td className="border border-gray-300 p-2">{reservation.location}</td>
                                            <td className="border border-gray-300 p-2">{reservation.member ? 'Yes' : 'No'}</td>
                                            <td className="border border-gray-300 p-2">{new Date(reservation.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default AdminPage;
