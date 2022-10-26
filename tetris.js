/********************
 PARÁMETROS
********************/
// Numero de cuadros de la figura
nCuadros = 4;
// Tipos de figura
nTipos = 7;
// Tamaño del tablero
tableroAlto=20;
tableroAncho=10;
// Nivel del juego
nivel =1;
// Velocidad del juego
velocidad0 = 700;
velocidadk= 60;
velocidad = velocidad0 - velocidadk*nivel;
// Numero de lineas
nLineas =0;

/********************
VARIABLES GLOBALES
********************/
// Coordenadas actuales
curX = 1; curY =1;
// Ultima linea disponible 
lineaLimite = tableroAlto-1;
// SerialN
serialN =0;
// Banderas
tableroCargado = 0;
pausaJuego = 0;
inicioJuego  = 0;
finJuego = 0;
// Timer
timerID=null;
// Imagenes
if(document.images){
    Img0= new Image(); Img0.src='s0.png';
    Img1= new Image(); Img1.src='s1.png';
    Img2= new Image(); Img2.src='s2.png';
    Img3= new Image(); Img3.src='s3.png';
    Img4= new Image(); Img4.src='s4.png';
    Img5= new Image(); Img5.src='s5.png';
    Img6= new Image(); Img6.src='s6.png';
    Img7= new Image(); Img7.src='s7.png';
}
// Arreglos
f= new Array();
for(i=0;i<20;i++){
    f[i]= new Array();
    for(j=0;j<20;j++){
        f[i][j] = 0;
    }
}
xBorrar = new Array(0,0,0,0); yBorrar = new Array(0,0,0,0);
// Desplazamiento dx, dy, dx_, dy_
dx= new Array(0,0,0,0);    dy= new Array(0,0,0,0);
dx_= new Array(0,0,0,0);   dy_= new Array(0,0,0,0);
// dxBank dyBank 
dxBank= new Array(); dyBank= new Array();
dxBank[1]= new Array(0,1,-1,0); dyBank[1]= new Array(0,0,0,1);
dxBank[2]= new Array(0,1,-1,-1); dyBank[2]= new Array(0,0,0,1);
dxBank[3]= new Array(0,1,-1,1); dyBank[3]= new Array(0,0,0,1);
dxBank[4]= new Array(0,-1,1,0); dyBank[4]= new Array(0,0,1,1);
dxBank[5]= new Array(0,1,-1,0); dyBank[5]= new Array(0,0,1,1);
dxBank[6]= new Array(0,1,-1,-2); dyBank[6]= new Array(0,0,0,0);
dxBank[7]= new Array(0,1,1,0); dyBank[7]= new Array(0,0,1,1);

/********************
INICIO JUEGO
********************/
function inicio(){
    //Manejo de eventos
   document.addEventListener('keydown',pulsarTecla);
   document.addEventListener('keyup',levantarTecla);
    //Limpiar variables
    reiniciarJuego();
    top.focus();
}
function iniciarJuego(){
    if(finJuego){
        this.history.back();
        finJuego = 0;
    }
    top.focus();

    if(inicioJuego){
        if(!tableroCargado){
            return
        }
        if(pausaJuego){
            reanudarJuego();
        }
        return;
    }
    // Obtiene pieza
    obtenerPieza();
    // Dibuja pieza
    dibujarPieza();
    // Enciende la bandera de inicio
    inicioJuego=1;
    // Apaga la bandera de pausa
    pausaJuego=0;
    // Recupera el numero de lineas
    this.document.form1.lineas.value = nLineas;
    // Iniciar setTimeout 
    timerID = setTimeout("jugar()",velocidad);
    
    console.log("iniciar juego");
}
function pausarJuego(){
    if(tableroCargado && inicioJuego){
        if(pausaJuego){
        
            
            reanudarJuego();
            return;
        }
        clearTimeout(timerID);
        pausaJuego = 1;
        top.focus();
    }
}
function reanudarJuego(){
    if(tableroCargado && inicioJuego && pausaJuego){
        
        jugar();
        pausaJuego = 0;
        top.focus();
    }
}
function reiniciarJuego(){
    //Limpia las variables a 0
    // variables locales:i,j
    // variables globales: tableroAlto, tableroANcho, f, inicioJuego, pausaJuego, nLineas,
    // serialN
    // salida: f, inicioJuego, pausaJuego, nLineeas, serialN
    for(i = 0; i < tableroAlto; i++){
        for(j = 0; j < tableroAncho; j++){
            //MATRIZ DOBLE 
            f[i][j] = 0;
            if(tableroCargado){
                // cargamos recuadros blancos
                eval("top.document.s"+i+"_"+j+".src='s0.png'");
            }
        }
    }
    // Iniciar banderas
    inicioJuego = 0;
    pausaJuego = 0;
    nLineas  = 0;
    serialN = 0;
    // Ultima linea disponible
    lineaLimite = tableroAlto-1;
    // Numero de lineas
    if(tableroCargado){
        this.document.form1.lineas.value = nLineas;
    }
    console.log("reinicio juego");
}

