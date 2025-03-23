import { useState, useEffect } from 'react';

function UserPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [convertedDates, setConvertedDates] = useState<{ [key: string]: string }>({});
  const [timezone, setTimezone] = useState<number>(0);

  const timezonesOffset = [0, 330, 270];

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/getslot');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      setDoctors(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(Number(event.target.value));
  };

  const Convert = (slotId: string, slotDate: string) => {
    const date = new Date(slotDate);
    const convertedDate = new Date(date.getTime() + timezonesOffset[timezone] * 60000);
    setConvertedDates((prev) => ({ ...prev, [slotId]: convertedDate.toISOString().split('T')[0] }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Available Doctors and Slots</h2>

      {doctors.length > 0 ? (
        <ul className="w-full max-w-md">
          {doctors.map((doctor: any, doctorIndex: number) => (
            <li key={doctorIndex} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h3 className="font-bold text-lg mb-2">{doctor.doctorName}</h3>
              <ul>
                {doctor.slots.length > 0 ? (
                  doctor.slots.map((slot: any, slotIndex: number) => (
                    <li key={slotIndex} className="p-2 border-t border-gray-200 flex gap-2 items-center">
                      <div>Slot Date: {slot.date}</div>

                      <div className="m-4 w-full">
                        <label htmlFor="options" className="text-black">
                          Choose an option:
                        </label>
                        <select id="options" value={timezone} onChange={handleTimezoneChange}>
                          <option value="0">Indian</option>
                          <option value="1">US</option>
                          <option value="2">Europe</option>
                        </select>
                      </div>

                      <button
                        onClick={() => Convert(slot.id, slot.date)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                      >
                        Convert
                      </button>

                      {convertedDates[slot.id] && (
                        <div className="w-full text-center my-2">
                          Converted Date: {convertedDates[slot.id]}
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li>No available slots</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors or slots available at the moment.</p>
      )}
    </div>
  );
}

export default UserPage;
