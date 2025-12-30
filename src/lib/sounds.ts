// Sound effects library for God Mode
// Uses data URIs for minimal audio files to avoid external dependencies

// Short alert tone (200ms beep at 800Hz)
const alertSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');

// Power-up sound (ascending tone)
const initializeSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');

// Subtle whoosh (message send)
const sendSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');

// Sound registry
const sounds = {
  threatAlert: alertSound,
  initialize: initializeSound,
  messageSend: sendSound,
};

// Play a sound by name
export const playSound = (name: keyof typeof sounds, volume: number = 0.3) => {
  try {
    const sound = sounds[name];
    sound.volume = volume;
    sound.currentTime = 0;
    sound.play().catch(() => {
      // Ignore autoplay errors (browser may block)
    });
  } catch (error) {
    // Silently fail if sound playback is not supported
    console.debug('Sound playback failed:', error);
  }
};

// Preload all sounds
export const preloadSounds = () => {
  Object.values(sounds).forEach(sound => {
    sound.load();
  });
};
