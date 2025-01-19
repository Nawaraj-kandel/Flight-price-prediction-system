import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    toast.info("You have been logged out.");
    navigate("/login");
  };

  return (
    <button
      onClick={logout}
      className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
    >
      Logout
    </button>
  );
};

export default Logout;
