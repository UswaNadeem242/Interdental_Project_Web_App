import React from 'react'
import TextInput from '../../../Common/Input'
import PenIcon from '../../../icon/PenIcon'
import CloudIcon from '../../../icon/CloudIcon'
import ButtonUI from '../../../Common/Button'

export default function AddPatientForm() {
    return (
        <div>
            <form className="grid md:grid-cols-12 grid-cols-6 gap-4 bg-white ">
                <div className='col-span-12 '>
                    <label className="inline-flex items-center px-6 py-4 bg-textField text-primaryText  text-sm font-medium rounded-lg cursor-pointer   transition">
                        <div className='flex justify-between gap-3 items-center'>
                            <span><CloudIcon /></span>
                            <p>
                                Upload Photo
                            </p>

                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            if (e.target.files.length > 0) {
                                console.log("Selected photo:", e.target.files[0]);
                            }
                        }} />
                    </label>

                </div>
                <div className="col-span-12  space-y-4">
                    <TextInput
                        id="username"
                        name="username"
                        label="First Name"
                        placeholder="Enter Name"
                    />
                </div>

                <div className=" col-span-12">
                    <TextInput
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Enter Email Address"
                        type="email"
                    />
                </div>
                <div className="col-span-12">
                    <TextInput
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        placeholder="Enter Phone Number"
                        type="text"

                    />
                </div>
                <div className="col-span-12">
                    <TextInput
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="Enter Password"
                        type="password"

                    />
                </div>
                <div className='col-span-12 mt-32'>
                    <ButtonUI title='Add Patient' className='px-20 py-5 rounded-full capitalize w-full' />
                </div>





            </form>

        </div>
    )
}
