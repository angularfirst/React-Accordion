import * as React from 'react';
import styles from './MetAccordion.module.scss';
import type { IMetAccordionProps } from './IMetAccordionProps';

import { Logger } from '@pnp/logging';
import "@pnp/sp/items/get-all";
import { Caching } from '@pnp/queryable';
import { Placeholder } from '@pnp/spfx-controls-react';
import './metAccordion.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Accordion, Button } from 'react-bootstrap';

import { spfi, SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';

export interface IMetAccordionState{
  items: Array<any>;
}

export default class MetAccordion extends React.Component<IMetAccordionProps, IMetAccordionState> {

  private LOG_SOURCE = "MetAccordion";
  private _sp: SPFI;

  constructor(props: IMetAccordionProps){
    super(props);
    this.state = {
      items: [],
    };
    
    this._sp = getSP();
  }

  private toggleExpandCollapse = (): void => {
    this.setState(prevState => {
      items: prevState.items.map(item => ({...item, isOpen: !item.isOpen}));
    });
  };

  public componentDidMount(): void {
    this.getListItems(); 
  }

  private async getListItems(): Promise<void>{
    const spCache = spfi(this._sp).using(Caching({ store: "session" }));
    // const listid = this.props.listID;
    // console.log("LIST ID GOT IS :" + listid);

    if(typeof this.props.listID !== "undefined" && this.props.listID.length > 0){
      try {
        const list = spCache.web.lists.getById(this.props.listID)
        const items = await list.items.select('Title', 'Content').top(500).orderBy('Title').getAll();
        
        this.setState({ items: items.map(item => ({ ...item, isOpen: false})) });
      } catch(error: any){
          console.log("Failed to get list items.");
          console.log(error);
          Logger.write(`${this.LOG_SOURCE} (render) - ${JSON.stringify(error)}`);
        }
      }
    }

  public componentDidUpdate(prevProps: IMetAccordionProps): void {
    if(prevProps.listID !== this.props.listID) {
      this.getListItems();
    }
  }

  public render(): React.ReactElement<IMetAccordionProps> {
    
    let listSelected:boolean = typeof this.props.listID !== "undefined" && this.props.listID.length > 0;
    //const allItemsOpen = this.state.items.every(item => item.isOpen);

    return (
      <div className={`${styles.metAccordion}`}>
        {
          !listSelected &&
          <Placeholder 
            iconName='ThumbnailView'
            iconText='Configure the Accordion WebPart'
            description='Select a list with a mandatory Title field and Content field to have its items rendered in a collapsible accordion format'
            buttonLabel='Choose a List'
            onConfigure={this.props.onConfigure} />
        }
        {
          listSelected &&
          <div>
            <Button variant='primary' onClick={this.toggleExpandCollapse}>
              Expand All
            </Button>{' '}
            <h2>{this.props.accordionTitle}</h2>
            <Accordion flush>
              {this.state.items.map((item: any, index: number) =>{
                return(
                  <Accordion.Item key={index} eventKey={index.toString()} className={item.isOpen ? 'open' : ''}>
                    <Accordion.Header>
                      {item.Title}
                    </Accordion.Header>
                    <Accordion.Body>
                      <p dangerouslySetInnerHTML={{__html: item.Content}}></p>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        }
      </div>
    );
  }
}
