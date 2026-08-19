function ShootingStars() 
{
    // Create the stars div
    const star = document.createElement('div');
    // Add the shooting stars class from the java file
    star.classList.add("shootingstars");
    // Spawn the stars at a random point on the screen (using inner width to get the entire screen width)
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * 200;
    // Start the position on the top left of the screen
    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    // Add to the bottom of list
    document.body.appendChild(star);
    // play the animation and remove the stars entirely after the stars are off screen
    star.style.animation = 'ShootingStars 1s linear';
    setTimeout(() => {
        star.remove();
    }, 1500);
}
// timer for when the stars should show (to make it look more natural)
function ScheduleStars()
{   
    // Add in the stars funtion
    ShootingStars();
    // set certain amount of time before the stars are able to appear and set the value to random
    const nextTime= Math.random() * 5000 + 2000;
    setTimeout(ScheduleStars, nextTime);
}

// Basically acts as a play button for everything to show up
ScheduleStars();