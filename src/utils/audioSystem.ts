// Singleton pattern to manage AudioContext, DynamicsCompressor, Filters, and AnalyserNode
class AudioContextManager {
    private static instance: AudioContextManager;
    private audioContext: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private source: MediaElementAudioSourceNode | null = null;

    // Real audio DSP mastering nodes
    private lowCutFilter: BiquadFilterNode | null = null;
    private highCutFilter: BiquadFilterNode | null = null;
    private compressor: DynamicsCompressorNode | null = null;
    private isBypassed: boolean = false;

    // Direct bypass routing gain nodes or direct re-connections
    // Flow when active: source -> lowCut -> highCut -> compressor -> analyser -> destination
    // Flow when bypassed: source -> analyser -> destination

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

    private initDspNodes() {
        if (this.compressor && this.lowCutFilter && this.highCutFilter) return;
        const ctx = this.getContext();

        // Highpass filter (Low-cut)
        this.lowCutFilter = ctx.createBiquadFilter();
        this.lowCutFilter.type = "highpass";
        this.lowCutFilter.frequency.setValueAtTime(30, ctx.currentTime);
        this.lowCutFilter.Q.setValueAtTime(0.707, ctx.currentTime);

        // Lowpass filter (High-cut)
        this.highCutFilter = ctx.createBiquadFilter();
        this.highCutFilter.type = "lowpass";
        this.highCutFilter.frequency.setValueAtTime(22000, ctx.currentTime);
        this.highCutFilter.Q.setValueAtTime(0.707, ctx.currentTime);

        // Dynamics Compressor
        this.compressor = ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-18, ctx.currentTime);
        this.compressor.knee.setValueAtTime(12, ctx.currentTime);
        this.compressor.ratio.setValueAtTime(4, ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.003, ctx.currentTime);
        this.compressor.release.setValueAtTime(0.25, ctx.currentTime);
    }

    private updateRouting() {
        if (!this.source) return;
        const ctx = this.getContext();
        const analyser = this.getAnalyser();
        this.initDspNodes();

        try {
            // Disconnect source, filters, compressor
            this.source.disconnect();
            if (this.lowCutFilter) this.lowCutFilter.disconnect();
            if (this.highCutFilter) this.highCutFilter.disconnect();
            if (this.compressor) this.compressor.disconnect();
            analyser.disconnect();

            if (this.isBypassed) {
                // Bypass: source -> analyser -> destination
                this.source.connect(analyser);
                analyser.connect(ctx.destination);
            } else {
                // Active mastering chain: source -> lowCut -> highCut -> compressor -> analyser -> destination
                if (this.lowCutFilter && this.highCutFilter && this.compressor) {
                    this.source.connect(this.lowCutFilter);
                    this.lowCutFilter.connect(this.highCutFilter);
                    this.highCutFilter.connect(this.compressor);
                    this.compressor.connect(analyser);
                    analyser.connect(ctx.destination);
                } else {
                    this.source.connect(analyser);
                    analyser.connect(ctx.destination);
                }
            }
        } catch (e) {
            console.warn("Routing reconfiguration error:", e);
        }
    }

    public connectSource(audioElement: HTMLAudioElement) {
        if (this.source) return; // Already connected

        const ctx = this.getContext();
        const analyser = this.getAnalyser();
        this.initDspNodes();

        try {
            this.source = ctx.createMediaElementSource(audioElement);
            this.updateRouting();
        } catch (e) {
            console.warn("Audio source connection failed (likely already connected):", e);
        }
    }

    public setMasteringBypass(bypass: boolean) {
        this.isBypassed = bypass;
        this.updateRouting();
    }

    public isMasteringBypassed(): boolean {
        return this.isBypassed;
    }

    public setCompressorParams(threshold: number, ratio: number, attack: number, release: number, knee: number = 12) {
        this.initDspNodes();
        if (!this.compressor) return;
        const ctx = this.getContext();
        const now = ctx.currentTime;

        // Smooth parameter transitions
        this.compressor.threshold.setTargetAtTime(Math.max(-100, Math.min(0, threshold)), now, 0.02);
        this.compressor.ratio.setTargetAtTime(Math.max(1, Math.min(20, ratio)), now, 0.02);
        this.compressor.attack.setTargetAtTime(Math.max(0, Math.min(1, attack)), now, 0.02);
        this.compressor.release.setTargetAtTime(Math.max(0, Math.min(1, release)), now, 0.02);
        if (knee !== undefined) {
            this.compressor.knee.setTargetAtTime(Math.max(0, Math.min(40, knee)), now, 0.02);
        }
    }

    public setFilterParams(lowCutFreq: number, highCutFreq: number) {
        this.initDspNodes();
        const ctx = this.getContext();
        const now = ctx.currentTime;

        if (this.lowCutFilter) {
            this.lowCutFilter.frequency.setTargetAtTime(Math.max(10, Math.min(1000, lowCutFreq)), now, 0.02);
        }
        if (this.highCutFilter) {
            this.highCutFilter.frequency.setTargetAtTime(Math.max(1000, Math.min(24000, highCutFreq)), now, 0.02);
        }
    }

    public getDynamicsCompressor(): DynamicsCompressorNode | null {
        this.initDspNodes();
        return this.compressor;
    }

    public getReduction(): number {
        if (!this.compressor || this.isBypassed) return 0;
        return this.compressor.reduction; // Returns float dB (e.g. -3.5 or 0)
    }

    public resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

export const audioManager = AudioContextManager.getInstance();
