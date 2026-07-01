/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural audio engine for children's Animal Call app.
// Synthesizes kids-app-style retro/cartoon animal sounds, ringtones, ambient loops, and lullabies.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private backgroundMusicNode: OscillatorNode[] = [];
  private backgroundMusicGain: GainNode | null = null;
  private musicIntervalId: any = null;
  private ambientIntervalId: any = null;
  
  private ambientNoiseNode: AudioNode | null = null;
  private ambientSourceNode: AudioNode[] = [];
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  
  private activeAnimalNode: any[] = [];
  private animalIntervalId: any = null;
  private animalTimeoutId: any = null;
  
  private isMuted: boolean = false;
  private isSpeakerMode: boolean = true;
  private musicVolumeLevel: number = 0.3;
  private soundVolumeLevel: number = 0.8;

  constructor() {
    // AudioContext will be initialized on user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      // Handle safari / standard audio context
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.backgroundMusicGain) {
      this.backgroundMusicGain.gain.setValueAtTime(mute ? 0 : this.musicVolumeLevel, this.ctx?.currentTime || 0);
    }
  }

  setSpeaker(speaker: boolean) {
    this.isSpeakerMode = speaker;
    // Just a flag we expose for visual simulation, as headphones/speaker is handled by OS/device.
  }

  setMusicVolume(vol: number) {
    this.musicVolumeLevel = vol;
    if (this.backgroundMusicGain && !this.isMuted) {
      this.backgroundMusicGain.gain.setValueAtTime(vol, this.ctx?.currentTime || 0);
    }
  }

  setSoundVolume(vol: number) {
    this.soundVolumeLevel = vol;
  }

  // --- STANDARD KIDS FX ---

  playRingtone() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0, ctx.currentTime);
    mainGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.soundVolumeLevel * 0.5, ctx.currentTime + 0.1);
    mainGain.connect(ctx.destination);

    // Dynamic ringtone sweep (cheerful dual chime)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const subGain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc2.frequency.setValueAtTime(880, ctx.currentTime); // A5

    osc1.connect(subGain);
    osc2.connect(subGain);
    subGain.connect(mainGain);

    osc1.start();
    osc2.start();

    // Rhythmic ring-ring pulse
    let time = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      subGain.gain.setValueAtTime(0, time);
      subGain.gain.linearRampToValueAtTime(0.6, time + 0.05);
      subGain.gain.setValueAtTime(0.6, time + 0.4);
      subGain.gain.linearRampToValueAtTime(0, time + 0.5);

      subGain.gain.setValueAtTime(0, time + 0.6);
      subGain.gain.linearRampToValueAtTime(0.6, time + 0.65);
      subGain.gain.setValueAtTime(0.6, time + 1.0);
      subGain.gain.linearRampToValueAtTime(0, time + 1.1);

      time += 2.0;
    }

    this.activeAnimalNode.push(osc1, osc2, subGain, mainGain);

    setTimeout(() => {
      osc1.stop();
      osc2.stop();
    }, 6000);
  }

  playConnectionChime() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.isMuted ? 0 : this.soundVolumeLevel, ctx.currentTime);
    gain.connect(ctx.destination);

    // Ascending cute bubble chime
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
      
      oscGain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
      oscGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.1 + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.3);
      
      osc.connect(oscGain);
      oscGain.connect(gain);
      
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.4);
    });
  }

  playEndCallChime() {
    const ctx = this.initCtx();
    if (!ctx) return;

    this.stopAllSounds();

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.isMuted ? 0 : this.soundVolumeLevel, ctx.currentTime);
    gain.connect(ctx.destination);

    // Descending gentle call-ended chime
    const notes = [880, 783.99, 659.25, 523.25]; // A5, G5, E5, C5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      oscGain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      oscGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

      osc.connect(oscGain);
      oscGain.connect(gain);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.5);
    });
  }

  playConfettiChime() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.isMuted ? 0 : this.soundVolumeLevel * 0.7, ctx.currentTime);
    gain.connect(ctx.destination);

    // Sparkling high pitched magic sweep
    for (let i = 0; i < 12; i++) {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const randomFreq = 1500 + Math.random() * 2000;
      const delay = i * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(randomFreq - 500, ctx.currentTime + delay + 0.2);

      oscGain.gain.setValueAtTime(0, ctx.currentTime + delay);
      oscGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);

      osc.connect(oscGain);
      oscGain.connect(gain);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.35);
    }
  }

  playClickSound() {
    const ctx = this.initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(this.isMuted ? 0 : this.soundVolumeLevel * 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  // --- PROCEDURAL BACKGROUND MUSIC LOOP ---

  startBackgroundMusic() {
    const ctx = this.initCtx();
    if (!ctx) return;

    this.stopBackgroundMusic();

    this.backgroundMusicGain = ctx.createGain();
    this.backgroundMusicGain.gain.setValueAtTime(this.isMuted ? 0 : this.musicVolumeLevel, ctx.currentTime);
    this.backgroundMusicGain.connect(ctx.destination);

    // Custom nursery rhyme: "Twinkle Twinkle Little Star" & "Old MacDonald" mix
    // [Frequency, Duration (beats)]
    const melody = [
      [261.63, 1], [261.63, 1], [392.00, 1], [392.00, 1], [440.00, 1], [440.00, 1], [392.00, 2], // Twinkle
      [349.23, 1], [349.23, 1], [329.63, 1], [329.63, 1], [293.66, 1], [293.66, 1], [261.63, 2],
      [392.00, 1], [392.00, 1], [349.23, 1], [349.23, 1], [329.63, 1], [329.63, 1], [293.66, 2],
      [392.00, 1], [392.00, 1], [349.23, 1], [349.23, 1], [329.63, 1], [329.63, 1], [293.66, 2],
      [261.63, 1], [261.63, 1], [392.00, 1], [392.00, 1], [440.00, 1], [440.00, 1], [392.00, 2],
      [349.23, 1], [349.23, 1], [329.63, 1], [329.63, 1], [293.66, 1], [293.66, 1], [261.63, 2]
    ];

    let currentNoteIndex = 0;
    const tempo = 120; // BPM
    const beatDuration = 60 / tempo;

    const playNextNote = () => {
      if (!this.ctx || this.ctx.state === 'suspended' || !this.backgroundMusicGain) return;

      const [freq, beats] = melody[currentNoteIndex];
      const duration = beats * beatDuration;

      // Soft instrument (Warm soft triangle wave + lowpass filter for gentle sound)
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration - 0.02);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.backgroundMusicGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);

      // Simple bass accompaniment (extremely gentle, lower octave)
      if (currentNoteIndex % 2 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(freq / 2, this.ctx.currentTime);
        
        bassGain.gain.setValueAtTime(0, this.ctx.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.05);
        bassGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration * 1.8);
        
        bassOsc.connect(bassGain);
        bassGain.connect(this.backgroundMusicGain);
        bassOsc.start();
        bassOsc.stop(this.ctx.currentTime + duration * 1.8);
      }

      currentNoteIndex = (currentNoteIndex + 1) % melody.length;
      
      this.musicIntervalId = setTimeout(playNextNote, duration * 1000);
    };

    playNextNote();
  }

  stopBackgroundMusic() {
    if (this.musicIntervalId) {
      clearTimeout(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  // --- PROCEDURAL AMBIENT SOUND GENERATORS ---

  setAmbientSound(type: 'none' | 'forest' | 'farm' | 'jungle' | 'ocean' | 'night') {
    const ctx = this.initCtx();
    if (!ctx) return;

    this.stopAmbientSounds();

    if (type === 'none') return;

    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.soundVolumeLevel * 0.15, ctx.currentTime);
    this.ambientGain.connect(ctx.destination);

    if (type === 'ocean') {
      // Procedural Ocean Waves (White noise modulated by low frequency sine wave)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);

      // Low frequency wave modulation
      const modulator = ctx.createOscillator();
      modulator.frequency.setValueAtTime(0.12, ctx.currentTime); // 8-second wave periods
      
      const modGain = ctx.createGain();
      modGain.gain.setValueAtTime(150, ctx.currentTime);

      modulator.connect(modGain);
      modGain.connect(filter.frequency);
      
      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);

      whiteNoise.start();
      modulator.start();

      this.ambientSourceNode.push(whiteNoise, modulator);
    } 
    else if (type === 'night') {
      // Gentle cricket chirps (high frequency pulsed triangle waves)
      const playCricketChirp = () => {
        if (!this.ambientGain || !this.ctx) return;
        const time = this.ctx.currentTime;
        
        // 3 mini high chirps in rapid succession
        for (let j = 0; j < 3; j++) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(4500 + Math.random() * 100, time + j * 0.08);
          
          gain.gain.setValueAtTime(0, time + j * 0.08);
          gain.gain.linearRampToValueAtTime(0.04, time + j * 0.08 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, time + j * 0.08 + 0.05);
          
          osc.connect(gain);
          gain.connect(this.ambientGain);
          
          osc.start(time + j * 0.08);
          osc.stop(time + j * 0.08 + 0.06);
        }

        const nextDelay = 1500 + Math.random() * 2000;
        this.ambientIntervalId = setTimeout(playCricketChirp, nextDelay);
      };

      playCricketChirp();
    } 
    else if (type === 'forest' || type === 'jungle') {
      // Wind rustle + distant cute birds chirping
      const playDistantBird = () => {
        if (!this.ambientGain || !this.ctx) return;
        const time = this.ctx.currentTime;
        const birdPitch = 1200 + Math.random() * 800;
        
        for (let j = 0; j < 4; j++) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(birdPitch, time + j * 0.12);
          osc.frequency.linearRampToValueAtTime(birdPitch + 200, time + j * 0.12 + 0.08);

          gain.gain.setValueAtTime(0, time + j * 0.12);
          gain.gain.linearRampToValueAtTime(0.05, time + j * 0.12 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, time + j * 0.12 + 0.1);

          osc.connect(gain);
          gain.connect(this.ambientGain);
          osc.start(time + j * 0.12);
          osc.stop(time + j * 0.12 + 0.11);
        }

        // Rustling leaf background (soft pink noise filtered)
        const nextDelay = 3000 + Math.random() * 4000;
        this.ambientIntervalId = setTimeout(playDistantBird, nextDelay);
      };

      playDistantBird();
    } 
    else if (type === 'farm') {
      // Cute rhythmic cowbells or rustling straw sounds
      const playDistantCowbell = () => {
        if (!this.ambientGain || !this.ctx) return;
        const time = this.ctx.currentTime;

        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(440, time);
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(554, time); // bright major third

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.05, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ambientGain);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + 0.45);
        osc2.stop(time + 0.45);

        const nextDelay = 4000 + Math.random() * 3000;
        this.ambientIntervalId = setTimeout(playDistantCowbell, nextDelay);
      };

      playDistantCowbell();
    }
  }

  stopAmbientSounds() {
    if (this.ambientIntervalId) {
      clearTimeout(this.ambientIntervalId);
      this.ambientIntervalId = null;
    }
    this.ambientSourceNode.forEach(n => {
      try { (n as any).stop(); } catch(e){}
    });
    this.ambientSourceNode = [];
    this.ambientGain = null;
  }

  // --- ANIMAL CALL SOUND SYNTHESIS ---

  startAnimalSound(animalId: string, voiceIntroSpeaking: boolean = false) {
    const ctx = this.initCtx();
    if (!ctx) return;

    this.stopAnimalSoundInterval();

    const playCallRepeat = () => {
      if (this.isMuted) return;
      this.synthesizeAnimalVoice(animalId);
    };

    // If introducing, give some initial pause, otherwise play immediately
    const initialDelay = voiceIntroSpeaking ? 3000 : 200;
    this.animalTimeoutId = setTimeout(() => {
      playCallRepeat();
      this.animalIntervalId = setInterval(playCallRepeat, 2400);
    }, initialDelay);
  }

  stopAnimalSoundInterval() {
    if (this.animalTimeoutId) {
      clearTimeout(this.animalTimeoutId);
      this.animalTimeoutId = null;
    }
    if (this.animalIntervalId) {
      clearInterval(this.animalIntervalId);
      this.animalIntervalId = null;
    }
    this.activeAnimalNode.forEach(osc => {
      try { osc.stop(); } catch(e){}
    });
    this.activeAnimalNode = [];
  }

  private synthesizeAnimalVoice(id: string) {
    const ctx = this.ctx;
    if (!ctx) return;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(this.soundVolumeLevel * 0.9, ctx.currentTime + 0.05);
    gain.connect(ctx.destination);

    const time = ctx.currentTime;

    switch (id) {
      case 'lion':
      case 'tiger':
      case 'jaguar':
      case 'leopard':
      case 'cheetah':
      case 'wolf':
      case 'fox':
      case 'bear': {
        // Growl/Roar: Low frequency sawtooth with high frequency FM modulation and heavy decay
        const osc = ctx.createOscillator();
        const mod = ctx.createOscillator();
        const modGain = ctx.createGain();

        osc.type = id === 'wolf' ? 'sine' : 'sawtooth';
        mod.type = 'sawtooth';

        const baseFreq = id === 'wolf' ? 150 : id === 'lion' ? 65 : id === 'bear' ? 55 : 90;
        osc.frequency.setValueAtTime(baseFreq, time);
        
        if (id === 'wolf') {
          // Beautiful high pitch howling sweep
          osc.frequency.setValueAtTime(300, time);
          osc.frequency.linearRampToValueAtTime(700, time + 0.5);
          osc.frequency.linearRampToValueAtTime(250, time + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 1.4);
        } else {
          osc.frequency.linearRampToValueAtTime(baseFreq - 20, time + 0.8);
          mod.frequency.setValueAtTime(45, time);
          modGain.gain.setValueAtTime(120, time);
          modGain.gain.linearRampToValueAtTime(10, time + 0.8);

          mod.connect(modGain);
          modGain.connect(osc.frequency);
          mod.start();
          
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9);
        }

        osc.connect(gain);
        osc.start();
        osc.stop(time + 1.5);
        if (id !== 'wolf') {
          mod.stop(time + 1.5);
        }
        break;
      }

      case 'elephant': {
        // Brass trumpet: high frequency sawtooth + highpass sweeping filter
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, time);
        // Extreme pitch fluctuation
        osc.frequency.linearRampToValueAtTime(580, time + 0.2);
        osc.frequency.linearRampToValueAtTime(400, time + 0.6);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, time);
        filter.frequency.exponentialRampToValueAtTime(3500, time + 0.2);
        filter.frequency.exponentialRampToValueAtTime(800, time + 0.6);
        filter.Q.setValueAtTime(6, time);

        gain.gain.setValueAtTime(0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

        osc.connect(filter);
        filter.connect(gain);

        osc.start();
        osc.stop(time + 0.9);
        break;
      }

      case 'pig': {
        // Grunt: Very low frequency narrow triangle wave
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, time);
        osc.frequency.linearRampToValueAtTime(65, time + 0.3);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, time);

        gain.gain.setValueAtTime(0.9, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(filter);
        filter.connect(gain);
        osc.start();
        osc.stop(time + 0.4);
        break;
      }

      case 'dog': {
        // Double bark: "Ruff ruff!"
        for (let i = 0; i < 2; i++) {
          const delay = i * 0.25;
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, time + delay);
          osc.frequency.exponentialRampToValueAtTime(110, time + delay + 0.12);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(400, time + delay);
          filter.Q.setValueAtTime(4, time + delay);

          oscGain.gain.setValueAtTime(0, time + delay);
          oscGain.gain.linearRampToValueAtTime(0.8, time + delay + 0.02);
          oscGain.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.15);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(gain);

          osc.start(time + delay);
          osc.stop(time + delay + 0.18);
        }
        break;
      }

      case 'cat': {
        // Smooth sweeping cute meow "m-eeeee-o-www"
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        
        osc.frequency.setValueAtTime(450, time);
        osc.frequency.exponentialRampToValueAtTime(750, time + 0.15);
        osc.frequency.linearRampToValueAtTime(500, time + 0.45);
        osc.frequency.exponentialRampToValueAtTime(320, time + 0.7);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.7, time + 0.15);
        gain.gain.linearRampToValueAtTime(0.4, time + 0.45);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.75);

        osc.connect(gain);
        osc.start();
        osc.stop(time + 0.8);
        break;
      }

      case 'cow':
      case 'buffalo': {
        // Moo: Low frequency triangle wave sliding down very slowly
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        const startFreq = id === 'buffalo' ? 100 : 130;
        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.linearRampToValueAtTime(startFreq - 30, time + 1.2);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, time);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.8, time + 0.2);
        gain.gain.linearRampToValueAtTime(0.6, time + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 1.3);

        osc.connect(filter);
        filter.connect(gain);
        osc.start();
        osc.stop(time + 1.4);
        break;
      }

      case 'sheep':
      case 'goat': {
        // Baaaah: Square wave with rapid pitch vibrato (LFO)
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, time);
        osc.frequency.linearRampToValueAtTime(190, time + 1.0);

        lfo.frequency.setValueAtTime(14, time); // Fast shaking vibrato
        lfoGain.gain.setValueAtTime(45, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, time);
        filter.Q.setValueAtTime(3, time);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.8, time + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 1.1);

        osc.connect(filter);
        filter.connect(gain);

        lfo.start();
        osc.start();
        lfo.stop(time + 1.2);
        osc.stop(time + 1.2);
        break;
      }

      case 'horse':
      case 'donkey':
      case 'camel':
      case 'zebra': {
        // Horse neigh: high-pitch vibrating squeal
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, time);
        osc.frequency.linearRampToValueAtTime(900, time + 0.2);
        osc.frequency.exponentialRampToValueAtTime(300, time + 0.8);

        // Heavy pitch tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(18, time);
        lfoGain.gain.setValueAtTime(80, time);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.7, time + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9);

        osc.connect(gain);
        lfo.start();
        osc.start();
        lfo.stop(time + 1.0);
        osc.stop(time + 1.0);
        break;
      }

      case 'chicken':
      case 'rooster':
      case 'duck':
      case 'goose':
      case 'turkey': {
        if (id === 'rooster') {
          // Cock-a-doodle-doo!
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(350, time);
          osc.frequency.linearRampToValueAtTime(650, time + 0.2);
          osc.frequency.setValueAtTime(650, time + 0.5);
          osc.frequency.linearRampToValueAtTime(450, time + 1.1);

          gain.gain.setValueAtTime(0.1, time);
          gain.gain.linearRampToValueAtTime(0.8, time + 0.2);
          gain.gain.linearRampToValueAtTime(0.7, time + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 1.3);

          osc.connect(gain);
          osc.start();
          osc.stop(time + 1.4);
        } else if (id === 'duck' || id === 'goose') {
          // Quack! Nasal tone
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(id === 'duck' ? 240 : 180, time);
          osc.frequency.linearRampToValueAtTime(id === 'duck' ? 180 : 140, time + 0.2);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(800, time);
          filter.Q.setValueAtTime(6, time);

          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.8, time + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

          osc.connect(filter);
          filter.connect(gain);
          osc.start();
          osc.stop(time + 0.3);
        } else {
          // Chicken cluck cluck
          for (let i = 0; i < 3; i++) {
            const delay = i * 0.18;
            const osc = ctx.createOscillator();
            const og = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, time + delay);
            osc.frequency.exponentialRampToValueAtTime(250, time + delay + 0.1);

            og.gain.setValueAtTime(0, time + delay);
            og.gain.linearRampToValueAtTime(0.6, time + delay + 0.01);
            og.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.12);

            osc.connect(og);
            og.connect(gain);
            osc.start(time + delay);
            osc.stop(time + delay + 0.14);
          }
        }
        break;
      }

      case 'owl': {
        // Hoot hoot!
        for (let i = 0; i < 2; i++) {
          const delay = i * 0.4;
          const osc = ctx.createOscillator();
          const og = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, time + delay);
          osc.frequency.linearRampToValueAtTime(280, time + delay + 0.25);

          og.gain.setValueAtTime(0, time + delay);
          og.gain.linearRampToValueAtTime(0.5, time + delay + 0.05);
          og.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.3);

          osc.connect(og);
          og.connect(gain);
          osc.start(time + delay);
          osc.stop(time + delay + 0.35);
        }
        break;
      }

      case 'parrot':
      case 'crow': {
        // Caw / Rasping bird screech
        const osc = ctx.createOscillator();
        const noise = ctx.createOscillator();
        const noiseGain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(id === 'crow' ? 380 : 600, time);
        osc.frequency.linearRampToValueAtTime(id === 'crow' ? 320 : 450, time + 0.4);

        noise.type = 'square';
        noise.frequency.setValueAtTime(45, time);
        noiseGain.gain.setValueAtTime(200, time);

        noise.connect(noiseGain);
        noiseGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.7, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

        osc.connect(gain);
        noise.start();
        osc.start();
        noise.stop(time + 0.5);
        osc.stop(time + 0.5);
        break;
      }

      case 'eagle':
      case 'falcon': {
        // Squeal / Screech
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, time);
        osc.frequency.exponentialRampToValueAtTime(2200, time + 0.15);
        osc.frequency.linearRampToValueAtTime(800, time + 0.65);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.7, time + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.7);

        osc.connect(gain);
        osc.start();
        osc.stop(time + 0.75);
        break;
      }

      case 'bird': {
        // High pitch sweet chirping
        for (let i = 0; i < 4; i++) {
          const delay = i * 0.12;
          const osc = ctx.createOscillator();
          const og = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(1800, time + delay);
          osc.frequency.exponentialRampToValueAtTime(2800, time + delay + 0.08);

          og.gain.setValueAtTime(0, time + delay);
          og.gain.linearRampToValueAtTime(0.4, time + delay + 0.01);
          og.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.1);

          osc.connect(og);
          og.connect(gain);
          osc.start(time + delay);
          osc.stop(time + delay + 0.11);
        }
        break;
      }

      case 'penguin': {
        // High frequency vibrating honks
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, time);
        osc.frequency.linearRampToValueAtTime(480, time + 0.3);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(24, time);
        lfoGain.gain.setValueAtTime(80, time);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.6, time + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(gain);
        lfo.start();
        osc.start();
        lfo.stop(time + 0.4);
        osc.stop(time + 0.4);
        break;
      }

      case 'frog': {
        // Ribbit! Croak
        for (let i = 0; i < 2; i++) {
          const delay = i * 0.2;
          const osc = ctx.createOscillator();
          const og = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(140, time + delay);

          // fast tremolo LFO inside
          const tremolo = ctx.createOscillator();
          const tremoloGain = ctx.createGain();
          tremolo.frequency.setValueAtTime(40, time);
          tremoloGain.gain.setValueAtTime(60, time);
          tremolo.connect(tremoloGain);
          tremoloGain.connect(osc.frequency);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(400, time + delay);

          og.gain.setValueAtTime(0, time + delay);
          og.gain.linearRampToValueAtTime(0.6, time + delay + 0.02);
          og.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.16);

          osc.connect(filter);
          filter.connect(og);
          og.connect(gain);
          
          tremolo.start(time + delay);
          osc.start(time + delay);
          tremolo.stop(time + delay + 0.18);
          osc.stop(time + delay + 0.18);
        }
        break;
      }

      case 'bee': {
        // Bzzzz high frequency saw buzz
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, time);

        // Small random drift
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(6, time);
        lfoGain.gain.setValueAtTime(8, time);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, time);
        filter.Q.setValueAtTime(4, time);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.8, time + 0.1);
        gain.gain.linearRampToValueAtTime(0.7, time + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.95);

        osc.connect(filter);
        filter.connect(gain);
        
        lfo.start();
        osc.start();
        lfo.stop(time + 1.0);
        osc.stop(time + 1.0);
        break;
      }

      case 'butterfly': {
        // Cute magical fairy chime sound
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, time);
        osc.frequency.exponentialRampToValueAtTime(1760, time + 0.4);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.4, time + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

        osc.connect(gain);
        osc.start();
        osc.stop(time + 0.55);
        break;
      }

      case 'cricket': {
        // Sharp high-pitched rhythmic chirping (4.5kHz)
        for (let i = 0; i < 4; i++) {
          const delay = i * 0.08;
          const osc = ctx.createOscillator();
          const og = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(4200, time + delay);

          og.gain.setValueAtTime(0, time + delay);
          og.gain.linearRampToValueAtTime(0.3, time + delay + 0.01);
          og.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.05);

          osc.connect(og);
          og.connect(gain);
          osc.start(time + delay);
          osc.stop(time + delay + 0.06);
        }
        break;
      }

      case 'panda':
      case 'koala':
      case 'kangaroo': {
        // Soft squeaking/whimpering chimes (cute animal noises)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550, time);
        osc.frequency.exponentialRampToValueAtTime(350, time + 0.4);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.5, time + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

        osc.connect(gain);
        osc.start();
        osc.stop(time + 0.5);
        break;
      }

      case 'dolphin': {
        // Dolphin click and whistles (extremely high-pitched FM swoops)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, time);
        osc.frequency.exponentialRampToValueAtTime(3200, time + 0.35);
        osc.frequency.linearRampToValueAtTime(2000, time + 0.6);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.6, time + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.65);

        osc.connect(gain);
        osc.start();
        osc.stop(time + 0.7);
        break;
      }

      case 'whale': {
        // Ethereal sweeping whale song
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, time);
        osc.frequency.linearRampToValueAtTime(380, time + 0.6);
        osc.frequency.linearRampToValueAtTime(240, time + 1.4);

        // Slow wave pitch LFO
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(5, time);
        lfoGain.gain.setValueAtTime(15, time);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, time);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.7, time + 0.4);
        gain.gain.linearRampToValueAtTime(0.5, time + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 1.7);

        osc.connect(filter);
        filter.connect(gain);
        lfo.start();
        osc.start();
        lfo.stop(time + 1.8);
        osc.stop(time + 1.8);
        break;
      }

      case 'seal': {
        // Barking honk "Ark! Ark! Ark!"
        for (let i = 0; i < 3; i++) {
          const delay = i * 0.22;
          const osc = ctx.createOscillator();
          const og = ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, time + delay);
          osc.frequency.exponentialRampToValueAtTime(140, time + delay + 0.15);

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(450, time + delay);

          og.gain.setValueAtTime(0, time + delay);
          og.gain.linearRampToValueAtTime(0.7, time + delay + 0.02);
          og.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.18);

          osc.connect(filter);
          filter.connect(og);
          og.connect(gain);

          osc.start(time + delay);
          osc.stop(time + delay + 0.2);
        }
        break;
      }

      case 'snake': {
        // Hissing white noise!
        const bufferSize = ctx.sampleRate * 1.0;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const source = ctx.createBufferSource();
        source.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(6000, time);
        filter.Q.setValueAtTime(2, time);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.6, time + 0.1);
        gain.gain.linearRampToValueAtTime(0.5, time + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.9);

        source.connect(filter);
        filter.connect(gain);
        source.start();
        source.stop(time + 1.0);
        break;
      }

      default: {
        // Default generic cute chime animal call fallback
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, time);
        osc.frequency.exponentialRampToValueAtTime(880, time + 0.3);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.linearRampToValueAtTime(0.6, time + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

        osc.connect(gain);
        osc.start();
        osc.stop(time + 0.5);
      }
    }
  }

  stopAllSounds() {
    this.stopAnimalSoundInterval();
    this.stopAmbientSounds();
  }
}

export const audio = new AudioEngine();
