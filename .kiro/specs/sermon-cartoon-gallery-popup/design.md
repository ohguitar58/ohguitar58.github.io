# Sermon Cartoon Gallery Pop-up Modal - Design Document

## Overview

The Sermon Cartoon Gallery Pop-up Modal is an interactive overlay component that displays sermon cartoon images from multiple dated sermon folders. The modal integrates seamlessly with the existing projects.html page and provides an intuitive interface for browsing, filtering, and navigating through cartoon galleries. The design prioritizes accessibility, performance, and responsive functionality across all device types while maintaining visual coherence with the existing website design.

### Design Goals

1. **User-Centric Navigation**: Provide intuitive controls for selecting sermon series and navigating between images
2. **Responsive Excellence**: Ensure optimal viewing experience on desktop, tablet, and mobile devices
3. **Accessibility First**: Implement ARIA attributes, keyboard navigation, and focus management for all users
4. **Performance Optimization**: Lazy-load images and manage memory efficiently to maintain smooth performance
5. **Visual Integration**: Maintain consistent styling with the existing website while ensuring the modal stands out appropriately
6. **Error Resilience**: Gracefully handle missing files, network errors, and edge cases

---

## Architecture

### Component Structure

The Gallery Modal consists of five primary components:

```
Gallery Modal
├── Overlay Backdrop
├── Modal Container
│   ├── Modal Header
│   │   ├── Title
│   │   └── Close Button
│   ├── Series Selector Panel
│   │   └── Series Option List
│   ├── Image Viewer Area
│   │   ├── Loading Indicator
│   │   ├── Image Display
│   │   ├── Image Counter
│   │   └── Error Message Container
│   └── Navigation Controls
│       ├── Previous Button
│       └── Next Button
```

### Data Flow

```
User clicks "Open Gallery"
    ↓
Modal renders with overlay
    ↓
Initialize sermon folders list
    ↓
Pre-select last folder (7_5_26)
    ↓
Load image list for selected folder
    ↓
Display first image
    ↓
User interactions:
  - Select different series → Load new images
  - Click Previous/Next → Display adjacent image
  - Press arrow keys → Navigate images
  - Press Escape → Close modal
```

### State Management

The modal maintains the following state:

- **activeSermonFolder**: Currently selected sermon folder (string, e.g., "5_4_26")
- **availableSermonFolders**: Array of all sermon folders available
- **currentImageIndex**: Index of currently displayed image (0-based)
- **imageList**: Array of image filenames in active folder
- **isLoading**: Boolean indicating if images are being loaded
- **error**: Error message if loading failed (null if none)

---

## Components and Interfaces

### 1. Overlay Backdrop

**Purpose**: Dims the background and provides a clickable area to close the modal

**Structure**:
```html
<div class="sermon-gallery-overlay" role="presentation"></div>
```

**Styling**:
- Background: `rgba(0, 0, 0, 0.7)` (semi-transparent black)
- Full viewport coverage: `position: fixed`, `inset: 0`
- Click handler: Closes modal when clicked outside modal container
- Z-index: Higher than page content, lower than modal container

**Accessibility**: 
- `role="presentation"` indicates it's decorative, not functional
- Focus is prevented from landing on the overlay itself

### 2. Modal Container

**Purpose**: Central container holding all gallery content

**Structure**:
```html
<div class="sermon-gallery-modal" role="dialog" aria-labelledby="gallery-title" aria-modal="true">
  <!-- Modal content -->
</div>
```

**Styling**:
- Position: `position: fixed`, centered on viewport
- Dimensions: Responsive based on breakpoints
- Background: Dark with border radius for visual polish
- Box shadow for depth
- Z-index: Higher than overlay
- Smooth scroll for overflow content

**Accessibility**:
- `role="dialog"` identifies it as a modal dialog
- `aria-modal="true"` indicates focus trap is active
- `aria-labelledby="gallery-title"` links to modal heading
- Focus trap: Only allow tab focus on interactive elements within modal

### 3. Modal Header

**Purpose**: Displays gallery title and close button

