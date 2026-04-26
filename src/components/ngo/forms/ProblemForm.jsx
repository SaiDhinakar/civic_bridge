import { useState } from "react";
import { problemCategories, priorityOptions } from "../../../data/ngo/problemsData";

const ProblemForm = () => {
  const [values, setValues] = useState({ title: "", category: "", priority: "", description: "", location: "", volunteersRequired: "", estimatedDuration: "", requiredSkills: "", startDate: "" });
  const [isPosting, setIsPosting] = useState(false);
  
  const onChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      alert("Problem posted successfully! Volunteers will be matched shortly.");
      setValues({ title: "", category: "", priority: "", description: "", location: "", volunteersRequired: "", estimatedDuration: "", requiredSkills: "", startDate: "" });
    }, 1500);
  };

  return (
    <form className="card ngo-form-grid" onSubmit={handleSubmit}>
      <label><span>Problem Title</span><input required name="title" value={values.title} onChange={onChange} placeholder="Enter problem title" /></label>
      <label><span>Category</span><select required name="category" value={values.category} onChange={onChange}><option value="">Select category</option>{problemCategories.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>
      <label><span>Priority</span><select required name="priority" value={values.priority} onChange={onChange}><option value="">Select priority</option>{priorityOptions.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>
      <label><span>Location</span><input required name="location" value={values.location} onChange={onChange} placeholder="Sector / Ward / Area" /></label>
      <label><span>Volunteers Required</span><input required name="volunteersRequired" type="number" value={values.volunteersRequired} onChange={onChange} /></label>
      <label><span>Estimated Duration</span><input required name="estimatedDuration" value={values.estimatedDuration} onChange={onChange} placeholder="e.g. 4 days" /></label>
      <label><span>Required Skills</span><input required name="requiredSkills" value={values.requiredSkills} onChange={onChange} placeholder="First Aid, Outreach..." /></label>
      <label><span>Start Date</span><input required name="startDate" type="date" value={values.startDate} onChange={onChange} /></label>
      <label className="ngo-form-span"><span>Description</span><textarea required name="description" rows={4} value={values.description} onChange={onChange} /></label>
      <label className="ngo-dropzone ngo-form-span"><span>Upload Evidence</span><input type="file" /><span>Drag and drop files, or click to browse</span></label>
      <div className="ngo-form-actions ngo-form-span">
        <button type="button" className="btn btn--ghost">Save Draft</button>
        <button type="submit" className="btn btn--primary" disabled={isPosting}>
          {isPosting ? <><i className="ri-loader-4-line animate-spin" /> Posting...</> : "Post Problem"}
        </button>
      </div>
    </form>
  );
};

export default ProblemForm;

