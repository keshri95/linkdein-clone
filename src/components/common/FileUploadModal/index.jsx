
import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import "./index.scss";

export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  console.log(currentImage.name);

  return (
    <div>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="image-upload-main">
          <p>{currentImage.name}</p>

          <label htmlFor="image-upload">Add an Image</label>

          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}

          <input hidden type={"file"} id="image-upload" onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
}
