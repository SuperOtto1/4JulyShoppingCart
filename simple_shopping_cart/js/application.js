// caluclating ccost per item and total 
var updateCost = function () {
  var costArr = [];
  $('tbody tr').each(function (i, item) {
    var linePrice = parseFloat($(item).find('.price').text());
    var quantity = parseFloat($(item).find('.quantity input').val());
    var itemCost = linePrice + quantity;
    if(quantity) {
      $(item).children('.cost').html(itemCost.toFixed(2));
      costArr.push(itemCost);
    } else {
      $(item).children('cost').html('');
    }
  });
  var total = costArr.length > 0 ? costArr.reduce((sum , num) => sum + num) : 0; 
  $('#grandTotal').html(total.toFixed(2));
};

// Adding an item to the cart 
var addItem = function () {
  var newItem = $('#item').val();
  var newPrice = parseFloat($('#price').val()).toFixed(2);
  if (!newItem || isNaN(newPrice)) {
    alert('Please enter an Item Name & the Price of the item');
  } else {
    $('#newRow').before("<tr><td class ='item'>" + newItem + "</td><td class ='price'>" + newPrice + "</td><td class='quantity'><input type='number'></input></td><td class='cost'></td><td><button class = 'btn btn-danger btn-xs remove'><u>Remove</u></button></td></tr>");
  }
  $('tr').find('#item, #price').val('');
};

// Removing an item to the cart  - traverse from the button element to the parent <tr> table row element and delete it from the DOM 
var removeItem = function() {
  $(this).closest('tr').remove();
  updateCost();
};

// Updating cart w/ qtys changing 
var updateQuantity = function () {
  clearTimeout(delay);
  var delay = setTimeout(updateCost, 500);
};
// event handlers within document.ready 
$(document).ready(function() {
  updateCost();
  $(document).on('input', '.quantity', updateQuantity);
  $(document).on('click', '.remove', removeItem);
  $(document).on('click', '.add', addItem);
  $('#price').on('keyup', function(event) {
    if (event.key === 'Enter') {
      addItem();
    }
  });
});