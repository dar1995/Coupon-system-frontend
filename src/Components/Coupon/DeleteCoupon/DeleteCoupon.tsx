import { useSelector } from "react-redux";
import { CouponModel } from "../../../Models/CouponModel";
import "./DeleteCoupon.css";
import { RootState } from "../../../Redux/Store";
import { deletedCouponAction } from "../../../Redux/CouponAppState";
import webApiService from "../../../Services/WebApiService";
import DeleteDialog from "../../MyStyles/DeleteDialog/DeleteDialog";
interface DeleteCouponProps {
  isConfirmationOpen: boolean;
  handleConfirmationClose: () => void;
  updateCoupons: (newCoupons: CouponModel[]) => void;
}
function DeleteCoupon({
  isConfirmationOpen,
  handleConfirmationClose,
  updateCoupons,
}: DeleteCouponProps): JSX.Element {
  const newCoupons = useSelector(
    (state: RootState) => state.couponsReducer.coupons
  );
  const deleteApi = webApiService.deleteCoupon;
  const dispatchAction = deletedCouponAction;
  return (
    <div className="DeleteCoupon">
      <DeleteDialog
        isConfirmationOpen={isConfirmationOpen}
        handleConfirmationClose={handleConfirmationClose}
        updateArray={updateCoupons}
        newArray={newCoupons}
        deleteApi={deleteApi}
        dispatchAction={dispatchAction}
        title="Coupon"
        content="Coupon deleted successfully"
      />
    </div>
  );
}

export default DeleteCoupon;
