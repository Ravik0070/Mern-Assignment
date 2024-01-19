import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Errors from "./Errors";
import { BadgePlus, Pencil, Trash } from "lucide-react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { rootUrl } from "../RootUrl";
function truncateText(text, maxWords) {
  const words = text.split(" ");
  const truncated = words.slice(0, maxWords).join(" ");
  return truncated + (words.length > maxWords ? "..." : "");
}

const NotesList = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${rootUrl}/api/note/all`, {
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${rootUrl}/api/note/rem/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          Content-Type: "application/json",
        },
        params: {
          userId: currentUser.user._id,
        },
      });
      await fetchNotes();
    } catch (error) {
      setError(error);
    }
  };
  const NoteRow = ({ note, onDelete }) => (
    <tr>
      <td style={{ fontWeight: "bold" }}>
        <Link to={`/${note._id}`}>{truncateText(note.title, 4)}</Link>
      </td>
      <td>{truncateText(note.description, 3)}</td>
      <td>{new Date(note.updatedAt).toLocaleDateString()}</td>
      <td>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <Link to={`/form/${note._id}`}>
            <Button variant="outline-info">
              Edit &nbsp; <Pencil />
            </Button>
          </Link>
          <Button variant="outline-danger" onClick={() => onDelete(note._id)}>
            Delete &nbsp; <Trash />
          </Button>
        </div>
      </td>
    </tr>
  );

  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="main">
      <div className="notesContainer">
        <div className="heading">{currentUser.user.username}'s Notes</div>
        <Link to="/form">
          <Button variant="outline-secondary">
            Add Note &nbsp;
            <BadgePlus />
          </Button>
        </Link>
        <div className="tableContainer">
          <Table hover striped="columns" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Desc</th>
                <th>Created/Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.length > 0 ? (
                notes.map((note) => (
                  <NoteRow key={note._id} note={note} onDelete={handleDelete} />
                ))
              ) : (
                <tr>
                  <td colSpan="4">No notes available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      {error && <Errors error={error} />}
    </div>
  );
};

export default NotesList;
