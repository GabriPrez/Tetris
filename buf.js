buf= '<center><form name="form1"><table border="0" cellspacing="3" cellpadding="3"><tr>'
    +'<td>Nivel:<select name="s1" onchange="recuperarNivel();this.blur();">'
    +'<option value=1 selected>1'
    +'<option value=2>2'
    +'<option value=3>3'
    +'<option value=4>4'
    +'<option value=5>5'
    +'<option value=6>6'
    +'<option value=7>7'
    +'<option value=8>8'
    +'<option value=9>9'
    +'<option value=10>10'
    +'</select></td>'
    +'<td>Lineas:<input type="text" name="lineas" value="0" size="2" readonly></input></td>'
    +'<td>:<input type="button" value="" onclick="iniciarJuego()"></td>'
    +'<td>:<input type="button" value="" onclick="iniciarJuego()"></td>'
    +'</tr></table></form>';
    buf+='<pre';
    for(i = 0; i<tableroAltura;i++){
        for(i = 0; i < tableroAltura;i++){
            buf+='><a href="#s" onclick="seleccionar('+i+','+j+');return false;"'
            +'><img name="s'+i+'_'+j+'" src="s'+ Math.abs(f[i][j])+
            '.png" width=16 height=16 border=0></a>'
        }
        buf+="><br>";
    }
    buf+="></pre></center>";

    document.writeln(buf);

    tableroCargado =1;
    window.onload = function(){
        inicio();
    }
