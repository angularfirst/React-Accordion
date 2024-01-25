import * as React from 'react';
import styles from './MetAccordion.module.scss';
import type { IMetAccordionProps } from './IMetAccordionProps';

import { Logger } from '@pnp/logging';
import "@pnp/sp/items/get-all";
import { Caching } from '@pnp/queryable';
import { Placeholder } from '@pnp/spfx-controls-react';
import './metAccordion.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse }  from 'react-collapse';

import { Accordion, Card } from 'react-bootstrap';

import { spfi, SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';

export interface IMetAccordionState{
  items: Array<any>;
  isExpanded: boolean;
}

export default class MetAccordion extends React.Component<IMetAccordionProps, IMetAccordionState> {

  private LOG_SOURCE = "MetAccordion";
  private _sp: SPFI;

  constructor(props: IMetAccordionProps){
    super(props);
    this.state = {
      items: [],
      isExpanded: false,
    };
    
    this._sp = getSP();
  }

  private toggleExpandCollapse = (): void => {
    const isExpanded = !this.state.isExpanded;
    this.setState({ isExpanded });
    this.updateUrl(isExpanded);
  };

  private updateUrl(isExpanded: boolean): void {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('expand', isExpanded.toString());
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  private getExpandedStateFromUrl(): boolean {
    const urlParams = new URLSearchParams (window.location.search);
    return urlParams.get('expand') === 'true';
  }

  private handleItemClick = (index: number): void => {
    const newItems = [...this.state.items];
    newItems[index].isOpen = !newItems[index].isOpen;
    this.setState({ items: newItems });
  };

  public componentDidMount(): void {
    this.getListItems();
    const isExpanded = this.getExpandedStateFromUrl();
    this.setState({ isExpanded }); 
  }

  private async getListItems(): Promise<void>{
    const spCache = spfi(this._sp).using(Caching({ store: "session" }));
    
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

  public componentDidUpdate(prevProps: IMetAccordionProps, prevState: IMetAccordionState): void {
    if(prevProps.listID !== this.props.listID) {
      this.getListItems();
    }

    if (prevState.isExpanded !== this.state.isExpanded) {
      const newItems = this.state.items.map(item => ({ ...item, isOpen: this.state.isExpanded }));
      this.setState({ items: newItems });
    }
  }

  public render(): React.ReactElement<IMetAccordionProps> {
    
    let listSelected:boolean = typeof this.props.listID !== "undefined" && this.props.listID.length > 0;
    //const allItemsOpen = this.state.items.every(item => item.isOpen);
    const expandCollapseText = this.state.isExpanded ? 'Collapse All' : 'Expand All';
    // const plusMinusText = this.state.isExpanded ? '-' : '+';

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
            <div className={styles.headerSection}>
            <div className={styles.headerTitle}>{this.props.accordionTitle}</div>
              <div>
              <a href='#' onClick={this.toggleExpandCollapse}>
                {expandCollapseText}
              </a>{' '}
              </div>
            </div>
              <Accordion flush>
              {this.state.items.map((item: any, index: number) =>(
                <Card key={index} className={styles.card} bg='bg-light'>
                  <div className={styles.accHeader}>
                    <a href='javascript:void(0);' onClick={()=> this.handleItemClick(index)} className={styles.accTitle}>
                      { item.Title }
                    </a>
                    <a href='javascript:void(0);' onClick={()=> this.handleItemClick(index)} className={`${styles.plusMinus} ${item.isOpen ? styles.minusIcon : styles.plusIcon}`}>
                    </a>{' '}
                  </div>
                    <Collapse isOpened={item.isOpen}>
                      <Card.Body>
                        <p dangerouslySetInnerHTML={{__html: item.Content}}></p>
                      </Card.Body>
                    </Collapse>
                </Card>
              ))}
              </Accordion>
          </div>
        }
      </div>
    );
  }
}
