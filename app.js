const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  calculateCartTotal();

});

//! Capturings

let productsDiv = document.querySelector("#products"); 

productsDiv.addEventListener("click", (e) => {
  let quantityP =
    e.target.parentElement.parentElement.querySelector(".quantity");
  //console.log(e.target);
  //console.log(quantityP);
  //minus buttons
  if (e.target.classList.contains("minus")) {
    //console.log("minus button clicked");
    if (quantityP.innerText > 1) {
      quantityP.innerText--;
      //calculate Product and Cart Total
      calculateProductTotal(quantityP);
    } else {
      if (confirm("Product will bu removed! ")) {
        quantityP.parentElement.parentElement.parentElement.remove();
        //calculateCartTotal
        calculateCartTotal();
      }
    }
  } else if (e.target.className == "plus") {
    //plus buttons
    quantityP.innerText++;
    //console.log("plus button clicked");
    //calculate Product and Cart Total
    calculateProductTotal(quantityP);
  } else if (e.target.classList.contains("remove")) {
    //remove buttons

    //console.log("remove button clicked");
    //quantityP.parentElement.parentElement.parentElement.remove();
    e.target.parentElement.parentElement.remove();
    //calculateCartTotal
    calculateCartTotal();
  } else {
    console.log(e.target);
  }
});

const calculateProductTotal = (quantityP) => {
  //console.log(quantityP.innerText);
  let productPrice =
    quantityP.parentElement.parentElement.querySelector(".current-price");
  //console.log(productPrice.innerText);
  let productTotalPriceDiv =
    quantityP.parentElement.parentElement.querySelector(".product-total");
  productTotalPriceDiv.innerText = (
    quantityP.innerText * productPrice.innerText
  ).toFixed(2);

  calculateCartTotal();
};

const calculateCartTotal = () => {
  let productTotalPriceDivs = document.querySelectorAll(".product-total");
  //console.log(productTotalPriceDivs);
  let subtotal = 0;
  productTotalPriceDivs.forEach((productTotalPriceDiv) => {
    subtotal += parseFloat(productTotalPriceDiv.innerText);
  });
  console.log("subtotal:", subtotal);
  let taxPrice = subtotal * localStorage.getItem("taxRate");
  console.log("taxPrice:", taxPrice);
  let shipping = (subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")):0)
  console.log(shipping);
  let cartTotal = subtotal + taxPrice + shipping;
  console.log(cartTotal);

  document.querySelector("#subtotal-price").innerText = subtotal.toFixed(2);
  document.querySelector("#tax").innerText = taxPrice.toFixed(2);
  document.querySelector("#shipping-price").innerText = shipping.toFixed(2);
  document.querySelector("#total-price").innerText = cartTotal.toFixed(2);
};