**Structure**:
```html
<div class="gallery-header">
  <h2 id="gallery-title">Sermon Cartoon Gallery</h2>
  <button class="close-button" aria-label="Close gallery" title="Close (Esc)">
    <span>&times;</span>
  </button>
</div>
```

**Styling**:
- Flexbox layout: space-between alignment
- Padding: Consistent with design system
- Border-bottom: Subtle separator line
- Background: Slightly darker than modal body

**Accessibility**:
- Heading uses id for aria-labelledby reference
- Close button has aria-label for screen readers
- Tooltip shows keyboard shortcut

### 4. Series Selector Panel

**Purpose**: Allows users to switch between sermon date folders

**Structure**:
```html
<div class="series-selector">
  <label for="series-select">Select Sermon Series:</label>
  <select id="series-select" aria-label="Sermon series selector">
    <option value="5_4_26">May 4, 2026</option>
    <!-- ... more options ... -->
  </select>
</div>
```

**Alternative Structure** (Button Group):
```html
<div class="series-selector" role="group" aria-label="Sermon series selector">
  <div class="series-buttons">
    <button class="series-button active" data-folder="5_4_26" aria-selected="true">
      May 4
    </button>
    <!-- ... more buttons ... -->
  </div>
</div>
```

**Styling**:
- Flex layout with wrapping
- Buttons/options with hover and active states
- Active indicator (bold, highlight, or different background)
- Responsive: Stack on mobile, grid/inline on desktop

**Accessibility**:
- Labels or aria-labels on all interactive elements
- `aria-selected="true"` on active selection
- Tab navigation between options
- Keyboard arrow keys to navigate (native select behavior or custom)

### 5. Image Viewer Area

**Purpose**: Displays the currently selected cartoon image with metadata

**Structure**:
```html
<div class="image-viewer">
  <div class="image-counter" aria-live="polite">
    1 of 5
  </div>
  
  <div class="image-container">
    <img 
      src="images/sermons/5_4_26/1.jpg" 
      alt="Sermon cartoon 1 from May 4, 2026 series"
      class="cartoon-image"
    />
  </div>
  
  <div class="loading-spinner" hidden role="status" aria-live="polite">
    Loading image...
  </div>
  
  <div class="error-message" hidden role="alert">
    Image could not be loaded. Please try selecting another image.
  </div>
</div>
```

**Styling**:
- Flexbox column layout
- Image: `max-width: 100%`, `height: auto` to maintain aspect ratio
- Container: Centered, with appropriate padding
- Counter: Positioned above image, subtle styling
- Loading spinner: CSS animation, centered
- Error message: Alert-style styling (red/orange text)

**Accessibility**:
- Every image has descriptive alt text
- Counter uses `aria-live="polite"` for screen reader updates
- Loading and error messages use `role="status"` and `role="alert"`
- Error message uses `role="alert"` for urgent notification

### 6. Navigation Controls

**Purpose**: Provides Previous/Next buttons for image navigation

**Structure**:
```html
<div class="navigation-controls" role="group" aria-label="Image navigation">
  <button 
    class="nav-button prev-button" 
    aria-label="Previous image"
    title="Previous (Left Arrow)"
  >
    ← Previous
  </button>
  
  <button 
    class="nav-button next-button" 
    aria-label="Next image"
    title="Next (Right Arrow)"
  >
    Next →
  </button>
</div>
```

**Styling**:
- Flexbox layout: space between or centered
- Buttons: Consistent size, hover states, disabled states (grayed out)
- Buttons: Touch-friendly size (44×44px minimum)
- Icons: Optional arrow icons in addition to text

**Accessibility**:
- Descriptive aria-labels
- Disabled buttons when at start/end (visual and functional)
- Tooltips show keyboard shortcuts
- Clear focus indicators

---

## Data Models

### Sermon Folder Structure

