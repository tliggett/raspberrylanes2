import { Audio } from 'expo-av';

let sound: Audio.Sound | null = null;

export async function playMusic(): Promise<void> {
  try {
    if (sound) return; // Already playing
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
    const { sound: s } = await Audio.Sound.createAsync(
      require('../../assets/NoName.mp3'),
      { isLooping: true, volume: 0.5 }
    );
    sound = s;
    await sound.playAsync();
  } catch (e) {
    console.warn('Audio failed to load:', e);
  }
}

export async function stopMusic(): Promise<void> {
  if (sound) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  }
}
