import React, { useEffect, useState } from "react";
function CourseForm(props) {
  const [course, setCourse] = useState(props.currentCourse);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course.title && course.price) {
      fetch(process.env.REACT_APP_NODEAPP_URL, {
        crossdomain: true,
        headers: { Authorization: `Bearer ${storedToken}` },
        method: POST,
      })
        .then((response) => response.json())
        .then((data) => {
          debugger;
          setCourses(data.courses);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <form>
      <label>Title</label>
      <input
        className="u-full-width"
        type="text"
        value={course.title}
        name="title"
        required={true}
        onChange={handleChange}
      />
      <label>Description</label>
      <input
        className="u-full-width"
        type="text"
        value={course.description}
        name="description"
        onChange={handleChange}
      />
      <label>Open for enrollment</label>
      <input
        type="radio"
        name="published"
        checked={course.published === true}
        onChange={handleChange}
      />
      <label>Price</label>
      <input
        className="u-full-width"
        type="number"
        value={course.price}
        name="price"
        required={true}
        onChange={handleChange}
      />
      <button className="button-primary" type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="submit" onClick={() => props.setEditing(false)}>
        Cancel
      </button>
    </form>
  );
}
export default CourseForm;