/******************
    NIVEL
 *****************/
function removerLineas(){
    for(i=0;i<tableroAlto; i++){
        bandera = 0;
        for(j=0;j< tableroAncho; j++){
            if (f[i][j]==0) {
                bandera = 1;
                break;
            }
        }
        if(bandera)continue;
        
        for(k;k>=lineaLimite;k--){
            for(j=0;j< tableroAncho; j++){
                f[k][j] = f[k-1][j];
                eval('this.document.s'+k+'_'+j+'.src=Img'+f[k][j]+'.src');
            }
        }
        for(j=0;j< tableroAncho; j++){
            f[0][j]= 0;
            eval('this.document.s'+0+'_'+j+'.src=Img0.src');
        }
        nLineas++;
        lineaLimite++;
        this.document.form1.lineas.value = nLineas;
        if (nLineas%5==0) {
            nivel++;
            if (nivel>10) nivel =10;
        }
        velocidad = velocidad0 - velocidadk*nivel;
        this.document.form1.s1.selectedIndex = nivel-1;
    }
}
function recuperarNivel(){
    nivel=parseInt(this.document.form1.s1.options[this.document.form1.s1.selectedIndex].value)
    velocidad = velocidad0 - velocidadk*nivel;
    top.focus();
}   

/******************
    PIEZAS
 *****************/
function obtenerPieza(N){
    var k;
    piezaActual = (obtenerPieza.arguments.length==0)?1+Math.floor(nTipos*Math.random()):N;

    curX=5;
    curY=0;
    // Vaciar arreglos de la figura
    for(k=0;k<nCuadros; k++){
        dx[k]=dxBank[piezaActual][k];
        dy[k]=dyBank[piezaActual][k];
    }
    // Igualar arreglos de la figura
    for(k=0;k<nCuadros; k++){
        dx_[k]=dx_[k];
        dy_[k]=dy_[k];
    }
    // Validar pieza
    if(validarPieza(curX,curY)){
        dibujarPieza();
        return 1;
    }
    return 0;
    
}
function dibujarPieza(){
    var k, X, Y;
    // Verificar si el tablero esta cargado
    if(document.images && tableroCargado){
        for(k=0;k<nCuadros; k++){
            // Recuperar valores
            X=curX + dx[k];
            Y=curY + dy[k];
            // Verificar que no salga del cuadros
            if(Y>=0 && Y< tableroAlto && X>=0 && X< tableroAncho && f[X][Y] != -piezaActual){
                // Dibujar la pieza
                eval("self.document.s"+Y+"_"+X+".src=Img"+piezaActual+".src");
                // Almacenamos el valor de la pieza
                f[Y][X]=-piezaActual;
            }
            X=xBorrar[k];
            Y=yBorrar[k];
            // Si el valor anterior es igual a 0, lo borramos
            if(f[Y][X] == 0){
                eval("self.document.s"+Y+"_"+X+".src=Img0.src");
            console.log("Pieza creada",piezaActual);
            }
        }
    }
}
function jugar(){
    console.log("jugar");
    if(moverAbajo()){
        timerID = setTimeout("jugar()",velocidad);
    }else{
        redibujarMatriz();
        removerLineas();
       
        if(lineaLimite>0 && obtenerPieza()){
            timerID = setTimeout("jugar()",velocidad);
            return;
        }else{
            activeL_=0; activeU_=0;
            activer_=0; activeD_=0;
            if(confirm("Fin del juego\n\n¿Volver a intentarlo?")){
                inicio();
            }else{
                if(finJuego){
                    inicio();
                }else{
                    self.close();
                }
            }
        }
    }
    
}
function redibujarMatriz(){
    // Para las figuras
    console.log("redibujarMatriz");
    for(k=0;k<nCuadros; k++){
        // Proximo cuadro
        X =curX+dx[k];
        Y =curY+dy[k];
        if (Y>=0 && Y<tableroAlto && X>=0 && X<tableroAncho) {
            f[Y][X]=piezaActual;
            if (Y<lineaLimite)lineaLimite=Y;
        }
    }
    top.focus();
}
function borrarPieza(){
    console.log("pieza borrada");
    if (document.images && tableroCargado) {
        for(k=0;k<nCuadros; k++){
            X =curX+dx[k];
            Y =curY+dy[k];
            if (Y>=0 && Y<tableroAlto && X>=0 && X<tableroAncho) {
                xBorrar[k]=X;
                yBorrar[k]=Y;
                f[Y][X]=0;
            }
        }
    }
}
function validarPieza(X,Y){
    for(k=0;k<nCuadros; k++){
        // Suma distancia
        miX = X +dx_[k];
        miY = Y +dy_[k];
        // si se sale la ficha 
        if (miX<0 || miX>=tableroAncho || miY>=tableroAlto) return 0;
        if(miY>-1 && f[miY][miX]>0) return 0;
    }
    return 1;
}

/******************
    MOVIMIENTOS
 *****************/
