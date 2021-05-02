//Business Logic

function Contact(first, last, addresses) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + " " + this.city + " " + this.state;
}


//User interface Logic
$(document).ready(function() {
  $("#addAddress").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control" autocomplete="off" placeholder="Enter your street" id="street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control" autocomplete="off" placeholder="Enter your city" id="city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-county">County</label>' +
                                   '<input type="text" class="form-control" autocomplete="off" placeholder="Enter your state" id="state"">' +
                                 '</div>' +
                               '</div>');
  });
  $("form#newContact").submit(function(event) {
    event.preventDefault();

    let inputtedFirstName = $("input#firstName").val();
    var inputtedLastName = $("input#lastName").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      let inputtedStreet = $(this).find("input#street").val();
      let inputtedCity = $(this).find("input#city").val();
      let inputtedState = $(this).find("input#state").val();
      let newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);//objects within objects
    });

    $("ul#myContacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");
    $(".contact").last().click(function() {
      $("#showContact").show();
      $("#showContact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    let form =document.getElementsByName("address-form")[0];
    form.reset();
    return false;

  });
});

