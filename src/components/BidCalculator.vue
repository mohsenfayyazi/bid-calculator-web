<template>
  <div class="bid-calculator">
    <h1 class="bid-calculator__title">Bid Calculator</h1>
    <div class="bid-calculator__input-group">
      <label for="base-price" class="bid-calculator__label">Base Price:</label>
      <input type="number" id="base-price" v-model="basePrice" class="bid-calculator__input">
      <span v-if="!isValid && (basePrice === 0 || basePrice === '')" class="bid-calculator__error">Please enter a base price greater than
        0.</span>
    </div>
    <div>
      
    </div>
    <div class="bid-calculator__input-group">
      <label for="vehicle-type" class="bid-calculator__label">Vehicle Type:</label>
      <select id="vehicle-type" v-model="vehicleType" class="bid-calculator__input">
        <option value="Common">Common</option>
        <option value="Luxury">Luxury</option>
      </select>
      <span v-if="!vehicleTypeValid" class="bid-calculator__error">Please select a vehicle type.</span>
    </div>
    <br>
    <ul class="bid-calculator__fee-list">
      <li>Basic Fee: {{ basicFee }}</li>
      <li>Seller Fee: {{ sellerFee }}</li>
      <li>Association Fee: {{ associationFee }}</li>
      <li>Storage Fee: ${{ storageFee }}</li>
      <li><b>Total Cost: {{ totalCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</b></li>
    </ul>
    <button @click="calculateTotalCost" class="bid-calculator__button">Calculate</button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      basePrice: 0,
      basicFee: 0,
      sellerFee: 0,
      associationFee: 0,
      totalCost: 0,
      vehicleTypeValid: true,
      isValid: true
    };
  },
  methods: {
    calculateTotalCost() {
      this.isValid = true;
      if (!this.vehicleType) { // Check if vehicleType is empty
        this.vehicleTypeValid = false;
        return;
      }else{
        this.vehicleTypeValid = true;
      }
      if (this.basePrice === 0 || this.basePrice === "") {
        this.isValid = false;
        return; // Prevent further processing if invalid
      }
      // Fetch data from API
      fetch(`https://localhost:7153/api/calculate-cost?basePrice=${this.basePrice}&vehicleType=${this.vehicleType}`)
        .then(response => response.json())
        .then(data => {
          this.basicFee = data.basicFee;
          this.sellerFee = data.sellerFee;
          this.associationFee = data.associationFee;
          this.totalCost = data.totalCost;
          this.storageFee = data.storageFee;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<style scoped>
.bid-calculator {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.bid-calculator__title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 15px;
}

.bid-calculator__input-group {
  display: flex;
  margin-bottom: 10px;
}

.bid-calculator__label {
  width: 120px;
  margin-right: 10px;
}

.bid-calculator__input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.bid-calculator__fee-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bid-calculator__fee-list li {
  line-height: 1.5;
}

.bid-calculator__button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.bid-calculator__button:hover {
  background-color: #3e8e41;
}

.bid-calculator__error {
  color: red;
}

</style>
