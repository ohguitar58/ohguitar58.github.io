/**
 * Sermon Gallery Modal Controller
 * Handles opening, closing, and navigation of the sermon gallery modal
 * with thumbnail grid and expanded image view
 */

class SermonGallery {
    constructor() {
        this.modal = document.getElementById('sermon-gallery-modal');
        this.overlay = document.getElementById('sermon-gallery-overlay');
        this.trigger = document.getElementById('sermon-gallery-trigger');
        this.closeButton = document.querySelector('.close-button');

        // Thumbnails view elements
        this.thumbnailsView = document.querySelector('.thumbnails-view');
        this.thumbnailsGrid = document.querySelector('.thumbnails-grid');

        // Expanded view elements
        this.expandedView = document.querySelector('.expanded-view');
        this.expandedImage = document.getElementById('expanded-image');
        this.expandedCounter = document.querySelector('.expanded-counter');
        this.expandedClose = document.querySelector('.expanded-close');
        this.prevButton = document.querySelector('.prev-button');
        this.nextButton = document.querySelector('.next-button');
        this.backButton = document.querySelector('.back-button');

        this.loadingSpinner = document.querySelector('.loading-spinner');
        this.errorMessage = document.querySelector('.error-message');

        this.seriesButtons = document.querySelectorAll('.series-button');

        this.state = {
            activeFolder: '7_5_26', // Most recent folder
            currentImageIndex: 0,
            imageList: [],
            isLoading: false,
            error: null,
            viewMode: 'thumbnails', // 'thumbnails' or 'expanded'
        };

        this.init();
    }

    init() {
        // Attach event listeners
        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });

        this.closeButton.addEventListener('click', () => this.closeModal());
        this.expandedClose.addEventListener('click', () => this.closeModal());
        this.overlay.addEventListener('click', () => this.closeModal());

        // Series selector buttons
        this.seriesButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.selectFolder(button.dataset.folder);
            });
        });

        // Expanded view navigation buttons
        this.prevButton.addEventListener('click', () => this.previousImage());
        this.nextButton.addEventListener('click', () => this.nextImage());
        this.backButton.addEventListener('click', () => this.viewThumbnails());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.hidden) {
                if (e.key === 'Escape') {
                    if (this.state.viewMode === 'expanded') {
                        this.viewThumbnails();
                    } else {
                        this.closeModal();
                    }
                } else if (this.state.viewMode === 'expanded') {
                    if (e.key === 'ArrowLeft') {
                        this.previousImage();
                    } else if (e.key === 'ArrowRight') {
                        this.nextImage();
                    }
                }
            }
        });
    }

    openModal() {
        this.modal.removeAttribute('hidden');
        this.overlay.removeAttribute('hidden');

        // Load the pre-selected folder on first open
        if (this.state.imageList.length === 0) {
            this.selectFolder(this.state.activeFolder);
        }

        this.state.viewMode = 'thumbnails';
        this.viewThumbnails();

        // Focus management
        this.closeButton.focus();
    }

    closeModal() {
        this.modal.setAttribute('hidden', '');
        this.overlay.setAttribute('hidden', '');
        this.trigger.focus(); // Return focus to trigger
    }

    selectFolder(folderPath) {
        this.state.activeFolder = folderPath;
        this.state.currentImageIndex = 0;
        this.showLoading();

        // Simulate loading images from the folder
        this.loadImageList(folderPath);
    }

    loadImageList(folderPath) {
        // Hardcoded image lists based on folder
        const folderImages = {
            '5_4_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
            '5_10_26': ['1.jpg', '2.jpg', '3.jpg'],
            '5_17_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '5_24_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '5_31_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '6_7_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '6_21_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '6_28_26': ['1.jpg', '1.png', '2.jpg', '3.jpg', '3.png', '4.jpg'],
            '7_5_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
        };

        this.state.imageList = folderImages[folderPath] || [];

        // Update series button states
        this.updateFolderSelection(folderPath);

        // Display thumbnails
        if (this.state.imageList.length > 0) {
            this.renderThumbnails();
            this.hideLoading();
        } else {
            this.showError('No images available for this series');
            this.hideLoading();
        }
    }

    renderThumbnails() {
        this.thumbnailsGrid.innerHTML = '';

        this.state.imageList.forEach((imageName, index) => {
            const item = document.createElement('button');
            item.className = 'thumbnail-item';
            item.type = 'button';
            item.setAttribute('aria-label', `View image ${index + 1} of ${this.state.imageList.length}`);

            const img = document.createElement('img');
            img.src = `images/sermons/${this.state.activeFolder}/${imageName}`;
            img.alt = `Sermon cartoon ${index + 1}`;

            item.appendChild(img);

            item.addEventListener('click', () => {
                this.state.currentImageIndex = index;
                this.viewExpanded();
            });

            this.thumbnailsGrid.appendChild(item);
        });
    }

    viewThumbnails() {
        this.state.viewMode = 'thumbnails';
        this.thumbnailsView.style.display = 'flex';
        this.thumbnailsView.style.flexDirection = 'column';
        this.expandedView.setAttribute('hidden', '');

        // Show header and series selector in thumbnail view
        document.querySelector('.gallery-header').style.display = 'flex';
        document.querySelector('.series-selector').style.display = 'block';
    }

    viewExpanded() {
        this.state.viewMode = 'expanded';
        this.thumbnailsView.style.display = 'none';
        this.expandedView.removeAttribute('hidden');

        // Hide header and series selector in expanded view
        document.querySelector('.gallery-header').style.display = 'none';
        document.querySelector('.series-selector').style.display = 'none';

        this.displayExpandedImage();
    }

    displayExpandedImage() {
        const imageName = this.state.imageList[this.state.currentImageIndex];
        const imagePath = `images/sermons/${this.state.activeFolder}/${imageName}`;

        this.expandedImage.src = imagePath;
        this.expandedImage.alt = `Sermon cartoon from ${this.state.activeFolder} (${this.state.currentImageIndex + 1} of ${this.state.imageList.length})`;

        this.updateExpandedCounter();
        this.updateNavButtons();
    }

    updateExpandedCounter() {
        const current = this.state.currentImageIndex + 1;
        const total = this.state.imageList.length;
        this.expandedCounter.textContent = `Image ${current} of ${total}`;
    }

    updateNavButtons() {
        const isFirst = this.state.currentImageIndex === 0;
        const isLast = this.state.currentImageIndex === this.state.imageList.length - 1;

        this.prevButton.disabled = isFirst;
        this.nextButton.disabled = isLast;
    }

    updateFolderSelection(folderPath) {
        this.seriesButtons.forEach((button) => {
            const isSelected = button.dataset.folder === folderPath;
            button.setAttribute('aria-selected', isSelected);
        });
    }

    nextImage() {
        if (this.state.currentImageIndex < this.state.imageList.length - 1) {
            this.state.currentImageIndex++;
            this.displayExpandedImage();
        }
    }

    previousImage() {
        if (this.state.currentImageIndex > 0) {
            this.state.currentImageIndex--;
            this.displayExpandedImage();
        }
    }

    showLoading() {
        this.loadingSpinner.removeAttribute('hidden');
        this.state.isLoading = true;
    }

    hideLoading() {
        this.loadingSpinner.setAttribute('hidden', '');
        this.state.isLoading = false;
        this.errorMessage.setAttribute('hidden', '');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.removeAttribute('hidden');
        this.hideLoading();
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SermonGallery();
});
