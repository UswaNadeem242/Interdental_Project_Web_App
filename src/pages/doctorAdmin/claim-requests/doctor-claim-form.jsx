import { useEffect, useState } from "react";
import { getClaims } from "../../../api/patient-dashaboard-api";

export default function DocotrClaimForm({ row }) {



    // const [claims, setClaims] = useState([]);
    // console.log('claims drawer', claims);

    // useEffect(() => {
    //     const fetchClaims = async () => {
    //         try {
    //             const response = await getClaims();
    //             console.log('reposne claisms', response);

    //             if (response.status === 200) {
    //                 setClaims(response.data.data);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     fetchClaims();
    // }, []);

    const {
        id,
        createdAt,
        crownTeeth,
        doctorEmail,
        doctorName,
        implantTeeth,
        patientEmail,
        patientName,
        status,
    } = row;


    return (
        <div className="bg-bgWhite">

            <div className="font-poppins text-sm  font-normal text-primaryText pb-3">Claim ID: <span className="font-bold">{id}</span></div>
            <div className="space-y-3 font-poppins">
                {/* Product Name */}
                <div>
                    <h6 className="block text-sm mb-1  text-secondaryText  font-normal">
                        Patient name
                    </h6>
                    <p className="text-sm   text-primaryText  font-semibold pt-2"> {patientName ? patientName : 'NUll'}</p>
                </div>
                {/* Purchase Date */}
                <div className="border-t-2 border-background ">
                    <h6 className="block text-sm mb-1  text-secondaryText pt-3 font-normal">
                        Patient Email Address
                    </h6>
                    <p className="text-sm mb-1  text-primaryText  font-semibold pt-2">{patientEmail ? patientEmail : 'Null'}</p>
                </div>
                {/* Quantity */}
                <div className="border-t-2 border-background ">
                    <h6 className="block text-sm mb-1 pt-3  text-secondaryText  font-normal">
                        Claim Submitted On
                    </h6>
                    <p className="text-sm mb-1  text-primaryText  font-semibold pt-2">{createdAt ? createdAt.slice(0, 10) : 'Null'}</p>
                </div>
                {/* Reason for Claim */}
                <div className=" ">
                    {/* Warranty Options */}
                    <div className="border-t-2 border-background">
                        <h6 className="block text-sm mb-1 pt-3 text-secondaryText font-normal">
                            Warranty Options
                        </h6>
                        <p className="text-sm mb-1 text-primaryText font-semibold pt-2 p-2">
                            Crown and Bridges, Onlays/Inlays & Veneers
                        </p>
                        {/* ✅ Render multiple implant teeth as individual boxes */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {crownTeeth
                                ? crownTeeth
                                    .split(",")
                                    .map((num, index) => (
                                        <div
                                            key={`crown-${index}`}
                                            className="bg-[#94D3DD] w-7 h-7 flex justify-center items-center rounded-md text-sm font-medium text-secondaryBrand"
                                        >
                                            {num.trim()}
                                        </div>
                                    ))
                                : <p className="text-xs text-gray-400">No crown teeth selected</p>}
                        </div>
                    </div>
                    {/* Implant Related Crown & Bridges */}
                    <div className="border-t-2 border-background">
                        <p className="text-sm mb-1 pt-3 text-primaryText font-semibold">
                            Implant Related Crown & Bridges:
                        </p>
                        {/* ✅ Render multiple crown teeth as individual boxes */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {implantTeeth
                                ? implantTeeth
                                    .split(",")
                                    .map((num, index) => (
                                        <div
                                            key={`implant-${index}`}
                                            className="bg-[#94D3DD] w-7 h-7 flex justify-center items-center rounded-md text-sm font-medium text-secondaryBrand "
                                        >
                                            {num.trim()}
                                        </div>
                                    ))
                                : <p className="text-xs text-gray-400">No implant teeth selected</p>}
                        </div>

                    </div>

                </div>


            </div>

        </div>
    );
}
