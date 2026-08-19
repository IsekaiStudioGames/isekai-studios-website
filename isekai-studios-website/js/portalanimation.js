// activeportal variable to keep track of the currently active portal
let activeportal = null;

document.querySelectorAll('.portal').forEach(portal =>
{
    // Click handler for portals
    portal.addEventListener('click', function(e)
    {
        // Prevent default link behavior
        e.preventDefault();
        // Get the modal name from the data attribute
        const modalName = this.dataset.modal;
        // Set the active portal
        activeportal = this;
        // Start the expanding animation
        this.classList.add('expanding');
        // Listen for the end of the transition to open the modal
        this.addEventListener('transitionend', function handler()
        {
            // Hide the portal
            this.classList.add('hidden'); 
            // Open the modal after the animation completes
            setTimeout(() => {
            openModal(modalName)
            }, 200); // 2 second delay to ensure animation is fully done
            setTimeout(() => {
            this.classList.remove('hidden'); // Reset the portal state after the modal is open
            }, 500); // 5 second delay to ensure modal is fully open before resetting portal
            // this.classList.remove('expanding'); // Reset the portal state
            this.removeEventListener('transitionend', handler);
        });
    });
});
