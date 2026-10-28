
import useStudents from "./hooks/useStudents";
import { useState, useEffect, useRef, useMemo } from "react";
import StudentRow from "./components/StudentsRow";
import ThemeButton from "./components/ThemeButton";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { students, deleteStudent } = useStudents();
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    return students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  const stats = useMemo(() => {
    const totals = students.map((s) => ({
      name: s.name,
      total: s.tamil + s.english + s.maths,
    }));

    const topper = totals.reduce(
      (a, b) => (b.total > a.total ? b : a),
      totals[0] || { name: "N/A", total: 0 }
    );

    const average =
      totals.reduce((sum, t) => sum + t.total, 0) /
      (totals.length || 1);

    return { topper, average: average.toFixed(1) };
  }, [students]);

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#222",
        color: theme === "light" ? "#000" : "#fff",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <ThemeButton />

      <h1>Student Mark Board</h1>

      <p>Total Students: {students.length}</p>

      <p>
        Topper: {stats.topper.name} ({stats.topper.total}) |
        Class Average: {stats.average}
      </p>

      <input
        ref={searchRef}
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={() => {
          setSearch("");
          searchRef.current?.focus();
        }}
      >
        Clear
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tamil</th>
            <th>English</th>
            <th>Maths</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((s) => (
            <StudentRow
              key={s.id}
              student={s}
              onDelete={deleteStudent}
            />
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan="6">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
