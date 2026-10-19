const monthlyBtn = document.getElementById("monthly");
const yearlyBtn = document.getElementById("yearly");
const prices = document.querySelectorAll(".price strong");

function changePrice(type) {

```
prices.forEach(price => {
    price.textContent = price.dataset[type];
});

if (type === "yearly") {
    yearlyBtn.classList.add("active");
    monthlyBtn.classList.remove("active");
} else {
    monthlyBtn.classList.add("active");
    yearlyBtn.classList.remove("active");
}
```

}

monthlyBtn.addEventListener("click", () => {
changePrice("monthly");
});

yearlyBtn.addEventListener("click", () => {
changePrice("yearly");
});

const buttons = document.querySelectorAll(".choose");

buttons.forEach(button => {


button.addEventListener("click", () => {

    const plan = button.dataset.plan;

    alert(`Nice choice! You selected the ${plan} plan ✦`);
});


});