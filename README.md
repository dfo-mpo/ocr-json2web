This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## BC16 ORC Web Application

This web application is developed for the BC16 ORC project. It showcases results extracted through Document Intelligence (D.I.) and subsequently compares them with the scanned PDF document for quality assurance and quality control (QA/QC) purposes.

### Setup and Hosting

The web application is set up and hosted on Microsoft Azure as a Static Web App. You can access the web app through the link: [BC16 website](https://waayback.exp.science.cloud-nuage.canada.ca/)

### Getting Started Locally

To get started locally, follow these steps:

1. Create a new file called .env by coping the .env.example and entering values for the specified variables for an Azure storage account where the OCR documents are stored.

2. Install dependencies:
 
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3090](http://localhost:3090) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

#### Project structure
The api folder contains all api functions to the Azure storage account that is connected. 

The components folder contains the homePage folder that has all code relating to the home page. It also contains other components used by other pages.

The files folder contains the page when viewing a file and the main components.

The filesOriginal folder contains the page for viewing the original JSON. It uses components from the files folder.

The viewJson folder contains logic for the view JSON container when viewing a file. It is used by the page.js in files.

### Performing QA/QC on documents
1. First to ensure all extracted templates appear in the document click on the 'Update Settings" button at the bottom left of the home page.
2. Optional, use the search functions on the right to find a document by folder/template or by name.
3. Click on the document you wish to review. (Green check means it is verified, red 'x' means there is an issue, the black pencil means modifications has been made)
4. When viewing a document, click on the box over the PDF on from the list on the left to modify the value.
5. Once your are done your changes press on the save button at the bottom left of the screen.
6. If the document is fully verified, click on the verified file button on the top right.
7. Return to the home page and repeat with the next document you wish to edit (refresh the page or click on 'Reload' to see updated status on documents).

## Dockerizing
You can use the provided Dockerfile and docker-compose.yml to create a docker image that can be hosted locally or any machine it is exported to. To do so follow these steps:
1. Make sure the port numbers specified in package.json (line 8), Dockerfile, and docker-compose.yml match with the port you wish to use.
2. Run the command `npm run build` to create a production version of the project.
3. Run the command `docker-compose up --build` to run the docker files and creat a container with an image for the qa/qc web app.

## Login Feature
The login feature uses NextAuth and Azure Entra ID that is configured to allow specific users based on email. When a user attempts to login they will go through the Azure login procedure then get redirected back to the web app.

The code for the authentication can be found in `scr/app/api/auth/[...nextauth]/route.ts` while the Session Provider in `src/app/layout.js` makes the login authentication active for the web application.

For details on how the login feature is implemented see the following [Microsoft tutorial](https://microsoft.github.io/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Configuring-Application-Azure-Active-Directory/).

### Configure Login Variables
For the login feature to work you must fill in the following varibles in the .env:
``` sh
AZURE_AD_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_AD_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_AD_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXTAUTH_URL=https//your-domain:your-port or http//your-domain:your-port
```
Where NEXTAUTH_URL is the base URL for your web application and AZURE_AD_CLIENT_ID, AZURE_AD_CLIENT_SECRET, and AZURE_AD_TENANT_ID can be obtained from the Entra ID being used for the authentication.

### Providing Access to Users
All DFO accounts with their email added to the Entra ID will be given access. For the OCR-FFHPP project the Entra ID is managed by SSC under the name FoSC-PSSIFence-BlankPelican-spn. To grant access to a new user, reach out to the the SSC Solutions Architect with the DFO email of the user.

## Debugging
In order for the script to create individual polygon objects for all values in a nested object, a delimitor of ' -- ' is added. If any field name in a JSON file contains this demimitor, it will prevent the field from being updated.


