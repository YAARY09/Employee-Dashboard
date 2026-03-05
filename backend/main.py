from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Employee
app = FastAPI()
# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/employees")
def get_employees():
    db: Session = SessionLocal()
    employees = db.query(Employee).all()
    result = []
    for emp in employees:
        result.append({
            "id": emp.id,
            "name": emp.name,
            "department": emp.department
        })
    return result

@app.post("/employees")
def add_employees(emp:dict):
    db=SessionLocal()
    new_emp=Employee(
        name=emp["name"],
        department=emp["department"]
    )
    db.add(new_emp)
    db.commit()
    return {"message":"Employee added"}

@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int):
   db = SessionLocal()
   emp = db.query(Employee).filter(Employee.id == emp_id).first()
   if emp:
       db.delete(emp)
       db.commit()
   return {"message": "Employee deleted"}
 