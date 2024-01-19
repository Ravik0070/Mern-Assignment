import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Errors from "./Errors";
import { BadgePlus, Pencil, Trash } from "lucide-react";

function truncateText(text, maxWords) {
  const words = text.split(" ");
  const truncated = words.slice(0, maxWords).join(" ");
  return truncated + (words.length > maxWords ? "..." : "");
}

const NotesList = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  const handlDelete = async (id) => {
    try {
      const res = await axios.delete(`/note/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
        params: {
          userId: currentUser.user._id,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/note/all", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          params: {
            userId: currentUser.user._id,
          },
        });
        setNotes(res.data.notes || []);
      } catch (error) {
        setError(error);
      }
    };
    fetchNotes();
  }, [currentUser]);
  return (
    <div className="main">
      <div className="notesContainer">
        <div className="heading">{currentUser.user.username}'s Notes</div>
        <Link to="/form">
          <button className="addBtn">
            Add Note &nbsp;
            <BadgePlus />
          </button>
        </Link>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Desc</th>
                <th>Created/Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note._id}>
                  <td style={{ fontWeight: "bold" }}>
                    <Link to={`/${note._id}`}>
                      {truncateText(note.title, 4)}
                    </Link>
                  </td>
                  <td>{truncateText(note.description, 3)}</td>
                  <td>{new Date(note.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actionsContainer">
                      <Link to={`/form/${note._id}`}>
                        <button className="edit">
                          Edit &nbsp; <Pencil />
                        </button>
                      </Link>
                      <button
                        className="delete"
                        onClick={() => handlDelete(note._id)}
                      >
                        Delete &nbsp; <Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {error && <Errors error={error} />}
    </div>
  );
};

export default NotesList;
