import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Errors from "./Errors";
const Note = () => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await axios.get(`/note/getnote/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          params: {
            userId: currentUser.user._id,
          },
        });
        const formattedUpdatedAt = new Date(
          res.data.note.updatedAt
        ).toLocaleString();
        setNote({ ...res.data.note, formattedUpdatedAt });
      } catch (error) {
        setError(error);
      }
    };
    getNote();
  }, [id]);

  return (
    <>
      <div className="note">
        <h1>{note?.title}</h1>
        <h3>{note?.description}</h3>
        <div className="info">
          <p>last updated: {note?.formattedUpdatedAt}</p>
        </div>
      </div>
      {error && <Errors error={error} />}
    </>
  );
};

export default Note;
