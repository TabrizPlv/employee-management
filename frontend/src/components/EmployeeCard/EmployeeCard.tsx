import "./EmployeeCard.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Employee } from "../../types/Employee/Employee.type";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/update/${employee.id}`);
  };

  return (
    <div className="card-container">
      <div className="info-container">
        <h1>{employee.employeeName}</h1>
        <h2>{employee.department}</h2>
        <h2>${employee.salary}</h2>
      </div>
      <div className="button-container">
        <IconButton onClick={handleUpdate} sx={{ gap: "10px" }}>
          <EditIcon sx={{ color: "orange" }} />
        </IconButton>
        <DeleteConfirmation id={employee.id} />
      </div>
    </div>
  );
};

export default EmployeeCard;
