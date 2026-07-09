# Sermon Cartoon Gallery Pop-up Modal - Requirements Document

## Introduction

The Sermon Cartoon Gallery Pop-up Modal is a feature that enhances the "Our Church Sermon Cartoon Series" project on the projects.html page. This feature provides an interactive, date-organized modal interface for users to browse and view sermon cartoon images from multiple dated collections. The gallery displays cartoon images from sermon folders (5_4_26, 5_10_26, 5_17_26, 5_24_26, 5_31_26, 6_7_26, 6_21_26, 6_28_26, 7_5_26) organized chronologically, with intuitive navigation and image viewing capabilities. The modal integrates seamlessly with the existing website design while maintaining responsive functionality across desktop and mobile devices.

## Glossary

- **Gallery_Modal**: A pop-up overlay window displayed on top of the projects.html page that contains the sermon cartoon gallery interface
- **Sermon_Folder**: A dated directory within images/sermons/ containing cartoon images from a specific sermon date (e.g., 5_4_26)
- **Cartoon_Image**: A JPG or PNG file representing a single cartoon illustration from a sermon series
- **Modal_Trigger**: An interactive element on projects.html that opens the Gallery_Modal
- **Gallery_Container**: The main display area within the Gallery_Modal showing cartoon images and navigation controls
- **Series_Selector**: A UI component allowing users to select which Sermon_Folder's cartoons to view
- **Image_Viewer**: The display area showing an individual Cartoon_Image at full size
- **Navigation_Control**: Buttons or arrows allowing users to move between cartoons within a Sermon_Folder
- **Close_Trigger**: The action or element that closes the Gallery_Modal and returns focus to projects.html
- **Responsive_Design**: The ability of the Gallery_Modal to adapt its layout and functionality to different device screen sizes and orientations

## Requirements

### Requirement 1: Gallery Modal Display and Accessibility

**User Story:** As a website visitor, I want to open a dedicated modal gallery, so that I can view sermon cartoons in an organized and visually prominent way without leaving the projects page.

#### Acceptance Criteria

1. WHEN a user clicks the link or button for "1. Our Church Sermon Cartoon Series" on projects.html, THE Gallery_Modal SHALL open as an overlay on top of the current page
2. WHEN the Gallery_Modal is open, THE Gallery_Modal SHALL remain visible and interactive above the projects.html background content
3. WHEN the Gallery_Modal is open, THE projects.html background content SHALL be visually dimmed or partially obscured to indicate focus on the Gallery_Modal
4. WHEN a user clicks the Close_Trigger (X button, close button, or outside the modal in a designated close area), THE Gallery_Modal SHALL close and focus SHALL return to projects.html
5. THE Gallery_Modal overlay background SHALL use semi-transparent dark color (similar to rgba(0, 0, 0, 0.7)) to maintain visual hierarchy
6. THE Gallery_Modal container SHALL be centered on the viewport and remain centered when the page is scrolled

### Requirement 2: Sermon Series Selection and Organization

**User Story:** As a gallery user, I want to select which sermon date I want to view, so that I can organize cartoons chronologically and focus on specific sermon series.

#### Acceptance Criteria

1. WHEN the Gallery_Modal first opens, THE Series_Selector SHALL display all available Sermon_Folders in chronological order (5_4_26, 5_10_26, 5_17_26, 5_24_26, 5_31_26, 6_7_26, 6_21_26, 6_28_26, 7_5_26)
2. THE Series_Selector SHALL display the date in a human-readable format (e.g., "May 4, 2026" or "5/4/26")
3. WHEN a user selects a Sermon_Folder from the Series_Selector, THE Gallery_Container SHALL load and display Cartoon_Images from that Sermon_Folder
4. WHEN a Sermon_Folder is selected, THE Series_Selector SHALL visually indicate which Sermon_Folder is currently active (e.g., highlighted, bold, or with a different background color)
5. THE Series_Selector options SHALL include only Sermon_Folders that contain at least one valid Cartoon_Image file (JPG or PNG)

### Requirement 3: Image Loading and Display

**User Story:** As a gallery user, I want cartoon images to load quickly and display clearly, so that I can view the content without significant delays or display issues.

#### Acceptance Criteria

