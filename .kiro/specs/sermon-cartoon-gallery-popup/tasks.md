# Implementation Plan: Sermon Cartoon Gallery Pop-up Modal

## Overview

This implementation plan breaks down the Sermon Cartoon Gallery Pop-up Modal into discrete, actionable TypeScript/JavaScript tasks organized across four phases: HTML structure and setup, styling and responsiveness, core JavaScript functionality, and accessibility and testing. Each task builds incrementally, with property-based tests integrated at strategic points to validate correctness properties defined in the design document.

---

## Tasks

### Phase 1: HTML Structure and Modal Setup

- [x] 1.1 Create modal HTML structure and container in projects.html
  - Add modal trigger button to the "Our Church Sermon Cartoon Series" section with proper ID and aria-label
  - Create modal container div with id="sermon-gallery-modal" and data attributes for configuration
  - Ensure trigger button is clearly associated with the sermon series section (Requirement 9.5)
  - Wire the modal HTML into projects.html without modifying existing content
  - _Requirements: 1.1, 1.2, 9.5_

- [x] 1.2 Implement modal header with title and close button
  - Create header section with h2 title "Sermon Cartoon Gallery" with id="gallery-title"
  - Implement close button (×) with aria-label="Close gallery" and title showing Escape key shortcut
  - Apply semantic HTML with proper heading hierarchy (Requirement 8.6)
  - _Requirements: 1.1, 8.6_

- [x] 1.3 Build series selector UI structure
  - Create series selector container with role="group" and aria-label="Sermon series selector"
  - Implement selection options for all 9 sermon folders (5_4_26, 5_10_26, 5_17_26, 5_24_26, 5_31_26, 6_7_26, 6_21_26, 6_28_26, 7_5_26)
  - Use button-based series selector (not dropdown) for better visual feedback
  - Apply aria-selected="true" to active option (Requirement 8.5)
  - _Requirements: 2.1, 2.2, 8.5_

- [x] 1.4 Create image viewer area and navigation controls
  - Build image viewer container with image display, counter display, loading indicator, and error message areas
  - Implement Previous and Next navigation buttons with aria-labels and title attributes
  - Add image counter div with aria-live="polite" for dynamic updates (Requirement 8.2)
  - Apply role="status" to loading indicator and role="alert" to error messages (Requirement 8.2)
  - _Requirements: 3.1, 4.1, 8.2_

- [x] 1.5 Create overlay backdrop element
  - Add semi-transparent overlay div with class="sermon-gallery-overlay" and role="presentation"
  - Position overlay to cover entire viewport
  - Set up click handler attachment point for closing modal (Requirement 1.5)
  - _Requirements: 1.3, 1.5_

### Phase 2: Styling and Responsive Design

- [x] 2.1 Implement base modal container styling
  - Apply fixed positioning, centering transform (translate(-50%, -50%))
  - Set background gradient from #1a1a1a to #0f0f0f with border and shadow
  - Configure border-radius (12px) and max-height (90vh) with overflow-y auto
  - Match existing website design system colors and typography (Requirement 9.1, 9.2)
  - _Requirements: 1.2, 1.6, 9.1, 9.2_

