function formatCurrency(total) {
  var neg = false;
  if(total < 0) {
      neg = true;
      total = Math.abs(total);
  }
  return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

function b_diff(best) {
  const last_price = $(".price").attr("data-lastprice")
  const new_price = best
  let color = "#000000"

  if (new_price == last_price) {
    color = "#000000"
  } else {
    if (new_price > last_price) {
      color = "#00c805"
    } else {
      color = "#ff5000"
    }
  }

  $(".price").attr("data-lastprice", new_price).css("color", color)

  $(".price").html(formatCurrency(new_price))
}