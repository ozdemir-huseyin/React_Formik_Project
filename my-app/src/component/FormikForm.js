import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { fetchUrl } from "./FetchApi";

function FormikForm({ getList }) {
  const handleSubmit = async (values) => {
    const participantList = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
    };
    const newPersonList = {
      method: "POST",
      body: JSON.stringify(participantList),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(fetchUrl, newPersonList);
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      getList();
    } else {
      console.error(json);
    }
  };
  // **************************
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
  };
  // *********************************

  // *********************************
  const onSubmit = (values) => {
    console.log("form values", values);
    handleSubmit(values);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.first_name) {
      errors.first_name = "Required";
    }
    if (!values.last_name) {
      errors.last_name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Requried"),
    last_name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Requried"),
    email: Yup.string().email("Invalid email address").required("Requried"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validate,
  });
  console.log("visited field", formik.touched);

  return (
    <div>
      <form className="formik" onSubmit={formik.handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          onChange={formik.handleChange}
          value={formik.values.first_name}
          onBlur={formik.handleBlur}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <div className="formik_requerid">{formik.errors.first_name}</div>
        ) : null}

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          onChange={formik.handleChange}
          value={formik.values.last_name}
          onBlur={formik.handleBlur}
        />

        {formik.touched.last_name && formik.errors.last_name ? (
          <div className="formik_requerid">{formik.errors.last_name}</div>
        ) : null}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="formik_requerid">{formik.errors.email}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormikForm;
