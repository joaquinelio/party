
El objetivo es un juego de cartas y "acciones" en una página html y javascript.

Metodos y propiedades en ingles -cosa que me olvido-

# componente Deck 
 
[Deck](src/deck/deck.md)


# pagina 

Se verá como una página unica. Los html y js para distintas operaciones o modos estaran en archivos separados para facilitar su mantenimiento, como el ABM del json de acciones, el ABM de iconos de accion, la configuracion de juego, y el tablero con la mecanica del juego.



# Infraestructura juego:

Cada jugador tiene 
un "elemento", uno solo e inamovible durante el juego que es "arma" o "escudo", no puede tener ambos.
una propiedad mental que es "Ataque" o "Defensa" o "Ambos", tampoco variará durante el juego.
Todas las combinaciones de elemento y mental están permitidas (ej un escudo puede ser solo de ataque). Serán los jugadores quienes decidan si permiten o no ciertas combinaciones en la configuracion de nombres.


Habrá un json para las acciones (cada item es un texto) 
subdividido en 3 listas correspondientes a oro, basto, copa (la espada se ignora),
cada lista tiene un indice porque la accion no es aleatoria sino que se va incrementando, el azar solo está en el enfrentamiento ataque-defensa
Cada indice tiene dos items, uno para cada "elemento", porque la accion depende del elemento.

Debe haber un js + html con el crud para ese json, es parte del diseño pero debe ser facil aportar a tal diseño por terceros. En un futuro el json ira a una carpeta distinta (como el user/appdata de windows) o a la nube, así que debe ser facilmente identificable con una sola configuracion de origen) 

una carpeta con iconos jpg o svg que representaran visualmente las acciones, aun no dibujados, que seran mostrados si el espacio lo permite (o segun una opcion de configuracion al inicio del juego) a continuacion del texto de cada celda, o apareceran dicha celda con mouseover, y se escalaran (quizas hasta pantalla completa aunque no es necesario tanto) cuando el puntero de mouse se mantenga presionado. Estaran dentro de una estructura simple en subcarpetas. una  carpeta para "arma" y otra para "escudo", dentro de cada una de ellas 3 carpetas "copa" "oro" "basto", y dentro de cada una de estas los iconos jpg o svg. Pueden tener cualquier nombre, pero los primeros dos caracteres del nombre identificaran el indice que tomará de la celda. Ejemplo icons/escudo/copa/00vacio.jpg o icons/escudo/05accion5.svg. Si el dibujo correspondiente al indice no se encuentra se mostrará el indice inmediato inferior más cercano. 

Un js + html para la configuracion inicial del juego en sí:
minimo dos jugadores maximo 7.
Pregunta nombre del jugador, elemento (uno de dos), propiedad mental (una de dos), el numero asignado (que corresponde a un numero del mazo 1 2 3 4 5 6 7 10 11 12), y opcional un avatar elegido desde una carpeta del proyecto o una externa. Una vez aceptado ninguno de estos datos cambia.

Un js + html con la mecanica del juego. Debe estar aislado de la config, pues es complejo y será muy editado en diseño.
Tablero:
en filas, los jugadores de propiedad "ataque" o "ambos". El titulo de la fila tendra el nombre y nro asignado
en columnas, los jugadores de propiedad "defensa". El titulo de la columna tendra el nombre y nro asignado.
Como los jugadores con propiedad "ambos" aparecen en filas y columnas, las celdas donde intersecte el mismo jugador serán opacas. Las demas seran inicializadas ( cada interseccion tiene 3 celdas, todas inicializadas con 0  )

Cada interseccion estará dividida en tres filas, el subtitulo (una sola vez al lado del titulo de la fila) provisorio de las filas: "copa" "oro" "basto". 
Cada celda tiene la ultima accion registrada. Toda informacion debe estar en esa tabla.
Si hay espacio suficiente, cada titulo de fila y columna mostrara el avatar. Si no, lo mostrará con el mouseover.

un div para mostrar 2 cartas, izquierda y derecha (o arriba y abajo, depende del espacio). No debe ocupar mucho en la página, lo principal es el tablero. Si no hay espacio suficiente, este div se ocultará cuando no esté activo

Se eliminan del mazo los nros que no tienen jugador asignado.

# comienza el juego.

Un botón para comenzar a tirar cartas. Los jugadores no tienen contenedores, solo se iran tirando las cartas en un div de 2 slots.

Si se inicia el juego o se acabaron la cartas, mezcla.

comienza loop hasta que se acaban las cartas.

