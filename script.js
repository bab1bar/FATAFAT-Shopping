


























document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------
  // ELEMENTS
  // -----------------------------
  const items = document.querySelectorAll('input[type="checkbox"][data-price], .item'); // all items for total & WhatsApp
  const totalText = document.getElementById('total');
  const advanceText = document.getElementById('advance');
  const agree = document.getElementById('agree');
  const orderBtn = document.getElementById('orderBtn');
  const selectAll = document.getElementById('selectAll');
  const groupCheckboxes = document.querySelectorAll('.group-checkbox');
  const itemCheckboxes = document.querySelectorAll('.item-checkbox');
  const phoneInput = document.getElementById("phoneInput");
  const phoneError = document.getElementById("phoneError");
  const categoryLabels = document.querySelectorAll('.category-label');
  const display = document.getElementById('display-items');
  const navbar = document.querySelector('.navbar');
  const storeSelect = document.getElementById("storeSelect");
  const itemsDivs = document.querySelectorAll(".items");
  const remarks = document.getElementById("remarks");

  let total = 0;

  // -----------------------------
  // TOTAL & ADVANCE CALCULATION
  // -----------------------------
  items.forEach(item => {
    item.addEventListener('change', () => {
      total = 0;
      items.forEach(i => {
        if (i.checked && i.dataset.price) total += parseInt(i.dataset.price);
      });
      if(totalText) totalText.innerText = `Total: ${total} PKR`;
      if(advanceText) advanceText.innerText = `Advance (50%): ${total / 2} PKR`;

      updateOrderButton();
    });
  });

  // -----------------------------
  // PHONE VALIDATION
  // -----------------------------
  function normalizePhone(raw) {
    let phone = raw.replace(/[^0-9+]/g, '');
    if (phone.startsWith('0092')) phone = phone.replace('0092', '92');
    if (phone.startsWith('+92')) phone = phone.replace('+', '');
    if (phone.startsWith('03')) phone = '92' + phone.substring(1);
    return /^92\d{10}$/.test(phone) ? phone : null;
  }

  phoneInput.addEventListener("input", () => {
    const normalized = normalizePhone(phoneInput.value);
    if (normalized) {
      phoneError.style.display = "none";
      phoneInput.dataset.normalized = normalized;
    } else {
      phoneError.style.display = "block";
      phoneInput.dataset.normalized = "";
    }
    updateOrderButton();
  });

  // -----------------------------
  // UPDATE ORDER BUTTON STATE
  // -----------------------------
  function updateOrderButton() {
    const phoneValid = !!phoneInput.dataset.normalized;
    const agreed = agree ? agree.checked : true;
    const itemsSelected = Array.from(items).some(i => i.checked);

    orderBtn.disabled = !(phoneValid && agreed && itemsSelected);
  }

  if(agree) agree.addEventListener('change', updateOrderButton);

  // -----------------------------
  // CATEGORY LABELS CLICK (DISPLAY ITEMS)
  // -----------------------------
  categoryLabels.forEach(label => {
    label.addEventListener('click', (e) => {
      e.preventDefault();
      const itemsDiv = label.parentElement.querySelector('.items');
      if(itemsDiv) display.innerHTML = itemsDiv.innerHTML;
    });
  });

  // -----------------------------
  // SHRINK NAVBAR ON SCROLL
  // -----------------------------
  if(navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) navbar.classList.add('shrink');
      else navbar.classList.remove('shrink');
    });
  }

  // -----------------------------
  // STORE SELECTION
  // -----------------------------
  if(storeSelect) {
    storeSelect.addEventListener("change", function() {
      const selected = this.value;
      itemsDivs.forEach(div => div.style.display = "none");
      if(selected) {
        const showDiv = document.getElementById(selected + "Items");
        if(showDiv) showDiv.style.display = "block";
      }
    });
  }

  // -----------------------------
  // GET CUSTOMER REMARKS
  // -----------------------------
  function getCustomerRemarks() {
    const comment = remarks ? remarks.value : "";
    return comment;
  }

  // -----------------------------
  // SEND WHATSAPP ORDER
  // -----------------------------
  orderBtn.addEventListener("click", () => {
    const phoneNumber = phoneInput.dataset.normalized;
    if(!phoneNumber) {
      alert("براہِ کرم درست فون نمبر درج کریں");
      return;
    }

    let selectedItems = "";
    items.forEach((item, i) => {
      if(item.checked) selectedItems += `${i+1}. ${item.dataset.name || item.value} (${item.dataset.price || ""} PKR)\n`;
    });

    const store = (document.getElementById('customStore')?.value || 
                   document.getElementById('storeSelect')?.value || "N/A");

    const lat = 0, lng = 0; // fallback if geolocation fails

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        openWhatsApp(phoneNumber, selectedItems, store, lat, lng);
      }, () => {
        openWhatsApp(phoneNumber, selectedItems, store, lat, lng);
      });
    } else {
      openWhatsApp(phoneNumber, selectedItems, store, lat, lng);
    }
  });

  function openWhatsApp(phoneNumber, itemsText, store, lat, lng) {
    const msg = `السلام علیکم، میں درج ذیل اشیاء آرڈر کرنا چاہتا ہوں:\n\n${itemsText}\nPickup: ${store}\nDelivery (Live GPS): https://maps.google.com/?q=${lat},${lng}\nTotal: ${total} PKR\nAdvance (50%): ${total/2} PKR\nRemarks: ${getCustomerRemarks()}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

});

















// const items = document.querySelectorAll('input[type="checkbox"][data-price]');
// const totalText = document.getElementById('total');
// const advanceText = document.getElementById('advance');
// const agree = document.getElementById('agree');
// const orderBtn = document.getElementById('orderBtn');
// const selectAll = document.getElementById('selectAll');
// const groupCheckboxes = document.querySelectorAll('.group-checkbox');
// const itemCheckboxes = document.querySelectorAll('.item-checkbox');
// const phoneInput = document.getElementById("phone");
// const phoneError = document.getElementById("phoneError");
// const orderBtn = document.getElementById("orderBtn");





// // Show clicked category items in the display section
// const categoryLabels = document.querySelectorAll('.category-label');
// const display = document.getElementById('display-items');

// categoryLabels.forEach(label => {
//   label.addEventListener('click', (e) => {
//     e.preventDefault(); // prevent checkbox toggle if needed
//     const itemsDiv = label.parentElement.querySelector('.items');
//     if(itemsDiv) {
//       display.innerHTML = itemsDiv.innerHTML; // show items of clicked category
//     }
//   });
// });



// // Shrink navbar on scroll
// const navbar = document.querySelector('.navbar');

// window.addEventListener('scroll', () => {
//   if (window.scrollY > 30) {        // when user scrolls down
//     navbar.classList.add('shrink');  // add shrink class
//   } else {
//     navbar.classList.remove('shrink'); // remove when at top
//   }
// });
















// let total = 0;

// items.forEach(item => {
//   item.addEventListener('change', () => {
//     total = 0;
//     items.forEach(i => {
//       if (i.checked) total += parseInt(i.dataset.price);
//     });
//     totalText.innerText = `Total: ${total} PKR`;
//     advanceText.innerText = `Advance (50%): ${total / 2} PKR`;
//   });
// });

// agree.addEventListener('change', () => {
//   orderBtn.disabled = !agree.checked;
// });

// orderBtn.addEventListener('click', () => {
//   navigator.geolocation.getCurrentPosition(pos => {
//     const lat = pos.coords.latitude;
//     const lng = pos.coords.longitude;

//     let selectedItems = '';
//     items.forEach(i => {
//       if (i.checked) {
//         selectedItems += `- ${i.dataset.name} (${i.dataset.price} PKR)%0A`;
//       }
//     });

//     const store = document.getElementById('customStore').value ||
//                   document.getElementById('storeSelect').value;

//     const msg = `Assalam-o-Alaikum%0A
// Items:%0A${selectedItems}%0A
// Pickup: ${store}%0A
// Delivery (Live GPS): https://maps.google.com/?q=${lat},${lng}%0A
// Total: ${total} PKR%0A
// Advance (50%): ${total / 2} PKR`;

//     window.open(`https://wa.me/923425910639?text=${msg}`, '_blank');
//   });
// });



// const storeSelect = document.getElementById("storeSelect");
// const itemsDivs = document.querySelectorAll(".items");

// if(storeSelect) {
//   storeSelect.addEventListener("change", function() {
//     const selected = this.value;

//     itemsDivs.forEach(div => div.style.display = "none"); // hide all

//     if(selected) {
//       const showDiv = document.getElementById(selected + "Items");
//       if(showDiv) showDiv.style.display = "block"; // show selected
//     }
//   });
// }


// const remarks = document.getElementById("remarks");

// function getCustomerRemarks() {
//   const comment = remarks.value;
//   console.log("Customer remarks:", comment);
//   // you can send this value to your backend or include in order summary
// }


// function sendWhatsApp() {
//   const checkedItems = document.querySelectorAll(
//     'details input[type="checkbox"]:checked'
//   );

//   if (checkedItems.length === 0) {
//     alert("براہِ کرم کم از کم ایک چیز منتخب کریں");
//     return;
//   }

//   let message = "السلام علیکم، میں درج ذیل سبزیاں آرڈر کرنا چاہتا ہوں:\n\n";

//   checkedItems.forEach((item, index) => {
//     message += (index + 1) + ". " + item.value + "\n";
//   });

//   message += "\nبراہِ کرم قیمت اور دستیابی کنفرم کر دیں۔";

//   const phoneNumber = "923001234567"; 
//   // ↑ اپنا WhatsApp نمبر یہاں ڈالیں (92 کے ساتھ)
// document.addEventListener("DOMContentLoaded", () => {

//   const phoneInput = document.getElementById("phoneInput");
//   const phoneError = document.getElementById("phoneError");
//   const agree = document.getElementById("agree");
//   const items = document.querySelectorAll(".item");
//   const orderBtn = document.getElementById("orderBtn");

//   function normalizePhone(raw) {
//     let phone = raw.replace(/[^0-9+]/g, '');
//     if (phone.startsWith('0092')) phone = phone.replace('0092', '92');
//     if (phone.startsWith('+92')) phone = phone.replace('+', '');
//     if (phone.startsWith('03')) phone = '92' + phone.substring(1);
//     return /^92\d{10}$/.test(phone) ? phone : null;
//   }

//   function updateOrderButton() {
//     const phoneValid = !!phoneInput.dataset.normalized;
//     const agreed = agree.checked;
//     const itemsSelected = Array.from(items).some(i => i.checked);

//     orderBtn.disabled = !(phoneValid && agreed && itemsSelected);
//   }

//   phoneInput.addEventListener("input", () => {
//     const normalized = normalizePhone(phoneInput.value);

//     if (normalized) {
//       phoneError.style.display = "none";
//       phoneInput.dataset.normalized = normalized;
//     } else {
//       phoneError.style.display = "block";
//       phoneInput.dataset.normalized = "";
//     }

//     updateOrderButton();
//   });

//   agree.addEventListener("change", updateOrderButton);
//   items.forEach(i => i.addEventListener("change", updateOrderButton));

//   orderBtn.addEventListener("click", () => {
//     const phoneNumber = phoneInput.dataset.normalized;

//     let message = "السلام علیکم، میں درج ذیل اشیاء آرڈر کرنا چاہتا ہوں:\n\n";

//     items.forEach((item, i) => {
//       if (item.checked) {
//         message += (i + 1) + ". " + item.value + "\n";
//       }
//     });

//     message += "\nبراہِ کرم قیمت اور دستیابی کنفرم کر دیں۔";

//     const url =
//       "https://wa.me/" +
//       phoneNumber +
//       "?text=" +
//       encodeURIComponent(message);

//     window.open(url, "_blank");
//   });

// });
