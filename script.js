function updateGamepad() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];

    if (gamepad) {
        document.getElementById('status').textContent = `Connected: ${gamepad.id}`;
        
        // Update axes
        const axesDiv = document.getElementById('axes');
        axesDiv.innerHTML = '';
        gamepad.axes.forEach((axis, index) => {
            const axisDiv = document.createElement('div');
            axisDiv.className = 'axis';
            axisDiv.innerHTML = `
                <p>Axis ${index}</p>
                <div class="slider"><div class="value" style="width: ${((axis + 1) / 2) * 100}%"></div></div>
            `;
            axesDiv.appendChild(axisDiv);
        });

        // Update buttons
        const buttonsDiv = document.getElementById('buttons');
        buttonsDiv.innerHTML = '';
        gamepad.buttons.forEach((button, index) => {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button';
            buttonDiv.textContent = `Button ${index}`;
            if (button.pressed) {
                buttonDiv.classList.add('pressed');
            }
            buttonsDiv.appendChild(buttonDiv);
        });
    } else {
        document.getElementById('status').textContent = 'No joystick connected';
    }
}

function init() {
    window.addEventListener('gamepadconnected', () => {
        document.getElementById('status').textContent = 'Gamepad connected!';
        updateGamepad();
    });

    window.addEventListener('gamepaddisconnected', () => {
        document.getElementById('status').textContent = 'Gamepad disconnected';
    });

    // Update the gamepad status every frame
    function gameLoop() {
        updateGamepad();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

window.onload = init;
