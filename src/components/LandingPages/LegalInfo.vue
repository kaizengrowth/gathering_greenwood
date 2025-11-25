<script setup>

const emit = defineEmits(['close']);

function handleReturn() {
  emit('close');
}
</script>

<template>
  <div class="legal-info-overlay">
    <div class="legal-info-container">
      <!-- Background with script text -->
      <div class="background-texture"></div>
      <div class="content">

        <!-- Left side logos -->
        <div class="logos-section">
          <img src="/gcc-logo.png" alt="Greenwood Cultural Center" class="gcc-logo">
          <img src="/city_of_tulsa_logo.png" alt="City of Tulsa" class="tulsa-logo">
        </div>

        <!-- Main Title -->
        <div class="text-content">
          <h1 class="main-title">
            GATHERING GREENWOOD
          </h1>

          <!-- Legal Text -->
          <div class="legal-text">
            <p>This project was supported by Grant No.15BJA-22-GG-01763-EMME awarded by the Bureau of Justice Assistance. The Bureau of Justice Assistance is a component of the Department of Justice's Office of Justice Programs, which also includes the Bureau of Justice Statistics, the National Institute of Justice, the Office of Juvenile Justice and Delinquency Prevention, the Office for Victims of Crime, and the SMART Office. Points of view or opinions in this document are those of the author and do not necessarily represent the official position or policies of the U.S. Department of Justice.</p>
            <p class="map-credit">Map data courtesy of the OpenHistoricalMap project,<br/>in the public domain unless otherwise noted.</p>
            <!-- Return Button -->
            <button @click="handleReturn" class="return-button">
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.legal-info-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.legal-info-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #E8DCC6; /* Beige/tan background */
  color: #333;
  overflow: hidden;
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
  background-image: url('/info-bkg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  display: flex;
  gap: 4rem;
  flex-direction: row;
  box-sizing: border-box;
}

.logos-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rem;
  flex-shrink: 0;
  text-align: initial;
  margin: 5rem;
}

.gcc-logo {
  height: auto;
  width: 15rem;
}

.main-title {
  font-size: 4rem;
  font-weight: 900;
  width: 100%;
  color: #000;
  margin: 0 0 0 0;
  line-height: 0.9;
  letter-spacing: 2px;
  text-align: center;
}

.legal-text {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  flex: 1;
  line-height: 1.6;
  margin-bottom: 0;
  width: 100%;
  align-self: center;
  width: 100%;
}

.legal-text p {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: 700;
  flex: 1;
  line-height: 1.6;
  width: 100%;
}

p.map-credit {
  text-align: center;
  font-weight: 700;
  align-self: center;
  flex-grow: 0;
  width: 100%;
  padding-right: 0;
  max-width: 100%;
}

.tulsa-logo-section {
  margin: 3rem;
}

.tulsa-logo {
  height: auto;
  width: 15rem;
}

.text-content {
  flex: 1;
  padding: 5rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.return-button {
  font-family: "Figtree";
  padding: 0rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
  background-color: #1B3B22;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  width: 12rem;
  height: 4rem;
  margin: auto;
}

.return-button:active {
  transform: scale(0.90);
  background-color: #0f2817;
}

</style>