import { useEffect, useMemo, useRef, useState } from "react";
import "./Coupons.css";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import { gotAllCouponsAction } from "../../../Redux/CouponAppState";
import { CouponModel } from "../../../Models/CouponModel";
import { clearId } from "../../../Redux/DeleteIdAppState";
import DeleteCoupon from "../DeleteCoupon/DeleteCoupon";
import SearchCoupon from "../SearchCoupon/SearchCoupon";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { Popper } from "@mui/material";
import { ClientTypes } from "../../../Models/ClientType";

function Coupons(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const client = useSelector((state: RootState) => state.guardReducer.user);
  const [coupons, setCoupons] = useState<CouponModel[]>(
    store.getState().couponsReducer.coupons
  );
  const dispatch = useDispatch();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleConfirmationOpen = () => setConfirmationOpen(true);
  const handleConfirmationClose = () => {
    dispatch(clearId());
    setConfirmationOpen(false);
  };
  const [iconPopper, setIconPopper] = useState(false);
  const handleIconPopperOpen = () => {
    setIconPopper(true);
  };
  const handleIconPopperClose = () => {
    setIconPopper(false);
  };
  const ref = useRef(null);
  const updateCoupons = (newCoupons: CouponModel[]) => {
    setCoupons(newCoupons);
  };
  useEffect(() => {
    if (coupons.length > 0) {
      return;
    }

    const fetchCoupons = () => {
      return client === ClientTypes.COMPANY
        ? webApiService.getCompanyCoupons()
        : webApiService.getCustomerCoupons();
    };

    fetchCoupons()
      .then((res) => {
        setCoupons(res.data);
        dispatch(gotAllCouponsAction(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const memoizedSearchCoupon = useMemo(
    () => (
      <SearchCoupon
        coupons={coupons}
        handelConfirmationOpen={handleConfirmationOpen}
        theme={theme}
      />
    ),
    [coupons]
  );
  return (
    <div className="Coupons">
      {memoizedSearchCoupon}
      {client === ClientTypes.COMPANY ? (
        <>
          <DeleteCoupon
            isConfirmationOpen={isConfirmationOpen}
            handleConfirmationClose={handleConfirmationClose}
            updateCoupons={updateCoupons}
          />
          <div className="addIcon" ref={ref}>
            <Link
              to="/company/add-coupon"
              onMouseEnter={handleIconPopperOpen}
              onMouseLeave={handleIconPopperClose}
            >
              <IoIosAddCircleOutline size={84} />
            </Link>
          </div>
          <Popper
            open={iconPopper}
            anchorEl={ref.current}
            placement="top-start"
            className={`addIconPopper ${theme}`}
          >
            <p>Add company</p>
          </Popper>
        </>
      ) : null}
    </div>
  );
}

export default Coupons;
