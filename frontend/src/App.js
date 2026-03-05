import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
function App() {
 const [employees, setEmployees] = useState([]);
 const [name, setName] = useState("");
 const [department, setDepartment] = useState("");
 useEffect(() => {
   fetch("https://glorious-space-barnacle-4v45vwq6gxrhj96w-8000.app.github.dev/employees")
     .then(res => res.json())
     .then(data => setEmployees(data));
 }, []);
 const addEmployee = () => {
   fetch("https://glorious-space-barnacle-4v45vwq6gxrhj96w-8000.app.github.dev/employees", {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       name: name,
       department: department
     })
   })
   .then(() => window.location.reload());
 };
 const deleteEmployee = (id) => {
   fetch(`https://glorious-space-barnacle-4v45vwq6gxrhj96w-8000.app.github.dev/employees/${id}`, {
     method: "DELETE"
   })
   .then(() => window.location.reload());
 };
 const actionBodyTemplate = (rowData) => {
   return (
<Button
       label="Delete"
       icon="pi pi-trash"
       severity="danger"
       onClick={() => deleteEmployee(rowData.id)}
     />
   );
 };
 return (
<div className="p-m-5" style={{ padding: "40px" }}>
<h2>Employee Dashboard</h2>
<div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap:"wrap" }}>
<InputText
         placeholder="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
       />
<InputText
         placeholder="Department"
         value={department}
         onChange={(e) => setDepartment(e.target.value)}
       />
<Button
         label="Add Employee"
         icon="pi pi-plus"
         onClick={addEmployee}
       />
</div>
<DataTable
       value={employees}
       paginator
       rows={5}
       responsiveLayout="scroll"
>
<Column field="id" header="ID" />
<Column field="name" header="Name" />
<Column field="department" header="Department" />
<Column header="Action" body={actionBodyTemplate} />
</DataTable>
</div>
 );
}
export default App;