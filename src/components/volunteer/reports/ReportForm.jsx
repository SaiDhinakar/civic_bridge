import { useState } from "react";
import { reportsData } from "../../../data/volunteer/reportsData";

const initialValues = {
  title: "",
  description: "",
  task: "",
  location: "",
  image: null
};

const ReportForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next = {};
    if (!values.title.trim()) next.title = "Report title is required.";
    if (values.description.trim().length < 20) next.description = "Description should be at least 20 characters.";
    if (!values.task) next.task = "Please select a task.";
    if (!values.location.trim()) next.location = "Location is required.";
    return next;
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    setValues((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  };

  return (
    <form className="report-form card" onSubmit={onSubmit} noValidate>
      <p className="muted">{reportsData.data.helperText}</p>

      <label>
        <span>Report Title</span>
        <input name="title" value={values.title} onChange={onChange} placeholder="Enter concise report title" />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          value={values.description}
          onChange={onChange}
          rows={5}
          placeholder="Summarize activity, people reached, and observed impact"
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </label>

      <label>
        <span>Task</span>
        <select name="task" value={values.task} onChange={onChange}>
          <option value="">Select assigned task</option>
          {reportsData.data.taskOptions.map((task) => (
            <option key={task.value} value={task.value}>{task.label}</option>
          ))}
        </select>
        {errors.task && <span className="field-error">{errors.task}</span>}
      </label>

      <label>
        <span>Location</span>
        <input name="location" value={values.location} onChange={onChange} placeholder="Eg: Sector 8, Community Park" />
        {errors.location && <span className="field-error">{errors.location}</span>}
      </label>

      <label>
        <span>Upload Image</span>
        <input type="file" name="image" onChange={onChange} accept="image/*" />
      </label>

      <button className="btn btn--primary" type="submit">Submit Report</button>
      {submitted && <p className="success-text">Report submitted successfully (mock flow).</p>}
    </form>
  );
};

export default ReportForm;