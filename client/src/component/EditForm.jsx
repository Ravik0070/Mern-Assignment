import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import rootUrl from "../RootUrl";
import Errors from "./Errors";
const EditForm = () => {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${rootUrl}/note/create`,
        { title: inputs?.title, description: inputs?.description },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          params: {
            userId: currentUser.user._id,
          },
        }
      );
      if (res.data) {
        setInputs({
          title: "",
          description: "",
        });
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${rootUrl}/note/update/${id}`,
        { title: inputs?.title, description: inputs?.description },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          params: {
            userId: currentUser.user._id,
          },
        }
      );
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${rootUrl}/note/getnote/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          params: {
            userId: currentUser.user._id,
          },
        });
        setInputs(res.data.note);
      } catch (error) {
        setError(error);
      }
    };
    if (id) {
      setEdit(true);
      fetchNote();
    }
  }, [currentUser.token, id, currentUser.user._id]);
  return (
    <div className="noteForm">
      <form onSubmit={edit ? handleUpdate : handleAdd}>
        <h1>{edit ? "Update Note" : "Add Note"}</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            id="title"
            onChange={handleChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            placeholder="description"
            name="description"
            id="description"
            onChange={handleChange}
            value={inputs.description}
          />
        </div>
        <button type="submit" className="submitBtn">
          {edit ? "Update" : "Add"}
        </button>
      </form>
      {error && <Errors error={error} />}
    </div>
  );
};

export default EditForm;
