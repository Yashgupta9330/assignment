import { useState } from 'react';

function DoctorForm() {
  const [doctorName, setDoctorName] = useState('');
  const [slot, setSlot] = useState('');
  const [slots, setSlots] = useState<string[]>([]); 

  // Add slot to the list
  const handleAddSlot = () => {
    if (slot) {
      setSlots([...slots, slot]); 
      setSlot(''); 
    }
  };
  
  // Add doctor and slots to the server
  const addDoctor = async (doctorData: any) => {
    try {
      const response = await fetch('http://localhost:4000/api/addslot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }
  
      const data = await response.json();
      console.log('Doctor added successfully:', data);
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };
  
  // Submit doctor and slots
  const handleSubmit = async () => {
    if (doctorName && slots.length > 0) {
      await addDoctor({ doctorName, slots });
      setDoctorName('');
      setSlots([]);
    } else {
      alert("Please add a doctor's name and at least one slot.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Doctor Side</h2>

      {/* Doctor Name Input */}
      <input
        type="text"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
        placeholder="Enter Doctor's Name"
        className="mb-2 p-2 border border-gray-300 rounded-md"
      />

      {/* Slot Date Input */}
      <div className="flex gap-2">
        <input
          type="date"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddSlot}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Slot
        </button>
      </div>

      {/* Display Added Slots */}
      <div className="mt-4">
        {slots.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold">Added Slots:</h3>
            <ul>
              {slots.map((slot, index) => (
                <li key={index}>{slot}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}

export default DoctorForm;

