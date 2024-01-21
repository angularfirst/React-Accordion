import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MetAccordionWebPartStrings';
import MetAccordion from './components/MetAccordion';
import { IMetAccordionProps } from './components/IMetAccordionProps';

import { getSP } from '../../pnpjsConfig';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls';



export interface IMetAccordionWebPartProps {
  listID: string;
  accordionTitle: string;
}

export default class MetAccordionWebPart extends BaseClientSideWebPart<IMetAccordionWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ =>{
      getSP(this.context);
    });
    
  }

  public render(): void {
    const element: React.ReactElement<IMetAccordionProps> = React.createElement(
      MetAccordion,
      {
        listID: this.properties.listID,
        accordionTitle: this.properties.accordionTitle,
        context: this.context,
        onConfigure: () => {
          this.context.propertyPane.open();
        }        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('accordionTitle', {
                  label: 'Accordion Title'
                }),
                PropertyFieldListPicker('listID', {
                  label: 'Select a List (Select the list that you created with Title and Content columns.)',
                  selectedList: this.properties.listID,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
