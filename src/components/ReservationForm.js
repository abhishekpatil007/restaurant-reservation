import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ReservationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    table: '',
    phone: '',
    guests: '',
    location: '', 
    member: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
        !formData.name ||
        !formData.table ||
        !formData.phone ||
        !formData.guests ||
        !formData.location ||
        !formData.member
    ) {
        alert('Please fill in all fields.');
        return;
    }

    fetch('http://13.127.42.139:5000/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(() => {
            setFormData({
                name: '',
                table: '',
                phone: '',
                guests: '',
                location: '',
                member: '',
            });
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

  const handleAdminClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLogin = () => {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    if (username === 'mysoreunion' && password === 'Union@1234') {
      
      handleModalClose();
      navigate('/admin');
    } else {
      alert('Access denied');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Admin Button */}
      <button
        onClick={handleAdminClick}
        className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Admin
      </button>

      {/* Modal for Admin Login */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <input
              type="text"
              id="admin-username"
              placeholder="Username"
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <input
              type="password"
              id="admin-password"
              placeholder="Password"
              className="border border-gray-300 p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button onClick={handleLogin} className="bg-teal-500 text-white p-2 rounded-lg">Login</button>
              <button onClick={handleModalClose} className="bg-red-500 text-white p-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Background Image Container */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          backgroundImage: `url('/backgroundImage.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)', // Apply blur effect
          zIndex: -1, // Send it behind other elements
        }}
      ></div>

      {/* Form Container */}
      <motion.div
        className="bg-white shadow-lg rounded-lg border border-gray-300 p-8 max-w-md w-full relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center relative z-10">Restaurant Table Reservation</h2>

        {submitted && (
          <motion.div
            className="bg-green-100 text-green-800 p-4 mb-4 rounded-lg shadow-md relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Your table is reserved!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="table" className="font-medium text-gray-700">Table Number</label>
            <input
              type="text"
              id="table"
              name="table"
              value={formData.table}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="guests" className="font-medium text-gray-700">Number of Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Location</label>
            <div className="flex space-x-2">
              <button
                type="button"
                name="location"
                value="Bar"
                onClick={handleChange}
                className={`p-2 rounded-lg border ${formData.location === 'Bar' ? 'bg-teal-500 text-white' : 'bg-white text-teal-500'} border-teal-500 transition`}
              >
                Bar
              </button>
              <button
                type="button"
                name="location"
                value="Restaurant"
                onClick={handleChange}
                className={`p-2 rounded-lg border ${formData.location === 'Restaurant' ? 'bg-teal-500 text-white' : 'bg-white text-teal-500'} border-teal-500 transition`}
              >
                Restaurant
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray700">Member</label>
            <div className="flex space-x-2">
              <button
                type="button"
                name="member"
                value="Yes"
                onClick={handleChange}
                className={`p-2 rounded-lg border ${formData.member === 'Yes' ? 'bg-teal-500 text-white' : 'bg-white text-teal-500'} border-teal-500 transition`}
              >
                Yes
              </button>
              <button
                type="button"
                name="member"
                value="No"
                onClick={handleChange}
                className={`p-2 rounded-lg border ${formData.member === 'No' ? 'bg-teal-500 text-white' : 'bg-white text-teal-500'} border-teal-500 transition`}
              >
                No
              </button>
            </div>
          </div>

          {/* Updated Reserve Button */}
          <button
  type="submit"
  className={`w-full py-2 rounded-lg font-medium bg-teal-500 text-white hover:bg-teal-600 transition`}
>
  Reserve
</button>
        </form>
      </motion.div>
    </div>
  );
}

export default ReservationForm;