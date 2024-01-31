import EmployeeGrid from "../components/EmployeeGrid";
import EmployeePagination from "../components/EmployeePagination/EmployeePagination";
import NavBar from "../components/NavBar";

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <EmployeeGrid />
      <EmployeePagination />
    </>
  );
};

export default HomePage;
