# React Bootstrap SPFx-accordion

## Summary

This WebPart uses React-Bootstrap version 2 to display SharePoint list items. The accordion is dependent on a SharePoint list with at least 2 mandatory fields: Title & Content. Below are the high-level overview of the technologies used. You can always navigate to the package.json to take a close look of all the packages used:

1) React-Bootstrap (npm -i react-bootstrap --save)
2) Bootstrap CSS (npm -i bootstrap --save)
3) PnPJS version 3 (npm i @pnp/sp @pnp/logging @pnp/core --save)
4) NodeJS version 18.19
5) SPFX version 1.18.2
6) Gulp 4.0.2
7) Yoeman 4.3.1

<img width="906" alt="image" src="https://github.com/angularfirst/React-Accordion/assets/30344092/0076893c-9b72-47d7-b115-c1cbddc648b6">
<img width="907" alt="image" src="https://github.com/angularfirst/React-Accordion/assets/30344092/ac596e24-e163-4116-9319-fac430d5d478">

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> This solution will only work on Node JS version 18 and SPFx version 1.18.2. On other versions of Node, the code has to be altered accordingly for it to work as expected.
> Clone the rep
> npm install
> gulp clean
> gulp build
> gulp serve --nobrowser

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp build** 
  - **gulp serve --nobrowser** (to check on Workbench of your SharePoint tenant site)
  - **gulp bundle --ship**
  - **gulp package-solution --ship** (to create a solution and upload it to your tenant AppCatalog)


## Features

Create a SharePoint List. 
Configure the WebPart to provide a title and select the list you created with Title and Content columns to fetch all items from the list to display it in an accordion format on a Modern SharePoint page.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