1. WHEN a Sermon_Folder is selected, THE Gallery_Modal SHALL load and display Cartoon_Images from that folder within 2 seconds
2. WHEN Cartoon_Images are loading, THE Gallery_Modal SHALL display a loading indicator (spinner, progress bar, or loading text)
3. WHEN a Cartoon_Image fails to load due to missing or corrupted file, THE Image_Viewer SHALL display an error message such as "Image could not be loaded" rather than showing a broken image icon
4. THE Image_Viewer SHALL display Cartoon_Images at a size proportional to the Gallery_Modal dimensions, ensuring images are fully visible and properly centered
5. THE Image_Viewer SHALL maintain the original aspect ratio of each Cartoon_Image
6. WHEN an image is displayed, THE Image_Viewer SHALL display the image filename or image sequence number (e.g., "1 of 5", "2 of 5") above or below the image

### Requirement 4: Image Navigation Within a Series

**User Story:** As a gallery user, I want to navigate through cartoons within a sermon series, so that I can view all cartoons sequentially.

#### Acceptance Criteria

1. WHEN a Sermon_Folder contains multiple Cartoon_Images, THE Gallery_Modal SHALL display Navigation_Controls (Previous and Next buttons or arrows)
2. WHEN a user clicks the Next button, THE Image_Viewer SHALL display the next Cartoon_Image in the Sermon_Folder sequence
3. WHEN a user clicks the Previous button, THE Image_Viewer SHALL display the previous Cartoon_Image in the Sermon_Folder sequence
4. WHEN a user is viewing the first Cartoon_Image in a Sermon_Folder, THE Previous button SHALL be visually disabled (grayed out) or removed
5. WHEN a user is viewing the last Cartoon_Image in a Sermon_Folder, THE Next button SHALL be visually disabled (grayed out) or removed
6. WHEN a Sermon_Folder contains only one Cartoon_Image, THE Navigation_Controls SHALL not be displayed

### Requirement 5: Responsive Design for Multiple Device Types

**User Story:** As a user on different devices, I want the gallery to adapt to my screen size, so that the gallery functions well on desktop, tablet, and mobile screens.

#### Acceptance Criteria

1. WHEN the Gallery_Modal is viewed on a desktop screen (1024px or wider), THE Gallery_Modal width SHALL be between 60% and 90% of the viewport width, with maximum width of 1200px
2. WHEN the Gallery_Modal is viewed on a tablet screen (600px to 1023px), THE Gallery_Modal width SHALL be between 85% and 95% of the viewport width
3. WHEN the Gallery_Modal is viewed on a mobile device screen (under 600px), THE Gallery_Modal width SHALL be between 90% and 100% of the viewport width with appropriate margins
4. WHEN the Gallery_Modal is displayed on mobile devices, THE image display size SHALL be optimized to fit the mobile screen without horizontal scrolling
5. WHEN the Gallery_Modal is displayed on mobile devices, THE Navigation_Controls and Series_Selector SHALL be readable and easily tappable (minimum touch target size of 44x44 pixels)
6. WHEN the window is resized, THE Gallery_Modal layout SHALL reflow smoothly to accommodate the new viewport dimensions

### Requirement 6: Image Loading Optimization and Performance

**User Story:** As a website owner, I want images to load efficiently, so that the gallery maintains good performance and user experience.

#### Acceptance Criteria

1. THE Gallery_Modal SHALL load only Cartoon_Images from the selected Sermon_Folder, not all images from all Sermon_Folders simultaneously
2. WHEN a new Sermon_Folder is selected, THE Gallery_Modal SHALL unload Cartoon_Images from the previously selected folder to free memory
3. THE Cartoon_Images SHALL be lazy-loaded or loaded on-demand to minimize initial load time
4. IF an image file does not have a .jpg or .png extension, THEN THE Gallery_Modal SHALL exclude it from the list of displayable Cartoon_Images

### Requirement 7: Keyboard and Mouse Navigation

**User Story:** As a user, I want to navigate the gallery using both mouse and keyboard controls, so that I can use the interface comfortably with my preferred input method.

#### Acceptance Criteria

1. WHEN the Gallery_Modal has focus and a user presses the Right Arrow key, THE Image_Viewer SHALL display the next Cartoon_Image (if available)
2. WHEN the Gallery_Modal has focus and a user presses the Left Arrow key, THE Image_Viewer SHALL display the previous Cartoon_Image (if available)
3. WHEN the Gallery_Modal has focus and a user presses the Escape key, THE Gallery_Modal SHALL close
4. WHEN a user hovers over a Navigation_Control button with the mouse, THE button SHALL display a visual hover state (color change, cursor change, or highlight)
5. WHEN a user hovers over a Series_Selector option with the mouse, THE option SHALL display a visual hover state

