export interface CouponModel {
    id: number;
    category: string;
    title: string;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
    amount: number;
    price: number;
    image: string;
    companyId: number;
}
