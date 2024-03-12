// Define the function
export function fileToBase64(file: File): Promise<string> {
  // Create a promise that will resolve with the base64 string
  return new Promise((resolve, reject) => {
    // Create a file reader object
    const reader = new FileReader();
    // Set the onload event handler
    reader.onload = () => {
      // Get the result as a data URL
      const dataURL = reader.result as string;
      // Split the data URL by comma and get the second part
      const base64 = dataURL.split(',')[1];
      // Resolve the promise with the base64 string
      resolve(base64);
    };
    // Set the onerror event handler
    reader.onerror = () => {
      // Reject the promise with the error
      reject(reader.error);
    };
    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
}
