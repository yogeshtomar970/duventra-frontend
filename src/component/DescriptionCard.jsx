import React from "react";
import "../DescriptionCard.css";

const DescriptionCard = ({ description, formLink }) => {
  return (
    <div className="desc-card">
      <h1>Description</h1>

      <p className="desc-text">{description}</p>

      <div className="desc-footer">
        {formLink && (
          <h4
            className="form-link"
            onClick={() => window.open(formLink, "_blank")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Form Link
          </h4>
        )}
      </div>
    </div>
  );
};

export default DescriptionCard;
