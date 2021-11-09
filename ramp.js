function ramp(req, res) {
    const { length, width, weight } = req.body;
    var isStandard = false;
    var isNonStandard = false;
    // check if this is a standard envolop
    if (140 <= length && length <= 245) {
        if (90 <= width && width <= 156) {
            if (3 <= weight && weight <= 50) {
                isStandard = true;
            }
        }
    }
    // check if this is a non-standard envolop
    if (245 < length && length <= 380) {
        if (156 < width && width<= 270) {
            if (50 < weight && weight <= 500) {
                isNonStandard = true;
            }
        }
    }
    var postalRate = 0;
    if (isStandard) {
        if (weight > 30) {
            postalRate = 0.80;
        }
        else {
            postalRate = 0.49;
        }
    }
    else if (isNonStandard) {
        if (weight > 100) {
            postalRate = 2.40;
        }
        else {
            postalRate = 0.98;
        }
    }
    else {
        //error
    }
    res.send(`${postalRate}`);
}

module.exports = ramp