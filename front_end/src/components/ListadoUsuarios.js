import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {MultiSelect} from 'primereact/multiselect';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import { Toast } from 'primereact/toast';

export default class ListadoUsuarios extends Component {

    constructor() {
        super();
        this.state = {
            globalFilter: null,
            visible:false,
            visible2:false
        };
        this.eliminar = this.eliminar.bind(this);
        this.editar = this.editar.bind(this);
    }

    componentDidMount() {

    }

    eliminar(column){
      this.setState({visible2:true,selectedItemIndex:column.rowIndex,selectedItem:column.rowData});

    }

    editar(column){
      //this.setState({visible:true,item:column.rowData});
      this.props.history.push({
         pathname:'/app/operador/editar',
         state: column.rowData
       });
    }

    confirmar_borrado(){

      this.setState({visible2:false});
      this.setState({
        cars: this.state.cars.filter((val,i) => i !== this.state.selectedItemIndex)
      });
      let that = this;
      this.servicioOperador.eliminarOperador(this.state.selectedItem.usuario_id).then(res =>  {
          if(res && res.result == 'OK'){
            that.growl.show({severity: 'success', summary: 'Operación completada', detail: 'Registro borrado'});
          }
      });

    }


    actionTemplate(rowData, column) {
      return (<div>
        <Button
          type="button" icon="pi pi-pencil" onClick={e=> this.editar(column)}
          className=""/><Button
          type="button" icon="pi pi-trash" onClick={e=> this.eliminar(column)}
           className="p-button-warning"
        />
      </div>);
    }

    render() {
        const footer = (
          <div>
                <Button label="Sí" icon="pi pi-check" onClick={this.confirmar_borrado.bind(this)} />
                <Button label="No" icon="pi pi-times" onClick={e=> this.setState({visible2:false})}/>
            </div>

        );

        return (<div>
            <Toast ref={(el) => this.growl = el} />
            <DataTable value={this.state.cars}  rows={10} >
            <Column field="numero_empleado" header="Folio de orden" filter={true} />
            <Column field="fecha_ingreso" header="Núm unidad" filter={true} />
            <Column field="nombre" header="KM actual" filter={true} />
            <Column field="apellido_paterno" header="Fecha reporte" filter={true} />
            <Column field="estado_civil" header="Autorización" filter={true}  />

                <Column body={this.actionTemplate.bind(this)} header="Opciones" style={{ textAlign: 'center'}} />
            </DataTable>

      </div>);
    }
}
