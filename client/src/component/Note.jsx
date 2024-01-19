import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Errors from "./Errors";
import Card from "react-bootstrap/Card";
import {rootUrl} from "../RootUrl"
const Note = () => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await axios.get(`${rootUrl}/api/note/getnote/${id}`, {
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
  }, [id, currentUser.token, currentUser.user._id]);

  return (
      <div className="note">
        <Card style={{ width: "80%", textAlign: "center" }}>
          <Card.Body>
            <Card.Title
              style={{
                backgroundColor: "gray",
                padding: "10px 0",
                color: "white",
              }}
            >
              {note?.title}
            </Card.Title>
            <Card.Text>{note?.description}</Card.Text>
          </Card.Body>
        </Card>
        <div className="info">
          <p>last updated: {note?.formattedUpdatedAt}</p>
        </div>
        {error && <Errors error={error} />}
      </div>
  );
};

export default Note;