```javascript
// Available sermon folders (hardcoded or from manifest)
const SERMON_FOLDERS = [
  "5_4_26",
  "5_10_26",
  "5_17_26",
  "5_24_26",
  "5_31_26",
  "6_7_26",
  "6_21_26",
  "6_28_26",
  "7_5_26"
];

// Folder to human-readable date mapping
const FOLDER_DATES = {
  "5_4_26": "May 4, 2026",
  "5_10_26": "May 10, 2026",
  "5_17_26": "May 17, 2026",
  "5_24_26": "May 24, 2026",
  "5_31_26": "May 31, 2026",
  "6_7_26": "June 7, 2026",
  "6_21_26": "June 21, 2026",
  "6_28_26": "June 28, 2026",
  "7_5_26": "July 5, 2026"
};
```

### Image Metadata

```javascript
{
  filename: "1.jpg",
  folder: "5_4_26",
  index: 0,
  totalInFolder: 5,
  path: "images/sermons/5_4_26/1.jpg",
  alt: "Sermon cartoon 1 from May 4, 2026 series"
}
```

### Modal State Object

```javascript
{
  isOpen: boolean,
  activeFolder: string,
  currentImageIndex: number,
  imageList: string[],
  isLoading: boolean,
  error: string | null,
  availableFolders: string[]
}
```

---

## Error Handling

### Error Scenarios and Responses

1. **Missing Image File**
   - Scenario: Image path doesn't exist or file is corrupted
   - Response: Display error message, allow user to navigate to next image
   - Message: "Image could not be loaded. This image may be missing or corrupted."

2. **Empty Sermon Folder**
   - Scenario: Folder contains no .jpg or .png files
   - Response: Skip folder in selector or show disabled state with tooltip
   - Fallback: Show message "No images available for this series"

3. **Network Error**
   - Scenario: Images fail to load due to network issues
   - Response: Display retry button, keep modal open
   - Message: "Failed to load images. Please check your connection and try again."

4. **Corrupted Folder List**
   - Scenario: Unable to determine available folders
   - Response: Show all known folders, skip any that fail
   - Fallback: Allow manual retry

### Validation

- File extension validation: Only display `.jpg` and `.png` files
- Filename validation: Ensure filenames don't contain invalid characters
- Folder validation: Verify folder exists before attempting to load images
- Path construction: Use template strings with proper path separators

---

## Correctness Properties

To ensure the gallery modal functions correctly across all usage scenarios, the following properties must hold true:

### Property 1: Series Selection Persistence

**For any** selected sermon folder, switching to a different folder and returning to the first folder SHALL display the same images in the same order as the first selection.

**Validates: Requirements 2.2, 2.3**

### Property 2: Image Navigation Boundaries

**For any** sermon folder with N images, navigating past the last image with the Next button SHALL not display images from other folders, and navigating before the first image with the Previous button SHALL not show content from other folders.

**Validates: Requirements 4.4, 4.5**

### Property 3: Image Counter Accuracy

**For any** image currently displayed in the viewer, the displayed counter SHALL accurately reflect the current position in the series (e.g., "X of Y" where X is current 1-based index and Y is total count).

**Validates: Requirements 3.6**

### Property 4: Keyboard Navigation Equivalence

**For any** image transition via mouse navigation (clicking Next/Previous buttons), the same transition SHALL occur when using keyboard arrow keys (Left/Right arrows).

**Validates: Requirements 7.1, 7.2**

### Property 5: Modal Close Consistency

**For any** method of closing the modal (Escape key, clicking close button, clicking overlay), the modal SHALL close, focus SHALL return to the projects.html trigger element, and the Gallery Modal state SHALL be reset for the next opening.

**Validates: Requirements 1.4, 7.3**

### Property 6: Responsive Layout Preservation

**For any** viewport size change (window resize), the modal layout SHALL reflow smoothly without horizontal scrolling, and all interactive elements SHALL remain tappable/clickable with minimum 44×44px touch targets on mobile devices.

**Validates: Requirements 5.5, 5.6**

### Property 7: Image Aspect Ratio Maintenance

**For any** cartoon image displayed in the viewer, the rendered image SHALL maintain its original aspect ratio, regardless of the image's source dimensions or the current viewport size.

**Validates: Requirements 3.5**

