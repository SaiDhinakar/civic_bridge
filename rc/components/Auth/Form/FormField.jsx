import MultiSelect from "./MultiSelect";
import { styles } from "../../../styles/authStyles";

const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b8380' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`;

export default function FormField({ field, value, onChange }) {
  const labelEl = (
    <label style={styles.label}>{field.label}</label>
  );

  if (field.type === "multiselect") {
    return (
      <div>
        {labelEl}
        <MultiSelect options={field.options} value={value || []} onChange={onChange} />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        {labelEl}
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{
            ...styles.input,
            appearance: "none",
            backgroundImage: CHEVRON_SVG,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: 36,
          }}
        >
          <option value="">Select…</option>
          {field.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      {labelEl}
      <input
        type={field.type}
        placeholder={field.placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
        onFocus={(e) => (e.target.style.border = "1.5px solid #5f9c52")}
        onBlur={(e) => (e.target.style.border = "1px solid #d8d3d0")}
      />
    </div>
  );
}
