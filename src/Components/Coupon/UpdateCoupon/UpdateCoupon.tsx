import "./UpdateCoupon.css";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import webApiService from "../../../Services/WebApiService";
import { updatedCouponAction } from "../../../Redux/CouponAppState";
import MyInput from "../../MyStyles/MyInput/MyInput";
import MySelect from "../../MyStyles/MySelect/MySelect";
import { getEnumValuesAsStringArray } from "../../../Contexts/SearchMethods";
import { Categories } from "../../../Models/Categories";
import SuccessDialog from "../../MyStyles/SuccessDialog/SuccessDialog";

function UpdateCoupon(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = +(params.id || 0);
  const categories = getEnumValuesAsStringArray(Categories);
  const obj = useSelector((state: RootState) =>
    state.couponsReducer.coupons.find((obj) => obj.id === id)
  );
  const defaultValuesObj = { ...obj };
  const [errorSpan, setErrorSpan] = useState("");
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/company/coupons");
  };
  const schema = zod
    .object({
      id: zod.number(),
      title: zod
        .string()
        .nonempty("Oops! we really need your coupon title")
        .min(2, "ohh, you need 2 or more characters"),
      description: zod
        .string()
        .nonempty("Hey, we need your coupon description here")
        .min(4, "ohh, you need 4 or more characters")
        .max(250, "Please keep description length up to 250 chars"),
      category: zod
        .string()
        .nonempty("We need your coupon's category - it's nicer that way"),
      amount: zod.coerce.number().gt(1, "Coupon amount must be greater than 0"),
      price: zod.coerce.number().gt(1, "Coupon price must be greater than 0"),
      startDate: zod.coerce
        .date()
        .min(new Date(1970, 1, 2), "Please enter a date"),
      endDate: zod.coerce
        .date()
        .min(new Date(1970, 1, 2), "Please enter a date")
        .min(new Date(), "End date cannot be in the past"),
      image: zod
        .string()
        .nonempty("Coupon with images have better sales")
        .url("Image must be a url address")
        .max(255, "Please keep the image url length up to 250 chars"),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    trigger,
  } = useForm<CouponModel>({
    defaultValues: defaultValuesObj,
    mode: "onTouched",
    resolver: zodResolver(schema),
  });
  const anchorRefs = {
    id: useRef(null),
    title: useRef(null),
    description: useRef(null),
    category: useRef(null),
    amount: useRef(null),
    price: useRef(null),
    startDate: useRef(null),
    endDate: useRef(null),
    image: useRef(null),
  };
  const onSubmit = (data: CouponModel) => {
    trigger();
    return webApiService
      .updateCoupon(id, data)
      .then((res) => {
        console.log(res);
        dispatch(updatedCouponAction(res.data));
        setOpen(true);
      })
      .catch((err) =>
        err?.response
          ? setErrorSpan(err.response.data.description)
          : setErrorSpan("something went wrong")
      );
  };
  return (
    <div className="UpdateCoupon">
      <form
        action=""
        className="updateCouponForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="updateCouponInputCon">
          <div className="updateCouponInput1">
            <MyInput
              name="id"
              type="number"
              anchorRef={anchorRefs.id}
              error={errors.id}
              register={register}
              title="ID"
              theme={theme}
              isDisabled={true}
              description="Cannot edit company's Id"
            />
            <MyInput
              name="title"
              type="string"
              anchorRef={anchorRefs.title}
              error={errors.title}
              register={register}
              title="COUPON TITLE"
              theme={theme}
            />
            <MyInput
              name="description"
              type="string"
              anchorRef={anchorRefs.description}
              error={errors.description}
              register={register}
              title="COUPON DESCRIPTION"
              theme={theme}
              isMultiLine={true}
            />
            <MySelect
              name="category"
              anchorRef={anchorRefs.category}
              error={errors.category}
              register={register}
              title="Select category.."
              theme={theme}
              items={categories}
              id="categoryLabelId"
              label="COUPON CATEGORY"
              defaultValues={defaultValuesObj.category}
            />
            <MyInput
              name="amount"
              type="number"
              anchorRef={anchorRefs.amount}
              error={errors.amount}
              register={register}
              title="COUPON AMOUNT"
              theme={theme}
            />
          </div>
          <div className="updateCouponInput2">
            <MyInput
              name="price"
              type="number"
              anchorRef={anchorRefs.price}
              error={errors.price}
              register={register}
              title="COUPON PRICE"
              theme={theme}
            />
            <MyInput
              name="image"
              type="string"
              anchorRef={anchorRefs.image}
              error={errors.image}
              register={register}
              title="COUPON IMAGE"
              theme={theme}
              isMultiLine={true}
            />
            <MyInput
              name="startDate"
              type="date"
              anchorRef={anchorRefs.startDate}
              error={errors.startDate}
              register={register}
              title="COUPON START DATE"
              theme={theme}
              control={control}
              trigger={trigger}
            />
            <MyInput
              name="endDate"
              type="date"
              anchorRef={anchorRefs.endDate}
              error={errors.endDate}
              register={register}
              title="COUPON END DATE"
              theme={theme}
              control={control}
              trigger={trigger}
            />
          </div>
        </div>
        <span className="errorSpan">{errorSpan}</span>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="authSubmitButton"
        >
          UPDATED COUPON
        </button>
        <SuccessDialog
          isDeleteMessageDialogOpen={isOpen}
          handelDeleteMessageClose={handleClose}
          content={"Coupon updated successfully"}
        />
      </form>
    </div>
  );
}

export default UpdateCoupon;
