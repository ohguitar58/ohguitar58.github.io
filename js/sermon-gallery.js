/**
 * Controls the sermon gallery modal, thumbnail grid, and expanded image view.
 */
class SermonGallery {
    constructor() {
        this.modal = document.getElementById('sermon-gallery-modal');
        this.overlay = document.getElementById('sermon-gallery-overlay');
        this.trigger = document.getElementById('sermon-gallery-trigger');
        this.closeButton = this.modal.querySelector('.gallery-header .close-button');
        this.thumbnailsView = this.modal.querySelector('.thumbnails-view');
        this.thumbnailsGrid = this.modal.querySelector('.thumbnails-grid');
        this.expandedView = this.modal.querySelector('.expanded-view');
        this.expandedImage = document.getElementById('expanded-image');
        this.expandedImageError = document.getElementById('expanded-image-error');
        this.expandedCounter = this.modal.querySelector('.expanded-counter');
        this.expandedClose = this.modal.querySelector('.expanded-close');
        this.prevButton = this.modal.querySelector('.prev-button');
        this.nextButton = this.modal.querySelector('.next-button');
        this.backButton = this.modal.querySelector('.back-button');
        this.loadingSpinner = this.modal.querySelector('.loading-spinner');
        this.errorMessage = this.modal.querySelector('.error-message');
        this.seriesButtons = this.modal.querySelectorAll('.series-button');
        this.previouslyFocusedElement = null;

        this.state = {
            activeFolder: '7_5_26',
            currentImageIndex: 0,
            imageList: [],
            viewMode: 'thumbnails',
        };

        this.folderImages = {
            '5_4_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
            '5_10_26': ['1.jpg', '2.jpg', '3.jpg'],
            '5_17_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '5_24_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '5_31_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '6_7_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '6_21_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '6_28_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
            '7_5_26': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
        };

        this.init();
    }

