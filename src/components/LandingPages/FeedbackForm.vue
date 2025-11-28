<script setup>
import { ref } from 'vue';
import { useToast } from "vue-toastification";
import utils from '@utils/utils.js'

const emit = defineEmits(['close']);
const toast = useToast();

// Form data
const firstName = ref('');
const lastName = ref('');
const cellNumber = ref('');
const isSubmitting = ref(false);

// Form methods
function clearForm() {
  firstName.value = '';
  lastName.value = '';
  cellNumber.value = '';
}

async function submitForm() {
  // Validate form
  if (!firstName.value || !lastName.value || !cellNumber.value) {
    toast.warning('Please fill in all fields');
    return;
  }

  if (isSubmitting.value) return; // Prevent double submission

  isSubmitting.value = true;
  toast.info('Submitting feedback...');

  try {
    // Create form data
    const params = new URLSearchParams();
    params.append('firstName', firstName.value);
    params.append('lastName', lastName.value);
    params.append('cellNumber', utils.convertToE164(cellNumber.value, 1));
    params.append('timestamp', new Date().toISOString());


    // Submit to Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbyjhWgzg9czqtMvqQTf-t2NT4UQ3VHVsczwdHW6VPU7PKLoMADFtdoDdNIH1ezkPeGX/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      mode: 'no-cors'
    });

    // Since mode is 'no-cors', we can't read the response
    // but if we get here without error, assume success
    toast.success('Thank you for your feedback! We will reach out via text message.');
    clearForm();

    // Close the form after a short delay
    setTimeout(() => {
      handleReturn();
    }, 2000);

  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Sorry, there was an error submitting your feedback. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

function handleReturn() {
  emit('close');
}
</script>

<template>
  <div class="feedback-overlay">
    <div class="feedback-container">
      <!-- Background with script text -->
      <div class="background-texture"></div>

      <div class="content">
        <!-- Header -->
        <div class="header">
          <img src="/Helping through YOUR FEEDBACK.png" alt="Helping through your feedback" class="script-text" />
        </div>

        <!-- Description -->
        <div class="description">
          <p>Your feedback can help us further improve this resource for the community.</p>
          <p>Please provide your name and number below, and we'll reach out via text message!</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="submitForm" class="feedback-form">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              required
              class="form-input"
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              required
              class="form-input"
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="cellNumber">Cell Number </label>
            <input
              id="cellNumber"
              v-model="cellNumber"
              type="tel"
              required
              class="form-input phone-input"
              placeholder="(555) 123-4567"
              :disabled="isSubmitting"
            />
          </div>

          <!-- Privacy Notice -->
          <div class="privacy-notice">
            <p><em>We value your privacy and promise to keep your information secure.<br/>
            By providing your phone number, you agree to receive SMS messages from Greenwood Cultural Center regarding your feedback.
            Message and data rates may apply</em></p>
          </div>

          <!-- Buttons -->
          <div class="button-container">
            <div class="action-button-container">
              <button type="button" @click="clearForm" class="action-button clear-button" :disabled="isSubmitting">
                Clear
              </button>
              <button type="submit" class="action-button submit-button" :disabled="isSubmitting">
                Submit
              </button>
            </div>
            <div class="return-button-container">
              <button type="button" @click="handleReturn" class="action-button return-button" :disabled="isSubmitting">
                Return
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feedback-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #E8DCC6; /* Beige/tan background */
  color: #333;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-texture {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/info-bkg.webp');
  background-size: cover;
  background-position: center;
  opacity: 1;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.header {
  margin-bottom: 1.5rem;
}

.script-text {
  max-width: 500px;
  width: 100%;
  height: auto;
}

.main-title {
  font-size: 4rem;
  font-weight: bold;
  color: #000;
  margin: 0;
  line-height: 0.9;
  letter-spacing: 2px;
}

.description {
  margin-bottom: 1.5rem;
  width: 100%;
}

.description p {
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
  line-height: 1.5;
}

.feedback-form {
  width: 100%;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.form-group label {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  min-width: 120px;
  text-align: left;
}

.form-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #1B3B22;
  border-radius: 4px;
  background-color: #f8f8f8;
  color: #333;
}

.phone-input {
  max-width: 250px;
}

.form-input:focus {
  outline: none;
  background-color: white;
  border-color: #405D47;
}

.privacy-notice {
  text-align: left;
}

.privacy-notice p {
  font-size: 1rem;
  color: #555;
  font-weight: 800;
  margin: 0.5rem 0;
  line-height: 1.4;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
}

.action-button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
}

.action-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  width: 12rem;
  height: 4rem;
}

button.action-button.clear-button:disabled,
button.action-button.return-button:disabled,
button.action-button.submit-button:disabled {
  background-color: #1b3b224d;
  color: #1010104d;
  border-color: #7676764d;
  transition: none;
  cursor: not-allowed;
}

button.action-button.clear-button:disabled:hover,
button.action-button.return-button:disabled:hover,
button.action-button.submit-button:disabled:hover {
  transform: none;
}

input.form-input:disabled {
  background-color: #c6c6c6;
  border-color: #1b3b224d;
  cursor: not-allowed;
}

.return-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  width: 12rem;
  height: 4rem;
}

.clear-button,
.submit-button {
  background-color: #1B3B22;
  color: white;
}

.return-button {
  background-color: #1B3B22;
  color: white;
}

.action-button:hover {
  transform: scale(1.05);
  background-color: #0f2817;
}

</style>