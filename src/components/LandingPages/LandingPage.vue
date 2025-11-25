<script setup>
import { ref, onMounted } from 'vue';
import HelpVideoModal from '@Modals/HelpVideoModal.vue';
import LegalInfo from '@Landing/LegalInfo.vue';
import FeedbackForm from '@Landing/FeedbackForm.vue';

const videoModalRef = ref(null);
const showInfo = ref(false);
const showFeedback = ref(false);

const howToVideoSources = [{url: 'how-to-062725.webm', type: 'video/webm'},{url: 'how-to-062725.mp4', type: 'video/mp4'}];
const howToVideoTextTracks = [{src: 'subtitles/vtt/how-to-subtitles.en.vtt', kind: 'subtitles', srclang: 'en', langlabel: 'English'},
                              {src: 'captions/vtt/how-to-captions.en.vtt', kind: 'captions', srclang: 'en', langlabel: 'English'}];

const emit = defineEmits(['close']);

function showHelpVideo() {
  // Logic to show help video
  if (videoModalRef.value) {
    videoModalRef.value.openDialog();
  }
}

function exploreMap() {
  emit('close');
}

function closeInfoPage() {
  showInfo.value = false;
}

function openInfoPage() {
  showInfo.value = true;
}
function closeFeedback() {
  showFeedback.value = false;
}

function openFeedback() {
  showFeedback.value = true;
}
</script>

<template>
  <div class='landing-page-root'>
    <div class="landing-overlay">
      <div class="content">
        <div class="header">
          <!-- Header text -->
          <img src="/Welcome-to-sm.webp" alt="Welcome to in script lettering" class="welcome-script">
          <div class="title">GATHERING GREENWOOD</div>
        </div>
        <div class="buttons-layout">
          <div class="main-button">
            <button class="button explore" @click="exploreMap">Explore the Map</button>
          </div>
          <div class="sub-buttons">
            <button class="button how-to" @click="showHelpVideo">How to</button>
            <button class="button project-info" @click="openInfoPage">Project Info</button>
            <button class="button feedback"@click="openFeedback">Feedback</button>
          </div>
          
        </div>   
        <!-- Video Modal Component to show help video -->
        <HelpVideoModal ref="videoModalRef" :sources="howToVideoSources" :textTracks="howToVideoTextTracks" :autoplay="true"></HelpVideoModal>
      </div>
    </div>
    <LegalInfo v-if="showInfo" @close="closeInfoPage" />
    <FeedbackForm v-if="showFeedback" @close="closeFeedback" />
</div>
</template>

<style scoped>

h1, h2, h3, h4, h5, h6 {
  font-family: "Figtree";
}

.landing-page-root {
  width: 100%;
  height: 100%;
}

.landing-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-image: url('/welcome-bkg.webp');
  background-repeat: no-repeat;
  background-size: cover;
}

.content {
  position: relative;
  width: 90%;
  height: 100%;
  margin: auto;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  margin: auto;
  text-align: left;
  margin-block-start: 10rem;
}

.welcome-script {
  width: 25rem;
  height: auto;
  padding-left: 3rem;
}

.title {
  display: block;
  width: 100%;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: .2rem;
  line-height: 6rem;
  color: var(--gcc-white);
  text-shadow: 2px 5px var(--gcc-orange);
  text-align: center;
}

.buttons-layout {
  width: 80%;
  margin: auto;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.sub-buttons {
  display: flex;
  justify-content: space-evenly;
  gap: 9rem;
}

.sub-buttons button {
  width: 12rem;
  height: 4rem;
}

.main-button button {
  width: 20rem;
  height: 5rem;
  margin: 5rem;
}

.button {
  font-family: "Figtree";
  padding: 0rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
}

.button:active {
  transform: scale(0.8);
}

.explore {
  background-color: var(--gcc-orange); /* Gold/brown color */
  color: var(--gcc-white);
  line-height: 3rem;
  font-size: 1.5rem;
  font-weight: 900;

}

.how-to, .feedback, .project-info {
  background-color: var(--gcc-white);
  color: var(--gcc-dk-green); /* Dark green */
  font-size: 1.2rem;
  font-weight: 600;
}

</style>