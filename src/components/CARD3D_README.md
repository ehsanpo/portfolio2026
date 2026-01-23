# 3D Card Component with Tilt Effect

A premium React component featuring realistic 3D perspective and mouse-tracking tilt effects.

## Features

✨ **3D Perspective**: Cards rotate in 3D space based on mouse position  
🎨 **Dynamic Glow**: Radial glow effect follows your cursor  
💎 **Shine Effect**: Subtle light reflection overlay  
🎯 **Customizable**: Adjustable tilt intensity and glow colors  
⚡ **Smooth Animations**: Fluid transitions with cubic-bezier easing  
📱 **Responsive**: Works beautifully on all screen sizes  

## Usage

### Basic Example

```tsx
import Card3D from './components/Card3D';

function App() {
  return (
    <Card3D>
      <div style={{ padding: '2rem', background: '#1a1a2e', borderRadius: '24px' }}>
        <h3>Your Content Here</h3>
        <p>This card has amazing 3D effects!</p>
      </div>
    </Card3D>
  );
}
```

### Advanced Example with Props

```tsx
<Card3D 
  intensity={25}                        // Tilt intensity (default: 20)
  glowColor="rgba(147, 51, 234, 0.4)"  // Glow color (default: purple)
  shine={true}                         // Enable shine effect (default: true)
  className="my-custom-class"          // Additional CSS classes
>
  <YourContent />
</Card3D>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Content to display inside the card |
| `className` | `string` | `''` | Additional CSS classes |
| `intensity` | `number` | `20` | Tilt angle intensity (0-50 recommended) |
| `glowColor` | `string` | `'rgba(147, 51, 234, 0.3)'` | Color of the dynamic glow effect |
| `shine` | `boolean` | `true` | Enable/disable shine overlay |

## Demo Component

Check out `Card3DExample.tsx` for a complete showcase with three different card variants demonstrating various intensities and color schemes.

To use the demo:
```tsx
import Card3DExample from './components/Card3DExample';

function App() {
  return <Card3DExample />;
}
```

## How It Works

1. **Mouse Tracking**: Calculates mouse position relative to card center
2. **3D Transform**: Applies `rotateX` and `rotateY` based on mouse offset
3. **Perspective**: Uses `perspective(1000px)` for realistic depth
4. **Dynamic Effects**: Updates glow position and shine angle in real-time
5. **Smooth Transitions**: Different easing for hover vs. leave states

## Customization Tips

### Adjust Tilt Sensitivity
- Low (10-15): Subtle, elegant movement
- Medium (20-25): Balanced, noticeable effect
- High (30-40): Dramatic, gaming-style tilt

### Custom Color Schemes
```tsx
// Purple variant
<Card3D glowColor="rgba(147, 51, 234, 0.4)" />

// Cyan variant
<Card3D glowColor="rgba(6, 182, 212, 0.4)" />

// Pink variant
<Card3D glowColor="rgba(236, 72, 153, 0.4)" />

// Custom
<Card3D glowColor="rgba(255, 100, 50, 0.5)" />
```

## Browser Compatibility

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ All modern browsers with CSS 3D transform support

## Performance

The component is optimized with:
- `will-change: transform` for GPU acceleration
- Efficient state updates (only transforms on mouse move)
- Conditional rendering of effects (only when hovered)
- Pointer events disabled on overlays

Enjoy your stunning 3D cards! 🎨✨
