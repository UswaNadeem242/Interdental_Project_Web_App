export const AdminPanelProductCard = ({ title, cardData }) => {
  return (
    <div className="mt-8 flex flex-col bg-white rounded-2xl p-6 h-3/6 hide-scrollbar ">
      <div className="p4 bg-bgWhite  ">
        <h1 className="mb-6 font-semibold text-primaryText">{title}</h1>
      </div>
      <div className="overflow-y-auto hide-scrollbar">
        {cardData.map((product, key) => (
          <div
            className="flex gap-8 flex-1 items-center justify-between border-b pb-4 mt-4"
            key={key}
          >
            <div className="flex flex-row gap-4 items-center">
              <div>
                <h3 className="font-semibold text-primaryText text-sm ">
                  {product.id}
                </h3>
              </div>
              <div>{product.icon}</div>

              <div>
                <h1 className="font-semibold text-primaryText">
                  {product.name}
                </h1>
                <h4 className="font-light text-xs text-secondaryText">
                  {" "}
                  {product.price}
                </h4>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="font-semibold text-sm text-primaryText">
                {product.itemsSold}
              </h1>
              <h4 className=" font-light text-xs text-secondaryText">
                {product.totalPrice}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
