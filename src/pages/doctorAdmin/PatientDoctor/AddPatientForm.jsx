import React, { useState } from 'react'
import TextInput from '../../../Common/Input'
import PenIcon from '../../../icon/PenIcon'
import CloudIcon from '../../../icon/CloudIcon'
import { PrimaryButtonUI } from '../../../Common/Button'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import { PatientvalidationSchema } from '../../../Common/FormsValidation'
import { EyeOpenIcon, EyeCloseIcon } from '../../../icon/EyeIcon'

export default function AddPatientForm() {
    const [showPassword, setShowPassword] = useState(false);


    const initialValues = {
        photo: null,
        username: "",
        email: "",
        phone: "",

    };

    // Form submit handler
    const handleSubmit = (values) => {
        console.log("Form data:", values);
        // Submit API call here
    };
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={PatientvalidationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="grid md:grid-cols-12 grid-cols-6 gap-4 bg-white">
                        {/* Photo Upload */}
                        <div className="col-span-6">
                            <label className="inline-flex items-center px-6 py-4 bg-textField text-primaryText text-sm font-medium rounded-lg cursor-pointer transition w-full">
                                <div className="flex justify-between gap-3 items-center w-full">
                                    <span><CloudIcon /></span>
                                    <p>Upload Photo</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        setFieldValue("photo", e.currentTarget.files[0]);
                                    }}
                                />
                            </label>
                            <ErrorMessage
                                name="photo"
                                component="div"
                                className="text-red-700 text-sm mt-1"
                            />
                        </div>

                        {/* First Name */}
                        <div className="col-span-12 space-y-1">
                            <Field
                                as={TextInput}
                                id="username"
                                name="username"
                                label="First Name"
                                placeholder="Enter Name"
                                type='text'
                            />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="text-red-700 text-sm"
                            />
                        </div>

                        {/* Email */}
                        <div className="col-span-12">
                            <Field
                                as={TextInput}
                                id="email"
                                name="email"
                                label="Email"
                                placeholder="Enter Email Address"
                                type="email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-700 text-sm"
                            />
                        </div>

                        {/* Phone */}
                        <div className="col-span-12">
                            <Field
                                as={TextInput}
                                id="phone"
                                name="phone"
                                label="Phone Number"
                                placeholder="Enter Phone Number"
                                type="text"
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-700 text-sm"
                            />
                        </div>

                        {/* Password */}
                        <div className="col-span-12">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Field
                                    as="input"
                                    id="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full rounded border borderPrimary py-2 px-3 pr-10 outline-none"
                                />


                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                                </span>
                            </div>

                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-700 text-sm"
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="col-span-12 mt-32">
                            <PrimaryButtonUI
                                type="submit"
                                title="Add Patient"
                                className="px-20 py-5 rounded-full capitalize w-full font-semibold "
                            />
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    )
}
