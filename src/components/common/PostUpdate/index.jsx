import React, { useState } from "react";
import "./index.scss";
import ModalComponent from "../Modal";
import { postStatus } from "../../../api/FirestoreAPI"

export default function PostStatus() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");



  const sendStatus = async () => {
    await postStatus(status)
    await setModalOpen(false)
    await setStatus("")
  }

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button className="open-post-modal" onClick={() => setModalOpen(true)}>
          Start a Post
        </button>
      </div>

      <ModalComponent
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setStatus={setStatus}
        status={status}
        sendStatus={sendStatus}
      />
    </div>
  );
}
