import Link from "next/link";
import React from "react";

function ProductItem({ hit, components }) {
  return (
    <a href={`/profile/${hit.objectID}`}>
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="name" />
        </div>
      </div>
    </a>
  );
}

ProductItem.getInitialProps = async (ctx) => {
  return undefined;
};

export default ProductItem;
