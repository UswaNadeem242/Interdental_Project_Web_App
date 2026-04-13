import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ArgebbPmma from "../pages/landing-page/product/argen-pmma";
import ArgenZ from "../pages/landing-page/product/argen-z-h";
import ArgenzST from "../pages/landing-page/product/argenz-st";
import Multilayerpro from "../pages/landing-page/product/multilayer-pro";
import LayZirPage from "../pages/landing-page/product/layzir";
import ZidcardIvoclar from "../pages/landing-page/product/zidcard-ivoclar";
import AiditeZirconia from "../pages/landing-page/product/aidite-zirconia ";

const ProductDetail = ({ isLanding }) => {
  const { id } = useParams();

  // Map product IDs to their corresponding components
  const productComponents = {
    "argen-pmma": ArgebbPmma,
    "argen-zh": ArgenZ,
    "argenz-st": ArgenzST,
    "multilayer-pro": Multilayerpro,
    "lay-zir": LayZirPage,
    "zidcard-ivoclar": ZidcardIvoclar,
    "aidite-zirconia": AiditeZirconia,
  };

  const ProductComponent = productComponents[id];

  // If the product ID doesn't exist, redirect to products page or show 404
  if (!ProductComponent) {
    return <Navigate to="/product" replace />;
  }

  return (
    <div>
      <ProductComponent isLanding={isLanding} />
    </div>
  );
};

export default ProductDetail;
