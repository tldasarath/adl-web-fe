import React, { useState } from 'react'

const MeetingComponent = ({handleScheduleClick}) => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        purpose: '',
        formationType: '',
        subCategory: ''
      });
      const [errors, setErrors] = useState({});
      const [selectedDay, setSelectedDay] = useState(0);
      const [selectedTime, setSelectedTime] = useState(null);
      const subCategories = {
        Mainland: ["LLC Company", "Civil Company", "Branch Office"],
        Offshore: ["JAFZA Offshore", "RAK Offshore", "Ajman Offshore"],
        Freezone: ["DMCC", "IFZA", "Meydan", "RAKEZ", "Sharjah Media City"]
      };
      const generateNextDays = () => {
        const days = [];
        for (let i = 0; i < 5; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
    
          const timeSlots = [
            { id: `slot-${i}-1`, time: '09:00 AM', available: true },
            { id: `slot-${i}-2`, time: '10:30 AM', available: true },
            { id: `slot-${i}-3`, time: '12:00 PM', available: true },
            { id: `slot-${i}-4`, time: '02:00 PM', available: true },
            { id: `slot-${i}-5`, time: '03:30 PM', available: true },
            { id: `slot-${i}-6`, time: '05:00 PM', available: true },
          ];
    
          days.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            timeSlots
          });
        }
        return days;
      };
      const daysSchedule = generateNextDays();
    
    
      const handleSubmit = (e) => {
        e.preventDefault();
     const newErrors = {};
      if (!userInfo.name.trim()) newErrors.name = "Full name is required";
      if (!userInfo.email.trim()) newErrors.email = "Email is required";
      if (!userInfo.phone.trim()) newErrors.phone = "Phone number is required";
      if (!userInfo.formationType) newErrors.formationType = "Please select a company formation";
      if (!userInfo.subCategory) newErrors.subCategory = "Please select a subcategory";
      if (!selectedTime) newErrors.selectedTime = "Please select a meeting time";
      if (!userInfo.purpose.trim()) newErrors.purpose = "Please enter purpose";
    
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    
        const selectedDate = daysSchedule[selectedDay];
        const message = `Hello! I'd like to schedule a meeting:\n\nName: ${userInfo.name}\nEmail: ${userInfo.email}\nPhone: ${userInfo.phone}\nPurpose: ${userInfo.purpose}\nDate: ${selectedDate.date} ${selectedDate.day}\nTime: ${selectedTime}`;
    
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/971542179221?text=${encodedMessage}`; // Replace with your number
    
        window.open(whatsappUrl, '_blank');
        setIsModalOpen(false);
        setUserInfo({ name: '', email: '', phone: '', purpose: '' });
        setSelectedTime(null);
      };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div className="glass-card rounded-3xl p-8 w-full max-w-3xl mx-auto relative overflow-y-auto max-h-[90vh]">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Schedule Meeting
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 🟩 Top Section (Two per row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-white mb-2">Full Name</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => {
                setUserInfo({ ...userInfo, name: e.target.value });
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              className={`w-full glass-bg rounded-2xl px-4 py-3 backdrop-blur-sm ${
                errors.name ? "border border-red-400" : ""
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className={`w-full glass rounded-2xl px-4 py-3 backdrop-blur-sm ${
                errors.email ? "border border-red-400" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* 🟩 Second Row (Phone + Formation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label className="block text-white mb-2">Phone</label>
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) => {
                setUserInfo({ ...userInfo, phone: e.target.value });
                setErrors((prev) => ({ ...prev, phone: "" }));
              }}
              className={`w-full glass rounded-2xl px-4 py-3 backdrop-blur-sm ${
                errors.phone ? "border border-red-400" : ""
              }`}
              placeholder="Enter your phone"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Company Formation */}
          <div>
            <label className="block text-white mb-2">Company Formation</label>
            <select
              value={userInfo.formationType}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  formationType: e.target.value,
                  subCategory: "",
                });
                setErrors((prev) => ({ ...prev, formationType: "" }));
              }}
              className={`w-full glass rounded-2xl px-4 py-3 backdrop-blur-sm text-white bg-transparent ${
                errors.formationType ? "border border-red-400" : ""
              }`}
            >
              <option value="" className='bg-gray-400'>Select Formation</option>
              <option value="Mainland"className='bg-gray-400'>Mainland</option>
              <option value="Offshore"className='bg-gray-400'>Offshore</option>
              <option value="Freezone"className='bg-gray-400'>Freezone</option>
            </select>
            {errors.formationType && (
              <p className="text-red-400 text-sm mt-1">
                {errors.formationType}
              </p>
            )}
          </div>
        </div>

        {/* 🟩 Subcategory */}
        {userInfo.formationType && (
          <div>
            <label className="block text-white mb-2">Subcategory</label>
            <select
              value={userInfo.subCategory}
              onChange={(e) => {
                setUserInfo({ ...userInfo, subCategory: e.target.value });
                setErrors((prev) => ({ ...prev, subCategory: "" }));
              }}
              className={`w-full glass rounded-xl px-4 py-3 backdrop-blur-sm text-white bg-transparent ${
                errors.subCategory ? "border border-red-400" : ""
              }`}
            >
              <option value="" className='bg-gray-400'>Select Subcategory</option>
              {subCategories[userInfo.formationType].map((item, i) => (
                <option className='bg-gray-400' key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.subCategory && (
              <p className="text-red-400 text-sm mt-1">{errors.subCategory}</p>
            )}
          </div>
        )}

        {/* 🗓️ Date Selector */}
        <div>
          <label className="block text-white mb-2">Select Date</label>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
            {daysSchedule.map((day, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`min-w-[90px] px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                  selectedDay === index
                    ? "bg-white text-blue-700 font-semibold"
                    : "bg-white/10 text-white hover:bg-white/30"
                }`}
              >
                <div>{day.day}</div>
                <div>{day.date}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ⏰ Time Selector */}
        <div>
          <label className="block text-white mb-2">Select Time</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {daysSchedule[selectedDay].timeSlots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedTime(slot.time)}
                className={`py-2 rounded-xl text-sm transition-all duration-200 ${
                  selectedTime === slot.time
                    ? "bg-white text-blue-700 font-semibold"
                    : "bg-white/10 text-white hover:bg-white/30"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          {errors.selectedTime && (
            <p className="text-red-400 text-sm mt-1">{errors.selectedTime}</p>
          )}
        </div>

        {/* 🧾 Purpose */}
        <div>
          <label className="block text-white mb-2">Purpose</label>
          <textarea
            value={userInfo.purpose}
            onChange={(e) => {
              setUserInfo({ ...userInfo, purpose: e.target.value });
              setErrors((prev) => ({ ...prev, purpose: "" }));
            }}
            className={`w-full glass rounded-2xl px-4 py-3 backdrop-blur-sm ${
              errors.purpose ? "border border-red-400" : ""
            }`}
            placeholder="Meeting purpose"
            rows={3}
          />
          {errors.purpose && (
            <p className="text-red-400 text-sm mt-1">{errors.purpose}</p>
          )}
        </div>

        {/* 📅 Summary */}
        <div className="bg-blue-50/30 rounded-2xl p-4 backdrop-blur-sm text-sm text-gray-100">
          <strong>Selected Schedule:</strong>
          <br />
          {daysSchedule[selectedDay].day}, {daysSchedule[selectedDay].date} at{" "}
          {selectedTime || "—"}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => handleScheduleClick(false)}
            className="flex-1 bg-red-800 hover:bg-red-900 text-white py-3 rounded-2xl transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1  bg-white border-green-400/30 text-green-700 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Send via WhatsApp
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default MeetingComponent