# Creche Report Generator

A web application for generating terminal reports for creche students at Edisam Educational Complex.

## Features

- Create and manage student records
- Record student activities and performance
- Add personalized remarks for each student
- Upload student photos
- Manage student promotion to next classes
- Track student bills
- Add teacher's signature (draw or upload)
- Generate and download PDF reports for all students

## Usage

1. Fill in the school term information (starting admission number, number of students, total attendance, academic year, term, next term date, and vacation date)
2. Enter student names and attendance
3. Mark student activities using the "Mark Activity" button
4. Add remarks for each student using the "Give Remarks" button
5. Upload student photos using the "Upload Student Photos" button
6. Set promotion status for students using the "Promote All Students to:" button
7. Enter bill information using the "Pupils Bill" button
8. Add teacher's signature using the "Upload Teacher's Signature" button
9. Generate and download all reports using the "Download All Reports" button

## Technologies Used

- HTML5
- CSS3
- JavaScript
- jsPDF (for PDF generation)
- QRious (for QR code generation)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   npm run dev
   ```
4. Open your browser and navigate to http://localhost:3000

## Deployment

### Deploying to Netlify

#### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI (if not already installed):
   ```
   npm install netlify-cli -g
   ```

2. Login to Netlify:
   ```
   netlify login
   ```

3. Deploy to Netlify:
   ```
   npm run netlify:deploy
   ```
   This will create a draft deployment.

4. To deploy to production:
   ```
   npm run netlify:deploy:prod
   ```

#### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select GitHub as your Git provider
5. Select your repository
6. Configure build settings (leave as default)
7. Click "Deploy site"

## License

This project is licensed under the MIT License.