### Property 8: Memory Cleanup on Folder Switch

**For any** switch from folder A to folder B, all image elements, data, and event listeners associated with folder A SHALL be unloaded/garbage collected before folder B's images are fully loaded.

**Validates: Requirements 6.2**

---

## Testing Strategy

### Unit Tests (Example-Based)

These tests verify specific, concrete behaviors with predefined examples:

1. **Gallery Opening/Closing**
   - Test clicking the trigger button opens the modal
   - Test clicking close button closes the modal
   - Test pressing Escape closes the modal
   - Test clicking overlay closes the modal

2. **Series Selection**
   - Test each sermon folder can be selected
   - Test correct images load for each folder
   - Test selected folder is visually highlighted

3. **Image Navigation**
   - Test Previous/Next buttons navigate correctly
   - Test Previous button is disabled on first image
   - Test Next button is disabled on last image
   - Test image counter updates correctly

4. **Error Handling**
   - Test error message displays for missing images
   - Test error message displays for empty folders
   - Test retry functionality works

5. **Keyboard Navigation**
   - Test Left arrow key navigates previous
   - Test Right arrow key navigates next
   - Test Escape closes modal
   - Test Tab focuses only modal elements

6. **Accessibility**
   - Test modal has role="dialog"
   - Test images have descriptive alt text
   - Test focus trap prevents focus outside modal
   - Test aria-labels on all buttons
   - Test aria-live updates for counter

### Integration Tests

These tests verify the gallery works with the rest of the website:

1. **Integration with projects.html**
   - Verify trigger button links to gallery
   - Verify focus returns to trigger after close
   - Verify page remains scrollable while modal is open

2. **Image Loading from Filesystem**
   - Verify images load from correct paths
   - Verify loading indicator shows during load
   - Verify only .jpg and .png files are loaded

3. **Responsive Behavior**
   - Test layout on various viewport sizes
   - Test images display correctly on mobile
   - Test touch targets are appropriately sized

### Accessibility Verification

1. **Screen Reader Testing**
   - Test modal title is announced
   - Test image counter is announced with live region
   - Test error messages are announced
   - Test all buttons have accessible labels

2. **Keyboard Navigation Testing**
   - Test all functionality accessible via keyboard
   - Test focus order is logical
   - Test no keyboard traps
   - Test Escape key works

3. **Visual Testing**
   - Test sufficient color contrast for text
   - Test focus indicators are visible
   - Test disabled buttons are visually distinct
   - Test hover states are clear

### Browser Compatibility Testing

Test in the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Verify:
- Layout renders correctly
- Images load properly
- Keyboard navigation works
- No console errors or warnings

---

## Performance Considerations

### Image Loading Strategy

1. **Lazy Loading**: Images load only when a folder is selected, not on modal open
2. **On-Demand Loading**: Only load the currently displayed image initially
3. **Preloading**: Optional preload of next/previous images for smooth navigation
4. **Format Optimization**: Consider serving WebP with JPEG fallback for newer browsers

### Memory Management

1. **Image Cleanup**: Remove previous image from DOM when navigating
2. **Event Listener Cleanup**: Remove listeners when modal closes or folder changes
3. **State Cleanup**: Clear imageList array when switching folders
4. **Cache Strategy**: Consider caching recently viewed folders for faster re-open

### Performance Targets

- Modal open-to-first-image: < 500ms
- Image navigation (Previous/Next): < 100ms
- Folder switch: < 1 second
- Modal close: < 50ms

---

## File Organization and Module Structure

### JavaScript Module Structure

```
js/
├── sermon-gallery.js (Main module, exports SermonGallery class)
├── sermon-gallery-state.js (State management)
├── sermon-gallery-ui.js (DOM manipulation and rendering)
└── sermon-gallery-events.js (Event handling and keyboard navigation)
```

### Recommended Structure

