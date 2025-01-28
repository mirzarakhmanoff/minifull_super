"use client";
import React, { useState } from "react";
import AccountCards from "../../components/AccountCards/AccountCards";
import TransactionHistory from "../../components/PaymentHistory/TransactionHistory";
import PaymentHistory from "../../components/PaymentsHistory/PaymentHistory";
import History from "../../components/History/History";
import Bonus from "../../components/Bonus/Bonus";
import PaymentMe from "../../components/PaymentMe/PaymentMe";

const Account = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div className="mb-4 ml-5">
        <AccountCards />
        <button
          onClick={() => setActiveTab(1)}
          className={`px-4 py-2 mr-4 rounded ${
            activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          TransAksiyalar tarixi
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-4 py-2 mr-4 rounded ${
            activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Oylik To'lov tarixi
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`px-4 py-2 mr-4 rounded ${
            activeTab === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          O'tkazmalar tarixi
        </button>
        <button
          onClick={() => setActiveTab(4)}
          className={`px-4 py-2 mr-4 rounded ${
            activeTab === 4 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Registratsiya uchun bonuslar
        </button>
        <button
          onClick={() => setActiveTab(5)}
          className={`px-4 py-2 rounded ${
            activeTab === 5 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Kelib tushgan to'lovlar tarixi
        </button>
      </div>
      {activeTab === 1 && <TransactionHistory />}{" "}
      {activeTab === 2 && <PaymentHistory />}
      {activeTab === 3 && <History />}
      {activeTab === 4 && <Bonus />}
      {activeTab === 5 && <PaymentMe />}
    </div>
  );
};

export default Account;
