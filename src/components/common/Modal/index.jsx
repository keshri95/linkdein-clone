import React from "react";
import { Button, Modal } from "antd";
import "./index.scss";

export default function ModalComponent({ modalOpen, setModalOpen, setStatus, status, sendStatus, isEdit, updateStatus }) {



  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("")
          setModalOpen(false)
        }}
        onCancel={() => {
          setStatus("")
          setModalOpen(false)
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true }
            onClick={isEdit ? updateStatus :  sendStatus}
          >
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <input
          className="modal-input"
          type="text"
          placeholder="What do you want to talk about?"
          value={status}
          onChange={(event) =>setStatus(event.target.value) }
        />
        {/* <button className="post-btn">Post</button> */}
      </Modal>
    </>
  );
}
