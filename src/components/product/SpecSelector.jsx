import React from "react";
import { Tag } from "antd";

function SpecSelector({ specs, selectedSpecs, onChange }) {
  return (
    <div>
      {specs.map((spec) => (
        <div key={spec.name} style={{ marginBottom: 8 }}>
          <div style={{ marginBottom: 4 }}>{spec.name}：</div>
          {spec.options.map((option) => {
            const active = selectedSpecs[spec.name] === option;
            return (
              <Tag
                key={option}
                color={active ? "processing" : ""}
                style={{ cursor: "pointer", marginBottom: 4 }}
                onClick={() =>
                  onChange({
                    ...selectedSpecs,
                    [spec.name]: option,
                  })
                }
              >
                {option}
              </Tag>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SpecSelector;
