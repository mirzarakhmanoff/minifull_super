"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Rekvizits from "../../components/Rekvizits/Rekvizits";
import Info from "../../components/Info/Info";

// Importing your child components

const PersonalCabinet = () => {
  const [formData, setFormData] = useState({
    sponsorId: "",
    sponsorFullName: "",
    idNumber: "",
    surname: "",
    fullName: "",
    fatherName: "",
    email: "",
    phoneNumber: "",
  });

  const [activeTab, setActiveTab] = useState("system"); // State to track the active tab

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle form submission here
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-10 bg-gray-50 mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-medium text-gray-800">System Info</h2>
      </div>
      <div className="flex space-x-6 mb-6">
        <div>
          <button
            onClick={() => handleTabChange("system")}
            className={`text-gray-800 hover:text-blue-600 transition-all duration-300 px-3 py-1 focus:outline-none ${
              activeTab === "system"
                ? "font-semibold border-b-2 border-blue-600"
                : ""
            }`}
          >
            System Info
          </button>
        </div>
        <div>
          <button
            onClick={() => handleTabChange("rekvizits")}
            className={`text-gray-800 hover:text-blue-600 transition-all duration-300 px-3 py-1 focus:outline-none ${
              activeTab === "rekvizits"
                ? "font-semibold border-b-2 border-blue-600"
                : ""
            }`}
          >
            Rekvizits
          </button>
        </div>
        <div>
          <button
            onClick={() => handleTabChange("personalInfo")}
            className={`text-gray-800 hover:text-blue-600 transition-all duration-300 px-3 py-1 focus:outline-none ${
              activeTab === "personalInfo"
                ? "font-semibold border-b-2 border-blue-600"
                : ""
            }`}
          >
            Personal Info
          </button>
        </div>
      </div>

      {activeTab === "rekvizits" && <Rekvizits />}
      {activeTab === "personalInfo" && <Info />}

      {activeTab === "system" && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {[
            { label: "Sponsor ID", name: "sponsorId" },
            { label: "Sponsor's Full Name", name: "sponsorFullName" },
            { label: "ID Number", name: "idNumber" },
            { label: "Surname", name: "surname" },
            { label: "Full Name", name: "fullName" },
            { label: "Father's Name", name: "fatherName" },
            { label: "Email", name: "email" },
            { label: "Phone Number", name: "phoneNumber" },
          ].map((field, index) => (
            <div key={index}>
              <Label>{field.label}</Label>
              <Input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
          <div className="container w-max mt-2">
            <Button className="w-full px-10  bg-blue-500">Save</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PersonalCabinet;
