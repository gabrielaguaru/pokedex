import pikachu from "../../../src/pikachu.gif"
import logo from "../../../src/pokedex.png"
import "./Header.css"

export default function Header() {
    return (
        <header>
            <img src={logo} alt="" className="logo" />
            <img src={pikachu} alt="" className="pikachu" />
        </header>
    )
}