import AccountDetailForm from "../admin-doctor-detail/account-detail-form";
import SubscriptionForm from "../admin-doctor-detail/subscription-form";
import { pamentDetailList } from "../../../Constant";

function SubscriptionDetail() {
  return (
    <div className="">
      <AccountDetailForm
        name="Huynam Moinon"
        icon="/assets/user01.png"
        email="hunammoinon@gmail.com"
        buttonText="Deactivate Account"
      />
      <div className="mt-4">
        <SubscriptionForm
          title="Subscription Plan"
          para="will be expired on 23 march 2023"
          text="Number of patients"
          number="10/20"
        />
      </div>

      <div className="font-poppins mt-6 ">
        <div>
          <h1 className="text-[#434343] text-sm font-semibold">
            Payment Detail
          </h1>
        </div>
        {pamentDetailList.map((item, key) => (
          <div className="">
            <div key={key} className="px-6 py-4 bg-[#F7F8F8] rounded-xl mt-4">
              <h3 className="text-[#98A0A0] text-sm font-normal">
                {item.title}
              </h3>
              <h3 className="text-[#434343] test-sm font-semibold mt-4">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionDetail;
