aun es bosquejo 

# card

Una clase (¿o subclase de Deck ?) `Card`,
Solo devuelve un svg (listo para inyectar en un div html) de la carta que se pasa como argumento (palo,nro). El svg debe tener el dibujo (para los nro 10 11 12)/dibujos (1 al 9) del palo grandes y, como en las cartas reales, uno pequeño en la esquina al lado del numero para identificarlas si estan boca arriba aun cuando haya cartas superpuestas encima. Sin svg externos, un solo js con las definiciones svg para los palos y dibuje dinamicamente las cartas que usando esas def.

Cada carta de Deck tiene la propiedad bool para exponerla o no, podria ser "visible" o "boca arriba", cuando falso muestra la img del dorso, por ahora opaco, configurable en un futuro también.


# deck

Una class `Deck`, arranca con un contenedor (o pila) "mazo" 
El constructor acepta baraja (española 40, española 50, francesa)
Metodo para crear contenedores (o pilas), que son arrays de objetos (cartas p ej, al deck, agregar mesa y los jugadores)



## metodos operaciones  

- mezclar  
- visibilizar o no carta o contenedor (poner boca arriba) o pila (dar vuelta todas)
- mover cartas entre contenedores (sea una carta especifica o mediante un puntero, por ejemplo "del tope" cuando estamos repartiendo cartas desde el mazo), 
- metodos q devuelvan en array el contenido de un contenedor,

## metodos para dibujar 

- svg en el html (en el div q se pase como parametro): 
- svg de un palo especifico, el svg de basto, copa, oro o espada,
- svg de una carta especifica [ podría ser deck.card.draw(palo, nro) o algo así ],
- svg de una carta de un contenedor, por indice especifico dentro del contenedor o "del tope",
- un contenedor entero (con una propiedad bool overlap como argumento, para que dibuje en el div todas las cartas enteras o en version compacta para que se vea completa solo la carta superior y solo  el palo y nro de la esquina de las inferiores)  

- boolean pila.compacto, 
compacto=true determina que se muestra solo la carta de arriba ( la carta del tope puede ser visible o no, pero card.overlap no tiene efecto), 
compacto=false muestra la pila desplegada, 
donde 
overlap=false tiene el efecto de mostrar todas las cartas de la pila una al lado de la otra ocupando un monton de espacio,
overlap=true una apenas encima de la otra para permitir un espacio para ver nro y palo de las cartas tapadaas (o un pedazo del dorso si visible=false)  


## metodos animaciones html 
opcional, junto con dibujos o movimientos y el cambio de estados de las cartas, la animacion html para cada operacion de dibujo (dar vuelta al visibilizar, trasladar al mover entre pilas, ) 


Deck, con Card, son clases que quiero tener limpias para ser reutilizadas en otros proyectos como un webcomponnent o modulito exportable
