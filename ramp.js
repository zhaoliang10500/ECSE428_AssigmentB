const { mm_to_in, in_to_mm, g_to_oz, oz_to_g } = require("./helper");
function ramp(req, res) {
  const { length, width, weight, distanceUnit, weightUnit } = req.body;
  if (length == null || width == null || weight == null) {
    res.sendStatus(400);
  }
  if (typeof length != "number" || typeof weight != "number" || typeof width != "number") {
    res.sendStatus(400);
  }
  if ((distanceUnit != "mm" && distanceUnit != "in" && distanceUnit !== undefined) || (weightUnit != "g" && weightUnit != "oz" && weightUnit !== undefined)) {
    res.sendStatus(400);
  }
  var isStandard = false;
  var isNonStandard = false;
  var postalRate = 0;
  var real_weight = weight;
  var real_length = length;
  var real_width = width;
  if (distanceUnit == "in") {
    real_length = in_to_mm(length);
    real_width = in_to_mm(width);
  }
  if (weightUnit == "oz") {
    real_weight = oz_to_g(weight);
  }

  // check if this is a non-standard envolop
  if (140 <= real_length && real_length <= 245 && 90 <= real_width && real_width <= 156 && 3 <= real_weight && real_weight <= 50) {
    isStandard = true;
  }
  // check if this is a standard envolop
  else if (140 <= real_length && real_length <= 380 && 90 <= real_width && real_width <= 270 && 3 <= real_weight && real_weight <= 500) {
    isNonStandard = true;
  }
  //calculate postalRate
  if (isStandard) {
    if (real_weight > 30) {
      postalRate = 0.8;
    } else {
      postalRate = 0.49;
    }
  } else if (isNonStandard) {
    if (real_weight <= 100) {
      postalRate = 0.98;
    } else {
      postalRate = 2.4;
    }
  } else {
    res.sendStatus(400);
  }
  res.send(`${postalRate}`);
}

module.exports = ramp;
