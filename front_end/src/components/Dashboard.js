import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProductService } from '../service/ProductService';
import { EventService } from '../service/EventService';
import {
	Card,
	CardBody,
	CardTitle
} from 'reactstrap';


import {Dialog} from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import ListadoUsuarios from './ListadoUsuarios'


class Dashboard  extends React.Component  {
  constructor(){
    super();
  }

  agregar(){
    this.props.history.push({
     pathname:'/app/mantenimiento/predictivo/inventario/agregar'
   });
  }
  render() {
    const footer = (
    <div>
          <Button label="Sí" icon="pi pi-check" />
          <Button label="No" icon="pi pi-times" />
      </div>

  );


    return (
      <Card>
				<CardTitle  className="bg-light border-bottom p-3 mb-0">Usuarios</CardTitle>
				<CardBody>
					<Button label='Agregar actividad' icon="fa fa-plus" className="pull-right" onClick={this.agregar.bind(this)}/><br/><br/>
					<ListadoUsuarios history={this.props.history}/>
				</CardBody>
			</Card>
    );
  }
};

export default Dashboard;
