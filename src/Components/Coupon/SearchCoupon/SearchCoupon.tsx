import { useEffect, useState } from "react";
import { getEnumValuesAsStringArray } from "../../../Contexts/SearchMethods";
import { Categories } from "../../../Models/Categories";
import { CouponModel } from "../../../Models/CouponModel";
import "./SearchCoupon.css";
import CategorySearch from "../../Searches/CategorySearch/CategorySearch";
import PriceSearch from "../../Searches/PriceSearch/PriceSearch";
import SearchById from "../../Searches/SearchById/SearchById";
import CouponListCard from "../../Cards/CouponListCard/CouponListCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import { Theme } from "../../../Models/ThemeType";
import CouponDisplayCard from "../../Cards/CoupponDisplayCard/CouponDisplayCard";
interface SearchCouponProps {
  coupons: CouponModel[];
  handelConfirmationOpen: () => void;
  theme: Theme;
  couponDisplayCard?: boolean;
}
function SearchCoupon({
  coupons,
  handelConfirmationOpen,
  theme,
  couponDisplayCard,
}: SearchCouponProps): JSX.Element {
  const stringArray: string[] = getEnumValuesAsStringArray(Categories);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);
  const [idValue, setIdValue] = useState<number | null>(null);
  const idArray: number[] = coupons.map((c) => c.id);
  const [priceValue, setPriceValue] = useState<string>("");
  const [EmptyViewDelay, setEmptyViewDelay] = useState(false);
  const maxPrice = () => {
    let max = 0;
    coupons.map((c) => {
      if (c.price > max) {
        max = c.price;
      }
    });
    return max.toString();
  };
  const filteredCoupons = coupons
    .filter((c) =>
      categoryValue !== null ? c.category === categoryValue : true
    )
    .filter((c) => (priceValue === "" ? true : c.price <= Number(priceValue)))
    .filter((c) => (idValue === null ? true : c.id === idValue));
  useEffect(() => {
    coupons.length === 0
      ? setTimeout(() => setEmptyViewDelay(true), 1000)
      : setTimeout(() => setEmptyViewDelay(true), 0);
  });
  return (
    <div className="SearchCoupon">
      <div className="couponsSearchBar">
        <CategorySearch
          value={categoryValue}
          setValue={setCategoryValue}
          stringArray={stringArray}
          title={"Find by category"}
        />
        <PriceSearch
          theme={theme}
          value={priceValue}
          setValue={setPriceValue}
          maxPrice={maxPrice()}
        />
        <SearchById value={idValue} setValue={setIdValue} idArray={idArray} />
      </div>

      <div className="CouponsDisplay">
        {filteredCoupons.length > 0
          ? couponDisplayCard === true
            ? filteredCoupons.map((c, idx) => (
                <CouponDisplayCard
                  key={`coupons-display-card-${idx}`}
                  coupon={c}
                />
              ))
            : filteredCoupons.map((c, idx) => (
                <CouponListCard
                  key={`coupons-list-card-${idx}`}
                  coupon={c}
                  openConfirmation={handelConfirmationOpen}
                />
              ))
          : EmptyViewDelay && <EmptyView title="No coupons found" />}
      </div>
    </div>
  );
}

export default SearchCoupon;
