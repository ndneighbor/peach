import { google } from 'googleapis';

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_FOLDER_ID } = process.env;

const auth = new google.auth.JWT(GOOGLE_CLIENT_EMAIL, null, GOOGLE_PRIVATE_KEY, ['https://www.googleapis.com/auth/drive']);

auth.authorize()
  .then(() => console.log(`> Connected to Google Drive on ${GOOGLE_CLIENT_EMAIL}`))
  .catch(err => console.error(err));

const drive = google.drive('v3');

/**
 * Uploads a given file to Google Drive.
 * @param {Object} file The file to be uploaded.
 * @param {string} file.name The name of the file.
 * @param {string} file.mimeType The mimetype of the file.
 * @param {*} file.body The readStream body.
 */
const upload = async (file) => {
  const { name, mimeType, body } = file;
  const resource = { name, mimeType };
  const media = { mimeType, body };
  const parents = [GOOGLE_FOLDER_ID];
  try {
    console.log('Hit');
    const { webViewLink } = await drive.files.create({
      auth,
      resource,
      media,
      parents,
    });

    console.log(webViewLink);
    console.log('Success');
    return webViewLink;
  } catch (err) {
    throw err;
  }
};

export default { upload };
