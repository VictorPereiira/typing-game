import { $ } from "../../utils/snippets";
import "./_style.scss";

async function Home() {
    return /*html*/ `
        <div id="home">
            <header>
                <section class="header__title">
                    <h1>Typing Game</h1>
                </section>
                <section class="header__actions">
                    <div>
                        <p class="header__time">10<span class="header__meter-time">s<span></p>
                        <span class="header__icon-time"></span>
                    </div>  
                    <button class="header__button"></button>
                </section>
            </header>
            <main>
                <h2 class="main__word">Happiness</h2>
                <div  class="main__point">
                    <span class="main__icon-point">.</span>
                    <span class="main__count-point">0</span>
                </div>
                <input class="main__input" type="text" placeholder="Write the word here!!!">
                <button class="main__button">Start Game</button>
            </main>
            <footer>
                <p>Made by <a href="https://github.com/VictorPereiira" target="_blank">VictorPerreira</a></p>
                <p>© 2023</p>
            </footer>
        </div>
    `
}

export default Home;