import { useDispatch } from "react-redux";
import { getAllJobs } from "../apis/jobs";
import { hideLoading, showLoading } from "../redux/alertSlice";
import toast from "react-hot-toast";

function Filters({ filters, setFilters, setData }) {
  const dispatch = useDispatch();

  const filterData = async (filtersTemp) => {
    try {
      dispatch(showLoading());
      const response = await getAllJobs(filtersTemp);
      if (response.success) {
        const approvedJobs = response.data.filter(
          (job) => job.status === "approved"
        );
        setData(approvedJobs);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-start gap-2">
        <select
          name=""
          id=""
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          <option value="ukraine">Ukraine</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">Industry</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>

        <button
          className="primary-outlined-btn"
          onClick={() => {
            filterData({
              location: "",
              industry: "",
            });
            setFilters({
              location: "",
              industry: "",
            });
          }}
        >
          CLEAR
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => filterData(filters)}
        >
          FILTER
        </button>
      </div>
    </div>
  );
}

export default Filters;
