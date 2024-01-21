import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface IMetAccordionProps {
  listID: string;
  accordionTitle: string;
  context: IWebPartContext;
  onConfigure: () => void;
}
