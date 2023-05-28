$(document).ready(function () {
  var productItem = [
    {
      productName: "Red Seedless Grapes Punnet 500G",
      price: "2.00",
      photo: "Grape.jpg",
    },
    {
      productName: "Organic Fair Trade Bananas 5 Pack",
      price: "1.35",
      photo: "Banana.jpg",
    },
    {
      productName: "Rosedene Farms Strawberries 227G",
      price: "1.69",
      photo: "Strawberries.jpg",
    },
  ];

  showProductGallery(productItem);
  showCartTable();
});

function addToCart(element) {
  var productParent = $(element).closest("div.product-item");

  var price = $(productParent).find(".price span").text();
  var productName = $(productParent).find(".productname").text();
  var quantity = $(productParent).find(".product-quantity").val();

  var cartItem = {
    productName: productName,
    price: price,
    quantity: quantity,
  };
  var cartItemJSON = JSON.stringify(cartItem);

  var cartArray = new Array();

  if (sessionStorage.getItem("shopping-cart")) {
    cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
  }
  cartArray.push(cartItemJSON);

  var cartJSON = JSON.stringify(cartArray);
  sessionStorage.setItem("shopping-cart", cartJSON);
  showCartTable();
}

function emptyCart() {
  if (sessionStorage.getItem("shopping-cart")) {
    sessionStorage.removeItem("shopping-cart");
    showCartTable();
  }
}

function removeCartItem(index) {
  if (sessionStorage.getItem("shopping-cart")) {
    var shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));
    sessionStorage.removeItem(shoppingCart[index]);
    showCartTable();
  }
}

function showCartTable() {
  var cartRowHTML = "";
  var itemCount = 0;
  var grandTotal = 0;

  var price = 0;
  var quantity = 0;
  var subTotal = 0;

  if (sessionStorage.getItem("shopping-cart")) {
    var shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));
    itemCount = shoppingCart.length;

    shoppingCart.forEach(function (item) {
      var cartItem = JSON.parse(item);
      price = parseFloat(cartItem.price);
      quantity = parseInt(cartItem.quantity);
      subTotal = price * quantity;

      cartRowHTML +=
        "<tr>" +
        "<td>" +
        cartItem.productName +
        "</td>" +
        "<td class='text-right'>£" +
        price.toFixed(2) +
        "</td>" +
        "<td class='text-right'>" +
        quantity +
        "</td>" +
        "<td class='text-right'>£" +
        subTotal.toFixed(2) +
        "</td>" +
        "</tr>";

      grandTotal += subTotal;
    });
  }

  $("#cartTableBody").html(cartRowHTML);
  $("#itemCount").text(itemCount);
  $("#totalAmount").text("£" + grandTotal.toFixed(2));
}

function showProductGallery(product) {
  var productHTML = "";
  product.forEach(function (item) {
    productHTML +=
      `<div class="product-item">
        <img src="product-images/${item.photo}">
        <div class="productname">
          ${item.productName}
        </div>
        <div class="price">£<span>${item.price}</span></div>
        <div class="cart-action">
          <input type="text" class="product-quantity" name="quantity" value="1" size="2" />
          <input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />
        </div>
      </div>`;
    ("<tr>");
  });
  $("#product-item-container").html(productHTML);
}
