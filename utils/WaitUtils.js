
class WaitUtils{

    async waitForGivenTime(timeInSeconds){
        console.log(`Waiting for ${timeInSeconds} seconds.`);
        await new Promise(resolve => setTimeout(resolve, timeInSeconds * 1000));
    }
}

export default new WaitUtils;


