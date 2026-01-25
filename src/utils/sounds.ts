export const generateSound = (type: "duck" | "cat" | "click" | "fire") => {
	const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

	if (type === "duck") {
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		const frequency = 400 + Math.random() * 400;
		oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(
			frequency * 0.7,
			audioContext.currentTime + 0.05
		);
		oscillator.frequency.exponentialRampToValueAtTime(
			frequency * 0.5,
			audioContext.currentTime + 0.1
		);

		oscillator.type = "square";

		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + 0.01);
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	} else if (type === "cat") {
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		const delayNode = audioContext.createDelay(1.0);
		const feedbackGain = audioContext.createGain();
		const filterNode = audioContext.createBiquadFilter();

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		gainNode.connect(delayNode);
		delayNode.connect(feedbackGain);
		feedbackGain.connect(filterNode);
		filterNode.connect(delayNode);
		filterNode.connect(audioContext.destination);

		delayNode.delayTime.setValueAtTime(0.15, audioContext.currentTime);
		feedbackGain.gain.setValueAtTime(0.25, audioContext.currentTime);
		filterNode.frequency.setValueAtTime(2000, audioContext.currentTime);
		filterNode.Q.setValueAtTime(1, audioContext.currentTime);

		
		const startFreq = 900 + Math.random() * 300;
		const midFreq = 600 + Math.random() * 200;
		const endFreq = 250 + Math.random() * 150;

		oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(midFreq, audioContext.currentTime + 0.3);
		oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + 0.8);

		oscillator.type = "sawtooth";

		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.05);
		gainNode.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + 0.6);
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.2);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 1.5);
	} else if (type === "click") {
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		const frequency = 800 + Math.random() * 400;
		oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
		oscillator.frequency.exponentialRampToValueAtTime(
			frequency * 1.5,
			audioContext.currentTime + 0.005
		);
		oscillator.frequency.exponentialRampToValueAtTime(
			frequency * 0.3,
			audioContext.currentTime + 0.03
		);

		oscillator.type = "triangle";

		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.002);
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.04);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.05);
	} else if (type === "fire") {
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		const filterNode = audioContext.createBiquadFilter();

		oscillator.connect(filterNode);
		filterNode.connect(gainNode);
		gainNode.connect(audioContext.destination);

		
		const baseFreq = 80 + Math.random() * 120;
		oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
		oscillator.frequency.linearRampToValueAtTime(
			baseFreq + Math.random() * 100,
			audioContext.currentTime + 0.1
		);

		oscillator.type = "sawtooth";

		
		filterNode.type = "bandpass";
		filterNode.frequency.setValueAtTime(400 + Math.random() * 800, audioContext.currentTime);
		filterNode.Q.setValueAtTime(0.5, audioContext.currentTime);

		gainNode.gain.setValueAtTime(0, audioContext.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 0.01);
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.2);
	}
};
