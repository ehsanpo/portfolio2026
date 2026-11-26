// Museum of Motion — 8 exhibits unified barrel export
export {
	textRoll,
	underlineSweep,
	jelly,
	imageZoom,
	directionalFill,
	prefersReducedMotion,
} from "./hover";
export type {
	Teardown,
	TextRollOptions,
	UnderlineSweepOptions,
	JellyOptions,
	ImageZoomOptions,
	DirectionalFillOptions,
} from "./hover";

export { Unveil, initUnveilElements } from "./Unveil";
export type {
	UnveilProps,
	UnveilDirection,
	UnveilVariant,
	InitUnveilOptions,
} from "./Unveil";

export { Reveal } from "./Reveal";
export type { RevealProps } from "./Reveal";

export { Marquee } from "./Marquee";
export type { MarqueeProps } from "./Marquee";

export { Pulse } from "./Pulse";
export type { PulseProps } from "./Pulse";

export { stackCards, initSelectedWorkStack } from "../work/stackCards";
export type { StackCardsOptions } from "../work/stackCards";

export { cursorFollower, hoverPreview, spotlight, supportsFinePointer } from "./cursor";
export type {
	CursorFollowerOptions,
	HoverPreviewOptions,
	SpotlightOptions,
} from "./cursor";

export { CursorFollower, CursorSpotlight } from "./CursorFollower";
export type { CursorFollowerProps, CursorSpotlightProps } from "./CursorFollower";

export { CardStackDeck } from "./CardStackDeck";
export type { CardStackDeckProps, CardStackItem } from "./CardStackDeck";
