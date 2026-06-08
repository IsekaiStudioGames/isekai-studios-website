
document.querySelectorAll('.portal').forEach(portal =>
{
    // Click handler for portals
    portal.addEventListener('click', function(e)
    {
        // Prevent default link behavior
        e.preventDefault();
        // Get the modal name from the data attribute
        const modalName = this.dataset.modal;
        // Start the expanding animation
        this.classList.add('expanding');
        // Listen for the end of the transition to open the modal
        this.addEventListener('transitionend', function handler()
        {
            // Open the modal after the animation completes
            setTimeout(() => {
            openModal(modalName)
            }, 300); // slight delay to ensure animation is fully done
            
            this.classList.remove('expanding'); // Reset the portal state
            this.removeEventListener('transitionend', handler);
        });
    });
});
