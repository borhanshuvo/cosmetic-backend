// external imports
const paypal = require("paypal-rest-sdk");

// paypal configure
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AdpGQToWYQeZQlJjbYbCzylrcZUaFyF88nf1QQiRAfLznEV14qCYW1YtU6GVt1UYfmFBEpHw_Ts-oi9q",
  client_secret:
    "EOc4waCiK-ARTTXsJIqVcaV177Wb3NwMykkOYXSora0afBHPcEn_hNY-n1acr-8aDtPDrcjJC2yJBiTJ",
});

// internal imports
const Order = require("../models/Order");
const User = require("../models/User");

// get order list
async function getOrders(req, res, next) {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// add order
async function addOrder(req, res, next) {
  try {
    const order = new Order(req.body);
    const result = order.save();
    res.status(200).json({
      success: "Order was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// payment info
async function addPaymentInfo(req, res, next) {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.URL}/order/success`,
      cancel_url: `${process.env.URL}/order/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "fdf",
              sku: "sf",
              price: "1",
              currency: "USD",
              quantity: "1",
            },
          ],
        },
        amount: {
          currency: "USD",
          total: price,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
}

// success payment
async function successPayment(req, res, next) {
  var PayerID = req.query.PayerID;
  var paymentId = req.query.paymentId;
  var execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
        res.render("success");
      }
    }
  );
}

// cancel payment
async function cancelPayment(req, res, next) {
  res.render("cancel");
}

// get order by user email
async function orderInfo(req, res, next) {
  try {
    const email = req.body.email;
    const orderInfo = await Order.find({ email: email }).sort({
      createdAt: -1,
    });
    res.status(200).json(orderInfo);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// update order status
async function orderStatus(req, res, next) {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const result = await Order.findByIdAndUpdate(
      { _id: id },
      { $set: { status: status } },
      { useFindAndModify: false }
    );
    if (result) {
      res.status(200).json({
        success: "Order status update successfully!",
      });
    } else {
      res.status(304).json({
        error: "Not modified!",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

// total earning
async function getTotalEarning(req, res, next) {
  try {
    const order = await Order.find({});
    const price = order.map((price) => {
      return price.product.price;
    });
    const result = price.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
    res.status(200).json({ result, order });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

function dateFormater(year, firstMonth, nextMonth) {
  const startDate = new Date();
  startDate.setDate(1);
  startDate.setMonth(nextMonth);
  startDate.setFullYear(year);
  startDate.setHours(23, 59, 59);
  const lastDate = new Date();
  lastDate.setDate(1);
  lastDate.setMonth(firstMonth);
  lastDate.setFullYear(year);
  lastDate.setHours(00, 00, 00);
  return { startDate, lastDate };
}

async function monthlyIncome(startDate, lastDate) {
  const month = await Order.find({
    createdAt: {
      $gte: new Date(lastDate.getTime()),
      $lt: new Date(startDate.getTime()),
    },
  });
  const price = month.reduce((sum, value) => sum + value.product.price, 0);
  return price;
}

// statistics value
async function getStatisticsValue(req, res, next) {
  try {
    const year = parseInt(req.params.year);

    const january = dateFormater(year, 0, 1);
    const jan = await monthlyIncome(january.startDate, january.lastDate);

    const february = dateFormater(year, 1, 2);
    const feb = await monthlyIncome(february.startDate, february.lastDate);

    const march = dateFormater(year, 2, 3);
    const mar = await monthlyIncome(march.startDate, march.lastDate);

    const april = dateFormater(year, 3, 4);
    const apr = await monthlyIncome(april.startDate, april.lastDate);

    const mays = dateFormater(year, 4, 5);
    const may = await monthlyIncome(mays.startDate, mays.lastDate);

    const june = dateFormater(year, 5, 6);
    const jun = await monthlyIncome(june.startDate, june.lastDate);

    const july = dateFormater(year, 6, 7);
    const jul = await monthlyIncome(july.startDate, july.lastDate);

    const august = dateFormater(year, 7, 8);
    const aug = await monthlyIncome(august.startDate, august.lastDate);

    const september = dateFormater(year, 8, 9);
    const sep = await monthlyIncome(september.startDate, september.lastDate);

    const octobor = dateFormater(year, 9, 10);
    const oct = await monthlyIncome(octobor.startDate, octobor.lastDate);

    const november = dateFormater(year, 10, 11);
    const nov = await monthlyIncome(november.startDate, november.lastDate);

    const december = dateFormater(year, 11, 0);
    const dec = await monthlyIncome(december.startDate, december.lastDate);

    const yearlyIncome =
      jan + feb + mar + apr + may + jun + jul + aug + sep + oct + nov + dec;

    res.status(200).json({
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      yearlyIncome,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}

module.exports = {
  getOrders,
  addOrder,
  orderInfo,
  orderStatus,
  getTotalEarning,
  getStatisticsValue,
  addPaymentInfo,
  successPayment,
  cancelPayment,
};
