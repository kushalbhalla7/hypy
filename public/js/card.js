const id = new URLSearchParams(window.location.search).get('id');

const s = document.createElement("script");
s.type = "text/javascript";
s.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${id}`;
s.innerHTML = null;
s.id = "hyScript";

document.body.appendChild(s);