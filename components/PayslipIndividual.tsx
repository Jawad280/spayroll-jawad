import { Payslip } from "@/types";
import React from "react";

const PayslipIndividual = ({ payslip }: { payslip: Payslip }) => {
  function grossPay() {
    return (payslip.ordinaryWage || 0) + (payslip.allowance || 0);
  }

  function totalDeduction() {
    return (payslip.employeeCPF || 0) + (payslip.otherDeduction || 0);
  }

  function netPay() {
    const c = grossPay();
    return (
      c -
      totalDeduction() +
      (payslip.otPay || 0) +
      (payslip.additionalWage || 0)
    );
  }

  function fromToDate() {
    const paymentDate = payslip.monthYear;

    const year = paymentDate.getFullYear();
    const month = paymentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const formattedFirstDay = firstDayOfMonth.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedLastDay = lastDayOfMonth.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedDate = `${formattedFirstDay} - ${formattedLastDay}`;

    return formattedDate;
  }

  return (
    <div className="h-[14.85cm] w-full flex items-center py-12 box-border">
      <div className="flex flex-col gap-5 h-full w-[10.5cm] pl-12 pr-2">
        <div className="font-bold text-[24px] h-[45px]">Itemised Payslip</div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-[14px] bg-slate-200 px-2 py-1 rounded-lg">
            Name of Employer
          </div>
          <div className="text-[12px]">{payslip.companyName}</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="font-semibold text-[14px] bg-slate-200 px-2 py-1 rounded-lg">
            Name of Employee
          </div>
          <div className="text-[12px]">{payslip.name}</div>
        </div>

        <table className="border border-gray-400 rounded-lg text-[12px]">
          <thead className="border-b border-gray-400">
            <tr>
              <th className="p-2 border-r border-gray-400 ">Item</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Basic Pay</td>
              <td className="p-0">
                <div className="flex">
                  <div className="flex-1 text-right p-2 border-r border-gray-400">
                    ${payslip.ordinaryWage}
                  </div>
                  <div className="flex-none w-[30px] p-2">(A)</div>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Total Allowances</td>
              <td className="p-0">
                <div className="flex">
                  <div className="flex-1 text-right p-2 border-r border-gray-400">
                    ${payslip.allowance}
                  </div>
                  <div className="flex-none w-[30px] p-2">(B)</div>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Gross Pay (A+B)</td>
              <td className="p-0">
                <div className="flex">
                  <div className="flex-1 text-right p-2 border-r border-gray-400">
                    ${grossPay()}
                  </div>
                  <div className="flex-none w-[30px] p-2">(C)</div>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Total Deductions</td>
              <td className="p-0">
                <div className="flex">
                  <div className="flex-1 text-right p-2 border-r border-gray-400">
                    {totalDeduction()}
                  </div>
                  <div className="flex-none w-[30px] p-2">(D)</div>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Employee CPF</td>
              <td className="p-0">
                <div className="text-right p-2  border-gray-400">
                  {payslip.employeeCPF}
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">
                Other : {payslip.other}
              </td>
              <td className="p-0">
                <div className="text-right p-2  border-gray-400">
                  ${payslip.otherDeduction}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-5 h-full w-[10.5cm] pl-2 pr-12">
        <div className="flex flex-col items-start h-[45px]">
          <div className="font-semibold text-[14px]">For the Period</div>
          <div className="text-[12px]">{fromToDate()}</div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col items-start flex-1 gap-2">
            <div className="font-semibold text-[14px] bg-slate-200 px-2 py-1 rounded-lg box-border w-[95%]">
              Date of Payment
            </div>
            <div className="text-[12px]">
              {payslip.dateOfPayment?.toLocaleDateString()}
            </div>
          </div>

          <div className="flex flex-col items-start flex-1 gap-2">
            <div className="font-semibold text-[14px] bg-slate-200 px-2 py-1 rounded-lg box-border w-[95%]">
              Mode of Payment
            </div>
            <div className="text-[12px]">{payslip.modeOfPayment}</div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col items-start flex-1 gap-2">
            <div className="font-semibold text-[14px] bg-slate-200 px-2 py-1 rounded-lg box-border w-[95%]">
              NRIC/FIN
            </div>
            <div className="text-[12px]">{payslip.NRIC}</div>
          </div>

          <div className="flex flex-col items-start flex-1 gap-2">
            <div className="font-semibold text-[14px] bg-slate-200 px-2 py-1 rounded-lg box-border w-[95%]">
              Designation
            </div>
            <div className="text-[12px]">{payslip.designation}</div>
          </div>
        </div>

        <table className="border border-gray-400 rounded-lg text-[12px]">
          <thead className="border-b border-gray-400">
            <tr>
              <th className="p-2 border-r border-gray-400">Item</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Overtime Hours</td>
              <td className="text-right p-2">{payslip.otHours} hours</td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Overtime Pay</td>
              <td className="p-0">
                <div className="flex">
                  <div className="flex-1 text-right p-2 border-r border-gray-400">
                    ${payslip.otPay}
                  </div>
                  <div className="flex-none w-[30px] p-2">(E)</div>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">
                Additional Payments
              </td>
              <td className="p-0">
                <div className="flex">
                  <div className="flex-1 text-right p-2 border-r border-gray-400">
                    ${payslip.additionalWage}
                  </div>
                  <div className="flex-none w-[30px] p-2">(F)</div>
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">
                Net Pay (C-D+E+F)
              </td>
              <td className="text-right p-2 font-bold">${netPay()}</td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">
                Employer&apos;s CPF
              </td>
              <td className="text-right p-2">{payslip.employerCPF}</td>
            </tr>

            <tr className="border-b border-gray-400">
              <td className="p-2 border-r border-gray-400">Total CPF Paid</td>
              <td className="text-right p-2">${payslip.totalCPF}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipIndividual;
