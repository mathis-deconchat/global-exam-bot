# Bot for global exam

## How to run
Copy the code in `script-global.js` and paste in the devtools of your browser (console)

## How to use
Change timeout in `script-global.js` to your liking (default is 2 seconds)
1200000 = 20 minutes  

### First mode, all-in 
Go to the page where all exercises are listed, something like `https://exam.global-exam.com/user-plannings/...` and execute the script as described above. The bot will go through all exercises and submit them.
It sometimes crashes, so you have to restart it.

### Second mode, one-by-one
Go to a specific exercise, in the script change the last function call (change ` await main() to await doExercise()`) and execute the script. 
It will only execute the exercise you are on.

## How to stop
Refresh the page 

## Bugs
Open an issue if you find one

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.  
- [ ]  Check why it sometimes crash in all-in mode
- [ ]  Make it more robust (so it won't check for answers when in tiles selection for example)
- [ ]  Make logs more sexy 