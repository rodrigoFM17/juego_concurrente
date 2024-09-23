import  './GameHelp.css'

export default function GameHelp() {
  return (
    <header className='game-help'>
        <span>
          Todo en <span>CryptoWars</span> es aleatorio, la posicion de las tropas, el daño realizado, el dinero inicial y la tropa que realiza el disparo. 
          Lo unico que no es aleatorio son tus <span>desiciones</span> y la estrategia que decidas tomar para vencer a tu enemigo 
        </span>
        <span>
          <span>Nota: </span> si un disparo falla, 
          la posicion del mismo se descarta para proximos disparos, 
          si un disparo elimina a una tropa se gana el 20%. 
          El juego termina al eliminar a 20 tropas o tener menos de 50,000. Todos los porcentajes son respecto a tu dinero actual
        </span>
        <span>
          <span>Fuego:</span> disparo con un costo del 2%
        </span>
        <span>
          <span>Daño x2:</span> daño duplicado con un costo del 4%
        </span>
        <span>
          <span>Tiro de la suerte:</span> si aciertas este disparo tu dinero aumentara un 20%, pero si fallas perderas un 10%
        </span>
        <span>
          <span>Daño x3:</span> daño triplicado con un costo del 6%
        </span>
        <span>
          <span>Disparo certero:</span> disparo que siempre impactara un enemigo con un costo de 8%
        </span>
        <span>
          <span>Daño x5:</span> daño quintuplicado con un costo del 10%
        </span>
        <span>
          <span>Investigacion de campo:</span> conseguiras 10 posiciones donde no hay enemigos con un costo del 10%
        </span>
        <span>
          <span>Bomba de racimo:</span> 5 disparos a diferentes posiciones con un costo del 10%
        </span>
        <span>
          <span>Domo de hierro:</span> si el siguiente ataque del enemigo acierta, tu dinero aumentara en 15% con un costo del 6% 
        </span>
      </header>
  )
}
