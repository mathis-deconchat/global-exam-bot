function getElementsByXPath(xpath, parent) {
    let results = [];
    let query = document.evaluate(xpath, parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

async function getCorrections(specialShit) {
    if(specialShit == false){
        let correction = getElementsByXPath("//span[text()='Voir la correction']")
        if (correction && correction.length > 0) {
            console.log("Correction found")

            correction.forEach(element => {
                element.click()
            });
            return true
        } else {
            console.error("No correction found")

            return false
        }
    }
    if(specialShit == true){
        let correction = getElementsByXPath("//button[@class='button-outline-default-large hidden min-w-48 mr-6 lg:flex lg:items-center' and span[text()='Correction']]")
        if (correction && correction.length > 0) {
            correction.forEach(element => {
                element.click()
            });
            return true
        } else {
            console.error("No corrections found")

        }
      
    }
    return 
}



async function getAnswers() {
    let answers = getElementsByXPath('//label[contains(@class, "bg-success-05")]')
    if (answers && answers.length > 0) {
        console.log("Answer found")
        answers.forEach(element => {
            element.click()
        });
        return true
    } else {
        console.error("No answer found")

        return false
    }
}

async function clickOnValidateOrNext() {
    let validate = getElementsByXPath('//button[contains(text(), "Valider") and contains(@class, "button-solid-primary-large")]')
    if (validate && validate.length > 0) {
        validate[0].click()
        return
    }

    let terminate = getElementsByXPath('//button[contains(text(), "Terminer") and contains(@class, "button-solid-primary-large")]')
    if (terminate && terminate.length > 0) {
        terminate[0].click()
        return
    }

    let next = getElementsByXPath('//button[contains(text(), "Suivant") and contains(@class, "button-solid-primary-large")]')
    if (next && next.length > 0) {
        next[0].click()
        return
    }


}

async function findIfLastPageAndReturnToList(){   

        let returnToList = getElementsByXPath('//span[contains(text(), "Retour à la liste") and contains(@class, "text-white")]')
        if(returnToList && returnToList.length > 0){
            console.log('return to list')
            returnToList[0].click()
            await new Promise(r => setTimeout(r, timeout));
            return 
        }   
        return
    
}

async function doShit(){
    let terminate = getElementsByXPath('//button[contains(text(), "Terminer") and contains(@class, "button-solid-primary-large")]')
    let i = 0
    let twoPageShitBoolean = false
    let twoPageShit = getElementsByXPath("//button[@class='button-outline-default-large hidden min-w-48 mr-6 lg:flex lg:items-center' and span[text()='Correction']]")
    while(terminate.length == 0 && i <= 30){
        console.log('i = ' + i)
        if(twoPageShit && twoPageShit.length > 0 && twoPageShitBoolean == false){
            console.log("It's special shit")
            twoPageShitBoolean = true
        }


        await getCorrections(twoPageShitBoolean)
        await new Promise(r => setTimeout(r, timeout));

        await getAnswers()
        await new Promise(r => setTimeout(r, timeout));

        await clickOnValidateOrNext()
        await new Promise(r => setTimeout(r, timeout));

        terminate = await getElementsByXPath('//button[contains(text(), "Terminer") and contains(@class, "button-solid-primary-large")]')
        console.log("terminate length" + terminate.length)
        i++
    }
    console.log("Exercice finished")
    await new Promise(r => setTimeout(r, timeout));
    if(terminate.length > 0){
        await findIfLastPageAndReturnToList()
        console.log('Finished :)')
        return
    }
    return 
}

async function main(){
   let getUndoneTiles = await getElementsByXPath("//button[not(contains(span, 'Dernier score')) and (span[contains(@class, 'bg-listening')] or span[contains(@class, 'bg-reading')])]")
   let i = 0
    while(getUndoneTiles.length != 0 && i <= 10){
        console.log('STARTING TILE ' + i)
        getUndoneTiles[0].click()
        await new Promise(r => setTimeout(r, (timeout + 2000)));
        await doShit()
        await new Promise(r => setTimeout(r, (timeout + 2000)));

        getUndoneTiles = getElementsByXPath("//button[not(contains(span, 'Dernier score')) and (span[contains(@class, 'bg-listening')] or span[contains(@class, 'bg-reading')])]")
        console.log("new tiles" + getUndoneTiles)
    }
}

const timeout = 3000
await main()
// If you just want to execute the script on only one exercise, you can use this line instead of the main function
// await doShit()