```javascript
// sermon-gallery.js - Main export
class SermonGallery {
  constructor(triggerSelector, containerSelector) {
    // Initialize
  }
  
  open() { }
  close() { }
  selectFolder(folder) { }
  nextImage() { }
  previousImage() { }
}

// sermon-gallery-state.js - State management
class GalleryState {
  constructor() {
    this.state = { /* initial state */ };
  }
  
  getState() { }
  setState(updates) { }
  updateFolder(folder) { }
  updateImageIndex(index) { }
}

// sermon-gallery-ui.js - DOM operations
class GalleryUI {
  constructor(modalElement) { }
  render(state) { }
  showImage(imagePath, alt) { }
  showLoading() { }
  showError(message) { }
  updateCounter(current, total) { }
  updateFolderSelection(folder) { }
}

// sermon-gallery-events.js - Event handlers
class GalleryEvents {
  constructor(gallery, ui) { }
  attachEventListeners() { }
  handleKeydown(event) { }
  handleFolderSelect(folder) { }
  handleNavigation(direction) { }
}

// Usage:
const gallery = new SermonGallery('#sermon-trigger', '#gallery-modal');
gallery.init();
```

### CSS Module Structure

```
css/
├── sermon-gallery-modal.css (Main modal styles)
├── sermon-gallery-responsive.css (Breakpoint styles)
└── sermon-gallery-accessibility.css (Focus, ARIA-live, etc.)
```

---

## Responsive Design Breakpoints

### Desktop (1024px and wider)

- Modal width: 60-90% of viewport, max 1200px
- Single row layout for all components
- Buttons: Normal sized (readable without magnification)
- Series selector: Inline buttons or dropdown

### Tablet (600px to 1023px)

- Modal width: 85-95% of viewport
- Layout: May stack vertically if needed
- Series selector: Wrapping button grid or dropdown
- Image: Optimized for portrait or landscape orientation

### Mobile (Under 600px)

- Modal width: 90-100% with small margins
- Series selector: Single-column button list or dropdown only
- Navigation buttons: 44×44px minimum touch targets
- All text: Clearly readable without zoom
- Image: Full viewport width with appropriate padding

### Specific Breakpoints

```css
/* Mobile-first approach */
@media (min-width: 600px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large desktop */ }

/* Touch device optimization */
@media (hover: none) { /* Remove hover states, optimize for touch */ }
```

---

## Accessibility Implementation

### ARIA Attributes

**Modal Dialog**:
```html
<div role="dialog" aria-modal="true" aria-labelledby="gallery-title">
```

**Image Counter** (Live Region):
```html
<div aria-live="polite" aria-atomic="true" class="image-counter">
  1 of 5
</div>
```

**Alert Messages**:
```html
<div role="alert" class="error-message">
  Image could not be loaded.
</div>
```

**Status Messages**:
```html
<div role="status" aria-live="polite">
  Loading image...
</div>
```

**Buttons**:
```html
<button aria-label="Close gallery">×</button>
<button aria-label="Previous image" title="Previous (Left Arrow)">
  ← Previous
</button>
```

**Series Selection**:
```html
<button aria-selected="true" aria-current="true">May 4, 2026</button>
```

### Focus Management

1. **Focus Trap**: When modal opens, focus moves to first interactive element (close button or first series option)
2. **Tab Order**: Follows logical flow - close button → series selector → image viewer → navigation buttons
3. **Focus Return**: When modal closes, focus returns to the trigger button on projects.html
4. **Focus Visible**: Clear focus indicators with sufficient contrast

### Semantic HTML

- Use `<button>` for all interactive elements (not divs)
- Use proper heading hierarchy (h2 for title)
- Use `<label>` for form inputs
- Use semantic structure with `<div>` for layout only

### Color Contrast

- Text on background: Minimum 4.5:1 ratio (WCAG AA)
- UI components: Minimum 3:1 ratio
- Hover/focus states: Clear visual distinction

---

## Styling Strategy

### Design System Integration

**Typography** (from existing style.css):
- Heading font: 'Poppins', sans-serif
- Body font: 'Inter', sans-serif
- Font sizes: Scale from 1rem base

