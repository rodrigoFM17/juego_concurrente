import { formatMoney } from "../Canvas/utils/format/formatMoney"

type props = {
    money: number
    disabled: boolean
    whosTurn: "A" | "B"
    shoot: any
    luckyShoot: any

}

export default function PartyContainer ({money, disabled, whosTurn, shoot}: props) {

    return(
        <div className="container-party">
            <h2>Jugador {whosTurn}</h2>
            <span>{formatMoney(money)}</span>
            <div className="container-buttons">
                <button onClick={() => shoot(whosTurn)} disabled={disabled}>
                    Fuego !!!
                </button>
                <button disabled={disabled}>
                    Dano x 2
                </button>
                <button disabled={disabled}>
                    Tiro de la Suerte
                </button>
                <button disabled={disabled}>
                    Dano x 3
                </button>
                <button disabled={disabled}>
                    Dano x 5
                </button>
                <button disabled={disabled}>
                    Disparo Certero
                </button>
                <button disabled={disabled}>
                    Investigacion de Campo
                </button>
                <button disabled={disabled}>
                    Bomba de Racimo
                </button>
                <button disabled={disabled}>
                    Domo de Hierro
                </button>
            </div>

        </div>
    )
}