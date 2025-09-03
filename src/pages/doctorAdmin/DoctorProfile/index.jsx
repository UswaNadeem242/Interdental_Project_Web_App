const DoctorProfile = () => {
  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 bg-white px-8 py-4 rounded-2xl">
        {/* Left side */}
        <div className="md:col-span-6 col-span-3 flex gap-4 items-center">
          <img src="/assets/user.png" className="w-20 h-20 object-contain" />
          <div><h3 className="text-2xl font-bold font-poppins">Bransim hanry</h3>
            <p >hanry463@gmail.com</p>
          </div>
        </div>

        {/* Right side */}
        <div className="md:col-span-6 col-span-3 md:flex  md:justify-end">
          New Profile
        </div>
      </div>

    </>
  )
}

export default DoctorProfile