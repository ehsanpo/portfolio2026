
// Singleton pattern to manage AudioContext and AnalyserNode
class AudioContextManager {
    private static instance: AudioContextManager;
    private audioContext: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private source: MediaElementAudioSourceNode | null = null;

    private constructor() { }

    public static getInstance(): AudioContextManager {
        if (!AudioContextManager.instance) {
            AudioContextManager.instance = new AudioContextManager();
        }
        return AudioContextManager.instance;
    }

    public getContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.audioContext;
    }

    public getAnalyser(): AnalyserNode {
        if (!this.analyser) {
            const ctx = this.getContext();
            this.analyser = ctx.createAnalyser();
            this.analyser.fftSize = 256; // Configurable quality
        }
        return this.analyser;
    }

    public connectSource(audioElement: HTMLAudioElement) {
        if (this.source) return; // Already connected

        const ctx = this.getContext();
        const analyser = this.getAnalyser();

        try {
            this.source = ctx.createMediaElementSource(audioElement);
            this.source.connect(analyser);
            analyser.connect(ctx.destination);
        } catch (e) {
            console.warn("Audio source connection failed (likely already connected):", e);
        }
    }

    public resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

export const audioManager = AudioContextManager.getInstance();
