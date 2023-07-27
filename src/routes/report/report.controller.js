const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const {receipt, admin, user, emi, purchase, customer, transaction} = require('../../../models')

async function getYearlyReport() {

  const MonthlyData = await receipt.findAll({
    where:{
      is_deleted: 0
    },
    include: transaction
  })

  const obj = {
    1: {
      value: 0,
      Month: "January",
      noOfTransaction: 0,
    },
    2: {
      value: 0,
      Month: "February",

      noOfTransaction: 0,
    },
    3: {
      value: 0,

      Month: "March",
      noOfTransaction: 0,
    },
    4: {
      value: 0,
      Month: "April",
      noOfTransaction: 0,
    },
    5: {
      value: 0,
      Month: "May",
      noOfTransaction: 0,
    },
    6: {
      value: 0,
      Month: "June",
      noOfTransaction: 0,
    },
    7: {
      value: 0,
      Month: "July",
      noOfTransaction: 0,
    },
    8: {
      value: 0,
      Month: "August",
      noOfTransaction: 0,
    },
    9: {
      value: 0,
      Month: "September",
      noOfTransaction: 0,
    },
    10: {
      value: 0,
      Month: "October",
      noOfTransaction: 0,
    },
    11: {
      value: 0,
      Month: "November",
      noOfTransaction: 0,
    },
    12: {
      value: 0,
      Month: "December",
      noOfTransaction: 0,
    },
  };

  var Years = {};

  const filterData = MonthlyData.map((m) => {
    let mon = new Date(m.createdAt).getMonth() + 1;
    let y = new Date(m.createdAt).getFullYear();

    if (!Years[y]) {
      Years[y] = JSON.parse(JSON.stringify(obj));
    }

    if (Years[y][mon]?.Month) {
      Years[y][mon].value += (m?.transaction?.amount + m.extra_charge) ? (m?.transaction?.amount + m.extra_charge) : 0 ;
      Years[y][mon].noOfTransaction++;
    }

    return mon;
  });

  if (MonthlyData.length < 1) {
    let y = new Date().getFullYear();
    Years[y] = JSON.parse(JSON.stringify(obj));
  }
  return Years;
}

const getReport = catchAsyncErrors(async (req, res, next) => {
  const data = await receipt.findAll({
    where: {
      is_deleted: 0
    },
    include: [
      transaction, 
      {
        model: admin,
        include: user
      },
      {
        model: emi,
        include: {
          model: purchase,
          include: customer
        }
      }
    ]
  })

  return res.status(200).json({ success: true, data: data });
})

const getMonthWiseReport = catchAsyncErrors(async (req, res, next) => {
  const data = await getYearlyReport();
  return res.status(200).json({success: true, data: data});
})


module.exports={
  getReport,
  getMonthWiseReport
}


