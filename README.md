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

## Dockerizing
You can use the provided Dockerfile and docker-compose.yml to create a docker image that can be hosted locally or any machine it is exported to. To do so follow these steps:
1. Make sure the port numbers specified in package.json (line 8), Dockerfile, and docker-compose.yml match with the port you wish to use.
2. Run the command `npm run build` to create a production version of the project.
3. Run the command `docker-compose up --build` to run the docker files and creat a container with an image for the qa/qc web app.

## Debugging
In order for the script to create individual polygon objects for all values in a nested object, a delimitor of ' -- ' is added. If any field name in a JSON file contains this demimitor, it will prevent the field from being updated.


