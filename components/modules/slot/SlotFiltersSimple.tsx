"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SlotSearchParams } from "@/types/slot.type";
import { useEffect, useState } from "react";
import { getSubjectsAction } from "@/action/subject.action";
import { Loading } from "@/components/common/Loading";

interface Props {
  onChange: (filters: SlotSearchParams) => void;
}

export function SlotFiltersSimple({ onChange }: Props) {

  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
  const update = (key: keyof SlotSearchParams, value: any) => {
    onChange({ [key]: value, page: "1" });
  };
const [subjectsData, setSubjectsData] = useState<{ id: string; name: string }[]>([]);
const fetchSubjects = async()=> {
  setIsSubjectsLoading(true);
  const {data:subjects, error} =  await getSubjectsAction();
  if(!error && subjects){
    setSubjectsData(subjects);
  }
  
  setIsSubjectsLoading(false);
}  
useEffect(() => {
  fetchSubjects();
}, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <Input
        placeholder="Search tutor or subject"
        onChange={(e) => update("search", e.target.value)}
      />

      {/* <Select onValueChange={(v) => update("categoryId", v)}>
        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
          {categories.map(c => (
            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
          ))}
        </SelectContent>
      </Select> */}

      <Select onValueChange={(v) => update("subjectId", v)}>
        <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
        {isSubjectsLoading? <>
          <Loading />
        </>:
          <SelectContent>
          {subjectsData?.map(s => (
            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
          ))}
        </SelectContent>}
      </Select>

      <Select onValueChange={(v) => update("isFree", v === "true")}>
        <SelectTrigger><SelectValue placeholder="Price" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Free</SelectItem>
          <SelectItem value="false">Paid</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={() => onChange({})}>
        Reset
      </Button>
    </div>
  );
}
