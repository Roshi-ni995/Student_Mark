// StudentsRow.jsx
import { memo } from "react";
function StudentsRow({ student, onDelete }) {
     console.log("Rendering row:", student.name); 
      return (
        <tr>
            <td>{student.name}</td>
             <td>{student.tamil}</td>
              <td>{student.english}</td>
               <td>{student.maths}</td>
                <td>{student.tamil + student.english + student.maths}</td>
                 <td><button onClick={() => onDelete(student.id)}>Delete</button></td>

        </tr>
      );}
      export default memo(StudentsRow);