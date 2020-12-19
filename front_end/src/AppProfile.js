import React, { useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { authenticationService } from './jwt/_services';

export class AppProfile extends React.Component{
    constructor(){
      super();
      this.state = {
        expanded:false,
        nombre: authenticationService.currentUserValue.nombre
      }
      this.onClick = this.onClick.bind(this);
      this.logout = this.logout.bind(this);
    }


    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }
    logout(){

    authenticationService.logout();
    this.props.history.push('/');
  }

render(){
    return (
          <div className="layout-profile">
              <div>
                  <img src="assets/layout/images/avatar_4.png" alt="Profile" />
              </div>
              <button className="p-link layout-profile-link" onClick={this.onClick}>
                  <span className="username">{this.state.nombre}</span>
                  <i className="pi pi-fw pi-cog" />
              </button>
              <CSSTransition classNames="p-toggleable-content" timeout={{ enter: 1000, exit: 450 }} in={this.state.expanded} unmountOnExit>
                  <ul className={classNames({ 'layout-profile-expanded': this.state.expanded })}>

                      <li><button type="button" className="p-link"  onClick={this.logout}><i className="pi pi-fw pi-power-off" /><span>Logout</span></button></li>
                  </ul>
              </CSSTransition>
          </div>
      );

  }

}
