import { createApp } from 'vue'
import App from './App.vue' // Import App.vue if you have it

// Import your BidCalculator component
import BidCalculator from './components/BidCalculator.vue';

const app = createApp(App || BidCalculator); // Use App if available, otherwise fallback to BidCalculator

// If using App.vue, the component registration happens there.
// If not using App.vue, register the component here:
if (!App) {
  app.component('bid-calculator', BidCalculator);
}

app.mount('#app')