Tira la primera carta ( izquierda) "ataque". Si el nro corresponde a un jugador "ataque" o "ambos", será considerado atacante (filas). Para ataque solo se usa el nro, no el palo. Breve pausa, tira carta derecha "defensa". Si esta segunda carta corresponde a un jugador de "ataque", se notificará que este ultimo perdió un ataque (por ahora puede ser popup, mejor será iluminar brevemente en color deprimente la fila del jugador que cayó en el hueco "defensa").  Breve pausa, se mantiene la primera carta, ataque, y se tira de nuevo la segunda hasta que la ocupe un nro correspondiente a jugador "defensa" o "ambos", que será considerado "defensa" y procede a "accion", pero si la celda ya fue abatida por otro jugador, ese ataque se frustra y el loop continua buscando carta en el slot 1, el de ataque. 

ACCION: se realza la interseccion ( las 3 celdas), se ilumina la celda corresponde al palo del jugador "defensa", y su indice se incrementa en 1, el texto de la celda sera el del json de acciones. Se evalua el estado del defensor con respecto al atacante actual y los demas para el palo especifico. Si es el primero que llegó a tal indice toma el dominio, la celda ataque/defensa/palo se pintara de un color vivo, y la de los otros ataques ajenos /defensa/palo continuaran manteniendo el texto previo pero se agrisarán.  Un popup con el texto, los avatares, y el icono de accion aparecerán, color vivo si es el primero en llegar y toma el dominio o gris informativo solamente, y esperará el ok para continuar con el loop. Si el indice llegó a su máximo, el texto mostrara "abatido" en la celda, color vivo de dominio si es el primero o gris sin dominio si otro abatio ese /defensa/palo antes. 
Importante diferenciar si es el primero en llegar al maxximo nivel de celda. Si es el primero, mantiene o gana el dominio y la accion se ejecuta, si no, el nivel alcanzado es un avance pero el dominio sigue siendo del que llego primero y el popup debe manifestarlo. La celda del defensor debe tener el nro o avatar del atacante que tiene dominio, parcial o total. Esto tambien afecta la mecanica del juego. Si ya estaba abatido, si tiene el dominio se descarta la segunda carta de defensa y se procede con el loop para ocupar el segundo slot, "defensa", si no, el ataque se pierde y se renuevan las cartas de los dos slots.

Si las 3 celdas de una interseccion tienen el estado "abatido", implica la derrota del jugador "defensa", se pintará (en rojo? ) las 3 celdas y se opacara el resto de la columna del defensor, haciendo claro qué atacante lo derrotó, no importa que los otros atacantes tengan "abatido" parciales, las celdas dominadas por otros jugadores pasan a ser del primero que logró las 3 celdas. Un popup de aviso  (atacante, defemsoor, avatares, los 3 iconos de estado), se elimina del mazo el nro del derrotado, se continua con el loop.

si se acabaron las cartas: si quedo un ataque pendiente se pasaran al mazo todas las cartas menos la del atacante que seguira mostrandose en el primer slot de 2 (esto es una regla de juego que podria cambiar en el fututo, así que debe hacerse fácil o configurable que, si queda un ataque pendiente este se pierda al mezclar). 
si no, se limpia el div y se pasan todas. en ambos casos se reinicia el loop esperando el clic en el boton.

# dominio parcial y reconquistas

el dominio de una celda pertenece al primer atacante que alcanzo un determinado nivel en una celda. Incluso si dos atacantes tienen el mismo nivel (indice) el dominio pertenece al primero que llegó. Quien llega despues va incrementando niveles de indice pero no tiene repercusion si no lo supera. Pero "abatido" es el nivel maximo, no importa cuantas veces otro atacante llegue, no puede superar el nivel maximo ergo el atacante que logró ese "abatido" lo mantiene. 
Esto cambia cuando un atacante consigue el nivel maximo en las 3 celdas, en este caso las conquistas parciales ajenas pasan a ser victorias propias y a partir de ahi es intransferible. 

Un jugador completamente abatido tiene un vencedor unico, si este a su vez es completamente abatido su anterior victoria no es transferible (esta regla es discutible y puede cambiar) 
Pero un "abatido" parcial 

# fin
Un jugador "ambos" (ataque y defensa) se retira del juego cuando sus 3 celdas son abatidas. Si antes abatió a otros jugadores, le quedará ese mérito.
El juego termina cuando todos los defensores fueron abatidos

Los empates son posibles si hay jugadores que solo atacan. 
El unico destino de los defensores es ser abatido.
Un atacante/defensor puede salvarse de ser abatido si gana al ultimo defensor
No hacen falta descripciones finales porque quedara visualmente registrado en la tabla quienes abatieron a quienes.

## Demos

- [Demo simple de slots](src/demo/slot.html): dos contenedores (slots) sincronizados con un modelo lógico en JavaScript. Muestra cómo dar vuelta una carta al hacer clic.