function moverAbajo(){
    console.log("Mover Abajo",curY);
    var k;
    for(k=0;k<nCuadros; k++){
        dx_[k]=dx[k];
        dy_[k]=dy[k];
    }
    if (validarPieza(curX,curY+1)) {
        borrarPieza();
        curY++;
        dibujarPieza();
        return 1;
    }
    return 0;
}
// bajar la pieza
function bajar(){
    var k;
    for(k=0;k<nCuadros; k++){
        dx_[k]=dx[k];
        dy_[k]=dy[k];
    }
    if (!validarPieza(curX,curY+1)) return;
    clearTimeout(timerID);
        borrarPieza();
        while(validarPieza(curX,curY+1))curY++;
        dibujarPieza();
        timerID = setTimeout("jugar()",velocidad);
    
}
function moverIzquierda(){
    for(k=0;k<nCuadros; k++){
        dx_[k]=dx[k];
        dy_[k]=dy[k];
    }
    if (validarPieza(curX-1,curY)) {
        borrarPieza();
        curX--;
        dibujarPieza();
        
    }
    
}
function moverDerecha(){
    for(k=0;k<nCuadros; k++){
        dx_[k]=dx[k];
        dy_[k]=dy[k];
    }
    if (validarPieza(curX+1,curY)) {
        borrarPieza();
        curX++;
        dibujarPieza();
        
    }
    
}
function rotar(){
    for(k=0;k<nCuadros; k++){
        dx_[k]=dy[k];
        dy_[k]=-dx[k];
    }
    if (validarPieza(curX,curY)) {
        borrarPieza();
        for(k=0;k<nCuadros; k++){
            dx[k]=dx_[k];
            dy[k]=dy_[k];
        }
        dibujarPieza();
        
    }
    
}

/******************
   MANEJO DE TECLAS
 *****************/
retrasoInicial_=200;
retrasoRepite_=20;
// Left, Right, Up,Down,Space
activeL_=0; timerL_=null;
activeR_=0; timerR_=null;
activeD_=0; timerD_=null;
activeU_=0; timerU_=null;
activeSp_=0; timerSp_=null;

// Valores de las teclas ASCII
Left_=' 27 65 ';
//Flecha izquierda=37
// Letra A=65
Right_=' 68 26 '
//Flecha derecha=39
// Letra D=68
Up_=' 87 24 '
// Rotacion
//Flecha arriba=13
// Letra W=87
Down_=' 83 40 '
//Flecha abajo=40
// Letra S=83
Space_=' 32 '
//Barra espaciadora=32

function pulsarTecla(e){
    var key_= 0;
    var evt = e?e:Event;
    key_=evt.keyCode;
    console.log("ASCII",key_);
    if (!inicioJuego || !tableroCargado || pausaJuego) return;
    // Mover izquierda
    if (Left_.indexOf(' '+key_+' ')!=-1) {
        activeL_=1;
        activeR_=0;
        moverIzquierda();
        timerL_=setTimeout(slideL_(),retrasoInicial_);    
    }
    // Mover derecha
    if (Right_.indexOf(' '+key_+' ')!=-1) {
        
        activeR_=1;
        activL_=0;
        moverDerecha();
        timerR_=setTimeout(slideR_(),retrasoInicial_);    
    }
    // Rotar Pieza
    if (Up_.indexOf(' '+key_+' ')!=-1) {
        activeU_=1;
        activD_=0;
        rotar();    
    }
    // Bajar pieza
    if (activeSp_ && Space_.indexOf(' '+key_+' ')!=-1) {
        activeSp_=1;
        activD_=0;
        bajar();
    }
    // Mover abajo
    if (Down_.indexOf(' '+key_+' ')!=-1) {
        activeD_=1;
        activU_=0;
        moverAbajo();
        timerD_=setTimeout(slideD_(),retrasoInicial_);    
    }
}
function levantarTecla(e){
    var key_=0;
    var evt = e?e:Event;
    key_=evt.keyCode;
    if (Left_.indexOf(' '+key_+' ')!=-1) {
        activeL_ =0; clearTimeout(timerL_);
    }
    if (Right_.indexOf(' '+key_+' ')!=-1) {
        activeR_ =0; clearTimeout(timerR_);
    }
    if (Up_.indexOf(' '+key_+' ')!=-1) {
        activeU_ =0; clearTimeout(timerU_);
    }
    if (Down_.indexOf(' '+key_+' ')!=-1) {
        activeD_ =0; clearTimeout(timerD_);
    }
    if (Space_.indexOf(' '+key_+' ')!=-1) {
        activeSp_ =0; clearTimeout(timerSp_);debugger;
    }
    top.focus();
}
function slideL_(){
    if (activeL_){
        moverIzquierda();
        timerL_=setTimeout("slideL_()",retrasoRepite_)
    }
}
function slideR_(){
    if (activeR_){
        moverDerecha();
        timerR_=setTimeout("slideR_()",retrasoRepite_)
    }
}
function slideD_(){
        if (activD_){
            moverDerecha();
            timerD_=setTimeout("slideD_()",retrasoRepite_)
    }
}