- [x] 2.2 Style modal header and close button
  - Apply flexbox layout with space-between for header
  - Style close button with hover state (#2563eb) and focus-visible outline (3px solid #60a5fa)
  - Set button padding, font size, and disabled state styling
  - Ensure close button is visually distinct in top-right corner (Requirement 9.3)
  - _Requirements: 1.2, 9.3, 7.4_

- [x] 2.3 Style series selector buttons
  - Apply button styling with background (#3b82f6), hover, active, and disabled states
  - Implement visual indicator for active selection (bold, highlight, or different background)
  - Set minimum 44×44px touch target size for mobile (Requirement 5.5)
  - Add focus-visible outline for keyboard navigation (Requirement 7.4)
  - _Requirements: 2.3, 2.4, 5.5, 7.4_

- [x] 2.4 Style image viewer and display area
  - Create container with flexbox centering for image display
  - Set image max-width: 100% and height: auto for aspect ratio maintenance (Requirement 3.5, 7.7)
  - Style loading spinner with CSS animation (rotation, fade)
  - Style error message with alert-style coloring (red/orange)
  - Position image counter above image with subtle styling (Requirement 3.6)
  - _Requirements: 3.1, 3.5, 3.6, 7.7_

- [x] 2.5 Style navigation controls
  - Apply flexbox layout with space-between alignment for Previous/Next buttons
  - Set button sizing and hover/active states
  - Implement disabled state (grayed out, opacity 0.5) (Requirement 4.4, 4.5)
  - Set minimum 44×44px touch targets on mobile (Requirement 5.5)
  - _Requirements: 4.1, 4.4, 4.5, 5.5, 7.4_

- [-] 2.6 Implement desktop responsive breakpoint (1024px+)
  - Set modal width to 60-90% of viewport with max-width 1200px (Requirement 5.1)
  - Apply single-row layout for all components
  - Set normal button sizes and readable text
  - _Requirements: 5.1, 5.6_

- [-] 2.7 Implement tablet responsive breakpoint (600px to 1023px)
  - Set modal width to 85-95% of viewport (Requirement 5.2)
  - Allow vertical stacking if needed
  - Optimize series selector and navigation controls for mid-size screens
  - _Requirements: 5.2, 5.6_

- [ ] 2.8 Implement mobile responsive breakpoint (under 600px)
  - Set modal width to 90-100% with small margins (Requirement 5.3)
  - Optimize image display size to fit mobile screen without horizontal scrolling (Requirement 5.4)
  - Ensure all buttons and touch targets are minimum 44×44px (Requirement 5.5)
  - Stack series selector vertically or use dropdown for space efficiency
  - _Requirements: 5.3, 5.4, 5.5, 5.6_

- [x] 2.9 Style overlay backdrop and modal focus behavior
  - Set overlay background to rgba(0, 0, 0, 0.7) (Requirement 1.5)
  - Apply z-index layering: overlay < modal container
  - Ensure overlay doesn't accept focus (Requirement 1.3)
  - _Requirements: 1.3, 1.5_

### Phase 3: JavaScript Core Functionality

- [~] 3.1 Create TypeScript types and interfaces for gallery state
  - Define SermonFolder type with folder path and human-readable date
  - Create ImageData interface with filename, path, index, total, and alt text
  - Define GalleryState interface with activeFolder, currentImageIndex, imageList, isLoading, error
  - Create SERMON_FOLDERS and FOLDER_DATES constants (Requirement 2.1)
  - _Requirements: 2.1_

- [~] 3.2 Implement sermon gallery state management module
  - Create GalleryState class with getter/setter methods for state properties
  - Implement updateFolder() method to change active sermon folder
  - Implement updateImageIndex() method to navigate between images
  - Implement resetState() method to clear state for next opening
  - Ensure state persists while modal is open (Property 1: Series Selection Persistence)
  - _Requirements: 1.1_

- [~] 3.3 Create sermon gallery UI rendering module
  - Implement render() method to update all UI elements based on state
  - Create updateImageDisplay(imagePath, altText) to show current image
  - Implement updateCounter(current, total) with aria-live region update
  - Create updateFolderSelection(folder) to highlight active series
  - Implement showLoading() and hideLoading() for loading indicator
  - _Requirements: 3.1, 3.6, 8.2_

- [~] 3.4 Implement image loading and file system access
  - Create loadImageList(folder) async function to fetch image filenames from folder
  - Filter results to only include .jpg and .png files (Requirement 6.4)
  - Implement error handling for missing or inaccessible folders
  - Display "No images available for this series" when folder is empty (Requirement 11.1)
  - Load only images from selected folder, not all folders (Requirement 6.1)
  - _Requirements: 3.1, 6.1, 6.4, 11.1_

- [~] 3.5 Implement image rendering with error handling
  - Create displayImage(imagePath, altText) function to render image in viewer
  - Implement image load event listener to hide loading spinner on success
  - Implement image error event listener to show error message on failure (Requirement 3.3)
  - Display error message: "Image could not be loaded" on load failure
  - Ensure image maintains aspect ratio (Property 7: Image Aspect Ratio Maintenance)
  - _Requirements: 3.1, 3.3, 3.5, 7.7_

- [~] 3.6 Implement modal open/close functionality
  - Create openModal() function that shows overlay and modal container
  - Create closeModal() function that hides overlay and modal, resets state
  - Move focus to trigger button when closing (Requirement 1.4, 8.2)
  - Return focus to trigger element on close (Property 5: Modal Close Consistency)
  - _Requirements: 1.1, 1.4, 8.2, Property 5_

- [~] 3.7 Implement series folder selection handler
  - Create selectFolder(folderPath) function to change active folder
  - Clear previous folder's images and event listeners (Requirement 6.2)
  - Load image list for new folder with loading indicator
  - Set currentImageIndex to 0 and display first image
  - Validate folder exists before attempting to load (Requirement 6.1)
  - _Requirements: 2.2, 2.3, 6.1, 6.2, Property 1_

- [~] 3.8 Implement image navigation (Previous/Next)
  - Create nextImage() function to increment currentImageIndex
  - Create previousImage() function to decrement currentImageIndex
  - Validate boundaries: prevent navigation past first/last image (Property 2: Image Navigation Boundaries)
  - Update button disabled state based on navigation position
  - Trigger UI re-render on navigation (Requirement 4.2, 4.3)
  - _Requirements: 4.2, 4.3, 4.4, 4.5, Property 2_

- [~] 3.9 Implement keyboard navigation
  - Create keydown event listener for arrow keys (Left, Right, Escape)
  - Map Left Arrow to previousImage() (Requirement 7.2)
  - Map Right Arrow to nextImage() (Requirement 7.1)
  - Map Escape key to closeModal() (Requirement 7.3)
  - Ensure keyboard navigation is equivalent to button clicks (Property 4: Keyboard Navigation Equivalence)
  - _Requirements: 7.1, 7.2, 7.3, Property 4_

- [~] 3.10 Implement focus trap and management
  - Create focusTrap() function to restrict Tab focus to modal elements
  - Identify all focusable elements: close button, series buttons, nav buttons
  - Wrap focus at start (Shift+Tab from first element goes to last)
  - Wrap focus at end (Tab from last element goes to first)
  - Move initial focus to close button or first series button on open
  - Return focus to trigger element on close (Requirement 8.2)
  - _Requirements: 1.4, 8.2_

- [~] 3.11 Wire all components together in main SermonGallery class
  - Create SermonGallery class constructor with trigger selector and modal selector parameters
  - Initialize state, UI, and event modules
  - Wire event listeners: trigger click, series selection, nav buttons, keyboard, overlay click
  - Implement init() method called on DOMContentLoaded
  - Export SermonGallery class for use in projects.html
  - _Requirements: All core requirements_

### Phase 4: Event Handling and Polish

- [~] 4.1 Attach event listeners to all interactive elements
  - Attach click listeners to trigger button, close button, all series buttons, Previous/Next buttons
  - Attach keydown listener to modal for keyboard navigation
  - Attach click listener to overlay for close-on-click functionality (Requirement 1.4)
  - Ensure event listeners are cleaned up when modal closes
  - _Requirements: 1.4, 4.2, 4.3, 7.1, 7.2, 7.3_

- [~] 4.2 Implement visual feedback and hover states
  - Add CSS hover states to all buttons (series, navigation, close)
  - Add focus-visible states for keyboard navigation (Requirement 7.4)
  - Implement active/pressed states for series selection
  - Implement disabled state for Previous/Next at boundaries
  - Ensure visual states are accessible with sufficient contrast
  - _Requirements: 7.4_

- [~] 4.3 Implement loading state management
  - Show loading spinner when fetching image list (Requirement 3.2)
  - Show loading spinner when loading individual images
  - Hide loading spinner when image successfully loads
  - Display appropriate loading message (e.g., "Loading images...")
  - _Requirements: 3.2_

- [~] 4.4 Implement error handling and recovery
  - Display error message if image fails to load (Requirement 3.3)
  - Provide retry mechanism for network errors (Requirement 11.2)
  - Display "No images available" for empty folders (Requirement 11.1)
  - Display "Unable to load sermon series" if folder list fails (Requirement 11.4)
  - Keep modal open and functional after error (Requirement 11.3)
  - _Requirements: 3.3, 11.1, 11.2, 11.3, 11.4_

- [~] 4.5 Implement accessibility attributes and labels
  - Ensure close button has aria-label and title attribute
  - Add aria-labels to all navigation buttons with keyboard shortcuts in title
  - Add aria-label to series selector and mark active with aria-selected="true"
  - Add aria-live="polite" to image counter for dynamic updates
  - Add role="status" to loading indicator and role="alert" to error messages
  - Add aria-labelledby on modal pointing to title (Requirement 8.1, 8.4, 8.5, 8.6)
  - _Requirements: 8.1, 8.2, 8.4, 8.5, 8.6_

- [~] 4.6 Handle window resize and responsive behavior
  - Implement window resize listener to reflow modal layout
  - Recalculate modal dimensions based on new viewport size
  - Ensure modal remains centered after resize
  - Test smooth reflow without horizontal scrolling (Property 6: Responsive Layout Preservation)
  - _Requirements: 5.6, Property 6_

- [~] 4.7 Implement initial state and default behavior
  - Set pre-selected folder to 7_5_26 (most recent) when modal opens (Requirement 12.2)
  - Display first image from pre-selected folder automatically
  - Show image counter "1 of X" for initial display
  - Initialize series selector with all 9 folders
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

### Phase 5: Accessibility and Testing

- [~] 5.1 Verify and implement focus trap behavior
  - Test Tab navigation stays within modal
  - Test Shift+Tab navigation wraps correctly
  - Verify initial focus lands on first interactive element
  - Verify focus returns to trigger button on close (Requirement 8.2)
  - _Requirements: 8.2_

- [~] 5.2 Verify keyboard navigation accessibility
  - Test Left Arrow navigates to previous image
  - Test Right Arrow navigates to next image
  - Test Escape closes modal
  - Verify arrow keys work when modal has focus
  - Test keyboard navigation is equivalent to button clicks (Property 4)
  - _Requirements: 7.1, 7.2, 7.3, Property 4_

- [~] 5.3 Write property test for series selection persistence
  - **Property 1: Series Selection Persistence**
  - **Validates: Requirements 2.2, 2.3**
  - Test that selecting folder A → switching to B → returning to A shows same images in same order
  - Verify image index doesn't change when not actively navigating
  - Test with all 9 sermon folders
  - _Requirements: 2.2, 2.3_

- [~] 5.4 Write property test for image navigation boundaries
  - **Property 2: Image Navigation Boundaries**
  - **Validates: Requirements 4.4, 4.5**
  - Test that clicking Next on last image doesn't show images from other folders
  - Test that clicking Previous on first image doesn't show images from other folders
  - Test navigation boundaries for folders with 1, 3, and 5 images
  - _Requirements: 4.4, 4.5_

- [~] 5.5 Write property test for image counter accuracy
  - **Property 3: Image Counter Accuracy**
  - **Validates: Requirements 3.6**
  - Test that counter displays "X of Y" correctly for each image position
  - Test counter updates when navigating between images
  - Test counter accuracy for folders with different image counts
  - _Requirements: 3.6_

- [~] 5.6 Write property test for keyboard navigation equivalence
  - **Property 4: Keyboard Navigation Equivalence**
  - **Validates: Requirements 7.1, 7.2**
  - Test that Left Arrow produces same result as Previous button click
  - Test that Right Arrow produces same result as Next button click
  - Test multiple sequential arrow key presses produce expected results
  - _Requirements: 7.1, 7.2_

- [~] 5.7 Write property test for modal close consistency
  - **Property 5: Modal Close Consistency**
  - **Validates: Requirements 1.4, 7.3**
  - Test that Escape key, close button, and overlay click all close modal
  - Test that focus returns to trigger element after close
  - Test that modal state resets for next opening
  - _Requirements: 1.4, 7.3_

- [~] 5.8 Write property test for responsive layout preservation
  - **Property 6: Responsive Layout Preservation**
  - **Validates: Requirements 5.5, 5.6**
  - Test layout reflows smoothly when viewport is resized
  - Test no horizontal scrolling on mobile (under 600px)
  - Test touch targets remain 44×44px or larger on mobile
  - _Requirements: 5.5, 5.6_

- [~] 5.9 Write property test for image aspect ratio maintenance
  - **Property 7: Image Aspect Ratio Maintenance**
  - **Validates: Requirements 3.5**
  - Test that images render at various aspect ratios without distortion
  - Test aspect ratio is preserved during viewport resize
  - Test for images of different dimensions (portrait, landscape, square)
  - _Requirements: 3.5_

- [~] 5.10 Write property test for memory cleanup on folder switch
  - **Property 8: Memory Cleanup on Folder Switch**
  - **Validates: Requirements 6.2**
  - Test that switching folders unloads previous images from DOM
  - Test that event listeners for previous folder are removed
  - Test memory is freed (no memory leaks on repeated folder switches)
  - _Requirements: 6.2_

- [~] 5.11 Verify browser compatibility
  - Test in Chrome (latest) - layout, images, keyboard, no console errors
  - Test in Firefox (latest) - layout, images, keyboard, no console errors
  - Test in Safari (latest) - layout, images, keyboard, no console errors
  - Test in Edge (latest) - layout, images, keyboard, no console errors
  - Verify consistent rendering across browsers (Requirement 10.1, 10.3)
  - _Requirements: 10.1, 10.3_

- [~] 5.12 Verify accessibility with screen reader
  - Test modal title is announced
  - Test image counter is announced with live region
  - Test error messages are announced
  - Test all buttons have accessible labels
  - Test series selection is announced with aria-selected
  - _Requirements: 8.1, 8.2, 8.4, 8.5, 8.6_

- [~] 5.13 Verify color contrast and visual accessibility
  - Test text on background has 4.5:1 contrast ratio (Requirement 8.2)
  - Test UI components have 3:1 contrast ratio
  - Test hover and focus states are visually distinct
  - Test disabled buttons are clearly different from enabled
  - Verify sufficient color contrast in all browser backgrounds
  - _Requirements: 8.2_

### Phase 6: Integration and Finalization

- [~] 6.1 Integrate modal into projects.html
  - Add gallery modal trigger button to projects.html near "1. Our Church Sermon Cartoon Series" section
  - Add script tag to load sermon-gallery.js module
  - Initialize SermonGallery on DOMContentLoaded event
  - Verify trigger button is associated with sermon series section (Requirement 9.5)
  - _Requirements: 1.1, 9.5_

- [~] 6.2 Add modal CSS to style.css or separate stylesheet
  - Add all modal-specific styles to style.css or create sermon-gallery.css import
  - Ensure modal styles follow existing design system (colors, typography, spacing)
  - Verify no CSS conflicts with existing styles
  - Ensure modal uses consistent colors with existing design (Requirement 9.1, 9.2, 9.4)
  - _Requirements: 9.1, 9.2, 9.4_

- [~] 6.3 Optimize image loading performance
  - Implement lazy loading or on-demand image loading
  - Load only the current image initially, preload next/previous
  - Measure load time to first image (target: < 500ms per Requirement 3.1)
  - Verify all image loading completes within 2 seconds (Requirement 3.1)
  - _Requirements: 3.1, 6.3_

- [~] 6.4 Verify all requirements are implemented
  - Create test checklist for all 12 requirements
  - Verify each requirement's acceptance criteria are met
  - Document any deviations or edge cases
  - Confirm modal integrates seamlessly with existing website (Requirement 9.1-9.5)
  - _Requirements: All requirements 1-12_

- [~] 6.5 Ensure cross-browser CSS compatibility
  - Remove experimental prefixes (-webkit-, -moz-) or add fallbacks (Requirement 10.2)
  - Test CSS Grid usage has Flexbox fallback
  - Test CSS Variables usage has fixed color fallback
  - Test Object-fit usage has background-image fallback
  - Verify consistent rendering in all supported browsers
  - _Requirements: 10.2, 10.4_

- [~] 6.6 Final checkpoint - Ensure all tests pass and modal is fully functional
  - Run all property-based tests and verify they pass
  - Run browser compatibility tests
  - Run accessibility verification tests
  - Verify performance targets met (< 500ms to first image, < 2s folder load)
  - Verify all requirements satisfied
  - Ask the user if questions arise.

---

## Notes

- **Property-Based Testing Focus**: All 8 correctness properties from the design document are covered as dedicated test tasks (5.3-5.10). Each property test is marked optional (`*`) per the workflow pattern.
- **Modular Architecture**: The implementation uses 4 separate TypeScript modules (state, UI, events, main) to keep concerns separated and testable.
- **Accessibility Priority**: Accessibility features (ARIA, focus management, keyboard navigation) are integrated throughout implementation rather than bolted on at the end, with dedicated verification tasks in Phase 5.
- **Responsive Design**: Separate tasks for each responsive breakpoint (desktop, tablet, mobile) ensure comprehensive coverage per Requirements 5.1-5.6.
- **Error Resilience**: Tasks include error handling for missing files, network failures, empty folders, and invalid formats (Requirement 6.4, 11.1-11.4).
- **Performance Targets**: Image loading optimized to meet < 500ms first image and < 2s folder load requirements (Requirement 3.1).
- **Browser Compatibility**: Explicit testing in Chrome, Firefox, Safari, and Edge with fallback CSS strategies (Requirement 10.1-10.4).
- **Memory Management**: Explicit task to verify folder switches unload previous images (Requirement 6.2, Property 8).
- **Incremental Development**: Tasks build from HTML structure → styling → core functionality → events → accessibility → integration, allowing early validation at each phase.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.9"] },
    { "id": 2, "tasks": ["2.6", "2.7", "2.8"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3"] },
    { "id": 4, "tasks": ["3.4", "3.5", "3.6"] },
    { "id": 5, "tasks": ["3.7", "3.8", "3.9"] },
    { "id": 6, "tasks": ["3.10", "3.11"] },
    { "id": 7, "tasks": ["4.1", "4.2", "4.3", "4.4"] },
    { "id": 8, "tasks": ["4.5", "4.6", "4.7"] },
    { "id": 9, "tasks": ["5.1", "5.2"] },
    { "id": 10, "tasks": ["5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10"] },
    { "id": 11, "tasks": ["5.11", "5.12", "5.13"] },
    { "id": 12, "tasks": ["6.1", "6.2"] },
    { "id": 13, "tasks": ["6.3", "6.4", "6.5"] }
  ]
}
```
