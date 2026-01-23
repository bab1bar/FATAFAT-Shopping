const items = document.querySelectorAll('input[type="checkbox"][data-price]');
const totalText = document.getElementById('total');
const advanceText = document.getElementById('advance');
const agree = document.getElementById('agree');
const orderBtn = document.getElementById('orderBtn');

let total = 0;

items.forEach(item => {
  item.addEventListener('change', () => {
    total = 0;
    items.forEach(i => {
      if (i.checked) total += parseInt(i.dataset.price);
    });
    totalText.innerText = `Total: ${total} PKR`;
    advanceText.innerText = `Advance (50%): ${total / 2} PKR`;
  });
});

agree.addEventListener('change', () => {
  orderBtn.disabled = !agree.checked;
});

orderBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    let selectedItems = '';
    items.forEach(i => {
      if (i.checked) {
        selectedItems += `- ${i.dataset.name} (${i.dataset.price} PKR)%0A`;
      }
    });

    const store = document.getElementById('customStore').value ||
                  document.getElementById('storeSelect').value;

    const msg = `Assalam-o-Alaikum%0A
Items:%0A${selectedItems}%0A
Pickup: ${store}%0A
Delivery (Live GPS): https://maps.google.com/?q=${lat},${lng}%0A
Total: ${total} PKR%0A
Advance (50%): ${total / 2} PKR`;

    window.open(`https://wa.me/923425910639?text=${msg}`, '_blank');
  });
});



const storeSelect = document.getElementById("storeSelect");
const itemsDivs = document.querySelectorAll(".items");

if(storeSelect) {
  storeSelect.addEventListener("change", function() {
    const selected = this.value;

    itemsDivs.forEach(div => div.style.display = "none"); // hide all

    if(selected) {
      const showDiv = document.getElementById(selected + "Items");
      if(showDiv) showDiv.style.display = "block"; // show selected
    }
  });
}


const remarks = document.getElementById("remarks");

function getCustomerRemarks() {
  const comment = remarks.value;
  console.log("Customer remarks:", comment);
  // you can send this value to your backend or include in order summary
}


function sendWhatsApp() {
  const checkedItems = document.querySelectorAll(
    'details input[type="checkbox"]:checked'
  );

  if (checkedItems.length === 0) {
    alert("براہِ کرم کم از کم ایک چیز منتخب کریں");
    return;
  }

  let message = "السلام علیکم، میں درج ذیل سبزیاں آرڈر کرنا چاہتا ہوں:\n\n";

  checkedItems.forEach((item, index) => {
    message += (index + 1) + ". " + item.value + "\n";
  });

  message += "\nبراہِ کرم قیمت اور دستیابی کنفرم کر دیں۔";

  const phoneNumber = "923001234567"; 
  // ↑ اپنا WhatsApp نمبر یہاں ڈالیں (92 کے ساتھ)

  const whatsappURL =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}


function sendWhatsAppFruits() {
  const checkedItems = document.querySelectorAll(
    'details input[type="checkbox"]:checked'
  );

  if (checkedItems.length === 0) {
    alert("براہِ کرم کم از کم ایک پھل منتخب کریں");
    return;
  }

  let message = "السلام علیکم، میں درج ذیل پھل آرڈر کرنا چاہتا ہوں:\n\n";

  checkedItems.forEach((item, index) => {
    message += (index + 1) + ". " + item.value + "\n";
  });

  message += "\nبراہِ کرم قیمت اور دستیابی کنفرم کر دیں۔";

  const phoneNumber = "923001234567"; 
  // ↑ اپنا WhatsApp نمبر یہاں ڈالیں (92 کے ساتھ)

  const whatsappURL =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}
