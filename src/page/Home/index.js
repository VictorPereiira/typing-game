import { $ } from "../../utils/snippets";
import "./_style.scss";

import { BtnStartGame } from "../../components/BtnStartGame";
import { Time } from "../../components/Time";
import { Input } from "../../components/Input";
import { Point } from "../../components/Point";
import { Word } from "../../components/Word";

async function Home() {
    return /*html*/ `
        <div id="home">
            <header>
                <section class="header__title">
                    <h1>Typing Game</h1>
                </section>
                <section class="header__actions">
                    ${await Time()}
                    <button class="header__button"></button>
                </section>
            </header>
            <main>
                ${await Word()}
                ${await Point()}
                ${await Input()}
                ${await BtnStartGame()}
            </main>
            <footer>
                <p>Made by <a href="https://github.com/VictorPereiira" target="_blank">VictorPerreira</a></p>
                <p>© 2023</p>
            </footer>
        </div>
    `
}

export default Home;