import React, { useState } from "react";
import "./index.scss";
import { editProfile } from "../../../api/FirestoreAPI";
import { AiOutlineClose } from "react-icons/ai"

export default function ProfileEdit({ onEdit, currentUser }) {

  const [editInputs, setEditInputs] = useState(currentUser)

  const getInput = (event) => {
    let { name,value } = event.target
    let input = { [name]:value }
    setEditInputs({ ...editInputs, ...input})
  }

  const updateProfileData = async () => {
    await editProfile(currentUser?.userID, editInputs)
    await onEdit()
  }

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={20}/>
        {/* <button onClick={onEdit}>Go Back</button> */}
      </div>
      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Name"
          name="name"
          value={editInputs.name}
        />

        <label>Headline</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Headline"
          name="headline"
          value={editInputs.headline}
        />

        <label>Country</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />

        <label>City</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Company"
          name="company"
          value={editInputs.company}
        />

        <label>College</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />

        <label>Industry</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />

        <label>Website</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />

        <label>About</label>
        <textarea
          onChange={getInput}
          className="common-textArea"
          placeholder="About Me"
          name="abouMe"
          rows={5}
          value={editInputs.abouMe}
        />

        <label>Skills</label>
        <input
          onChange={getInput}
          className="common-input"
          placeholder="skills"
          name="skills"
          value={editInputs.skills}
        />

      </div>
      <div className="save-container">
        <button className="save-btn" onClick={updateProfileData}>Save</button>
      </div>
    </div>
  );
}