**Color Palette**:
- Primary text: `#f5f5f5` (light gray)
- Dimmed text: `#cccccc`
- Accent: `#56818f` (steel blue)
- Link color: `#38bdf8` (light blue)
- Overlay: `rgba(0, 0, 0, 0.7)`
- Modal background: Dark with subtle gradient

**Spacing**:
- Base unit: 8px or 16px
- Padding: Multiples of base unit
- Gap between elements: Consistent with site design
- Margins: Consistent with heading/paragraph margins

### Modal Container Styling

```css
.sermon-gallery-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
  border: 1px solid #333;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  z-index: 1001;
  max-height: 90vh;
  overflow-y: auto;
}

/* Responsive widths */
@media (min-width: 1024px) {
  .sermon-gallery-modal {
    width: min(90%, 1200px);
  }
}

@media (min-width: 600px) and (max-width: 1023px) {
  .sermon-gallery-modal {
    width: 90%;
  }
}

@media (max-width: 599px) {
  .sermon-gallery-modal {
    width: 95%;
    margin: 0 auto;
  }
}
```

### Button Styling

```css
.gallery-button {
  background: #3b82f6;
  color: #f5f5f5;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.gallery-button:hover {
  background: #2563eb;
}

.gallery-button:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 2px;
}

.gallery-button:disabled {
  background: #4b5563;
  color: #999;
  cursor: not-allowed;
  opacity: 0.5;
}
```

### Image Container Styling

```css
.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  background: #0f0f0f;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
}

.cartoon-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
```

---

## Browser Compatibility

### Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Feature Fallbacks

1. **CSS Grid**: Use Flexbox fallback
2. **CSS Variables**: Fallback to fixed colors
3. **Object-fit**: Use background-image with background-size
4. **Position Sticky**: Use position fixed
5. **Web APIs**: Test localStorage availability before use

### Testing Requirements

- Layout renders correctly in all browsers
- Keyboard navigation works consistently
- Images load properly
- No console errors
- Focus indicators visible

---

## Integration Points with projects.html

### Trigger Button

The existing "1. Our Church Sermon Cartoon Series" heading should have a button or link added:

```html
<h2>1. Our Church Sermon Cartoon Series
  <button id="sermon-gallery-trigger" class="gallery-trigger-btn" aria-label="Open sermon cartoon gallery">
    View Gallery
  </button>
</h2>
```

### Script Initialization

Add to projects.html head or end of body:

```html
<script src="js/sermon-gallery.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const gallery = new SermonGallery('#sermon-gallery-trigger', '#sermon-gallery-modal');
    gallery.init();
  });
</script>
```

### Modal Container

Add to projects.html body:

```html
<div id="sermon-gallery-modal" class="sermon-gallery-modal" hidden>
  <!-- Modal content will be inserted here -->
</div>
```

---

## Implementation Phases

### Phase 1: Core Functionality (Week 1)
- Create modal HTML structure
- Implement series selector
- Basic image loading and display
- Previous/Next navigation
- Modal open/close

### Phase 2: Responsive Design (Week 2)
- Implement responsive breakpoints
- Mobile optimization
- Touch target sizing
- Test on multiple devices

### Phase 3: Accessibility (Week 3)
- Add ARIA attributes
- Implement keyboard navigation
- Test with screen readers
- Focus management and traps

### Phase 4: Polish & Performance (Week 4)
- Error handling refinement
- Performance optimization
- Browser compatibility testing
- User feedback refinement
- Final visual polish

---

## Success Criteria

1. ✅ Modal opens from projects.html trigger
2. ✅ All 9 sermon folders display with proper dates
3. ✅ Images load and display correctly from file system
4. ✅ Previous/Next navigation works smoothly
5. ✅ Keyboard navigation (arrows, Escape) works
6. ✅ Responsive on desktop, tablet, and mobile
7. ✅ Accessibility features fully implemented (ARIA, labels, focus)
8. ✅ Performance targets met (< 500ms to first image)
9. ✅ Browser compatibility verified (Chrome, Firefox, Safari, Edge)
10. ✅ Error handling for missing/corrupt images
11. ✅ Modal integrates seamlessly with existing website design

