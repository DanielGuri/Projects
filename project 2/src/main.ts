import CoinData from './interfaces/coin-data.js';
import Coin from './interfaces/coin.js';
import reduceCoins from './reducers/coins.js';
import Cache from './Cache.js';
import { setupEventListeners } from './event-Listener/eventListener.js';
import { CryptoChart } from './chart.js';

const cache = Cache.getInstance();
const selectedCoins = new Set<string>();
const cryptoChart = new CryptoChart();
let addedCoins = new Set();


export async function getCoins(): Promise<Coin[]> {
    const cacheResponse = await cache.getData('https://api.coingecko.com/api/v3/coins/list'); 
    // const cacheResponse = await cache.getData('coins.json');  
    const coins: Coin[] = (cacheResponse) as Coin[];
    return coins;
}

async function getCoinData(coinId: string): Promise<CoinData> {
    const cacheResponse = await cache.getData(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const coinData: CoinData = (cacheResponse) as CoinData;
    return coinData;
}

export async function coinsContainerClicked(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
        const element = e.target as HTMLElement;

        if (element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'checkbox') {
            console.log('Toggle clicked:', element); 
            handleCheckboxToggle(element as HTMLInputElement);
        } else if (element.id.startsWith('more-info-')) {
            const coinId = element.id.substring('more-info-'.length);
            const coinData = await getCoinData(coinId);
            console.log(coinData);
            document.getElementById(`data-container-${coinId}`).innerHTML = `
                <img src="${coinData.image.thumb}"/> <br>
                usd: ${coinData.market_data.current_price.usd}$ <br>
                eur: ${coinData.market_data.current_price.eur}€ <br>
                ils: ${coinData.market_data.current_price.ils}₪
            `;
        }
    }
}

function handleCheckboxToggle(checkbox: HTMLInputElement) {
    const coinId = checkbox.id.substring('toggle-'.length);
    if (checkbox.checked && selectedCoins.size >= 5) {
        const switchConfirmation = confirm('You can only select up to 5 coins. Do you want to switch coins?');
        if (switchConfirmation) {
            handleSwitchCoins(coinId);
        } else {
            checkbox.checked = false;
        }
    } else {
        if (checkbox.checked) {
            selectedCoins.add(coinId);
            addCoinToLiveReports(coinId);
        } else {
            selectedCoins.delete(coinId);
            removeCoinFromLiveReports(coinId);
        }

        console.log(`Selected coins: ${Array.from(selectedCoins).join(', ')}`);

        cryptoChart.updateSelectedCoins(selectedCoins);
        localStorage.setItem('selectedCoins', JSON.stringify(Array.from(selectedCoins)));
    }
}

export function addCoinToLiveReports(coinId: string) {
    if (!addedCoins.has(coinId)) {
        const coinCard = document.getElementById('coin-card-' + coinId);
        if (coinCard) {
            const clone = coinCard.cloneNode(true) as HTMLElement;
            clone.id = 'live-report-' + coinId;
            document.getElementById('live-reports').appendChild(clone);
        }
        addedCoins.add(coinId);
    }
}

export function removeCoinFromLiveReports(coinId: string) {
    const liveReport = document.getElementById('live-report-' + coinId);
    if (liveReport) {
        liveReport.remove();

        const homeTabCheckbox = document.getElementById('toggle-' + coinId) as HTMLInputElement;
        if (homeTabCheckbox) {
            homeTabCheckbox.checked = false;
        }
        cryptoChart.stopChartForCoin(coinId);

        selectedCoins.delete(coinId);
        console.log(`Removed coin ${coinId} from live reports and stopped chart updates.`);
    }
}

async function handleSwitchCoins(newCoinId: string) {
    const currentSelectedCoins = Array.from(selectedCoins);

    const coinToRemove = await promptForCoinToRemove(currentSelectedCoins);

    if (coinToRemove) {
        selectedCoins.delete(coinToRemove);
        console.log(`Removed coin ${coinToRemove} from live reports.`);

        selectedCoins.add(newCoinId);
        console.log(`Switched ${coinToRemove} with ${newCoinId}`);

        updateUIAndCharts(coinToRemove, newCoinId);
    }
}

function updateUIAndCharts(removedCoinId: string, addedCoinId: string) {
    removeCoinFromLiveReports(removedCoinId);
    addCoinToLiveReports(addedCoinId);

    cryptoChart.updateChart();

    alert(`Switched ${removedCoinId} with ${addedCoinId}`);
}


function promptForCoinToRemove(coinsArray: string[]): string | null {
    let userChoice: string | null = null;

    while (userChoice === null) {
        const userInput = prompt(
            `You have selected more than 5 coins. Choose a coin to remove:\n${coinsArray.join(', ')}`
        );

        if (userInput === null) {
            break;
        }

        const normalizedInput = userInput.trim().toLowerCase();

        if (coinsArray.indexOf(normalizedInput) !== -1) {
            userChoice = normalizedInput;
        } else {
            alert(`Invalid input. Please choose a coin from the list.`);
        }
    }

    return userChoice;
}

(async () => {
    setupEventListeners(selectedCoins);

    const coins = await getCoins();
    displayCoins(coins.slice(0, 100));

    function displayCoins(coinsToDisplay: Coin[]) {
        const html = reduceCoins(coinsToDisplay);
        document.getElementById('coins-container').innerHTML = html;
    }
})();

export { addedCoins };
