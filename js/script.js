document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const amountWordsSpan = document.getElementById("amountWords");
    const interestRateInput = document.getElementById("interestRate");
    const tenureSelect = document.getElementById("tenure");
    const tinSelect = document.getElementById("tin");
    const calculateButton = document.querySelector("button");
    const profitBeforeSpan = document.getElementById("profitBefore");
    const profitAfterSpan = document.getElementById("profitAfter");
    const taxDeductionLabel = document.getElementById("taxDeductionLabel");

    // Function to add commas dynamically
    function formatNumberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Function to convert numbers to words
    function numberToWords(num) {
        if (num === 0) return "Zero";

        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        const teens = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

        function convertChunk(n) {
            let words = "";
            if (n >= 100) {
                words += ones[Math.floor(n / 100)] + " Hundred ";
                n %= 100;
            }
            if (n >= 11 && n <= 19) {
                words += teens[n - 11] + " ";
            } else {
                words += tens[Math.floor(n / 10)] + " ";
                if (n % 10 !== 0) words += ones[n % 10] + " ";
            }
            return words.trim();
        }

        let wordRepresentation = "";
        let chunkIndex = 0;

        while (num > 0) {
            let chunk = num % 1000;
            if (chunk !== 0) {
                wordRepresentation = convertChunk(chunk) + " " + thousands[chunkIndex] + " " + wordRepresentation;
            }
            num = Math.floor(num / 1000);
            chunkIndex++;
        }

        return wordRepresentation.trim();
    }

    // Update amount dynamically with commas and words
    amountInput.addEventListener("input", function () {
        let rawValue = amountInput.value.replace(/,/g, "");
        let amountValue = parseInt(rawValue);

        if (!isNaN(amountValue) && amountValue > 0) {
            amountInput.value = formatNumberWithCommas(amountValue);
            amountWordsSpan.textContent = numberToWords(amountValue);
        } else {
            amountWordsSpan.textContent = "Zero";
        }
    });

    // Calculate profit function
    function calculateProfit() {
        let interestRate = parseFloat(interestRateInput.value);
        let amount = parseFloat(amountInput.value.replace(/,/g, ""));
        let tenure = parseInt(tenureSelect.value);
        let tinAvailable = tinSelect.value.toLowerCase();

        if (isNaN(interestRate) || interestRate <= 0 || isNaN(amount) || amount <= 0 || isNaN(tenure) || tenure <= 0) {
            alert("Please enter valid inputs.");
            return;
        }

        let profitBeforeTax = (amount * interestRate * tenure) / (100 * 12);
        let taxRate = tinAvailable === "yes" ? 0.10 : 0.15;
        let profitAfterTax = profitBeforeTax * (1 - taxRate);

        profitBeforeSpan.textContent = profitBeforeTax.toFixed(2);
        profitAfterSpan.textContent = profitAfterTax.toFixed(2);
        taxDeductionLabel.textContent = tinAvailable === "yes" ? "10%" : "15%";
    }

    calculateButton.addEventListener("click", calculateProfit);
});
