const ramp = require("./ramp");
const { mm_to_in, g_to_oz } = require("./helper");

// mock, so is `req`
const res = {
  code: 200,
  text: "",
  send(response) {
    this.text = response;
  },
  status(code) {
    this.code = code;

    return this;
  },
  sendStatus(code) {
    this.status(code).send(code);
  },
};

const req = {
  body: {
    length: 200,
    width: 156,
    weight: 10,
  },
};

function expected(req, status, text) {
  ramp(req, res);

  if (text === undefined) {
    // 400 status code
    expect(res.code).toBe(status);
  } else {
    expect({ status: res.code, text: res.text }).toEqual({ status, text });
  }
  // reset it
  res.code = 200;
  res.text = "";
}

describe("Valid Domain Logic", () => {
  test.each([
    // test name, length (mm), width (mm), weight (g), postal rate
    ["ID01: Standard envelope, lightweight", 200, 156, 10, "0.49"],
    
    ["ID02: Standard envelope, regular weight", 200, 156, 45, "0.8"],
    
    ["ID03: Non-standard envelope, due to heaviness", 200, 156, 60, "0.98"],
    
    [
      "ID04: Non-standard envelope, due to heaviness, very heavy",
      200,
      156,
      300,
      "2.4",
    ],
    
    ["ID05: Non-standard envelope, due to length", 330, 156, 10, "0.98"],

    [
      "ID06: Non-standard envelope, due to length and weight", //should pass
      300,
      100,
      150,
      "2.4",
    ],
    
    ["ID07: Non-standard envelope, due to width", 200, 200, 10, "0.98"],
  
    [
      "ID08: Non-standard envelope, due to width and weight", // should pass
      200,
      200,
      150,
      "2.4",
    ],
    
  ])("%s", (testName, length_mm, width_mm, weight_g, postalRate) => {
    assertForAllUnits(length_mm, width_mm, weight_g, postalRate);
  });
});

function assertForAllUnits(length_mm, width_mm, weight_g, postalRate) {
  const req = {};
  // Asserts for every combination of units
  for (const distanceUnit of [null, "mm", "in"]) {
    for (const weightUnit of [null, "g", "oz"]) {
      let length = length_mm;
      let width = width_mm;
      let weight = weight_g;
      if (distanceUnit === "in") {
        length = mm_to_in(length);
        width = mm_to_in(width);
      }
      if (weightUnit === "oz") {
        weight = g_to_oz(weight);
      }
      req.body = { length, width, weight };

      if (distanceUnit !== null) {
        req.body.distanceUnit = distanceUnit;
      }
      if (weightUnit !== null) {
        req.body.weightUnit = weightUnit;
      }

      expected(req, postalRate === undefined ? 400 : 200, postalRate);
    }
  }
}

describe("Invalid Domain Logic", () => {
  const validReq = {
    body: {
      length: 200,
      width: 156,
      weight: 10,
    },
  };

  function cloneValidReq() {
    return {
      body: {
        ...validReq.body,
      },
    };
  }

  
  test("ID09: Missing required arguments", () => {
    const req = {
      body: {
        length: 200,
      },
    };

    expected(req, 400);
  });

  
  test.each([
    // task name, property, invalid value
    ["ID10: Length too short", "length", 70],
    ["ID11: Length too long", "length", 381],
    ["ID12: Width too short", "width", -2],
    ["ID13: Width too long", "width", 300],
    ["ID14: Weight too light", "weight", 89.9],
    ["ID15: Weight too heavy", "weight", 1000 * 1000],
  ])("%s", (taskName, property, invalidValue) => {
    const req = cloneValidReq();
    req.body[property] = invalidValue;
    assertForAllUnits(req.length, req.width, req.weight, undefined);
  });

  
  test.each([
    // task name, property, invalid value
    ["ID16: Distance unit not in mm or in", "distanceUnit", "cm"],
    ["ID17: Weight unit not in g or oz", "weightUnit", "qirjgpoiqrejgpoiqjerg"],
  ])("%s", (taskName, property, invalidValue) => {
    const req = cloneValidReq();
    req.body[property] = invalidValue;

    expected(req, 400);
  });

  
  test("ID18: Invalid request payload syntax", () => {
    const req = {
      body: '{wrth"lqrthength": 200,rhqrtehqrth"wqrthidth": 156,qwretgqergqet"weight":qwrth 10qrth}',
    };

    expected(req, 400);
  });


  test.each([
    // task name, property, invalid value
    ["ID19: Length is not a number", "length", "200"],
    ["ID20: Width is not a number", "width", "200"],
    ["ID21: Weight is not a number", "weight", "200"],
  ])("%s", (taskName, property, invalidValue) => {
    const req = cloneValidReq();
    req.body[property] = invalidValue;

    expected(req, 400);
  });

});
