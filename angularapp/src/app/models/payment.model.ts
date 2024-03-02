export interface Payment {
    paymentId: number;
    courseId: number;
    userName: string;
    status: string;
    totalAmount: number;
    paymentDate: Date;
    modeOfPayment: string;
  }
  