// please use this when converting, otherwise it can result bugs for edge cases

module.exports = {
  MM_TO_IN_MULT: 0.0393701,
  G_TO_OZ_MULT: 0.035274,
  mm_to_in(mm) {
    return mm * this.MM_TO_IN_MULT;
  },
  g_to_oz(g) {
    return g * this.G_TO_OZ_MULT;
  },
};
