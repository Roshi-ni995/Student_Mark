// useStudents.js
import { useState, useCallback } from "react";
import data from "../data/students.json";

function useStudents() {
  const [students, setStudents] = useState(data);

  const deleteStudent = useCallback((id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { students, setStudents, deleteStudent };
}

export default useStudents;
