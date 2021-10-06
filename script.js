var Fcalc = document.frm;
var Currents = 0;
var FlagNewNum = false;
var PendingOp = "";
        function NumPressed (Num) 
{
        if (FlagNewNum) 
        {
            Fcalc.ReadOut.value = Num;
            FlagNewNum = false;
        }   
        else 
        {
            if (Fcalc.ReadOut.value == "0")
                Fcalc.ReadOut.value = Num;
            else
                Fcalc.ReadOut.value += Num;
        }
}

function Operation (Op) 
{
        var Readout = Fcalc.ReadOut.value;
        if (FlagNewNum && PendingOp != "=")
        {
            Fcalc.ReadOut.value = Currents;
        }
        else
        {
            FlagNewNum = true;
            if ( '+' == PendingOp )
                Currents += parseFloat(Readout);
            else if ( '-' == PendingOp )
                Currents -= parseFloat(Readout);
         
            else if ( '*' == PendingOp )
                Currents *= parseFloat(Readout);
			else if ( '/' == PendingOp )
                Currents /= parseFloat(Readout);

            else
                Currents = parseFloat(Readout);
			if (Currents == Infinity ) 
				{Fcalc.ReadOut.value = "Ошибка ввода";
				setTimeout(Clear, 1000);} 
			else if (Currents > (Math.pow(2, 53) - 1)) 
				{Fcalc.ReadOut.value = "Превышен диапазон вычислений";
				setTimeout(Clear, 1000);} 
			else if (Currents < (0-(Math.pow(2, 53)))) 
				{Fcalc.ReadOut.value = "Превышен диапазон вычислений";
				setTimeout(Clear, 1000);} 
			else
				Fcalc.ReadOut.value = Currents;
            PendingOp = Op;
        }
}
function Decimal () 
{
        var curReadOut = Fcalc.ReadOut.value;
        if (FlagNewNum) 
        {
            curReadOut = "0.";
            FlagNewNum = false;
        }
        else
        {
            if (curReadOut.indexOf(".") == -1)
                curReadOut += ".";
        }
        Fcalc.ReadOut.value = curReadOut;
}
    function Clear () 
{
        Currents = 0;
        PendingOp = "";
        Fcalc.ReadOut.value = "0";
        FlagNewNum = true;
}