import React, { useState } from 'react';
import Scouts from './Scouts';
import PaymentReceipt from './PaymentReceipt';

export default function Registration() {
  const schools = [
    "School A", "School B", "School C", "School D", "School E",
    "School F", "School G", "School H", "School I", "School J",
    "School K", "School L", "School M", "School N", "School O",
    "School P", "School Q", "School R", "School S", "School T",
    "School U", "School V", "School W", "School X", "School Y", "School Z",
  ];

  const [step, setStep] = useState(1);
  const [leaderCount, setLeaderCount] = useState(0);
  const [leaders, setLeaders] = useState([{ fullName: '', idNumber: '', gender: '', phoneNumber: '', email: '' }]);
  const [scoutCount, setScoutCount] = useState(0);
  const [scouts, setScouts] = useState([{ fullName: '', gender: '', phoneNumber: '', email: '' }]);
  const [school, setSchool] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [receiptImage, setReceiptImage] = useState('');

  const handleLeaderCountChange = (e) => {
    const count = parseInt(e.target.value);
    setLeaderCount(count);
    setLeaders(Array.from({ length: count }, () => ({ fullName: '', idNumber: '', gender: '', phoneNumber: '', email: '' })));
  };

  const handleScoutCountChange = (e) => {
    const count = parseInt(e.target.value);
    setScoutCount(count);
    setScouts(Array.from({ length: count }, () => ({ fullName: '', gender: '', phoneNumber: '', email: '' })));
  };

  const handleLeaderChange = (index, field, value) => {
    const updatedLeaders = [...leaders];
    updatedLeaders[index][field] = value;
    setLeaders(updatedLeaders);
  };

  const handleScoutChange = (index, field, value) => {
    const updatedScouts = [...scouts];
    updatedScouts[index][field] = value;
    setScouts(updatedScouts);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">MAJ-25 Registration</h1>

      <div className="mb-5">
        <label htmlFor="school" className="block text-lg font-medium text-gray-700">Select Your School</label>
        <select
          id="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Select Your School --</option>
          {schools.map((school, index) => (
            <option key={index} value={school}>{school}</option>
          ))}
        </select>
      </div>

      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-center mb-5">Register Your Adult Scout Leaders</h2>
          <div className="mb-5">
            <label htmlFor="leaderCount" className="block text-lg font-medium text-gray-700">How many adult leaders participated?</label>
            <input
              type="number"
              id="leaderCount"
              value={leaderCount}
              onChange={handleLeaderCountChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {leaders.map((leader, index) => (
            <div key={index} className="mb-5 border p-4 rounded-md">
              <h2 className="text-lg font-medium">Leader {index + 1}</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={leader.fullName}
                onChange={(e) => handleLeaderChange(index, 'fullName', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="ID Number"
                value={leader.idNumber}
                onChange={(e) => handleLeaderChange(index, 'idNumber', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
              <label htmlFor={`gender-${index}`} className="block text-lg font-medium text-gray-700 mt-2">Gender</label>
              <select
                id={`gender-${index}`}
                value={leader.gender}
                onChange={(e) => handleLeaderChange(index, 'gender', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                value={leader.phoneNumber}
                onChange={(e) => handleLeaderChange(index, 'phoneNumber', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                value={leader.email}
                onChange={(e) => handleLeaderChange(index, 'email', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
            </div>
          ))}

          <button
            onClick={() => setStep(2)}
            className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <Scouts
          scoutCount={scoutCount}
          scouts={scouts}
          handleScoutCountChange={handleScoutCountChange}
          handleScoutChange={handleScoutChange}
          onNext={() => setStep(3)}
          onPrevious={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <PaymentReceipt
          school={school}
          leaders={leaders}
          scouts={scouts}
          amount={amount}
          paymentDate={paymentDate}
          receiptImage={receiptImage}
          setAmount={setAmount}
          setPaymentDate={setPaymentDate}
          setReceiptImage={setReceiptImage}
          onPrevious={() => setStep(2)}
        />
      )}
    </>
  );
}
