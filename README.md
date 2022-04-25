# Neurostimulator Simulator
 
Open the "server" folder in a terminal and type "npm start".
Then open the "client" folder in a separate terminal and type "npm start".
The app should open up in a browser automatically. 

You may have to type "npm install" to install dependencies in either folder.

----------------------------------------------------------------------------------------------------

************ My Files ************

React and Express was used to create many of the files that allows the project to run. 
The files containing my code are:

In /Project/client/src:
- Components.js:      contains all function components for React to use upon rendering.
- Components.css      contains styling information for the GUI.
- App.js              driver code.

In /Project/server:
- index.js            Relays incoming HTTP requests to Logic.js.
- Logic.js            Parses HTTP requests and returns appropriate data.
- Classes.js          Contains classes used to organize the project data.

----------------------------------------------------------------------------------------------------

Neurostimulator Simulator
Based on the Axium Neurostimulator System – P150004
Summary
- The Patient Programmer device is on the left and the Clinical Programmer device is on the right.

- Both devices can be turned on with the "Turn On/Off" button on the home page.

- A device's battery (top-left) recharges when it is Off and discharges when it is on.

- At any point press the "Exit" button to go to the home page and "Save Settings" to save entered values.

- Clicking the "Program Settings" button to go the programmer information page.

  - In this page you can see device information and change the current date and time for the device.

  - You can also change which neurostimulator is connected to the device. Possible values are TNS, INS, and unbound.

  - A stimulator must be connected (cannot be "unbound") in order for a lead turned on to have any effect.

- The "Stimulation" button on the Patient Programmer allows you to change stimulation settings and see more specific health-related inforamtion.

  - Clicking the "Pain Control" tab allows you to select a stimulation group from the dropdown menu and change settings for the group's leads.

    - A lead can be selected by clicking one of the four sub tabs.

    - The "On/Off" button enables/disables the lead.

    - The "+/-" button increases/decreases the intensity of the lead stimulation.

  - Clicking the "My Info" tab allows you to see device, physician (doctor), and clinic-specific information by clicking their respective tabs.

- The "Settings" button on the Clinical Programmer allows you to change stimulation settings and change more specific health-related inforamtion.

  - Clicking the "Profile" tab allows you to see patient, clinic, and system-specific information by clicking their respective sub tabs.

    - When a sub tab is selected you can edit the various parameters for the device.

  - Clicking the "Stim" tab allows you to select a stimulation group from the dropdown menu and change settings for the group's leads.

    - A lead can be selected by clicking one of the four sub tabs.

    - The "On/Off" button enables/disables the lead.

    - The "+/-" button increases/decreases the step size of the lead stimulation. This controls the rate of intensity increase on the Patient Programmer.

    - When lead settings are saved, the Patient Programmer restarts.