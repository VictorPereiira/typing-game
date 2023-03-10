import { Menu, MenuJS } from "../components/Menu";
import { BtnStartGameJS } from "../components/BtnStartGame";
import { InputJS } from "../components/Input";

async function activeButtonsFun() {
    await MenuJS()
    await BtnStartGameJS()
}

export default activeButtonsFun;