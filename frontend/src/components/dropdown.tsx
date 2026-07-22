interface DropdownProps{
    indicador:string;
    onChangeIndicador: (novoValor: string) => void;
}
export default function Dropdown({indicador, onChangeIndicador} : DropdownProps){
    return(
        <div className="flex gap-4">
            <select value = {indicador}
                onChange = {(evento) => onChangeIndicador(evento.target.value)}>
                <option value={"populacao"}>populacao</option>
                <option value={"densidade"}>densidade</option>
            </select>
            <select disabled>
               <option value="">Regiao</option>
            </select>
        </div>
    );
}