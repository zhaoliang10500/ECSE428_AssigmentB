// please use this when converting, otherwise it can result bugs for edge cases

const MM_TO_IN_MULT = 0.0393701;
const G_TO_OZ_MULT = 0.035274;
const IN_TO_MM_MULT = 1 / 0.0393701;
const OZ_TO_G_MULT = 1 / 0.035274;

module.exports = {
  MM_TO_IN_MULT,
  G_TO_OZ_MULT,
  IN_TO_MM_MULT,
  mm_to_in(mm) {
    return mm * MM_TO_IN_MULT;
  },
  in_to_mm(inch) {
    return  IN_TO_MM_MULT * inch;
  },
  g_to_oz(g) {
    return g * G_TO_OZ_MULT;
  },
  oz_to_g(oz) {
    return oz * OZ_TO_G_MULT;
  },
};