### Requirement 8: Accessibility and Semantic Structure

**User Story:** As a user with accessibility needs, I want the gallery to be accessible with screen readers and keyboard navigation, so that I can use the gallery regardless of my abilities.

#### Acceptance Criteria

1. THE Gallery_Modal container SHALL have a role attribute set to "dialog" to properly identify it as a modal dialog to assistive technologies
2. WHEN the Gallery_Modal is open, THE Gallery_Modal SHALL have focus-trap behavior, restricting keyboard focus to elements within the Gallery_Modal
3. EACH Cartoon_Image SHALL have an alt attribute describing the image content (e.g., "Sermon cartoon 1 from May 4, 2026 series")
4. EACH interactive button (Next, Previous, Series selection, Close) SHALL have descriptive aria-label or visible text identifying its purpose
5. THE Series_Selector options SHALL be properly marked with ARIA attributes to indicate which option is currently selected (aria-current or aria-selected)
6. THE Gallery_Modal title or header SHALL be marked with an appropriate heading level (h2 or h3) and referenced by the dialog's aria-labelledby attribute

### Requirement 9: Integration with Existing Website

**User Story:** As a website visitor, I want the gallery modal to fit naturally with the existing website design, so that the feature feels cohesive and well-integrated.

#### Acceptance Criteria

1. THE Gallery_Modal styling SHALL use the same color scheme, typography, and design patterns as defined in style.css (dark overlay backgrounds, sans-serif fonts, consistent spacing)
2. WHEN the Gallery_Modal is displayed, THE modal header, buttons, and text colors SHALL match or complement the existing website color palette (light text on dark backgrounds)
3. THE Close_Trigger button or element SHALL be visually distinct and easily recognizable (e.g., a standard X icon in the top-right corner)
4. THE Gallery_Modal SHALL not require modifications to the existing style.css file beyond addition of modal-specific styles
5. THE link or button on projects.html that triggers the Gallery_Modal SHALL be clearly associated with "1. Our Church Sermon Cartoon Series" section

### Requirement 10: Browser Compatibility and Cross-Browser Testing

**User Story:** As a website visitor using different browsers, I want the gallery to work consistently across browsers, so that my experience is reliable regardless of which browser I use.

#### Acceptance Criteria

1. THE Gallery_Modal functionality SHALL work correctly in modern browsers (Chrome, Firefox, Safari, Edge)
2. THE Gallery_Modal CSS styles SHALL not use experimental or browser-specific prefixes (-webkit-, -moz-) without fallbacks
3. WHEN the Gallery_Modal is displayed, THE modal layout and styling SHALL render consistently across all supported browsers with no significant visual differences
4. IF a browser does not support a particular CSS feature, THEN a reasonable fallback or degraded experience SHALL be provided

### Requirement 11: Error Handling and User Feedback

**User Story:** As a gallery user, I want clear feedback when something goes wrong, so that I understand what happened and know what to do next.

#### Acceptance Criteria

1. IF no Cartoon_Images can be found in a selected Sermon_Folder, THEN THE Gallery_Modal SHALL display a message such as "No images available for this series"
2. IF a network error prevents Cartoon_Images from loading, THEN THE Gallery_Modal SHALL display an error message and provide an option to retry loading
3. WHEN the Gallery_Modal encounters an error, THE Gallery_Modal SHALL remain open and functional, allowing the user to select a different Sermon_Folder or close the modal
4. IF Sermon_Folder data cannot be loaded, THEN THE Series_Selector SHALL display a message indicating the issue (e.g., "Unable to load sermon series. Please try again later.")

### Requirement 12: Initial State and Default Behavior

**User Story:** As a gallery user, I want the gallery to display helpful content when I first open it, so that I immediately understand what the gallery contains.

#### Acceptance Criteria

1. WHEN the Gallery_Modal first opens, THE Series_Selector SHALL be displayed with all available Sermon_Folders listed
2. WHEN the Gallery_Modal first opens, THE first or most recent Sermon_Folder (7_5_26 or 6_28_26) SHALL be pre-selected and its cartoons SHALL be displayed in the Image_Viewer
3. THE Gallery_Modal title or header SHALL clearly state "Sermon Cartoon Gallery" or similar descriptive text
4. THE first Cartoon_Image from the pre-selected Sermon_Folder SHALL be displayed with the image counter (e.g., "1 of 4")

