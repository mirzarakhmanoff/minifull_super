import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { DataPicker } from "../DataPicker/DataPicker";

const Rekvizits = () => {
  return (
    <div>
      <div className="container w-[80%] grid grid-cols-2 gap-5">
        <div>
          <Label>Karta raqami</Label>
          <Input type="text" placeholder="0000 0000 0000 0000" />
        </div>
        <div>
          <Label>Karta egasining ma'lumotlari</Label>
          <Input type="text" placeholder="0000 0000 0000 0000" />
        </div>
        <div>
          <Label>Amal qilish muddati</Label>
          <DataPicker />
        </div>
      </div>
      <div className="container w-max mt-2">
        <Button className="w-full px-10 bg-blue-500">Saqlash</Button>
      </div>
    </div>
  );
};

export default Rekvizits;