    init() {
        this.trigger.addEventListener('click', (event) => {
            event.preventDefault();
            this.openModal();
        });

        document.querySelectorAll('.gallery-open-link').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                this.openModal();
            });
        });

        this.closeButton.addEventListener('click', () => this.closeModal());
        this.expandedClose.addEventListener('click', () => this.closeModal());
        this.overlay.addEventListener('click', () => this.closeModal());

        this.seriesButtons.forEach((button) => {
            button.addEventListener('click', () => this.selectFolder(button.dataset.folder));
        });

        this.prevButton.addEventListener('click', () => this.previousImage());
        this.nextButton.addEventListener('click', () => this.nextImage());
        this.backButton.addEventListener('click', () => this.viewThumbnails());
        document.addEventListener('keydown', (event) => this.handleKeydown(event));
    }

    openModal() {
        this.previouslyFocusedElement = document.activeElement;
        this.modal.removeAttribute('hidden');
        this.overlay.removeAttribute('hidden');
        document.body.classList.add('modal-open');

        this.viewThumbnails(false);
        if (this.state.imageList.length === 0) {
            this.selectFolder(this.state.activeFolder);
        }

        this.closeButton.focus();
    }

    closeModal() {
        this.modal.setAttribute('hidden', '');
        this.overlay.setAttribute('hidden', '');
        this.modal.classList.remove('expanded-fullscreen');
        document.body.classList.remove('modal-open');
        this.viewThumbnails(false);

        const focusTarget = this.previouslyFocusedElement || this.trigger;
        focusTarget.focus();
    }

    handleKeydown(event) {
        if (this.modal.hidden) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeModal();
            return;
        }

        if (this.state.viewMode === 'expanded' && event.key === 'ArrowLeft') {
            this.previousImage();
        } else if (this.state.viewMode === 'expanded' && event.key === 'ArrowRight') {
            this.nextImage();
        } else if (event.key === 'Tab') {
            this.trapFocus(event);
        }
    }

    trapFocus(event) {
        const focusableElements = Array.from(this.modal.querySelectorAll(
            'button:not([disabled]):not([hidden]), [href]:not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])'
        )).filter((element) => element.offsetParent !== null);

        if (focusableElements.length === 0) {
            event.preventDefault();
            this.modal.focus();
            return;
        }

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    selectFolder(folderPath) {
        this.state.activeFolder = folderPath;
        this.state.currentImageIndex = 0;
        this.state.imageList = this.folderImages[folderPath] || [];
        this.updateFolderSelection(folderPath);
        this.renderThumbnails();
    }

    renderThumbnails() {
        this.thumbnailsGrid.replaceChildren();
        this.hideError();

        if (this.state.imageList.length === 0) {
            this.showError('No images are available for this series.');
            return;
        }

        this.showLoading();
        let imagesPending = this.state.imageList.length;
        const markImageComplete = () => {
            imagesPending -= 1;
            if (imagesPending === 0) {
                this.hideLoading();
            }
        };

        this.state.imageList.forEach((imageName, index) => {
            const item = document.createElement('button');
            item.className = 'thumbnail-item';
            item.type = 'button';
            item.dataset.imageIndex = String(index);
            item.setAttribute('aria-label', `View image ${index + 1} of ${this.state.imageList.length}`);

            const image = document.createElement('img');
            image.alt = `Sermon cartoon ${index + 1}`;
            image.loading = 'lazy';
            image.addEventListener('load', markImageComplete, { once: true });
            image.addEventListener('error', () => {
                item.classList.add('thumbnail-load-error');
                item.disabled = true;
                item.setAttribute('aria-label', `Image ${index + 1} could not be loaded`);
                image.remove();

                const errorText = document.createElement('span');
                errorText.className = 'thumbnail-error-text';
                errorText.textContent = 'Image unavailable';
                item.appendChild(errorText);
                markImageComplete();
            }, { once: true });
            image.src = this.imagePath(imageName);

            item.appendChild(image);
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                this.state.currentImageIndex = Number(event.currentTarget.dataset.imageIndex);
                this.viewExpanded();
            });
            this.thumbnailsGrid.appendChild(item);
        });
    }

    imagePath(imageName) {
        return `images/sermons/${this.state.activeFolder}/${imageName}`;
    }

    viewThumbnails(restoreFocus = true) {
        this.state.viewMode = 'thumbnails';
        this.thumbnailsView.style.display = 'flex';
        this.expandedView.setAttribute('hidden', '');
        this.modal.querySelector('.gallery-header').style.display = 'flex';
        this.modal.querySelector('.series-selector').style.display = 'block';
        this.modal.classList.remove('expanded-fullscreen');

        if (restoreFocus && !this.modal.hidden) {
            const selectedThumbnail = this.thumbnailsGrid.children[this.state.currentImageIndex];
            selectedThumbnail?.focus();
        }
    }

    viewExpanded() {
        this.state.viewMode = 'expanded';
        this.thumbnailsView.style.display = 'none';
        this.expandedView.removeAttribute('hidden');
        this.modal.querySelector('.gallery-header').style.display = 'none';
        this.modal.querySelector('.series-selector').style.display = 'none';
        this.modal.classList.add('expanded-fullscreen');
        this.displayExpandedImage();
        this.expandedClose.focus();
    }

    displayExpandedImage() {
        const imageName = this.state.imageList[this.state.currentImageIndex];
        this.expandedImageError.setAttribute('hidden', '');
        this.expandedImage.removeAttribute('hidden');
        this.expandedImage.alt = `Sermon cartoon from ${this.state.activeFolder} (${this.state.currentImageIndex + 1} of ${this.state.imageList.length})`;
        this.expandedImage.onload = () => this.expandedImageError.setAttribute('hidden', '');
        this.expandedImage.onerror = () => {
            this.expandedImage.setAttribute('hidden', '');
            this.expandedImageError.removeAttribute('hidden');
        };
        this.expandedImage.src = this.imagePath(imageName);
        this.expandedCounter.textContent = `Image ${this.state.currentImageIndex + 1} of ${this.state.imageList.length}`;
        this.prevButton.disabled = this.state.currentImageIndex === 0;
        this.nextButton.disabled = this.state.currentImageIndex === this.state.imageList.length - 1;
    }

    updateFolderSelection(folderPath) {
        this.seriesButtons.forEach((button) => {
            button.setAttribute('aria-selected', button.dataset.folder === folderPath ? 'true' : 'false');
        });
    }

    nextImage() {
        if (this.state.currentImageIndex < this.state.imageList.length - 1) {
            this.state.currentImageIndex += 1;
            this.displayExpandedImage();
        }
    }

    previousImage() {
        if (this.state.currentImageIndex > 0) {
            this.state.currentImageIndex -= 1;
            this.displayExpandedImage();
        }
    }

    showLoading() {
        this.loadingSpinner.classList.add('show');
    }

    hideLoading() {
        this.loadingSpinner.classList.remove('show');
    }

    showError(message) {
        this.hideLoading();
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SermonGallery();
});
