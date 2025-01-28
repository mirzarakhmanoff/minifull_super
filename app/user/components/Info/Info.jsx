import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Info = () => {
  return (
    <div>
      <div className="container w-[80%]  grid grid-cols-2 gap-5">
        <div>
          <Label>Пасспорт </Label>
          <Input type="text" placeholder="11 11 2024" />
        </div>
        <div>
          <Label>Шахсий ИНН</Label>
          <Input type="text" placeholder="1111111111" />
        </div>
        <div>
          <Label>Пасспорт серия ва рақамингизe</Label>
          <Input type="text" placeholder="AD123" />
        </div>
        <div>
          <Label>Ким томонидан берилган</Label>
          <Input type="text" placeholder="AAAAA" />
        </div>
      </div>
      <div className=" container w-max mt-2">
        <Button className="w-full  px-10 bg-blue-500">Save</Button>
      </div>
    </div>
  );
};

export default Info;
