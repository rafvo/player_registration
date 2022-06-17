import Vue from "vue";

Vue.filter("us_to_br_date", function (value) {
  if (!value) return null;
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
});
